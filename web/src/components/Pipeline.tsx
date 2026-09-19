import { motion } from 'framer-motion'

const stages = [
  {
    step: '01',
    title: 'Watch',
    sub: 'watchdog FileMonitor',
    body: 'A watchdog observer streams create / modify / delete events from the controlled folders listed in ENTROPY_WATCH_FOLDERS.',
  },
  {
    step: '02',
    title: 'Measure',
    sub: 'EntropyAnalyzer',
    body: 'Each touched file is scored with Shannon entropy, and the delta against its previous fingerprint is tracked to catch sudden encryption.',
  },
  {
    step: '03',
    title: 'Decide',
    sub: 'DQN agent · rule fallback',
    body: 'A Deep Q-Network maps the entropy state to IGNORE, ALERT, TERMINATE or QUARANTINE. Without PyTorch it degrades to a threshold rule.',
  },
  {
    step: '04',
    title: 'Respond',
    sub: 'response_module',
    body: 'The chosen action is executed inside the lab boundary — alerting, stopping the emulated process, or moving artefacts to quarantine storage.',
  },
  {
    step: '05',
    title: 'Record',
    sub: 'SQLite + ThreatLogger.sol',
    body: 'Every verdict is persisted to events.db and pushed to the ThreatLogger contract on Ganache, with a clearly-labelled local ledger fallback.',
  },
]

export default function Pipeline() {
  return (
    <section id="pipeline" style={{ position: 'relative', padding: '120px 64px 110px', background: '#050807' }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '860px', height: '420px', background: 'radial-gradient(ellipse at 50% 0%, rgba(6,95,70,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: '1180px', margin: '0 auto' }}>
        <motion.span
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#10b981' }}
        >
          Detection pipeline
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.7, delay: 0.08, ease: 'easeOut' }}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 'clamp(1.9rem, 3.1vw, 2.8rem)', lineHeight: 1.12, letterSpacing: '-0.02em', color: '#fff', marginTop: '16px', maxWidth: '620px' }}
        >
          From file write to on-chain proof in five stages
        </motion.h2>

        <div className="pipeline-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '18px', marginTop: '54px' }}>
          {stages.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              style={{
                borderRadius: '18px',
                padding: '24px 22px 26px',
                background: 'linear-gradient(160deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015))',
                border: '1px solid rgba(255,255,255,0.10)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'rgba(16,185,129,0.85)' }}>{s.step}</span>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: '19px', color: '#fff', letterSpacing: '-0.01em' }}>{s.title}</h3>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', color: 'rgba(255,255,255,0.42)' }}>{s.sub}</span>
              <p style={{ fontSize: '13.5px', lineHeight: 1.62, color: 'rgba(255,255,255,0.62)', fontFamily: "'Inter', sans-serif", marginTop: '4px' }}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
