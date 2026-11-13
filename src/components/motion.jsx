import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1]

/** Fade + rise on scroll into view. */
export function Reveal({ children, delay = 0, y = 40, scale = 1, className = '', as = 'div' }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </M>
  )
}

/** Word-by-word masked text reveal. */
export function SplitText({ text, className = '', as = 'h2', delay = 0, immediate = false }) {
  const M = motion[as]
  const words = text.split(' ')
  const anim = immediate
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '-60px' } }
  return (
    <M className={className} initial="hide" {...anim} transition={{ staggerChildren: 0.06, delayChildren: delay }} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{ hide: { y: '110%', rotate: 3 }, show: { y: 0, rotate: 0 } }}
            transition={{ duration: 0.95, ease }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </M>
  )
}

/** Element that drifts vertically relative to scroll. */
export function Parallax({ children, speed = 60, className = '', style }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])
  return (
    <motion.div ref={ref} style={{ y, ...style }} className={className}>
      {children}
    </motion.div>
  )
}

export function useDocTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ZAKIA Maroc` : 'ZAKIA Maroc — Le goût qui rassemble'
  }, [title])
}

export function Eyebrow({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-zred ${className}`}>
      <span className="h-px w-8 bg-current" />
      {children}
    </span>
  )
}
