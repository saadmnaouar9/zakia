import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Instagram from './Instagram'
import { LOGO } from '../lib/img'
import { site } from '../data/site'
import { ease } from './motion'

export const links = [
  { to: '/', label: 'Accueil' },
  { to: '/produits', label: 'Produits' },
  { to: '/univers', label: 'À propos' },
  { to: '/recettes', label: 'Recettes' },
  { to: '/experience', label: 'Expérience' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const solid = true

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? 'py-2' : 'py-4'}`}
      >
        <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2 transition-all duration-500 sm:px-6 ${solid ? 'mx-3 bg-cream/85 shadow-[0_10px_40px_-12px_rgba(90,30,20,.25)] backdrop-blur-xl lg:mx-auto' : 'bg-transparent'}`}>
          <Link to="/" aria-label="ZAKIA Maroc — accueil" className="flex items-center">
            <img src={LOGO} alt="ZAKIA" className="h-12 w-auto sm:h-14" />
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className="relative px-4 py-2 text-sm font-semibold">
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-zred" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                    )}
                    <span className={`relative transition-colors ${isActive ? 'text-white' : 'text-ink hover:text-zred'}`}>{l.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hidden h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition hover:bg-ink hover:text-cream sm:flex">
              <Instagram size={18} />
            </a>
            <button onClick={() => setOpen(true)} aria-label="Ouvrir le menu" className="flex h-11 w-11 items-center justify-center rounded-full bg-zred text-white lg:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-zred text-white"
            initial={{ clipPath: 'circle(0% at 90% 5%)' }}
            animate={{ clipPath: 'circle(150% at 90% 5%)' }}
            exit={{ clipPath: 'circle(0% at 90% 5%)' }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <img src={LOGO} alt="ZAKIA" className="h-14 w-auto" />
              <button onClick={() => setOpen(false)} aria-label="Fermer le menu" className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-zred">
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {links.map((l, i) => (
                <motion.div key={l.to} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease }}>
                  <Link to={l.to} className="font-display text-5xl font-semibold leading-tight">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="px-8 pb-8 text-sm text-white/80">{site.instagramHandle}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
