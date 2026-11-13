import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Instagram from './Instagram'
import { LOGO, P } from '../lib/img'
import { site } from '../data/site'
import { links } from './Navbar'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-zred-dark text-white grain">
      <img src={P('sauce-samourai')} alt="" aria-hidden className="pointer-events-none absolute -bottom-10 right-[4%] hidden w-44 rotate-12 opacity-25 blur-[1px] lg:block" loading="lazy" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <img src={LOGO} alt="ZAKIA" className="h-24 w-auto" />
          <p className="mt-6 max-w-sm font-display text-3xl leading-tight">Le goût qui rassemble.</p>
          <p className="mt-3 max-w-sm text-sm text-white/70">Des produits savoureux pour accompagner tous vos moments de partage.</p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">Explorer</h3>
          <ul className="mt-5 space-y-3">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="group inline-flex items-center gap-1 text-lg font-semibold">
                  {l.label}
                  <ArrowUpRight size={16} className="translate-y-0.5 opacity-0 transition group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">Suivez-nous</h3>
          <a href={site.instagram} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-bold text-zred transition hover:scale-105">
            <Instagram size={18} /> {site.instagramHandle}
          </a>
        </div>
      </div>
      <div className="relative border-t border-white/15 px-6 py-6 text-center text-xs text-white/60">
        © {new Date().getFullYear()} ZAKIA Maroc. Tous droits réservés. Les visuels produits sont la propriété de ZAKIA.
      </div>
    </footer>
  )
}
