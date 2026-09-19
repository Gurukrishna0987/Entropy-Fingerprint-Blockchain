import { motion } from 'framer-motion'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Gurukrishna0987/Entropy-Fingerprint-Blockchain',
    path: 'M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.79 1.07.79 2.15v3.19c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z',
  },
  {
    label: 'X',
    href: '#',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452z',
  },
]

export default function Hero() {
  return (
    <section id="top" style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '640px', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'drift 28s ease-in-out infinite',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.10) 32%, rgba(0,0,0,0.20) 62%, rgba(0,0,0,0.78) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.12) 46%, rgba(0,0,0,0.30) 100%)' }} />
      <div style={{ position: 'absolute', top: '-14%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '720px', background: 'radial-gradient(ellipse at 50% 30%, rgba(6,95,70,0.30) 0%, transparent 68%)', pointerEvents: 'none' }} />
      <div
        style={{
          position: 'absolute', left: 0, right: 0, height: '38%', zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, transparent, rgba(16,185,129,0.09) 55%, transparent)',
          animation: 'scan 9s linear infinite',
        }}
      />

      <div className="hero-body" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start', paddingTop: '24vh', paddingLeft: '64px', paddingRight: '24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', borderRadius: '999px', padding: '6px 16px 6px 6px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', width: 'fit-content' }}
        >
          <div style={{ display: 'flex' }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: '22px', height: '22px', borderRadius: '999px', background: 'linear-gradient(135deg, #10b981, #047857)', border: '2px solid rgba(10,20,16,0.9)', marginLeft: i === 0 ? 0 : '-8px' }} />
            ))}
          </div>
          <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.75)', fontFamily: "'Inter', sans-serif" }}>
            Monitor · Detect · <strong style={{ color: '#fff', fontWeight: 600 }}>Prove on chain</strong>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 'clamp(2.4rem, 4.6vw, 4.1rem)', lineHeight: 1.08, letterSpacing: '-0.02em', color: '#fff', marginTop: '22px', maxWidth: '680px' }}
        >
          Ransomware Leaves<br />an Entropy Trail
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.42, ease: 'easeOut' }}
          style={{ marginTop: '16px', fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.68)', fontFamily: "'Inter', sans-serif", maxWidth: '430px' }}
        >
          ENTROPY is a controlled detection lab: it watches files, measures Shannon entropy,
          lets a DQN agent decide, responds, and writes every verdict to a tamper-evident ledger.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.58, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '30px', flexWrap: 'wrap' }}
        >
          <motion.a
            href="#pipeline"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ padding: '14px 26px', borderRadius: '999px', background: '#0a0a0a', color: '#fff', fontSize: '14px', fontWeight: 600, fontFamily: "'Inter', sans-serif", textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}
          >
            See How It Works
          </motion.a>
          <motion.a
            href="https://github.com/Gurukrishna0987/Entropy-Fingerprint-Blockchain"
            aria-label="View source"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            style={{ width: '44px', height: '44px', borderRadius: '999px', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
          </motion.a>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12.5px', color: 'rgba(255,255,255,0.45)', marginLeft: '6px' }}>
            $ python app.py
          </span>
        </motion.div>
      </div>

      <div className="hero-socials" style={{ position: 'absolute', bottom: '34px', left: '64px', zIndex: 10, display: 'flex', gap: '10px' }}>
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            style={{ width: '34px', height: '34px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.75)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
          </a>
        ))}
      </div>

      <div className="hero-note" style={{ position: 'absolute', bottom: '38px', right: '64px', zIndex: 10, display: 'flex', alignItems: 'center', gap: '9px' }}>
        <span style={{ width: '7px', height: '7px', borderRadius: '999px', background: '#10b981', animation: 'pulseDot 1.8s ease-in-out infinite' }} />
        <span style={{ fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em' }}>
          lab environment · synthetic fixtures only
        </span>
      </div>
    </section>
  )
}
