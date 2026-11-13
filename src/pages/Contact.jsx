import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react'
import Instagram from '../components/Instagram'
import { SplitText, Eyebrow, Reveal, useDocTitle } from '../components/motion'
import { site } from '../data/site'
import { P } from '../lib/img'

const field = 'w-full rounded-2xl border-2 border-ink/10 bg-white px-5 py-4 text-sm outline-none transition focus:border-zred focus:shadow-[0_0_0_4px_rgba(200,22,29,.12)]'

export default function Contact() {
  useDocTitle('Contact')
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    if (site.email) {
      const body = `${d.get('message')}\n\n— ${d.get('name')} (${d.get('email')})`
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(d.get('subject') || 'Contact ZAKIA')}&body=${encodeURIComponent(body)}`
    }
    setSent(true)
  }

  const cards = [
    site.phones.length > 0 && { icon: Phone, t: 'Téléphone', v: site.phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block hover:text-zred">{p}</a>) },
    site.email && { icon: Mail, t: 'Email', v: <a href={`mailto:${site.email}`} className="hover:text-zred">{site.email}</a> },
    site.address && { icon: MapPin, t: 'Adresse', v: site.address },
    { icon: Instagram, t: 'Instagram', v: <a href={site.instagram} target="_blank" rel="noreferrer" className="hover:text-zred">{site.instagramHandle}</a> },
  ].filter(Boolean)

  return (
    <>
      <section className="relative overflow-hidden pb-10 pt-40">
        <div className="dots absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-6">
          <Eyebrow>Contact</Eyebrow>
          <SplitText as="h1" immediate text="Parlons-nous." className="font-display mt-5 text-6xl font-semibold leading-[0.98] sm:text-8xl" />
          <p className="mt-6 max-w-xl text-lg text-ink/70">Une question, une envie de collaboration, un avis sur nos produits ? Écrivez-nous.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-28 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08}>
              <div className="flex items-center gap-5 rounded-[2rem] bg-white p-6 shadow-[0_20px_40px_-25px_rgba(90,30,20,.35)]">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zred text-white"><c.icon size={24} /></span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-ink/45">{c.t}</p>
                  <div className="mt-1 text-lg font-semibold">{c.v}</div>
                </div>
              </div>
            </Reveal>
          ))}
          {!site.phones.length && !site.email && !site.address && (
            <Reveal delay={0.3}>
              <p className="rounded-[2rem] bg-cream-2 p-6 text-sm text-ink/65">Retrouvez-nous et écrivez-nous en message direct sur Instagram : c’est le moyen le plus rapide de joindre l’équipe ZAKIA.</p>
            </Reveal>
          )}
          <Reveal delay={0.4}>
            <div className="relative h-56 overflow-hidden rounded-[2rem] bg-zred">
              <img src={P('sauce-samourai')} alt="" aria-hidden className="absolute -bottom-6 left-[10%] h-[120%] -rotate-6" loading="lazy" />
              <img src={P('ketchup-tomato')} alt="" aria-hidden className="absolute -bottom-10 left-[38%] h-[120%] rotate-3" loading="lazy" />
              <img src={P('sauce-algerienne')} alt="" aria-hidden className="absolute -bottom-6 right-[8%] h-[120%] rotate-6" loading="lazy" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <form onSubmit={submit} className="relative rounded-[2.5rem] bg-white p-8 shadow-[0_30px_70px_-35px_rgba(90,30,20,.45)] sm:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <CheckCircle2 size={64} className="text-zgreen" />
                  <h2 className="font-display mt-5 text-4xl font-semibold">Merci !</h2>
                  <p className="mt-2 max-w-xs text-ink/65">Votre message est prêt. {site.email ? 'Votre application mail s’est ouverte pour l’envoyer.' : 'Pour une réponse rapide, écrivez-nous aussi sur Instagram.'}</p>
                  <button type="button" onClick={() => setSent(false)} className="mt-6 text-sm font-bold text-zred underline">Écrire un autre message</button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <h2 className="font-display text-3xl font-semibold">Envoyez-nous un message</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block"><span className="sr-only">Nom</span><input required name="name" placeholder="Votre nom" className={field} /></label>
                    <label className="block"><span className="sr-only">Email</span><input required type="email" name="email" placeholder="Votre email" className={field} /></label>
                  </div>
                  <label className="block"><span className="sr-only">Sujet</span><input name="subject" placeholder="Sujet" className={field} /></label>
                  <label className="block"><span className="sr-only">Message</span><textarea required name="message" rows={6} placeholder="Votre message" className={`${field} resize-none`} /></label>
                  <button className="group inline-flex items-center gap-3 rounded-full bg-zred px-8 py-4 text-sm font-bold text-white transition hover:bg-zred-dark">
                    Envoyer <Send size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </section>
    </>
  )
}
