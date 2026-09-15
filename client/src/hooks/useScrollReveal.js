import { useEffect } from 'react'

/*
 * One IntersectionObserver, applied broadly, instead of wiring a
 * "reveal" wrapper into every section. Adds `.js-reveal` to <body>
 * once JS is running (so CSS only hides content when it can also
 * reveal it), then flips `.in-view` on each target the first time
 * it crosses the viewport. Skips itself entirely under
 * prefers-reduced-motion.
 */
const TARGETS = '.head, .pillar, .cap, .plan, .compare__card, .founder, .step, .pullquote, .addon'

export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    document.body.classList.add('js-reveal')

    const els = document.querySelectorAll(TARGETS)
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
