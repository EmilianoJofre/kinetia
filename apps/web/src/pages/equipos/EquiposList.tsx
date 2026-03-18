import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getEquipos, deleteEquipo } from '../../api/equipos'
import DataTable from '../../components/shared/DataTable'
import PageHeader from '../../components/shared/PageHeader'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import type { Equipo } from '../../types'
import { Pencil, Trash2 } from 'lucide-react'

export default function EquiposList() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: equipos = [], isLoading } = useQuery({ queryKey: ['equipos'], queryFn: getEquipos })

  const deleteMutation = useMutation({
    mutationFn: deleteEquipo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['equipos'] })
  })

  const handleDelete = (id: number, nombre: string) => {
    if (confirm(`¿Eliminar el equipo ${nombre}?`)) deleteMutation.mutate(id)
  }

  const columns = [
    {
      key: 'nombre', header: 'Nombre', render: (e: Equipo) => (
        <span className="font-semibold text-text-primary">{e.nombre}</span>
      )
    },
    {
      key: 'categoria', header: 'Categoría', render: (e: Equipo) => (
        <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full font-medium">{e.categoria}</span>
      )
    },
    { key: 'entrenador', header: 'Entrenador' },
    { key: 'temporada', header: 'Temporada' },
    {
      key: 'actions', header: 'Acciones', render: (e: Equipo) => (
        <div className="flex gap-2">
          <button
            onClick={(ev) => { ev.stopPropagation(); navigate(`/equipos/${e.id}/editar`) }}
            className="p-1.5 text-gray-500 hover:text-secondary rounded transition-colors"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={(ev) => { ev.stopPropagation(); handleDelete(e.id, e.nombre) }}
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
        title="Equipos"
        subtitle={`${equipos.length} equipos registrados`}
        actionLabel="Nuevo equipo"
        actionPath="/equipos/nuevo"
      />
      <DataTable columns={columns} data={equipos} onRowClick={(e) => navigate(`/equipos/${e.id}`)} />
    </div>
  )
}
