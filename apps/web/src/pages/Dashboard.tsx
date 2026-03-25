import { useQuery } from '@tanstack/react-query'
import { getDashboard } from '../api/dashboard'
import MetricCard from '../components/shared/MetricCard'
import ChartCard from '../components/shared/ChartCard'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import { Users, Trophy, Activity, Heart } from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const CHART_COLORS = ['#FC5200', '#00C853', '#F59E0B', '#EF4444']

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard,
  })

  if (isLoading) return <LoadingSpinner />
  if (!data) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-sm text-text-secondary mt-0.5">Resumen de rendimiento del equipo</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Jugadores"
          value={data.metricas.total_jugadores}
          icon={Users}
          trend="activos"
          trendUp={true}
        />
        <MetricCard
          title="Partidos Jugados"
          value={data.metricas.partidos_jugados}
          icon={Trophy}
          trend="esta temporada"
          trendUp={true}
        />
        <MetricCard
          title="Tries por Partido"
          value={data.metricas.promedio_tries_por_partido}
          icon={Activity}
          trend="promedio esta temporada"
          trendUp={data.metricas.promedio_tries_por_partido >= 3}
        />
        <MetricCard
          title="Lesiones Activas"
          value={data.metricas.lesiones_activas}
          icon={Heart}
          trend={data.metricas.lesiones_activas === 0 ? 'sin lesiones' : 'en recuperación'}
          trendUp={data.metricas.lesiones_activas === 0}
        />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Producción por Partido (últimos partidos)">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.rendimiento_equipo}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="fecha" tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} />
              <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text)' }} />
              <Line type="monotone" dataKey="tries" stroke="#FC5200" strokeWidth={2} dot={{ fill: '#FC5200' }} name="Tries" />
              <Line type="monotone" dataKey="puntos" stroke="#00C853" strokeWidth={2} dot={{ fill: '#00C853' }} name="Puntos" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Resultados de Partidos">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data.resultados_partidos}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {data.resultados_partidos.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text)' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Top Jugadores por Impacto">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.top_jugadores} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis type="number" tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} />
              <YAxis dataKey="nombre" type="category" tick={{ fontSize: 10, fill: 'var(--color-text-secondary)' }} width={80} />
              <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text)' }} />
              <Bar dataKey="tries" stackId="a" fill="#FC5200" radius={[0, 0, 0, 0]} name="Tries" />
              <Bar dataKey="tackles" stackId="a" fill="#00C853" radius={[0, 4, 4, 0]} name="Tackles" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Evolución Física del Equipo">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.evolucion_fisica}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="fecha" tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} />
              <Tooltip contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text)' }} />
              <Legend />
              <Line type="monotone" dataKey="peso" stroke="#2563EB" strokeWidth={2} name="Peso (kg)" />
              <Line type="monotone" dataKey="velocidad" stroke="#FC5200" strokeWidth={2} name="Velocidad (km/h)" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  )
}
