import { motion } from 'framer-motion'

const services = [
  { name: 'SOC Dashboard', cmd: 'python app.py', port: '127.0.0.1:5000', body: 'Flask + Socket.IO console streaming live stats, entropy charts, alerts, quarantine state and DQN decisions.' },
  { name: 'Detection Pipeline', cmd: 'python monitoring/pipeline_runner.py', port: 'headless', body: 'Monitor → entropy → decision → response → ledger, with event de-duplication to avoid alert storms.' },
  { name: 'Attacker Console', cmd: 'python attacker_server/app.py', port: '127.0.0.1:8001', body: 'Runs safe ransomware-family emulations against generated fixtures only, plus a one-click lab RESET.' },
  { name: 'Victim UI', cmd: 'python victim_server/app.py', port: '127.0.0.1:8002', body: 'Displays the synthetic user file tree so you can watch files change during an emulated attack.' },
  { name: 'Fixture Generator', cmd: 'python victim_server/create_fake_files.py --clean', port: 'seeded 1337', body: 'Deterministic fake user directory — fixed seed and reference date make every run reproducible.' },
  { name: 'Environment Check', cmd: 'python main.py', port: 'exit code', body: 'Health check that fails loudly when required Python packages are missing. It does not start a server.' },
]

export default function Components() {
  return (
    <section id="components" style={{ padding: '110px 64px', background: '#030504', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }}
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#10b981' }}
        >
          Lab components
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, delay: 0.08 }}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 'clamp(1.9rem, 3.1vw, 2.8rem)', lineHeight: 1.12, letterSpacing: '-0.02em', color: '#fff', marginTop: '16px', maxWidth: '620px' }}
        >
          Four processes, one closed-loop lab
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginTop: '50px' }}>
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
              whileHover={{ borderColor: 'rgba(16,185,129,0.45)' }}
              style={{
                borderRadius: '16px',
                padding: '24px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.09)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px' }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '17px', color: '#fff' }}>{s.name}</h3>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: 'rgba(16,185,129,0.8)' }}>{s.port}</span>
              </div>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', marginTop: '10px' }}>{s.body}</p>
              <code style={{ display: 'block', marginTop: '16px', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'rgba(255,255,255,0.72)', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '9px', padding: '10px 12px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                $ {s.cmd}
              </code>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
