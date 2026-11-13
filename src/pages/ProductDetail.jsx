import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { bySlug, products, catLabel, catTint } from '../data/products'
import { recipes } from '../data/recipes'
import { P, F } from '../lib/img'
import { Reveal, SplitText, ease, useDocTitle } from '../components/motion'

export default function ProductDetail() {
  const { slug } = useParams()
  const product = bySlug[slug]
  useDocTitle(product?.name)

  if (!product) {
    return (
      <section className="px-6 pb-32 pt-48 text-center">
        <h1 className="font-display text-5xl font-semibold">Produit introuvable</h1>
        <Link to="/produits" className="mt-8 inline-block rounded-full bg-zred px-7 py-4 text-sm font-bold text-white">Retour au catalogue</Link>
      </section>
    )
  }

  const idx = products.findIndex((p) => p.id === slug)
  const prev = products[(idx - 1 + products.length) % products.length]
  const next = products[(idx + 1) % products.length]
  const related = products.filter((p) => p.cat === product.cat && p.id !== slug).slice(0, 4)
  const usedIn = recipes.filter((r) => r.products.includes(slug))

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-32 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.6 }}
          className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[3rem]"
          style={{ background: `radial-gradient(circle at 50% 42%, #fffaf0, ${catTint(product.cat)} 150%)` }}
        >
          <div className="absolute inset-x-20 bottom-14 h-8 rounded-[50%] bg-ink/25 blur-2xl" />
          <motion.img
            src={P(product.img)}
            alt={product.name}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative h-[82%] w-[82%] object-contain mix-blend-multiply"
          />
        </motion.div>
        <div>
          <Link to={`/produits?cat=${product.cat}`} className="inline-flex items-center gap-2 text-sm font-bold text-zred"><ArrowLeft size={16} /> {catLabel(product.cat)}</Link>
          <SplitText as="h1" immediate delay={0.7} text={product.name} className="font-display mt-4 text-5xl font-semibold leading-[1.02] sm:text-7xl" />
          {product.ar && <p dir="rtl" className="mt-3 text-2xl text-ink/55">{product.ar}</p>}
          <Reveal delay={0.9}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/75">{product.short}</p>
            {product.facts.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-3">
                {product.facts.map((f) => (
                  <li key={f} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zgreen text-white"><Check size={12} /></span>
                    {f}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-10 flex gap-3">
              <Link to={`/produits/${prev.id}`} className="flex items-center gap-2 rounded-full border-2 border-ink/15 px-5 py-3 text-sm font-bold transition hover:bg-ink hover:text-cream"><ArrowLeft size={16} /> Précédent</Link>
              <Link to={`/produits/${next.id}`} className="flex items-center gap-2 rounded-full bg-zred px-5 py-3 text-sm font-bold text-white transition hover:bg-zred-dark">Suivant <ArrowRight size={16} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      {usedIn.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <h2 className="font-display text-4xl font-semibold">En cuisine avec ce produit</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {usedIn.map((r) => (
              <Reveal key={r.id}>
                <Link to="/recettes" className="group relative block aspect-[16/10] overflow-hidden rounded-[2rem]">
                  <img src={F(r.img)} alt={r.title} loading="lazy" className="h-full w-full object-cover transition duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="font-display absolute bottom-4 left-5 text-2xl font-semibold text-white">{r.title}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-cream-2/60 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-display text-4xl font-semibold">Dans la même gamme</h2>
            <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
              {related.map((p) => (
                <Reveal key={p.id}>
                  <Link to={`/produits/${p.id}`} className="group block">
                    <div className="relative aspect-square overflow-hidden rounded-[2rem]" style={{ background: `radial-gradient(circle, #fffaf0, ${catTint(p.cat)} 150%)` }}>
                      <img src={P(p.img)} alt={p.name} loading="lazy" className="absolute inset-0 m-auto h-[80%] w-[80%] object-contain mix-blend-multiply transition duration-700 group-hover:scale-110" />
                    </div>
                    <h3 className="mt-3 font-display text-lg font-semibold">{p.name}</h3>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
