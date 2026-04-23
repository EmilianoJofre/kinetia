import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { MapPin, Clock, Users, Star, ChevronLeft, Calendar } from 'lucide-react'
import { getActivity } from '../api/activities'
import { createBooking } from '../api/bookings'
import { useAuth } from '../contexts/AuthContext'

const CATEGORY_COLORS = {
  trekking:   '#a3e635',
  aventura:   '#38bdf8',
  astronomia: '#a78bfa',
  kayak:      '#38bdf8',
  default:    '#fbbf24',
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(price)
}

export default function ActivityDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [bookingDate, setBookingDate] = useState('')
  const [participants, setParticipants] = useState(1)
  const [booked, setBooked] = useState(false)

  const { data: activity, isLoading } = useQuery({
    queryKey: ['activity', id],
    queryFn: () => getActivity(id),
  })

  const bookMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      setBooked(true)
      queryClient.invalidateQueries(['bookings'])
    },
  })

  const handleBook = () => {
    if (!user) return navigate('/login')
    if (!bookingDate) return alert('Selecciona una fecha')
    bookMutation.mutate({ activity_id: id, date: bookingDate, participants })
  }

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--muted)' }}>Cargando...</div>
      </div>
    )
  }

  if (!activity) return null

  const color = CATEGORY_COLORS[activity.category] || CATEGORY_COLORS.default
  const heroImage = activity.images?.[0]?.url

  return (
    <div>
      {/* Hero */}
      <div style={{ position: 'relative', height: '60vh', minHeight: '400px' }}>
        {heroImage && (
          <img
            src={heroImage}
            alt={activity.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(8,10,6,1) 0%, rgba(8,10,6,0.4) 50%, rgba(8,10,6,0.2) 100%)',
        }} />

        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: '80px',
            left: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: '10px',
            background: 'rgba(8,10,6,0.6)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          <ChevronLeft size={16} /> Volver
        </button>

        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '24px',
          right: '24px',
          maxWidth: '800px',
        }}>
          <span style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color,
            border: `1px solid ${color}`,
            marginBottom: '12px',
          }}>
            {activity.category}
          </span>
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 800,
            color: 'var(--text)',
            letterSpacing: '-1px',
            lineHeight: 1.1,
          }}>
            {activity.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '40px 24px 120px',
        display: 'grid',
        gridTemplateColumns: '1fr 360px',
        gap: '48px',
        alignItems: 'start',
      }}
      className="detail-grid"
      >
        {/* Left */}
        <div>
          {/* Meta */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', fontSize: '15px' }}>
              <MapPin size={16} style={{ color }} />
              {activity.location}
            </div>
            {activity.duration_minutes && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', fontSize: '15px' }}>
                <Clock size={16} style={{ color }} />
                {activity.duration_minutes >= 60
                  ? `${Math.floor(activity.duration_minutes / 60)} horas`
                  : `${activity.duration_minutes} minutos`}
              </div>
            )}
            {activity.max_capacity && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', fontSize: '15px' }}>
                <Users size={16} style={{ color }} />
                Máximo {activity.max_capacity} personas
              </div>
            )}
            {activity.avg_rating && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fbbf24', fontSize: '15px' }}>
                <Star size={16} fill="#fbbf24" />
                {activity.avg_rating} ({activity.reviews_count} reseñas)
              </div>
            )}
          </div>

          {/* Description */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px' }}>Sobre la actividad</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '16px' }}>
              {activity.description}
            </p>
          </div>

          {/* Operator */}
          {activity.operator && (
            <div style={{
              padding: '20px',
              borderRadius: '16px',
              border: '1px solid var(--border)',
              background: 'var(--card)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '40px',
            }}>
              {activity.operator.avatar_url ? (
                <img
                  src={activity.operator.avatar_url}
                  alt={activity.operator.name}
                  style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  width: '52px', height: '52px', borderRadius: '50%',
                  background: `${color}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color, fontSize: '20px', fontWeight: 700,
                }}>
                  {activity.operator.name[0]}
                </div>
              )}
              <div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '4px' }}>Operador</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)' }}>
                  {activity.operator.name}
                </div>
              </div>
            </div>
          )}

          {/* Reviews */}
          {activity.reviews?.length > 0 && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px' }}>Reseñas</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activity.reviews.map(review => (
                  <div
                    key={review.id}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      background: 'var(--card)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>
                        {review.user?.name}
                      </span>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={i < review.rating ? '#fbbf24' : 'transparent'}
                            style={{ color: '#fbbf24' }}
                          />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>{review.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking card - sticky */}
        <div style={{
          position: 'sticky',
          top: '88px',
          padding: '28px',
          borderRadius: '20px',
          border: `1px solid ${color}33`,
          background: 'var(--card)',
          boxShadow: `0 20px 60px ${color}10`,
        }}>
          <div style={{ marginBottom: '20px' }}>
            <span style={{ fontSize: '32px', fontWeight: 800, color, fontFamily: 'Syne, sans-serif' }}>
              {formatPrice(activity.price)}
            </span>
            <span style={{ fontSize: '14px', color: 'var(--muted)', marginLeft: '6px' }}>/ persona</span>
          </div>

          {booked ? (
            <div style={{
              padding: '20px',
              borderRadius: '12px',
              background: 'rgba(163,230,53,0.1)',
              border: '1px solid rgba(163,230,53,0.3)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎉</div>
              <div style={{ fontWeight: 700, color: 'var(--accent-green)', fontSize: '16px', marginBottom: '4px' }}>
                ¡Solicitud enviada!
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '14px' }}>
                El operador confirmará tu reserva pronto.
              </div>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px', fontWeight: 500 }}>
                  Fecha
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  background: 'rgba(255,255,255,0.03)',
                }}>
                  <Calendar size={16} style={{ color: 'var(--muted)' }} />
                  <input
                    type="date"
                    value={bookingDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setBookingDate(e.target.value)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: 'var(--text)',
                      fontSize: '14px',
                      width: '100%',
                      colorScheme: 'dark',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px', fontWeight: 500 }}>
                  Personas
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    onClick={() => setParticipants(p => Math.max(1, p - 1))}
                    style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      border: '1px solid var(--border)', background: 'transparent',
                      color: 'var(--text)', fontSize: '18px', cursor: 'pointer',
                    }}
                  >−</button>
                  <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', minWidth: '24px', textAlign: 'center' }}>
                    {participants}
                  </span>
                  <button
                    onClick={() => setParticipants(p => Math.min(activity.max_capacity || 20, p + 1))}
                    style={{
                      width: '36px', height: '36px', borderRadius: '8px',
                      border: '1px solid var(--border)', background: 'transparent',
                      color: 'var(--text)', fontSize: '18px', cursor: 'pointer',
                    }}
                  >+</button>
                </div>
              </div>

              {bookingDate && (
                <div style={{
                  padding: '12px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border)',
                  marginBottom: '20px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--muted)', marginBottom: '8px' }}>
                    <span>{formatPrice(activity.price)} × {participants}</span>
                    <span style={{ color: 'var(--text)' }}>{formatPrice(activity.price * participants)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 700 }}>
                    <span style={{ color: 'var(--text)' }}>Total</span>
                    <span style={{ color }}>{formatPrice(activity.price * participants)}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleBook}
                disabled={bookMutation.isPending}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  background: color,
                  color: '#080a06',
                  fontWeight: 700,
                  fontSize: '16px',
                  border: 'none',
                  cursor: bookMutation.isPending ? 'wait' : 'pointer',
                  opacity: bookMutation.isPending ? 0.7 : 1,
                  fontFamily: 'Syne, sans-serif',
                  transition: 'opacity 0.2s',
                }}
              >
                {bookMutation.isPending ? 'Procesando...' : 'Solicitar reserva'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--muted)', marginTop: '12px' }}>
                Sin cargos hasta que el operador confirme
              </p>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
