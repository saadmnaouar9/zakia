import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { F } from '../lib/img'
import { SplitText, ease } from './motion'

// Cinematic montage (Ken Burns + crossfade) used as a "video" background.
// Drop a real file at public/video/hero.mp4 (and/or hero.webm) and it takes over automatically.
const scenes = [
  { img: 'tartines-confiture', from: { x: '-3%', y: '2%', s: 1.08 }, to: { x: '3%', y: '-2%', s: 1.3 } },
  { img: 'wrap-samourai', from: { x: '3%', y: '-2%', s: 1.3 }, to: { x: '-3%', y: '2%', s: 1.1 } },
  { img: 'salade', from: { x: '0%', y: '3%', s: 1.1 }, to: { x: '-3%', y: '-3%', s: 1.32 } },
  { img: 'mille-feuille', from: { x: '-3%', y: '-3%', s: 1.3 }, to: { x: '3%', y: '3%', s: 1.1 } },
  { img: 'poulet-barbecue', from: { x: '3%', y: '3%', s: 1.1 }, to: { x: '-2%', y: '-3%', s: 1.3 } },
  { img: 'cake-glace', from: { x: '-2%', y: '2%', s: 1.3 }, to: { x: '3%', y: '-2%', s: 1.1 } },
  { img: 'frites-poulet', from: { x: '2%', y: '-3%', s: 1.1 }, to: { x: '-3%', y: '2%', s: 1.3 } },
  { img: 'sauce-tomate', from: { x: '-3%', y: '0%', s: 1.3 }, to: { x: '3%', y: '0%', s: 1.1 } },
]
const SCENE_MS = 4800

function Montage() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % scenes.length), SCENE_MS)
    return () => clearInterval(t)
  }, [])
  const s = scenes[i]
  return (
    <>
      <AnimatePresence>
        <motion.img
          key={i}
          src={F(s.img)}
          alt=""
          aria-hidden
          initial={{ opacity: 0, x: s.from.x, y: s.from.y, scale: s.from.s }}
          animate={{ opacity: 1, x: s.to.x, y: s.to.y, scale: s.to.s }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4 }, x: { duration: SCENE_MS / 1000 + 1.5, ease: 'linear' }, y: { duration: SCENE_MS / 1000 + 1.5, ease: 'linear' }, scale: { duration: SCENE_MS / 1000 + 1.5, ease: 'linear' } }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      {/* progress ticks */}
      <div className="absolute bottom-[calc(9vh+14px)] left-1/2 z-30 flex -translate-x-1/2 gap-2" aria-hidden>
        {scenes.map((_, k) => (
          <span key={k} className="h-1 w-8 overflow-hidden rounded-full bg-white/25">
            {k === i && <motion.span key={i} className="block h-full bg-white" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: SCENE_MS / 1000, ease: 'linear' }} />}
            {k < i && <span className="block h-full w-full bg-white/70" />}
          </span>
        ))}
      </div>
    </>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const [video, setVideo] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-zred-dark px-6 pb-[14vh] pt-32 text-center text-cream">
      {/* background: real video if available, otherwise the animated montage */}
      <motion.div style={{ y: bgY }} className="absolute -inset-x-0 -top-10 bottom-[-6rem] -z-30">
        {!video && <Montage />}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideo(true)}
          onError={() => setVideo(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${video ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={`${import.meta.env.BASE_URL}video/hero.webm`} type="video/webm" />
          <source src={`${import.meta.env.BASE_URL}video/hero.mp4`} type="video/mp4" />
        </video>
      </motion.div>

      {/* colour grade + vignette */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(120,8,14,.78)_0%,rgba(200,22,29,.62)_45%,rgba(90,6,10,.9)_100%)]" />
      <div className="absolute inset-0 -z-20 [background:radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,.45)_100%)]" />
      {/* drifting light sweeps */}
      <motion.div aria-hidden className="pointer-events-none absolute -z-10 h-[140%] w-[40%] -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent blur-2xl" initial={{ left: '-50%' }} animate={{ left: '130%' }} transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity, repeatDelay: 3 }} />
      <motion.div aria-hidden className="pointer-events-none absolute -z-10 h-[120%] w-[25%] -skew-x-12 bg-gradient-to-r from-transparent via-sun/15 to-transparent blur-3xl" initial={{ left: '-40%' }} animate={{ left: '120%' }} transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity, repeatDelay: 5, delay: 4 }} />

      <motion.div style={{ y: textY, opacity: fade }} className="relative z-30 mx-auto max-w-5xl">
        <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.3 }} className="inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] backdrop-blur">
          ZAKIA Maroc
        </motion.span>
        <SplitText as="h1" immediate delay={0.45} text="Le goût qui rassemble." className="font-display mt-6 text-[clamp(3rem,8.4vw,7.4rem)] font-semibold leading-[0.96] drop-shadow-[0_6px_30px_rgba(0,0,0,.35)]" />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 1 }} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/90 sm:text-lg">
          ZAKIA, des produits savoureux pour accompagner tous vos moments de partage.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 1.2 }} className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/produits" className="group inline-flex items-center gap-3 rounded-full bg-cream px-7 py-4 text-sm font-bold text-zred shadow-[0_18px_40px_-12px_rgba(0,0,0,.5)] transition hover:scale-[1.04]">
            Découvrir nos produits <ArrowRight size={18} className="transition group-hover:translate-x-1" />
          </Link>
          <Link to="/univers" className="inline-flex items-center gap-3 rounded-full border-2 border-white/50 px-7 py-4 text-sm font-bold backdrop-blur transition hover:bg-white hover:text-zred">
            Découvrir notre univers
          </Link>
        </motion.div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-[25] h-[9vh] min-h-14 rounded-t-[50%] bg-cream shadow-[0_-18px_40px_-10px_rgba(60,5,5,.45)]" />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-3 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-zred/70 lg:flex">
        Défiler <ArrowDown size={13} className="animate-bounce" />
      </motion.div>
    </section>
  )
}
