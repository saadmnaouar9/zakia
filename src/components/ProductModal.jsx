import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X, ArrowRight, Check } from 'lucide-react'
import { P } from '../lib/img'
import { catLabel, catTint } from '../data/products'
import { ease } from './motion'

export default function ProductModal({ product, onClose }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', k)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[75] flex items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      data-lenis-prevent
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 80, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.6, ease }}
        className="relative grid max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-[2rem] bg-cream shadow-2xl sm:rounded-[2.5rem] md:grid-cols-2"
      >
        <button onClick={onClose} aria-label="Fermer" className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition hover:rotate-90">
          <X size={20} />
        </button>
        <div className="relative flex aspect-square items-center justify-center md:aspect-auto md:min-h-[520px]" style={{ background: `radial-gradient(circle at 50% 45%, #fffaf0 0%, ${catTint(product.cat)} 150%)` }}>
          <div className="absolute inset-x-16 bottom-10 h-8 rounded-[50%] bg-ink/25 blur-2xl" />
          <motion.img
            key={product.id}
            src={P(product.img)}
            alt={product.name}
            initial={{ scale: 0.85, opacity: 0, rotate: -4 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
            className="relative h-[82%] w-[82%] object-contain mix-blend-multiply"
          />
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-zred">{catLabel(product.cat)}</span>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">{product.name}</h2>
          {product.ar && <p dir="rtl" className="mt-2 text-xl text-ink/60">{product.ar}</p>}
          <p className="mt-5 text-base leading-relaxed text-ink/75">{product.short}</p>
          {product.facts.length > 0 && (
            <ul className="mt-6 space-y-2">
              {product.facts.map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm font-semibold">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zgreen text-white"><Check size={14} /></span>
                  {f}
                </li>
              ))}
            </ul>
          )}
          <Link to={`/produits/${product.id}`} className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-zred px-7 py-4 text-sm font-bold text-white transition hover:bg-zred-dark">
            Voir la fiche produit
            <ArrowRight size={18} className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}
