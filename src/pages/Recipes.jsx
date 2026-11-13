import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ArrowUpRight } from 'lucide-react'
import RecipeModal from '../components/RecipeModal'
import { SplitText, Eyebrow, useDocTitle, ease } from '../components/motion'
import { recipes } from '../data/recipes'
import { F } from '../lib/img'

const tags = ['Toutes', ...Array.from(new Set(recipes.map((r) => r.tag)))]

export default function Recipes() {
  useDocTitle('Recettes & inspiration')
  const [tag, setTag] = useState('Toutes')
  const [open, setOpen] = useState(null)
  const list = tag === 'Toutes' ? recipes : recipes.filter((r) => r.tag === tag)

  return (
    <>
      <section className="relative overflow-hidden pb-14 pt-40">
        <div className="dots absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Eyebrow>Recettes & inspiration</Eyebrow>
          <SplitText as="h1" immediate text="À table, tout le monde !" className="font-display mt-5 max-w-4xl text-6xl font-semibold leading-[0.98] sm:text-8xl" />
          <p className="mt-6 max-w-xl text-lg text-ink/70">Petits-déjeuners, sandwichs, repas en famille, salades et pâtisseries : des idées simples à préparer avec les produits ZAKIA.</p>
          <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-2">
            {tags.map((t) => (
              <button key={t} onClick={() => setTag(t)} className="relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold">
                {tag === t && <motion.span layoutId="tag-pill" className="absolute inset-0 rounded-full bg-zgreen-dark" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className={`relative ${tag === t ? 'text-white' : 'text-ink/70'}`}>{t}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28">
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((r, i) => (
              <motion.button
                key={r.id}
                layout
                onClick={() => setOpen(r)}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, ease, delay: Math.min(i, 6) * 0.05 }}
                className="group relative text-left"
              >
                <motion.div layoutId={`recipe-${r.id}`} className={`relative overflow-hidden rounded-[2rem] ${i % 5 === 0 ? 'aspect-[4/5]' : 'aspect-[5/6]'}`}>
                  <img src={F(r.img)} alt={r.title} loading="lazy" className="h-full w-full object-cover transition duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
                  <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-zred"><Clock size={12} /> {r.time}</span>
                  <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-zred text-white opacity-0 transition group-hover:opacity-100"><ArrowUpRight size={18} /></span>
                  <div className="absolute inset-x-5 bottom-5 text-white">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-white/75">{r.tag}</p>
                    <h3 className="font-display text-3xl font-semibold leading-tight">{r.title}</h3>
                  </div>
                </motion.div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
        <p className="mt-14 text-center text-xs text-ink/50">Idées de préparation à titre d’inspiration ; temps indicatifs.</p>
      </section>

      <AnimatePresence>{open && <RecipeModal recipe={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  )
}
