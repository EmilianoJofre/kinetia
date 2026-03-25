import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getEntrenamientos, deleteEntrenamiento } from '../../api/entrenamientos'
import { getEquipos } from '../../api/equipos'
import DataTable from '../../components/shared/DataTable'
import PageHeader from '../../components/shared/PageHeader'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import type { SesionEntrenamiento } from '../../types'
import { Pencil, Trash2 } from 'lucide-react'

const intensidadBadge = (intensidad: string) => {
  const cls: Record<string, string> = {
    baja: 'badge-success',
    media: 'badge-warning',
    alta: 'badge-warning',
    maxima: 'badge-danger'
  }
  const labels: Record<string, string> = {
    baja: 'Baja',
    media: 'Media',
    alta: 'Alta',
    maxima: 'Máxima'
  }
  return (
    <span className={cls[intensidad] || 'badge-neutral'}>
      {labels[intensidad] || intensidad}
    </span>
  )
}

export default function EntrenamientosList() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: entrenamientos = [], isLoading } = useQuery({ queryKey: ['entrenamientos'], queryFn: getEntrenamientos })
  const { data: equipos = [] } = useQuery({ queryKey: ['equipos'], queryFn: getEquipos })

  const deleteMutation = useMutation({
    mutationFn: deleteEntrenamiento,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['entrenamientos'] })
  })

  const handleDelete = (id: number) => {
    if (confirm('¿Eliminar esta sesión de entrenamiento?')) deleteMutation.mutate(id)
  }

  const equipoNombre = (id: number) => equipos.find(e => e.id === id)?.nombre || `Equipo ${id}`

  const columns = [
    {
      key: 'fecha', header: 'Fecha', render: (s: SesionEntrenamiento) => (
        <span className="text-sm text-text-primary">{new Date(s.fecha).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
      )
    },
    {
      key: 'equipo_id', header: 'Equipo', render: (s: SesionEntrenamiento) => (
        <span className="font-medium text-text-primary">{equipoNombre(s.equipo_id)}</span>
      )
    },
    {
      key: 'tipo', header: 'Tipo', render: (s: SesionEntrenamiento) => (
        <span className="capitalize text-text-primary">{s.tipo}</span>
      )
    },
    {
      key: 'intensidad', header: 'Intensidad', render: (s: SesionEntrenamiento) => intensidadBadge(s.intensidad)
    },
    {
      key: 'duracion', header: 'Duración', render: (s: SesionEntrenamiento) => (
        <span className="text-text-primary">{s.duracion} min</span>
      )
    },
    {
      key: 'asistentes', header: 'Asistentes', render: (s: SesionEntrenamiento) => (
        <span className="text-text-primary">{s.asistentes} jugadores</span>
      )
    },
    {
      key: 'actions', header: 'Acciones', render: (s: SesionEntrenamiento) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/entrenamientos/${s.id}/editar`) }}
            className="action-btn"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(s.id) }}
            className="action-btn-danger"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )
    }
  ]

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <PageHeader
        title="Entrenamientos"
        subtitle={`${entrenamientos.length} sesiones registradas`}
        actionLabel="Nueva sesión"
        actionPath="/entrenamientos/nuevo"
      />
      <DataTable columns={columns} data={entrenamientos} />
    </div>
  )
}
