import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Plus } from 'lucide-react'
import { P } from '../lib/img'
import { catLabel, catTint } from '../data/products'
import { ease } from './motion'

/** Interactive product tile with 3D tilt. The packaging image is never altered. */
export default function ProductCard({ product, onOpen, index = 0 }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 160, damping: 18 })
  const sy = useSpring(my, { stiffness: 160, damping: 18 })
  const rotY = useTransform(sx, [-0.5, 0.5], [-9, 9])
  const rotX = useTransform(sy, [-0.5, 0.5], [9, -9])
  const imgX = useTransform(sx, [-0.5, 0.5], [-10, 10])

  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const leave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.button
      ref={ref}
      layout
      onClick={() => onOpen(product)}
      onMouseMove={move}
      onMouseLeave={leave}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, ease, delay: Math.min(index, 8) * 0.04 }}
      style={{ perspective: 900 }}
      className="group relative text-left"
      aria-label={`Voir ${product.name}`}
    >
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, background: `radial-gradient(circle at 50% 40%, #fffaf0 0%, ${catTint(product.cat)} 140%)` }}
        className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_20px_50px_-25px_rgba(90,30,20,.45)] transition-shadow duration-500 group-hover:shadow-[0_35px_70px_-25px_rgba(160,20,25,.5)]"
      >
        <div className="absolute inset-x-8 bottom-6 h-6 rounded-[50%] bg-ink/25 blur-xl" />
        <motion.img
          src={P(product.img)}
          alt={product.name}
          loading="lazy"
          style={{ x: imgX }}
          className="absolute inset-0 m-auto h-[82%] w-[82%] object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-1"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-zred backdrop-blur">
          {catLabel(product.cat)}
        </span>
        <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-zred text-white opacity-0 shadow-lg transition duration-500 group-hover:opacity-100 group-hover:rotate-90">
          <Plus size={20} />
        </span>
      </motion.div>
      <div className="px-2 pt-4">
        <h3 className="font-display text-xl font-semibold leading-tight">{product.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-ink/65">{product.short}</p>
        <span className="mt-2 inline-block text-xs font-bold uppercase tracking-widest text-zred underline-offset-4 group-hover:underline">Voir les détails</span>
      </div>
    </motion.button>
  )
}
