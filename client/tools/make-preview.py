#!/usr/bin/env python3
"""
Generates a single self-contained HTML preview from the React source,
so the site can be opened without running npm install.

It strips ES module syntax, concatenates the sources in dependency order,
shims react-router-dom, and hands the result to in-browser Babel.

    python3 tools/make-preview.py

The preview is a viewing aid only. The real deliverable is src/.
"""

import re
import pathlib
import base64

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'preview.html'

# Local webfonts referenced via /fonts/... in src/styles/index.css need to be
# inlined as data URIs for the preview — it's a single self-contained file
# with no public/ folder alongside it.
LOCAL_FONTS = {
    '/fonts/LiAlinurTumatulUnicode.ttf': 'public/fonts/LiAlinurTumatulUnicode.ttf',
    '/fonts/LiAlinurTumatulUnicode-Italic.ttf': 'public/fonts/LiAlinurTumatulUnicode-Italic.ttf',
    '/fonts/Mooxy.ttf': 'public/fonts/Mooxy.ttf',
}


# Same treatment for the founder photo — the preview has no public/ folder
# alongside it, so the <img src="/founder.webp"> has to become a data URI.
LOCAL_IMAGES = {
    '/founder.webp': ('public/founder.webp', 'image/webp'),
    '/tune.mp3': ('public/tune.mp3', 'audio/mpeg'),
}


def inline_local_images(js: str) -> str:
    for url_path, (rel_file, mime) in LOCAL_IMAGES.items():
        raw = (ROOT / rel_file).read_bytes()
        b64 = base64.b64encode(raw).decode('ascii')
        uri = f'data:{mime};base64,{b64}'
        js = js.replace(f'"{url_path}"', f'"{uri}"').replace(f"'{url_path}'", f"'{uri}'")
    return js


def inline_local_fonts(css: str) -> str:
    for url_path, rel_file in LOCAL_FONTS.items():
        font_bytes = (ROOT / rel_file).read_bytes()
        b64 = base64.b64encode(font_bytes).decode('ascii')
        data_uri = f'data:font/ttf;base64,{b64}'
        css = css.replace(f"url('{url_path}')", f"url('{data_uri}')")
    return css

ORDER = [
    'src/data/content.js',
    'src/data/pricing.js',
    'src/context/AppContext.jsx',
    'src/components/Logo.jsx',
    'src/components/Rich.jsx',
    'src/components/Sound.jsx',
    'src/components/TopBar.jsx',
    'src/components/Hero.jsx',
    'src/components/Sections.jsx',
    'src/components/CharuOS.jsx',
    'src/components/LeadForm.jsx',
    'src/components/Contact.jsx',
    'src/components/AuthModal.jsx',
    'src/pages/Portal.jsx',
    'src/pages/Home.jsx',
    'src/App.jsx',
]


def strip_modules(code: str) -> str:
    # drop import statements (single and multi-line)
    code = re.sub(r'^import[\s\S]*?from\s+[\'"][^\'"]+[\'"];?\s*$', '', code, flags=re.M)
    code = re.sub(r'^import\s+[\'"][^\'"]+[\'"];?\s*$', '', code, flags=re.M)
    # export keywords
    code = re.sub(r'^export\s+default\s+function\s+', 'function ', code, flags=re.M)
    code = re.sub(r'^export\s+function\s+', 'function ', code, flags=re.M)
    code = re.sub(r'^export\s+const\s+', 'const ', code, flags=re.M)
    code = re.sub(r'^export\s+\{[^}]*\};?\s*$', '', code, flags=re.M)
    code = re.sub(r'^export\s+default\s+', 'const __default = ', code, flags=re.M)
    return code


PRELUDE = """
const { useState, useEffect, useMemo, useRef, useContext, createContext } = React;

/* --- preview-only router shim ------------------------------------ */
let __setRoute = () => {};
const useNavigate = () => (to) => { __setRoute(to); window.scrollTo(0, 0); };
const Navigate = ({ to }) => { useEffect(() => __setRoute(to), [to]); return null; };
const Link = ({ to, children, ...rest }) => (
  <a href="#" onClick={(e) => { e.preventDefault(); __setRoute(to); window.scrollTo(0, 0); }} {...rest}>
    {children}
  </a>
);
"""

MOUNT = """
/* --- preview-only shell ------------------------------------------ */
function Preview() {
  const [route, setRoute] = useState('/');
  __setRoute = setRoute;
  const [auth, setAuth] = useState({ open: false, mode: 'signin' });

  const onChoosePlan = () => setAuth({ open: true, mode: 'signup' });

  return (
    <>
      <TopBar onSignIn={() => setAuth({ open: true, mode: 'signin' })} />
      {route === '/account' ? <Portal /> : <Home onChoosePlan={onChoosePlan} />}
      <AuthModal
        open={auth.open}
        mode={auth.mode}
        onClose={() => setAuth((a) => ({ ...a, open: false }))}
      />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AppProvider>
    <Preview />
  </AppProvider>
);
"""


def main():
    css = (ROOT / 'src/styles/index.css').read_text()
    css = inline_local_fonts(css)

    parts = [PRELUDE]
    for rel in ORDER:
        src = (ROOT / rel).read_text()
        parts.append(f'\n/* ===== {rel} ===== */\n' + strip_modules(src))
    parts.append(MOUNT)

    js = inline_local_images('\n'.join(parts))

    html = f"""<!DOCTYPE html>
<html lang="en" data-theme="light" data-lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Charubala LLP — preview</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Bengali:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<style>
{css}
</style>
</head>
<body>
<div id="root"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.24.7/babel.min.js"></script>
<script type="text/babel" data-presets="react">
{js}
</script>
</body>
</html>
"""
    OUT.write_text(html)
    print(f'wrote {OUT} ({len(html):,} bytes)')


if __name__ == '__main__':
    main()
