import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import { SplitText, Eyebrow, Reveal, useDocTitle } from '../components/motion'
import { categories, products } from '../data/products'
import { P } from '../lib/img'

export default function Products() {
  useDocTitle('Nos produits')
  const [params, setParams] = useSearchParams()
  const cat = categories.some((c) => c.id === params.get('cat')) ? params.get('cat') : 'all'
  const [open, setOpen] = useState(null)

  const list = useMemo(() => (cat === 'all' ? products : products.filter((p) => p.cat === cat)), [cat])
  const counts = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c.id === 'all' ? products.length : products.filter((p) => p.cat === c.id).length])), [])

  return (
    <>
      <section className="relative overflow-hidden bg-zred pb-20 pt-40 text-white grain">
        <div className="dots absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Eyebrow className="!text-white"><span className="sr-only">—</span>Le catalogue</Eyebrow>
          <SplitText as="h1" immediate text="Nos produits" className="font-display mt-4 text-6xl font-semibold leading-none sm:text-8xl" />
          <p className="mt-5 max-w-lg text-lg text-white/85">Margarines, sauces, confitures, conserves, charcuterie de volaille et pâtisserie : toute la gamme ZAKIA.</p>
        </div>
        <motion.img initial={{ opacity: 0, x: 100, rotate: 30 }} animate={{ opacity: 1, x: 0, rotate: 10 }} transition={{ duration: 1.2, delay: 0.6 }} src={P('sauce-barbecue')} alt="" aria-hidden className="absolute -bottom-10 right-[6%] hidden h-[88%] drop-shadow-2xl lg:block" />
        <motion.img initial={{ opacity: 0, x: 100, rotate: -30 }} animate={{ opacity: 1, x: 0, rotate: -8 }} transition={{ duration: 1.2, delay: 0.8 }} src={P('confiture-fraise')} alt="" aria-hidden className="absolute -bottom-8 right-[22%] hidden h-[74%] drop-shadow-2xl xl:block" />
      </section>

      <div className="sticky top-16 z-30 border-b border-ink/10 bg-cream/90 backdrop-blur-xl">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-4" role="tablist" aria-label="Catégories">
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={cat === c.id}
              onClick={() => setParams(c.id === 'all' ? {} : { cat: c.id }, { preventScrollReset: true })}
              className="relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold"
            >
              {cat === c.id && <motion.span layoutId="cat-pill" className="absolute inset-0 rounded-full bg-zred" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <span className={`relative flex items-center gap-2 transition-colors ${cat === c.id ? 'text-white' : 'text-ink/70 hover:text-ink'}`}>
                {c.label}
                <span className={`text-[10px] ${cat === c.id ? 'text-white/70' : 'text-ink/40'}`}>{counts[c.id]}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <motion.div layout className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onOpen={setOpen} />
            ))}
          </AnimatePresence>
        </motion.div>
        <Reveal className="mt-20 rounded-[2rem] bg-cream-2 p-8 text-center text-sm text-ink/60">
          Visuels produits ZAKIA présentés tels quels, sans modification de l’emballage, du logo ou des couleurs.
        </Reveal>
      </section>

      <AnimatePresence>{open && <ProductModal product={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </>
  )
}
