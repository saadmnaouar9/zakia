import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Instagram from '../components/Instagram'
import Hero from '../components/Hero'
import { Reveal, SplitText, Eyebrow, Parallax, useDocTitle } from '../components/motion'
import { P, F } from '../lib/img'
import { categories, bySlug, catTint } from '../data/products'
import { recipes } from '../data/recipes'
import { site } from '../data/site'

const tiles = [
  { cat: 'sauces', img: 'sauce-samourai', cls: 'md:col-span-2 md:row-span-2', rot: -6 },
  { cat: 'margarines', img: 'tartine-cuisson', cls: '', rot: 4 },
  { cat: 'ketchup', img: 'ketchup-tomato', cls: '', rot: -4 },
  { cat: 'confitures', img: 'confiture-abricot', cls: '', rot: 5 },
  { cat: 'miel', img: 'miel', cls: '', rot: -3 },
  { cat: 'conserves', img: 'thon', cls: 'md:col-span-2', rot: -4 },
  { cat: 'charcuterie', img: 'luncheon', cls: '', rot: 14 },
  { cat: 'patisserie', img: 'creme-patissiere', cls: '', rot: -4 },
]

const featured = ['sauce-samourai', 'ketchup-tomato', 'confiture-fraise', 'tartine-cuisson', 'mayonnaise', 'sauce-barbecue', 'margarine-patissiere', 'thon']

const moments = [
  { t: 'Le matin', h: 'Tartines & douceurs', d: 'Confitures, miel et margarine pour un petit-déjeuner qui réunit toute la famille.', food: 'tartines-confiture', prod: 'confiture-fraise' },
  { t: 'Le midi', h: 'Sandwichs & wraps', d: 'Sauces relevées et charcuterie de volaille pour des sandwichs généreux.', food: 'wrap-samourai', prod: 'sauce-samourai' },
  { t: 'Le goûter', h: 'Pâtisseries maison', d: 'Margarine pâtissière, levure et crème pour des gâteaux faits avec amour.', food: 'cake-glace', prod: 'creme-patissiere' },
  { t: 'Le soir', h: 'Tables partagées', d: 'Salades, conserves de poisson et sauces pour des dîners simples et savoureux.', food: 'salade', prod: 'thon' },
]

function Marquee() {
  const words = categories.filter((c) => c.id !== 'all').map((c) => c.label)
  const row = [...words, ...words]
  return (
    <div className="overflow-hidden bg-zred py-5 text-white">
      <div className="marquee flex w-max gap-10 whitespace-nowrap">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="font-display flex items-center gap-10 text-3xl font-semibold sm:text-4xl">
            {w} <span className="text-sun">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function FeatureCard({ id }) {
  const p = bySlug[id]
  return (
    <Link to={`/produits/${id}`} className="group relative block h-[62vh] w-[78vw] shrink-0 overflow-hidden rounded-[2.5rem] sm:w-[44vw] md:h-[68vh] md:w-[30vw]" style={{ background: `radial-gradient(circle at 50% 40%, #fffaf0, ${catTint(p.cat)} 140%)` }}>
      <img src={P(p.img)} alt={p.name} loading="lazy" className="absolute inset-0 m-auto h-[72%] w-[80%] object-contain mix-blend-multiply transition duration-700 group-hover:scale-110 group-hover:-rotate-2" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-zred">{categories.find((c) => c.id === p.cat)?.label}</p>
          <h3 className="font-display text-2xl font-semibold leading-tight">{p.name}</h3>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-zred text-white transition group-hover:translate-x-1"><ArrowRight size={18} /></span>
      </div>
    </Link>
  )
}

function PinnedShowcase() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-62%'])
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 pt-28">
        <Eyebrow>Sélection</Eyebrow>
        <SplitText text="Des incontournables, du flacon à la boîte." className="font-display mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-6xl" />
      </div>
      {/* desktop: pinned horizontal scroll */}
      <div ref={ref} className="relative hidden h-[300vh] md:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 pl-[8vw] pr-[20vw]">
            {featured.map((id) => <FeatureCard key={id} id={id} />)}
          </motion.div>
        </div>
      </div>
      {/* mobile: native swipe */}
      <div className="no-scrollbar mt-10 flex snap-x gap-5 overflow-x-auto px-6 pb-4 md:hidden">
        {featured.map((id) => <div key={id} className="snap-center"><FeatureCard id={id} /></div>)}
      </div>
    </section>
  )
}

