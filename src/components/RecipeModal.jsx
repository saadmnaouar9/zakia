import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X, Clock } from 'lucide-react'
import { F, P } from '../lib/img'
import { bySlug } from '../data/products'
import { ease } from './motion'

export default function RecipeModal({ recipe, onClose }) {
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
    <motion.div className="fixed inset-0 z-[75] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} data-lenis-prevent>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={recipe.title}
        layoutId={`recipe-${recipe.id}`}
        onClick={(e) => e.stopPropagation()}
        transition={{ duration: 0.7, ease }}
        className="relative grid max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-t-[2rem] bg-cream shadow-2xl sm:rounded-[2.5rem] md:grid-cols-[1fr_1.1fr]"
      >
        <button onClick={onClose} aria-label="Fermer" className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition hover:rotate-90">
          <X size={20} />
        </button>
        <div className="relative min-h-[260px] md:min-h-[560px]">
          <img src={F(recipe.img)} alt={recipe.title} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          <div className="absolute bottom-5 left-5 flex gap-2">
            {recipe.products.map((id) => (
              <img key={id} src={P(bySlug[id].img)} alt={bySlug[id].name} className="h-20 w-20 rounded-2xl bg-white/90 object-contain p-1.5 mix-blend-normal shadow-lg" />
            ))}
          </div>
        </div>
        <div className="p-8 sm:p-10">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-zred">
            {recipe.tag}
            <span className="flex items-center gap-1 rounded-full bg-zred/10 px-3 py-1"><Clock size={13} /> {recipe.time}</span>
          </div>
          <h2 className="mt-3 font-display text-4xl font-semibold leading-[1.05]">{recipe.title}</h2>
          <p className="mt-4 text-ink/70">{recipe.intro}</p>
          <h3 className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-ink/50">Ingrédients</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {recipe.ingredients.map((i) => (
              <li key={i} className="rounded-full bg-cream-2 px-4 py-1.5 text-sm font-semibold">{i}</li>
            ))}
          </ul>
          <h3 className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-ink/50">Préparation</h3>
          <ol className="mt-3 space-y-3">
            {recipe.steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zred font-display text-sm font-bold text-white">{i + 1}</span>
                <span className="pt-1 text-sm leading-relaxed text-ink/80">{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-wrap gap-2">
            {recipe.products.map((id) => (
              <Link key={id} to={`/produits/${id}`} className="rounded-full border border-zred/30 px-4 py-2 text-xs font-bold text-zred transition hover:bg-zred hover:text-white">
                {bySlug[id].name}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
