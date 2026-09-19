import { motion } from 'framer-motion'

const navLinks = [
  { label: 'Pipeline', href: '#pipeline' },
  { label: 'Components', href: '#components' },
  { label: 'Ledger', href: '#ledger' },
  { label: 'Docs', href: '#docs' },
]

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '26px 44px', backdropFilter: 'blur(2px)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '44px' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 14c2.2-7 3.6 3.2 5.2-4.6C8.8 1.6 10.4 18 12 12s2.6 7 4.2 1.4S19.6 15 22 10" />
          </svg>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '15px', fontWeight: 700, letterSpacing: '0.16em', color: '#fff' }}>
            ENTROPY
          </span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }} className="nav-links">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{ fontSize: '14px', fontWeight: 500, fontFamily: "'Inter', sans-serif", color: 'rgba(255,255,255,0.82)', textDecoration: 'none' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <motion.a
        href="http://127.0.0.1:5000"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{
          padding: '11px 24px',
          borderRadius: '999px',
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
          color: '#111',
          textDecoration: 'none',
          background: '#fff',
          boxShadow: '0 4px 18px rgba(0,0,0,0.25)',
        }}
      >
        Open Dashboard
      </motion.a>
    </motion.nav>
  )
}
