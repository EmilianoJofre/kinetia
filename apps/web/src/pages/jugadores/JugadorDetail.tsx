import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getJugador } from '../../api/jugadores'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import ChartCard from '../../components/shared/ChartCard'
import { ArrowLeft, Pencil } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function JugadorDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: jugador, isLoading } = useQuery({
    queryKey: ['jugador', id],
    queryFn: () => getJugador(Number(id))
  })

  if (isLoading) return <LoadingSpinner />
  if (!jugador) return <div className="text-center py-8 text-text-secondary">Jugador no encontrado</div>

  const avgRating = jugador.estadisticas?.length
    ? (jugador.estadisticas.reduce((sum: number, e: any) => sum + (e.rating || 0), 0) / jugador.estadisticas.length).toFixed(1)
    : 'N/A'

  const totalGoles = jugador.estadisticas?.reduce((sum: number, e: any) => sum + (e.goles || 0), 0) || 0
  const totalAsistencias = jugador.estadisticas?.reduce((sum: number, e: any) => sum + (e.asistencias || 0), 0) || 0

  const ratingData = (jugador.estadisticas || []).slice(0, 10).reverse().map((e: any, i: number) => ({
    partido: `P${i + 1}`,
    rating: e.rating || 0
  }))

  const physicalData = (jugador.evaluaciones || []).slice(0, 8).reverse().map((e: any) => ({
    fecha: e.fecha ? new Date(e.fecha).toLocaleDateString('es', { month: 'short' }) : '',
    peso: e.peso,
    velocidad: e.velocidad_maxima
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-surface border border-border transition-colors text-text-primary">
            <ArrowLeft size={16} />
          </button>
          <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
            {jugador.numero || '?'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{jugador.nombre} {jugador.apellido}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full font-medium capitalize">{jugador.posicion}</span>
              <span className="text-sm text-text-secondary">{jugador.equipo}</span>
            </div>
          </div>
        </div>
        <button onClick={() => navigate(`/jugadores/${id}/editar`)} className="btn-primary flex items-center gap-2">
          <Pencil size={14} /> Editar
        </button>
      </div>

      {/* Bio */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Edad', value: `${jugador.edad} años` },
          { label: 'Altura', value: `${jugador.altura} m` },
          { label: 'Peso', value: `${jugador.peso} kg` },
          { label: 'Dorsal', value: `#${jugador.numero}` },
        ].map(({ label, value }) => (
          <div key={label} className="card text-center">
            <p className="text-xs text-text-secondary">{label}</p>
            <p className="text-xl font-bold text-text-primary mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Partidos', value: jugador.estadisticas?.length || 0 },
          { label: 'Goles', value: totalGoles },
          { label: 'Asistencias', value: totalAsistencias },
          { label: 'Rating promedio', value: avgRating },
        ].map(({ label, value }) => (
          <div key={label} className="card text-center">
            <p className="text-xs text-text-secondary">{label}</p>
            <p className="text-2xl font-bold text-primary mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Rendimiento por partido">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="partido" tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} />
              <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text)' }} />
              <Line type="monotone" dataKey="rating" stroke="#FC5200" strokeWidth={2} dot={{ fill: '#FC5200' }} name="Rating" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Evolución física">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={physicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="fecha" tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} />
              <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text)' }} />
              <Line type="monotone" dataKey="peso" stroke="#2563EB" strokeWidth={2} name="Peso (kg)" />
              <Line type="monotone" dataKey="velocidad" stroke="#00C853" strokeWidth={2} name="Velocidad (km/h)" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Lesiones */}
      {jugador.lesiones && jugador.lesiones.length > 0 && (
        <div className="card">
          <h3 className="text-base font-semibold text-text-primary mb-4">Historial de lesiones</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-text-secondary uppercase border-b border-border">
                <th className="pb-2">Tipo</th>
                <th className="pb-2">Inicio</th>
                <th className="pb-2">Retorno estimado</th>
                <th className="pb-2">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {jugador.lesiones.map((l: any) => (
                <tr key={l.id}>
                  <td className="py-2 text-text-primary">{l.tipo}</td>
                  <td className="py-2 text-text-primary">{l.fecha_inicio}</td>
                  <td className="py-2 text-text-primary">{l.fecha_estimada_retorno || '—'}</td>
                  <td className="py-2">
                    <span className={l.estado === 'activa' ? 'badge-danger' : 'badge-success'}>
                      {l.estado === 'activa' ? 'Activa' : 'Recuperada'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
