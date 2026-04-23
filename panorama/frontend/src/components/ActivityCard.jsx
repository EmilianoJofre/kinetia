import { Link } from 'react-router-dom'
import { MapPin, Clock, Star, Users } from 'lucide-react'

const CATEGORY_COLORS = {
  trekking:   { accent: '#a3e635', glow: 'rgba(163,230,53,0.12)' },
  aventura:   { accent: '#38bdf8', glow: 'rgba(56,189,248,0.12)' },
  astronomia: { accent: '#a78bfa', glow: 'rgba(167,139,250,0.12)' },
  kayak:      { accent: '#38bdf8', glow: 'rgba(56,189,248,0.12)' },
  default:    { accent: '#fbbf24', glow: 'rgba(251,191,36,0.12)' },
}

function formatPrice(price) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(price)
}

export default function ActivityCard({ activity }) {
  const colors = CATEGORY_COLORS[activity.category] || CATEGORY_COLORS.default
  const image = activity.images?.[0]?.url

  return (
    <Link
      to={`/activity/${activity.id}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          overflow: 'hidden',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = `0 20px 60px ${colors.glow}`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Image */}
        <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
          {image ? (
            <img
              src={image}
              alt={activity.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'var(--surface)' }} />
          )}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(8,10,6,0.8) 0%, transparent 60%)',
          }} />

          {/* Category tag */}
          <span style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            padding: '4px 10px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: colors.accent,
            border: `1px solid ${colors.accent}`,
            background: 'rgba(8,10,6,0.6)',
            backdropFilter: 'blur(8px)',
          }}>
            {activity.category}
          </span>

          {activity.avg_rating && (
            <span style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#fbbf24',
              background: 'rgba(8,10,6,0.6)',
              backdropFilter: 'blur(8px)',
            }}>
              <Star size={12} fill="#fbbf24" />
              {activity.avg_rating}
            </span>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '16px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: '8px',
            lineHeight: 1.3,
          }}>
            {activity.title}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--muted)', fontSize: '13px' }}>
              <MapPin size={13} />
              {activity.location}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--muted)', fontSize: '13px' }}>
              {activity.duration_minutes && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} />
                  {activity.duration_minutes >= 60
                    ? `${Math.floor(activity.duration_minutes / 60)}h`
                    : `${activity.duration_minutes}min`}
                </span>
              )}
              {activity.max_capacity && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={13} />
                  Máx {activity.max_capacity}
                </span>
              )}
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border)',
            paddingTop: '12px',
          }}>
            <div>
              <span style={{
                fontSize: '18px',
                fontWeight: 700,
                color: colors.accent,
                fontFamily: 'Syne, sans-serif',
              }}>
                {formatPrice(activity.price)}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--muted)', marginLeft: '4px' }}>/ persona</span>
            </div>
            <span style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#080a06',
              background: colors.accent,
            }}>
              Ver más
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
