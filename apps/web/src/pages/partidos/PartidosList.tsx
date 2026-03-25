import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getPartidos, deletePartido } from '../../api/partidos'
import DataTable from '../../components/shared/DataTable'
import PageHeader from '../../components/shared/PageHeader'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import type { Partido } from '../../types'
import { Pencil, Trash2 } from 'lucide-react'

const estadoBadge = (estado: Partido['estado']) => {
  const map = {
    programado: 'bg-blue-100 text-blue-700',
    en_curso: 'bg-green-100 text-green-700',
    finalizado: 'bg-gray-100 text-gray-600'
  }
  const labels = {
    programado: 'Programado',
    en_curso: 'En curso',
    finalizado: 'Finalizado'
  }
  return (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${map[estado]}`}>
      {labels[estado]}
    </span>
  )
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
        <span className="text-sm">{new Date(p.fecha).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
      )
    },
    {
      key: 'equipos', header: 'Partido', render: (p: Partido) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{p.equipo_local}</span>
          <span className="text-gray-400 text-xs">vs</span>
          <span className="font-medium">{p.equipo_visitante}</span>
        </div>
      )
    },
    {
      key: 'resultado', header: 'Resultado', render: (p: Partido) => (
        p.estado === 'programado'
          ? <span className="text-gray-400 text-sm">—</span>
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
            className="p-1.5 text-gray-500 hover:text-secondary rounded transition-colors"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(p.id) }}
            className="p-1.5 text-gray-500 hover:text-red-500 rounded transition-colors"
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
