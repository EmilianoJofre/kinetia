import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Star, Clock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getBookings } from '../api/bookings'

const STATUS_COLORS = {
  pending:   { color: '#fbbf24', label: 'Pendiente' },
  confirmed: { color: '#a3e635', label: 'Confirmada' },
  cancelled: { color: '#ef4444', label: 'Cancelada' },
  completed: { color: '#38bdf8', label: 'Completada' },
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(price)
}

export default function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const { data: bookings = [] } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
    enabled: !!user,
  })

  if (!user) {
    navigate('/login')
    return null
  }

  const roleLabel = { traveler: 'Viajero', operator: 'Operador', business: 'Negocio' }[user.role] || user.role

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '100px 24px 80px' }}>
      {/* Profile header */}
      <div style={{
        padding: '32px',
        borderRadius: '24px',
        border: '1px solid var(--border)',
        background: 'var(--card)',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
      }}>
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={user.name}
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
          />
        ) : (
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'rgba(163,230,53,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px', fontWeight: 800,
            color: 'var(--accent-green)',
            fontFamily: 'Syne, sans-serif',
            flexShrink: 0,
          }}>
            {user.name[0]}
          </div>
        )}

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>{user.name}</h1>
            <span style={{
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              color: 'var(--accent-green)',
              border: '1px solid var(--accent-green)',
              letterSpacing: '0.05em',
            }}>
              {roleLabel}
            </span>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '12px' }}>{user.email}</p>
          {user.bio && <p style={{ color: 'var(--text)', fontSize: '15px', lineHeight: 1.5 }}>{user.bio}</p>}
        </div>

        <div style={{ display: 'flex', gap: '24px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'Syne, sans-serif' }}>
              {bookings.length}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--muted)' }}>Reservas</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent-blue)', fontFamily: 'Syne, sans-serif' }}>
              {bookings.filter(b => b.status === 'completed').length}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--muted)' }}>Completadas</div>
          </div>
        </div>
      </div>

      {/* Bookings */}
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px' }}>Mis reservas</h2>

        {bookings.length === 0 ? (
          <div style={{
            padding: '60px',
            textAlign: 'center',
            borderRadius: '16px',
            border: '1px dashed var(--border)',
            color: 'var(--muted)',
          }}>
            <Calendar size={48} style={{ marginBottom: '16px', opacity: 0.4 }} />
            <p style={{ fontSize: '16px', marginBottom: '16px' }}>Aún no tienes reservas</p>
            <button
              onClick={() => navigate('/explore')}
              style={{
                padding: '10px 24px',
                borderRadius: '10px',
                background: 'var(--accent-green)',
                color: '#080a06',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Explorar actividades
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {bookings.map(booking => {
              const status = STATUS_COLORS[booking.status] || STATUS_COLORS.pending
              return (
                <div
                  key={booking.id}
                  onClick={() => navigate(`/activity/${booking.activity.id}`)}
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    border: '1px solid var(--border)',
                    background: 'var(--card)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>
                      {booking.activity.title}
                    </div>
                    <div style={{ display: 'flex', gap: '16px', color: 'var(--muted)', fontSize: '13px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} />
                        {new Date(booking.date).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={13} />
                        {booking.activity.location}
                      </span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--accent-green)', marginBottom: '4px' }}>
                      {formatPrice(booking.activity.price * booking.participants)}
                    </div>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: status.color,
                      border: `1px solid ${status.color}44`,
                      background: `${status.color}11`,
                    }}>
                      {status.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <button
          onClick={signOut}
          style={{
            padding: '10px 24px',
            borderRadius: '10px',
            border: '1px solid var(--border)',
            background: 'transparent',
            color: 'var(--muted)',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}
