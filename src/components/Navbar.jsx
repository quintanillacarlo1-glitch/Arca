import { Link, useLocation } from 'react-router-dom'

const ArcaLogo = ({ size = 32, color = '#0A2540' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14 50V28C14 18.0589 22.0589 10 32 10C41.9411 10 50 18.0589 50 28V50" stroke={color} strokeWidth="3" strokeLinecap="square" fill="none" />
    <line x1="14" y1="50" x2="50" y2="50" stroke={color} strokeWidth="3" strokeLinecap="square" />
  </svg>
)

const Navbar = () => {
  const location = useLocation()

  const navLinks = [
    { label: 'Browse 3PLs', to: '/' },
    { label: 'How it works', to: '/' },
    { label: 'For 3PLs', to: '/list-your-3pl' },
    { label: 'Dashboard', to: '/dashboard' },
  ]

  const isActive = (link) => {
    if (link.to === '/' && location.pathname === '/' && link.label === 'Browse 3PLs') return true
    if (link.to === '/list-your-3pl' && location.pathname === '/list-your-3pl') return true
    if (link.to === '/dashboard' && location.pathname === '/dashboard') return true
    return false
  }

  return (
    <div style={{ height: '72px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(232,232,237,0.6)', display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '0 32px', position: 'sticky', top: 0, zIndex: 50 }}>
      <style>{`
        .arca-nav-link { font-size: 14px; font-weight: 500; color: #1D1D1F; letter-spacing: -0.01em; text-decoration: none; padding: 8px 14px; border-radius: 999px; transition: all 200ms; }
        .arca-nav-link:hover { background: rgba(10,37,64,0.04); color: #0A2540; }
        .arca-nav-link.active { color: #0A2540; font-weight: 600; }
        .arca-logo-wrap { transition: opacity 200ms; }
        .arca-logo-wrap:hover { opacity: 0.75; }
        .arca-signin:hover { color: #0A2540 !important; }
        .arca-cta:hover { background: #061A30 !important; transform: translateY(-1px); }
        .arca-cta { transition: all 200ms; }
      `}</style>

      <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {navLinks.map(link => (
          <Link key={link.label} to={link.to} className={`arca-nav-link ${isActive(link) ? 'active' : ''}`}>
            {link.label}
          </Link>
        ))}
      </nav>

      <Link to="/" className="arca-logo-wrap" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px', padding: '0 24px' }}>
        <ArcaLogo size={28} color="#0A2540" />
        <span style={{ fontFamily: "'Cinzel', Georgia, serif", fontSize: '20px', fontWeight: 500, color: '#0A2540', letterSpacing: '0.2em', lineHeight: 1, paddingLeft: '0.2em' }}>ARCA</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
        <a href="#" className="arca-signin" style={{ fontSize: '14px', fontWeight: 500, color: '#1D1D1F', letterSpacing: '-0.01em', textDecoration: 'none', padding: '8px 14px', transition: 'color 200ms' }}>
          Sign in
        </a>
        <button className="arca-cta" style={{ padding: '10px 20px', background: '#0A2540', color: 'white', border: 'none', borderRadius: '999px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '-0.01em', boxShadow: '0 1px 3px rgba(10,37,64,0.1)' }}>
          Get started
        </button>
      </div>
    </div>
  )
}

export default Navbar