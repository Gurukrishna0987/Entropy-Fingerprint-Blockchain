import { motion } from 'framer-motion'

const script = `python -m venv .venv && source .venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env
python victim_server/create_fake_files.py --clean
python main.py            # health check

# then, in separate terminals
python monitoring/pipeline_runner.py
python app.py             # SOC dashboard :5000`

export default function Quickstart() {
  return (
    <section id="docs" style={{ padding: '110px 64px 120px', background: '#030504', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#10b981' }}>
            Quickstart
          </span>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 'clamp(1.9rem, 3.1vw, 2.8rem)', lineHeight: 1.12, letterSpacing: '-0.02em', color: '#fff', marginTop: '16px', maxWidth: '620px' }}>
            Run the whole lab in under five minutes
          </h2>
        </motion.div>

        <motion.pre
          initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            marginTop: '38px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            lineHeight: 1.85,
            color: 'rgba(255,255,255,0.8)',
            background: 'rgba(0,0,0,0.65)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '26px 28px',
            overflowX: 'auto',
          }}
        >
          {script}
        </motion.pre>

        <motion.div
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.16 }}
          style={{
            marginTop: '22px',
            display: 'flex',
            gap: '14px',
            alignItems: 'flex-start',
            borderRadius: '14px',
            padding: '18px 20px',
            background: 'rgba(248,113,113,0.07)',
            border: '1px solid rgba(248,113,113,0.28)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round" style={{ flexShrink: 0, marginTop: '1px' }}>
            <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
          </svg>
          <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: 'rgba(255,255,255,0.72)' }}>
            <strong style={{ color: '#fca5a5', fontWeight: 600 }}>Safety boundary.</strong> The attacker emulator intentionally destroys the content of files under
            <code style={{ fontFamily: "'JetBrains Mono', monospace", color: '#fecaca', fontSize: '12.5px' }}> victim_server/user_files</code>. Never put personal or production data there.
            ENTROPY is a teaching and research system, not an endpoint security product.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: 'flex', gap: '14px', marginTop: '36px', flexWrap: 'wrap' }}
        >
          <motion.a
            href="https://github.com/Gurukrishna0987/Entropy-Fingerprint-Blockchain"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{ padding: '14px 26px', borderRadius: '999px', background: '#fff', color: '#0a0a0a', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}
          >
            View on GitHub
          </motion.a>
          <motion.a
            href="http://127.0.0.1:5000"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{ padding: '14px 26px', borderRadius: '999px', background: 'transparent', color: '#fff', fontSize: '14px', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)' }}
          >
            Open SOC Dashboard
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
