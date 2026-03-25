import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getEquipo } from '../../api/equipos'
import { getJugadores } from '../../api/jugadores'
import { getPartidos } from '../../api/partidos'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import { ArrowLeft, Pencil, Users, Trophy } from 'lucide-react'

export default function EquipoDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: equipo, isLoading } = useQuery({
    queryKey: ['equipo', id],
    queryFn: () => getEquipo(Number(id))
  })

  const { data: jugadores = [] } = useQuery({
    queryKey: ['jugadores', id],
    queryFn: () => getJugadores(Number(id))
  })

  const { data: partidos = [] } = useQuery({
    queryKey: ['partidos'],
    queryFn: getPartidos
  })

  if (isLoading) return <LoadingSpinner />
  if (!equipo) return <div className="text-center py-8 text-text-secondary">Equipo no encontrado</div>

  const equipoPartidos = partidos.filter(
    p => p.equipo_local_id === Number(id) || p.equipo_visitante_id === Number(id)
  ).slice(0, 10)

  const jugadoresActivos = jugadores.filter(j => j.activo)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-surface border border-border transition-colors text-text-primary">
            <ArrowLeft size={16} />
          </button>
          <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
            {equipo.nombre.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{equipo.nombre}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-xs rounded-full font-medium">{equipo.categoria}</span>
              <span className="text-sm text-text-secondary">Temporada {equipo.temporada}</span>
            </div>
          </div>
        </div>
        <button onClick={() => navigate(`/equipos/${id}/editar`)} className="btn-primary flex items-center gap-2">
          <Pencil size={14} /> Editar
        </button>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card text-center">
          <p className="text-xs text-text-secondary">Entrenador</p>
          <p className="text-lg font-bold text-text-primary mt-1">{equipo.entrenador}</p>
        </div>
        <div className="card text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Users size={16} className="text-accent" />
            <p className="text-xs text-text-secondary">Jugadores activos</p>
          </div>
          <p className="text-2xl font-bold text-accent">{jugadoresActivos.length}</p>
        </div>
        <div className="card text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Trophy size={16} className="text-accent" />
            <p className="text-xs text-text-secondary">Partidos</p>
          </div>
          <p className="text-2xl font-bold text-accent">{equipoPartidos.length}</p>
        </div>
      </div>

      {/* Jugadores */}
      {jugadores.length > 0 && (
        <div className="card">
          <h3 className="text-base font-semibold text-text-primary mb-4">Plantilla de jugadores</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-text-secondary uppercase border-b border-border">
                  <th className="pb-2">#</th>
                  <th className="pb-2">Nombre</th>
                  <th className="pb-2">Posición</th>
                  <th className="pb-2">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {jugadores.map((j) => (
                  <tr
                    key={j.id}
                    onClick={() => navigate(`/jugadores/${j.id}`)}
                    className="cursor-pointer hover:bg-background transition-colors"
                  >
                    <td className="py-2 font-bold text-primary">{j.numero}</td>
                    <td className="py-2 font-medium text-text-primary">{j.nombre} {j.apellido}</td>
                    <td className="py-2">
                      <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full capitalize">{j.posicion}</span>
                    </td>
                    <td className="py-2">
                      <span className={j.activo ? 'badge-success' : 'badge-neutral'}>
                        {j.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Partidos recientes */}
      {equipoPartidos.length > 0 && (
        <div className="card">
          <h3 className="text-base font-semibold text-text-primary mb-4">Partidos recientes</h3>
          <div className="space-y-2">
            {equipoPartidos.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-text-primary">{p.equipo_local}</span>
                  <span className="text-lg font-bold text-text-primary">
                    {p.puntos_local} — {p.puntos_visitante}
                  </span>
                  <span className="text-sm font-medium text-text-primary">{p.equipo_visitante}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-text-secondary">{new Date(p.fecha).toLocaleDateString('es')}</span>
                  <span className={
                    p.estado === 'finalizado' ? 'badge-neutral' :
                    p.estado === 'en_curso' ? 'badge-success' :
                    'badge-info'
                  }>
                    {p.estado === 'finalizado' ? 'Finalizado' : p.estado === 'en_curso' ? 'En curso' : 'Programado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
