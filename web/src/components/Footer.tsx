export default function Footer() {
  return (
    <footer style={{ padding: '30px 64px 40px', background: '#030504', borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '13px', fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.8)' }}>
        ENTROPY
      </span>
      <span style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.42)' }}>
        Entropy Fingerprint Blockchain — controlled ransomware-detection lab.
      </span>
    </footer>
  )
}
