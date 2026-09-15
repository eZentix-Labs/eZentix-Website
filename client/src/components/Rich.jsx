/* ------------------------------------------------------------------
 * Rich — lets a copy string carry one emphasis without turning
 * content.js into JSX.
 *
 *   'You get *the person who built it*, not a support ticket.'
 *
 * Text between asterisks renders in the script face. Strings without
 * asterisks pass straight through, so a translation that drops the
 * markers still renders correctly rather than showing stray symbols.
 * ------------------------------------------------------------------ */
export default function Rich({ text }) {
  if (typeof text !== 'string' || !text.includes('*')) return text

  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
      <em className="script" key={i}>
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    ),
  )
}
