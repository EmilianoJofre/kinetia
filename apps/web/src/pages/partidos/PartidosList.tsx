import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getPartidos, deletePartido } from '../../api/partidos'
import DataTable from '../../components/shared/DataTable'
import PageHeader from '../../components/shared/PageHeader'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import type { Partido } from '../../types'
import { Pencil, Trash2 } from 'lucide-react'

const estadoBadge = (estado: Partido['estado']) => {
  const cls = {
    programado: 'badge-info',
    en_curso: 'badge-success',
    finalizado: 'badge-neutral'
  }
  const labels = {
    programado: 'Programado',
    en_curso: 'En curso',
    finalizado: 'Finalizado'
  }
  return <span className={cls[estado]}>{labels[estado]}</span>
}

export default function PartidosList() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: partidos = [], isLoading } = useQuery({ queryKey: ['partidos'], queryFn: getPartidos })

  const deleteMutation = useMutation({
    mutationFn: deletePartido,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['partidos'] })
  })

  const handleDelete = (id: number) => {
    if (confirm('¿Eliminar este partido?')) deleteMutation.mutate(id)
  }

  const columns = [
    {
      key: 'fecha', header: 'Fecha', render: (p: Partido) => (
        <span className="text-sm text-text-primary">{new Date(p.fecha).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
      )
    },
    {
      key: 'equipos', header: 'Partido', render: (p: Partido) => (
        <div className="flex items-center gap-2">
          <span className="font-medium text-text-primary">{p.equipo_local}</span>
          <span className="text-text-secondary text-xs">vs</span>
          <span className="font-medium text-text-primary">{p.equipo_visitante}</span>
        </div>
      )
    },
    {
      key: 'resultado', header: 'Resultado', render: (p: Partido) => (
        p.estado === 'programado'
          ? <span className="text-text-secondary text-sm">—</span>
          : <span className="font-bold text-lg text-text-primary">{p.puntos_local} — {p.puntos_visitante}</span>
      )
    },
    {
      key: 'estado', header: 'Estado', render: (p: Partido) => estadoBadge(p.estado)
    },
    {
      key: 'actions', header: 'Acciones', render: (p: Partido) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/partidos/${p.id}/editar`) }}
            className="action-btn"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(p.id) }}
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
        title="Partidos"
        subtitle={`${partidos.length} partidos registrados`}
        actionLabel="Nuevo partido"
        actionPath="/partidos/nuevo"
      />
      <DataTable columns={columns} data={partidos} />
    </div>
  )
}
