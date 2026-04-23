import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Mountain, Waves, Telescope, Wind } from 'lucide-react'

const CATEGORIES = [
  { id: 'trekking',   label: 'Trekking',    icon: Mountain,  color: '#a3e635' },
  { id: 'aventura',   label: 'Aventura',    icon: Wind,      color: '#38bdf8' },
  { id: 'kayak',      label: 'Kayak',       icon: Waves,     color: '#38bdf8' },
  { id: 'astronomia', label: 'Astronomía',  icon: Telescope, color: '#a78bfa' },
]

const FEATURED_LOCATIONS = [
  { name: 'Patagonia',     img: 'https://images.unsplash.com/photo-1589553416260-f586c8f1514f?w=600' },
  { name: 'Atacama',       img: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600' },
  { name: 'Araucanía',     img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600' },
  { name: 'Valle de Elqui',img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600' },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/explore?q=${encodeURIComponent(query)}`)
  }

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(163,230,53,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Grid lines */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', textAlign: 'center', maxWidth: '800px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '100px',
            border: '1px solid rgba(163,230,53,0.3)',
            background: 'rgba(163,230,53,0.06)',
            fontSize: '13px',
            color: '#a3e635',
            fontWeight: 500,
            marginBottom: '32px',
            letterSpacing: '0.04em',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a3e635', display: 'inline-block' }} />
            Experiencias únicas en Chile
          </div>

          <h1 style={{
            fontSize: 'clamp(48px, 8vw, 88px)',
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: '-2px',
            marginBottom: '24px',
            color: 'var(--text)',
          }}>
            Descubre Chile
            <br />
            <span style={{ color: 'var(--accent-green)' }}>como nunca antes</span>
          </h1>

          <p style={{
            fontSize: '18px',
            color: 'var(--muted)',
            lineHeight: 1.6,
            maxWidth: '500px',
            margin: '0 auto 48px',
          }}>
            Conectamos viajeros con experiencias auténticas — trekking, aventura, gastronomía y más en un solo lugar.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 8px 8px 20px',
              borderRadius: '16px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              maxWidth: '520px',
              margin: '0 auto',
              backdropFilter: 'blur(12px)',
            }}>
              <Search size={18} style={{ color: 'var(--muted)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Busca una actividad o destino..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--text)',
                  fontSize: '15px',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  background: 'var(--accent-green)',
                  color: '#080a06',
                  fontWeight: 700,
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'opacity 0.2s',
                }}
              >
                Buscar <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '0 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px', letterSpacing: '-0.5px' }}>
          Por categoría
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '12px',
        }}>
          {CATEGORIES.map(({ id, label, icon: Icon, color }) => (
            <button
              key={id}
              onClick={() => navigate(`/explore?category=${id}`)}
              style={{
                padding: '24px',
                borderRadius: '16px',
                border: `1px solid ${color}22`,
                background: `${color}08`,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${color}14`; e.currentTarget.style.borderColor = `${color}44` }}
              onMouseLeave={e => { e.currentTarget.style.background = `${color}08`; e.currentTarget.style.borderColor = `${color}22` }}
            >
              <Icon size={28} style={{ color }} />
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Locations */}
      <section style={{ padding: '0 24px 120px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px', letterSpacing: '-0.5px' }}>
          Destinos destacados
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '16px',
        }}>
          {FEATURED_LOCATIONS.map(({ name, img }) => (
            <button
              key={name}
              onClick={() => navigate(`/explore?location=${encodeURIComponent(name)}`)}
              style={{
                position: 'relative',
                height: '200px',
                borderRadius: '16px',
                overflow: 'hidden',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(8,10,6,0.85) 0%, transparent 60%)',
              }} />
              <span style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                fontSize: '20px',
                fontWeight: 800,
                color: 'var(--text)',
                fontFamily: 'Syne, sans-serif',
              }}>
                {name}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
