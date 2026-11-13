import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Recipes from './pages/Recipes'
import Experience from './pages/Experience'
import Contact from './pages/Contact'
import { LOGO } from './lib/img'
import { ease } from './components/motion'

function Page({ children }) {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {children}
      {/* curtain: covers the screen on exit, lifts away on enter */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-zred"
        initial={{ y: '0%' }}
        animate={{ y: '-100%', transition: { duration: 0.9, ease, delay: 0.15 } }}
        exit={{ y: ['100%', '0%'], transition: { duration: 0.7, ease } }}
      >
        <img src={LOGO} alt="" className="h-28 w-auto" />
      </motion.div>
    </motion.main>
  )
}

export default function App() {
  const location = useLocation()
  const lenis = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const l = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 })
    lenis.current = l
    let raf
    const loop = (t) => {
      l.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      l.destroy()
    }
  }, [])

  const toTop = () => {
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait" onExitComplete={toTop}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/produits" element={<Page><Products /></Page>} />
          <Route path="/produits/:slug" element={<Page><ProductDetail /></Page>} />
          <Route path="/univers" element={<Page><About /></Page>} />
          <Route path="/recettes" element={<Page><Recipes /></Page>} />
          <Route path="/experience" element={<Page><Experience /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="*" element={<Page><Home /></Page>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}
