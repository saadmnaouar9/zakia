import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, Layers, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react'
import { Reveal, SplitText, Eyebrow, Parallax, useDocTitle } from '../components/motion'
import { P, F, LOGO } from '../lib/img'

const pillars = [
  { icon: Sparkles, t: 'Une identité forte', d: 'Un logo reconnaissable, des couleurs chaudes et des emballages bilingues français / arabe, pensés pour la table marocaine.' },
  { icon: Layers, t: 'Une gamme variée', d: 'Margarines, sauces, ketchup, confitures, miel, conserves, charcuterie de volaille et produits de pâtisserie.' },
  { icon: ShieldCheck, t: 'Qualité & engagement', d: 'Des produits du quotidien conçus pour offrir du goût, de la fiabilité et de la constance à chaque repas.' },
  { icon: HeartHandshake, t: 'Des moments de partage', d: 'Du petit-déjeuner au dîner, ZAKIA accompagne les tables où l’on se retrouve.' },
]

const day = [
  { h: 'Matin', t: 'Le petit-déjeuner', d: 'Tartines, confitures, miel.', img: 'tartines-confiture', p: 'confiture-abricot' },
  { h: 'Midi', t: 'Sandwichs & wraps', d: 'Sauces, charcuterie de volaille.', img: 'wrap-algerienne', p: 'sauce-algerienne' },
  { h: 'Après-midi', t: 'Le goûter pâtissier', d: 'Margarine, levure, crème.', img: 'mille-feuille', p: 'margarine-patissiere' },
  { h: 'Soir', t: 'La table du soir', d: 'Salades, conserves, sauces.', img: 'salade', p: 'thon' },
]

export default function About() {
  useDocTitle('À propos')
  return (
    <>
      <section className="relative overflow-hidden bg-cream-2/70 pb-24 pt-40">
        <div className="dots absolute inset-0 opacity-50" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>À propos de ZAKIA</Eyebrow>
            <SplitText as="h1" immediate text="ZAKIA, le goût de partager." className="font-display mt-5 text-6xl font-semibold leading-[0.98] sm:text-8xl" />
            <Reveal delay={0.8}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink/75">ZAKIA, c’est une marque marocaine qui réunit les produits que l’on aime retrouver à table. Des saveurs simples, généreuses, faites pour être partagées en famille et entre amis.</p>
            </Reveal>
          </div>
          <Reveal delay={0.3} scale={0.9} className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 -rotate-6 rounded-[3rem] bg-zred" />
            <div className="relative flex aspect-[4/5] items-center justify-center rounded-[3rem] bg-cream shadow-2xl">
              <img src={LOGO} alt="ZAKIA" className="w-3/4" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={(i % 2) * 0.1} y={60}>
              <div className="group h-full rounded-[2rem] bg-white p-8 shadow-[0_25px_50px_-30px_rgba(90,30,20,.35)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_35px_60px_-25px_rgba(200,22,29,.35)]">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zred text-white transition group-hover:rotate-6"><p.icon size={26} /></span>
                <h3 className="font-display mt-6 text-3xl font-semibold">{p.t}</h3>
                <p className="mt-3 text-ink/70">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-zgreen-dark py-28 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <Eyebrow className="!text-sun">Au fil de la journée</Eyebrow>
          <SplitText text="Une journée de goût, du matin au soir." className="font-display mt-4 max-w-3xl text-5xl font-semibold leading-[1.02] sm:text-6xl" />
          <div className="relative mt-16">
            <div className="absolute left-4 top-0 hidden h-full w-px bg-white/25 md:left-1/2 md:block" />
            {day.map((d, i) => (
              <div key={d.h} className={`relative mb-16 grid items-center gap-8 md:grid-cols-2 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                <Reveal y={60}>
                  <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl">
                    <Parallax speed={25} className="aspect-[16/11]">
                      <img src={F(d.img)} alt={d.t} loading="lazy" className="h-[120%] w-full object-cover" />
                    </Parallax>
                    <img src={P(d.p)} alt="" aria-hidden className="absolute -bottom-2 right-4 h-36 w-auto drop-shadow-2xl" loading="lazy" />
                  </div>
                </Reveal>
                <Reveal delay={0.15} className={i % 2 ? 'md:pr-16 md:text-right' : 'md:pl-16'}>
                  <span className="absolute left-1/2 top-1/2 hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-sun bg-zgreen-dark md:block" />
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-sun">{d.h}</span>
                  <h3 className="font-display mt-2 text-4xl font-semibold">{d.t}</h3>
                  <p className="mt-2 text-white/75">{d.d}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28 text-center">
        <Reveal>
          <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">Une marque, deux langues, une même envie de partager.</h2>
          <p className="mx-auto mt-5 max-w-xl text-ink/70">Les emballages ZAKIA parlent français et arabe, pour que chacun s’y retrouve.</p>
        </Reveal>
        <div className="mt-14 flex items-end justify-center gap-4 sm:gap-8">
          {['mortadelle', 'margarine-patissiere', 'miel'].map((s, i) => (
            <motion.img key={s} src={P(s)} alt="" aria-hidden loading="lazy" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: i * 0.12 }} whileHover={{ y: -12, rotate: i === 1 ? 0 : i ? 4 : -4 }} className={`mix-blend-multiply ${i === 1 ? 'w-1/3' : 'w-1/4'} max-w-[260px]`} />
          ))}
        </div>
        <Link to="/produits" className="group mt-12 inline-flex items-center gap-3 rounded-full bg-zred px-8 py-4 text-sm font-bold text-white transition hover:bg-zred-dark">
          Voir toute la gamme <ArrowRight size={18} className="transition group-hover:translate-x-1" />
        </Link>
      </section>
    </>
  )
}