function Moments() {
  return (
    <section className="relative bg-cream-2/60 py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <Eyebrow>Du matin au soir</Eyebrow>
          <SplitText text="Chaque moment a son goût." className="font-display mt-4 text-5xl font-semibold leading-[1.02] sm:text-7xl" />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-lg text-ink/70">Petit-déjeuner, sandwichs du midi, goûter ou dîner en famille : la gamme ZAKIA accompagne toute la journée.</p>
            <Link to="/experience" className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-bold text-cream transition hover:bg-zred">
              Vivre l’expérience <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <div className="space-y-10">
          {moments.map((m, i) => (
            <Reveal key={m.t} y={70} scale={0.96}>
              <article className="group relative overflow-hidden rounded-[2.5rem] bg-white shadow-[0_30px_60px_-30px_rgba(90,30,20,.35)]">
                <div className="relative h-72 overflow-hidden sm:h-80">
                  <Parallax speed={30} className="absolute -inset-10">
                    <img src={F(m.food)} alt={m.h} loading="lazy" className="h-full w-full object-cover" />
                  </Parallax>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute left-6 top-6 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-zred">0{i + 1} · {m.t}</span>
                  <img src={P(bySlug[m.prod].img)} alt="" aria-hidden className="absolute -bottom-4 right-6 h-44 w-auto -rotate-6 drop-shadow-[0_20px_20px_rgba(0,0,0,.35)] transition duration-700 group-hover:-translate-y-3 group-hover:rotate-0 sm:h-52" />
                </div>
                <div className="p-7 pr-40">
                  <h3 className="font-display text-3xl font-semibold">{m.h}</h3>
                  <p className="mt-2 text-ink/70">{m.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useDocTitle('')
  return (
    <>
      <Hero />
      <Marquee />

      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Nos univers</Eyebrow>
            <SplitText text="Une gamme pour toute la table." className="font-display mt-4 max-w-2xl text-4xl font-semibold leading-[1.05] sm:text-6xl" />
          </div>
          <Link to="/produits" className="group inline-flex items-center gap-2 text-sm font-bold text-zred">Tout le catalogue <ArrowRight size={16} className="transition group-hover:translate-x-1" /></Link>
        </div>
        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 md:auto-rows-[240px] md:grid-cols-4">
          {tiles.map((t, i) => {
            const c = categories.find((x) => x.id === t.cat)
            return (
              <Reveal key={t.cat} delay={(i % 4) * 0.06} y={50} className={t.cls}>
                <Link to={`/produits?cat=${t.cat}`} className="group relative block h-full overflow-hidden rounded-[2rem]" style={{ background: `radial-gradient(circle at 60% 40%, #fffaf0, ${c.tint} 130%)` }}>
                  <img src={P(t.img)} alt="" aria-hidden loading="lazy" style={{ rotate: `${t.rot}deg` }} className="absolute bottom-0 right-2 h-[88%] w-auto max-w-[75%] object-contain mix-blend-multiply transition duration-700 ease-out group-hover:scale-110 group-hover:rotate-0" />
                  <div className="absolute left-5 top-5">
                    <h3 className="font-display text-2xl font-semibold sm:text-3xl">{c.label}</h3>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-zred opacity-70 transition group-hover:opacity-100">Explorer <ArrowRight size={13} /></span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>

      <PinnedShowcase />
      <Moments />

      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Recettes & inspiration</Eyebrow>
            <SplitText text="Envie de cuisiner ?" className="font-display mt-4 text-4xl font-semibold sm:text-6xl" />
          </div>
          <Link to="/recettes" className="group inline-flex items-center gap-2 text-sm font-bold text-zred">Toutes les recettes <ArrowRight size={16} className="transition group-hover:translate-x-1" /></Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[recipes[2], recipes[4], recipes[9]].map((r, i) => (
            <Reveal key={r.id} delay={i * 0.1} y={60}>
              <Link to="/recettes" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                  <img src={F(r.img)} alt={r.title} loading="lazy" className="h-full w-full object-cover transition duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-zred">{r.time}</span>
                  <h3 className="font-display absolute bottom-5 left-5 right-5 text-3xl font-semibold leading-tight text-white">{r.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6">
        <Reveal scale={0.97}>
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[3rem] bg-zgreen-dark px-8 py-20 text-center text-white grain sm:px-16">
            <img src={P('sauce-algerienne')} alt="" aria-hidden className="absolute -left-6 bottom-[-20%] hidden h-[90%] -rotate-12 opacity-90 lg:block" />
            <img src={P('mayonnaise')} alt="" aria-hidden className="absolute -right-4 bottom-[-20%] hidden h-[90%] rotate-12 opacity-90 lg:block" />
            <div className="relative">
              <h2 className="font-display mx-auto max-w-2xl text-4xl font-semibold leading-tight sm:text-6xl">Rejoignez la table ZAKIA.</h2>
              <p className="mx-auto mt-4 max-w-lg text-white/80">Suivez nos idées, nos produits et nos moments de partage sur Instagram.</p>
              <a href={site.instagram} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-zgreen-dark transition hover:scale-105">
                <Instagram size={18} /> {site.instagramHandle}
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
