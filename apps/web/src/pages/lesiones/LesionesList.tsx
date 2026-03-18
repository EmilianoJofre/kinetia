import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getLesiones, deleteLesion } from '../../api/lesiones'
import { getJugadores } from '../../api/jugadores'
import DataTable from '../../components/shared/DataTable'
import PageHeader from '../../components/shared/PageHeader'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import type { Lesion } from '../../types'
import { Pencil, Trash2 } from 'lucide-react'

export default function LesionesList() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: lesiones = [], isLoading } = useQuery({ queryKey: ['lesiones'], queryFn: () => getLesiones() })
  const { data: jugadores = [] } = useQuery({ queryKey: ['jugadores'], queryFn: () => getJugadores() })

  const deleteMutation = useMutation({
    mutationFn: deleteLesion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lesiones'] })
  })

  const handleDelete = (id: number) => {
    if (confirm('¿Eliminar este registro de lesión?')) deleteMutation.mutate(id)
  }

  const jugadorNombre = (jugadorId: number) => {
    const j = jugadores.find(j => j.id === jugadorId)
    return j ? `${j.nombre} ${j.apellido}` : `Jugador ${jugadorId}`
  }

  const columns = [
    {
      key: 'jugador_id', header: 'Jugador', render: (l: Lesion) => (
        <span className="font-medium">{jugadorNombre(l.jugador_id)}</span>
      )
    },
    {
      key: 'tipo', header: 'Tipo de lesión', render: (l: Lesion) => (
        <span className="capitalize">{l.tipo}</span>
      )
    },
    {
      key: 'fecha_inicio', header: 'Inicio', render: (l: Lesion) => (
        <span className="text-sm">{new Date(l.fecha_inicio).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
      )
    },
    {
      key: 'fecha_estimada_retorno', header: 'Retorno estimado', render: (l: Lesion) => (
        l.fecha_estimada_retorno
          ? <span className="text-sm">{new Date(l.fecha_estimada_retorno).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          : <span className="text-gray-400">—</span>
      )
    },
    {
      key: 'estado', header: 'Estado', render: (l: Lesion) => (
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${l.estado === 'activa' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {l.estado === 'activa' ? 'Activa' : 'Recuperada'}
        </span>
      )
    },
    {
      key: 'actions', header: 'Acciones', render: (l: Lesion) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/lesiones/${l.id}/editar`) }}
            className="p-1.5 text-gray-500 hover:text-secondary rounded transition-colors"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(l.id) }}
            className="p-1.5 text-gray-500 hover:text-red-500 rounded transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )
    }
  ]

  if (isLoading) return <LoadingSpinner />

  const activas = lesiones.filter(l => l.estado === 'activa').length

  return (
    <div>
      <PageHeader
        title="Lesiones"
        subtitle={`${lesiones.length} registros — ${activas} activas`}
        actionLabel="Registrar lesión"
        actionPath="/lesiones/nuevo"
      />
      <DataTable columns={columns} data={lesiones} />
    </div>
  )
}
