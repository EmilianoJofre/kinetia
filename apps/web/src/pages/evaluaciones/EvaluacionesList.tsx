import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getEvaluaciones, deleteEvaluacion } from '../../api/evaluaciones'
import { getJugadores } from '../../api/jugadores'
import DataTable from '../../components/shared/DataTable'
import PageHeader from '../../components/shared/PageHeader'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import type { EvaluacionFisica } from '../../types'
import { Pencil, Trash2 } from 'lucide-react'

export default function EvaluacionesList() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: evaluaciones = [], isLoading } = useQuery({ queryKey: ['evaluaciones'], queryFn: () => getEvaluaciones() })
  const { data: jugadores = [] } = useQuery({ queryKey: ['jugadores'], queryFn: () => getJugadores() })

  const deleteMutation = useMutation({
    mutationFn: deleteEvaluacion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['evaluaciones'] })
  })

  const handleDelete = (id: number) => {
    if (confirm('¿Eliminar esta evaluación física?')) deleteMutation.mutate(id)
  }

  const jugadorNombre = (jugadorId: number) => {
    const j = jugadores.find(j => j.id === jugadorId)
    return j ? `${j.nombre} ${j.apellido}` : `Jugador ${jugadorId}`
  }

  const columns = [
    {
      key: 'fecha', header: 'Fecha', render: (e: EvaluacionFisica) => (
        <span className="text-sm">{new Date(e.fecha).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
      )
    },
    {
      key: 'jugador_id', header: 'Jugador', render: (e: EvaluacionFisica) => (
        <span className="font-medium">{jugadorNombre(e.jugador_id)}</span>
      )
    },
    {
      key: 'peso', header: 'Peso', render: (e: EvaluacionFisica) => (
        <span>{e.peso} kg</span>
      )
    },
    {
      key: 'velocidad_maxima', header: 'Vel. máx.', render: (e: EvaluacionFisica) => (
        <span>{e.velocidad_maxima} km/h</span>
      )
    },
    {
      key: 'vo2_max', header: 'VO2 máx', render: (e: EvaluacionFisica) => (
        <span>{e.vo2_max}</span>
      )
    },
    {
      key: 'notas', header: 'Notas', render: (e: EvaluacionFisica) => (
        <span className="text-gray-500 text-xs truncate max-w-xs block">
          {e.notas ? (e.notas.length > 60 ? e.notas.slice(0, 60) + '...' : e.notas) : '—'}
        </span>
      )
    },
    {
      key: 'actions', header: 'Acciones', render: (e: EvaluacionFisica) => (
        <div className="flex gap-2">
          <button
            onClick={(ev) => { ev.stopPropagation(); navigate(`/evaluaciones/${e.id}/editar`) }}
            className="p-1.5 text-gray-500 hover:text-secondary rounded transition-colors"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={(ev) => { ev.stopPropagation(); handleDelete(e.id) }}
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
        title="Estado Físico"
        subtitle={`${evaluaciones.length} evaluaciones registradas`}
        actionLabel="Nueva evaluación"
        actionPath="/evaluaciones/nuevo"
      />
      <DataTable columns={columns} data={evaluaciones} />
    </div>
  )
}
