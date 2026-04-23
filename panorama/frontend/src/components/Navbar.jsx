import { Link, useLocation } from 'react-router-dom'
import { Map, User, Compass, LogOut } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const { pathname } = useLocation()

  const isActive = (path) => pathname === path

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 glass"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2"
          style={{ textDecoration: 'none' }}
        >
          <Compass size={20} style={{ color: 'var(--accent-green)' }} />
          <span
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: '18px',
              color: 'var(--text)',
              letterSpacing: '-0.5px',
            }}
          >
            PANORAMA
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/explore"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              color: isActive('/explore') ? 'var(--accent-green)' : 'var(--muted)',
              background: isActive('/explore') ? 'rgba(163,230,53,0.08)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
          >
            <Map size={16} />
            Explorar
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: isActive('/profile') ? 'var(--accent-green)' : 'var(--muted)',
                  background: isActive('/profile') ? 'rgba(163,230,53,0.08)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                <User size={16} />
                {user.name.split(' ')[0]}
              </Link>
              <button
                onClick={signOut}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: 'var(--muted)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#080a06',
                background: 'var(--accent-green)',
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
            >
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
