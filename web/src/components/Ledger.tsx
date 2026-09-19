import { motion } from 'framer-motion'

const rows = [
  { file: 'user_files/reports/q3.docx', entropy: '7.94', delta: '+3.61', action: 'QUARANTINE', tone: '#f87171' },
  { file: 'user_files/photos/IMG_204.png', entropy: '7.12', delta: '+0.18', action: 'IGNORE', tone: 'rgba(255,255,255,0.55)' },
  { file: 'user_files/finance/payroll.xlsx', entropy: '7.88', delta: '+2.97', action: 'TERMINATE', tone: '#fb923c' },
  { file: 'user_files/notes/todo.txt', entropy: '6.41', delta: '+1.44', action: 'ALERT', tone: '#fbbf24' },
]

export default function Ledger() {
  return (
    <section id="ledger" style={{ padding: '110px 64px', background: '#050807', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="ledger-wrap" style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(280px, 0.85fr) minmax(320px, 1.15fr)', gap: '56px', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#10b981' }}>
            Evidence layer
          </span>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500, fontSize: 'clamp(1.9rem, 3.1vw, 2.8rem)', lineHeight: 1.12, letterSpacing: '-0.02em', color: '#fff', marginTop: '16px' }}>
            Verdicts you can’t quietly rewrite
          </h2>
          <p style={{ marginTop: '18px', fontSize: '15px', lineHeight: 1.68, color: 'rgba(255,255,255,0.62)', maxWidth: '440px' }}>
            Each detection is hashed and appended to the <code style={{ fontFamily: "'JetBrains Mono', monospace", color: '#a7f3d0', fontSize: '13.5px' }}>ThreatLogger</code> smart
            contract on Ganache. If the chain is unreachable and fallback is enabled, records go to a local SQLite ledger that is
            explicitly labelled as <em>not</em> a blockchain — no false immutability claims.
          </p>
          <div style={{ display: 'flex', gap: '34px', marginTop: '34px', flexWrap: 'wrap' }}>
            {[
              { k: '8.0', v: 'max Shannon entropy' },
              { k: '4', v: 'response actions' },
              { k: '2', v: 'ledger backends' },
            ].map((m) => (
              <div key={m.v}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '28px', color: '#10b981', letterSpacing: '-0.02em' }}>{m.k}</div>
                <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>{m.v}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.75, delay: 0.1 }}
          style={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.11)', background: 'rgba(0,0,0,0.62)', boxShadow: '0 30px 70px rgba(0,0,0,0.6)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '13px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#ef4444' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#f59e0b' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '999px', background: '#10b981' }} />
            <span style={{ marginLeft: '10px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', color: 'rgba(255,255,255,0.45)' }}>GET /api/events</span>
          </div>
          <div style={{ padding: '6px 0' }}>
            {rows.map((r) => (
              <div key={r.file} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: '14px', alignItems: 'center', padding: '13px 18px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'rgba(255,255,255,0.78)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.file}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>H {r.entropy}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'rgba(16,185,129,0.85)' }}>{r.delta}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10.5px', color: r.tone, border: `1px solid ${r.tone}`, borderRadius: '999px', padding: '3px 9px', opacity: 0.92 }}>{r.action}</span>
              </div>
            ))}
            <div style={{ padding: '14px 18px', fontFamily: "'JetBrains Mono', monospace", fontSize: '11.5px', color: 'rgba(255,255,255,0.38)' }}>
              tx 0x7f3a…c21e · block #4821 · ganache
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
