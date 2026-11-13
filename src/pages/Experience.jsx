import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SplitText, Eyebrow, Reveal, useDocTitle } from '../components/motion'
import { P, F } from '../lib/img'

const scenes = [
  { id: 'breakfast', label: 'Petit-déjeuner', title: 'La table du matin', text: 'Pain grillé, confitures et margarine : le petit-déjeuner qui réveille la maison.', food: 'tartines-confiture', bg: '#f7d6a5', prods: [['confiture-abricot', 'left-[6%] bottom-[-6%] h-[62%] -rotate-6'], ['tartine-cuisson', 'right-[2%] bottom-[2%] w-[34%] rotate-3'], ['confiture-fraise', 'right-[30%] bottom-[-8%] h-[56%] rotate-6']] },
  { id: 'sandwich', label: 'Sandwichs & burgers', title: 'Des sauces qui font la différence', text: 'Samouraï, Algérienne, Barbecue… relevez wraps, burgers et grillades.', food: 'wrap-samourai', bg: '#f5b183', prods: [['sauce-samourai', 'left-[4%] bottom-[-6%] h-[64%] -rotate-6'], ['sauce-algerienne', 'right-[3%] bottom-[-8%] h-[64%] rotate-6'], ['sauce-barbecue', 'right-[28%] bottom-[-10%] h-[52%] rotate-2']] },
  { id: 'baking', label: 'Pâtisserie', title: 'Le plaisir de pâtisser', text: 'Margarine pâtissière, levure, amidon et crème : tout pour réussir vos gâteaux.', food: 'cake-glace', bg: '#f4e08c', prods: [['margarine-patissiere', 'left-[3%] bottom-[2%] w-[34%] -rotate-3'], ['creme-patissiere', 'right-[4%] bottom-[-8%] h-[72%] rotate-3'], ['levure-patissiere', 'right-[28%] bottom-[-10%] h-[62%] -rotate-3']] },
  { id: 'fresh', label: 'Salades & poisson', title: 'Frais et savoureux', text: 'Thon et maquereaux riches en oméga 3, mayonnaise onctueuse, vinaigre pour assaisonner.', food: 'salade', bg: '#bcd8c4', prods: [['thon', 'left-[3%] bottom-[0%] w-[34%] -rotate-4'], ['mayonnaise', 'right-[5%] bottom-[-8%] h-[66%] rotate-4'], ['vinaigre', 'right-[28%] bottom-[-6%] h-[54%] -rotate-2']] },
  { id: 'family', label: 'Cuisine de famille', title: 'Au cœur de la cuisine', text: 'Concentré de tomates, ketchup, moutarde : les indispensables du quotidien.', food: 'sauce-tomate', bg: '#f1a7a0', prods: [['ketchup-tomato', 'left-[6%] bottom-[-8%] h-[66%] -rotate-4'], ['concentre-tomates', 'right-[4%] bottom-[-4%] h-[60%] rotate-3'], ['moutarde-dijon', 'right-[30%] bottom-[-8%] h-[52%] -rotate-3']] },
]

function Scene({ s, i }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const prodY = useTransform(scrollYProgress, [0, 1], [70, -70])
  const flip = i % 2 === 1
  return (
    <section ref={ref} id={s.id} className="relative px-4 py-10 sm:px-6">
      <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-[3rem] md:min-h-[78vh] md:grid-cols-2" style={{ background: s.bg }}>
        <div className={`relative z-10 flex flex-col justify-center p-8 sm:p-14 ${flip ? 'md:order-2' : ''}`}>
          <Eyebrow>{s.label}</Eyebrow>
          <SplitText text={s.title} className="font-display mt-4 text-4xl font-semibold leading-[1.02] sm:text-6xl" />
          <Reveal delay={0.2}><p className="mt-5 max-w-md text-lg text-ink/75">{s.text}</p></Reveal>
        </div>
        <div className={`relative min-h-[420px] overflow-hidden ${flip ? 'md:order-1' : ''}`}>
          <motion.img src={F(s.food)} alt={s.title} loading="lazy" style={{ y: imgY }} className="absolute inset-0 h-[124%] w-full -translate-y-[10%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent" />
          <motion.div style={{ y: prodY }} className="absolute inset-0">
            {s.prods.map(([slug, cls], k) => (
              <motion.img
                key={slug}
                src={P(slug)}
                alt=""
                aria-hidden
                loading="lazy"
                initial={{ opacity: 0, y: 90, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 1, delay: 0.2 + k * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute w-auto drop-shadow-[0_25px_25px_rgba(0,0,0,.4)] ${cls}`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function Experience() {
  useDocTitle('Expérience')
  return (
    <>
      <section className="relative overflow-hidden pb-16 pt-40 text-center">
        <div className="dots absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-5xl px-6">
          <Eyebrow>Brand experience</Eyebrow>
          <SplitText as="h1" immediate text="ZAKIA, dans la vraie vie." className="font-display mt-5 text-6xl font-semibold leading-[0.98] sm:text-8xl" />
          <p className="mx-auto mt-6 max-w-xl text-lg text-ink/70">Cinq scènes, cinq façons de goûter ZAKIA : des tables de famille aux grandes envies de pâtisserie.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {scenes.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="rounded-full border-2 border-ink/10 px-4 py-2 text-xs font-bold transition hover:bg-ink hover:text-cream">{s.label}</a>
            ))}
          </div>
        </div>
      </section>

      {scenes.map((s, i) => <Scene key={s.id} s={s} i={i} />)}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">Pour les pros aussi</h2>
          <p className="mt-3 max-w-xl text-ink/70">Les sauces ZAKIA existent aussi en format seau, pour la restauration et les grandes tablées.</p>
        </div>
        <div className="no-scrollbar mt-10 flex gap-6 overflow-x-auto px-6 pb-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          {['seau-algerienne', 'seau-andalouse', 'seau-biggy-burger', 'seau-fajitas', 'seau-ketchup', 'seau-moutarde', 'seau-samourai'].map((s, i) => (
            <Reveal key={s} delay={i * 0.05} className="shrink-0">
              <img src={P(s)} alt="" loading="lazy" className="h-64 w-64 object-contain transition duration-500 hover:-translate-y-3 hover:rotate-3 sm:h-80 sm:w-80" />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/produits" className="group inline-flex items-center gap-3 rounded-full bg-zred px-8 py-4 text-sm font-bold text-white transition hover:bg-zred-dark">Découvrir la gamme <ArrowRight size={18} className="transition group-hover:translate-x-1" /></Link>
        </div>
      </section>
    </>
  )
}
