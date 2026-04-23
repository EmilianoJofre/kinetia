import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Search, SlidersHorizontal } from 'lucide-react'
import { getActivities } from '../api/activities'
import ActivityCard from '../components/ActivityCard'

const CATEGORIES = ['trekking', 'aventura', 'kayak', 'astronomia']

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')

  const params = {}
  if (query) params.q = query
  if (category) params.category = category

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['activities', params],
    queryFn: () => getActivities(params),
  })

  const handleSearch = (e) => {
    e.preventDefault()
    const next = {}
    if (query) next.q = query
    if (category) next.category = category
    setSearchParams(next)
  }

  return (
    <div style={{ padding: '100px 24px 80px', maxWidth: '1100px', margin: '0 auto' }}>
      <h1 style={{
        fontSize: 'clamp(32px, 5vw, 52px)',
        fontWeight: 800,
        marginBottom: '8px',
        letterSpacing: '-1px',
      }}>
        Explorar actividades
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: '40px', fontSize: '16px' }}>
        {activities.length} experiencias disponibles
      </p>

      {/* Filters */}
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 16px',
          borderRadius: '12px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid var(--border)',
          flex: 1,
          minWidth: '200px',
        }}>
          <Search size={16} style={{ color: 'var(--muted)' }} />
          <input
            type="text"
            placeholder="Buscar..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text)',
              fontSize: '14px',
              width: '100%',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setCategory('')}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: 600,
              border: `1px solid ${!category ? 'var(--accent-green)' : 'var(--border)'}`,
              background: !category ? 'rgba(163,230,53,0.1)' : 'transparent',
              color: !category ? 'var(--accent-green)' : 'var(--muted)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            Todos
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat === category ? '' : cat)}
              style={{
                padding: '10px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 600,
                border: `1px solid ${category === cat ? 'var(--accent-green)' : 'var(--border)'}`,
                background: category === cat ? 'rgba(163,230,53,0.1)' : 'transparent',
                color: category === cat ? 'var(--accent-green)' : 'var(--muted)',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.15s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

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
          }}
        >
          Buscar
        </button>
      </form>

      {/* Grid */}
      {isLoading ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                height: '360px',
                borderRadius: '16px',
                background: 'var(--card)',
                animation: 'pulse 1.5s infinite',
              }}
            />
          ))}
        </div>
      ) : activities.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
          <SlidersHorizontal size={48} style={{ marginBottom: '16px', opacity: 0.4 }} />
          <p style={{ fontSize: '18px' }}>No encontramos actividades con esos filtros</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {activities.map(activity => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  )
}
