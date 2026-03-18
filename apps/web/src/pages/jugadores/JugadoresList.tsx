import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getJugadores, deleteJugador } from '../../api/jugadores'
import DataTable from '../../components/shared/DataTable'
import PageHeader from '../../components/shared/PageHeader'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import type { Jugador } from '../../types'
import { Pencil, Trash2 } from 'lucide-react'

export default function JugadoresList() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: jugadores = [], isLoading } = useQuery({ queryKey: ['jugadores'], queryFn: () => getJugadores() })

  const deleteMutation = useMutation({
    mutationFn: deleteJugador,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['jugadores'] })
  })

  const handleDelete = (id: number, nombre: string) => {
    if (confirm(`¿Desactivar a ${nombre}?`)) deleteMutation.mutate(id)
  }

  const columns = [
    { key: 'numero', header: '#', render: (j: Jugador) => <span className="font-bold text-accent">{j.numero}</span> },
    {
      key: 'nombre', header: 'Jugador', render: (j: Jugador) => (
        <div>
          <p className="font-medium">{j.nombre} {j.apellido}</p>
          <p className="text-xs text-gray-500">{j.equipo}</p>
        </div>
      )
    },
    {
      key: 'posicion', header: 'Posición', render: (j: Jugador) => (
        <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium capitalize">{j.posicion}</span>
      )
    },
    { key: 'edad', header: 'Edad', render: (j: Jugador) => `${j.edad} años` },
    { key: 'altura', header: 'Altura', render: (j: Jugador) => `${j.altura} m` },
    { key: 'peso', header: 'Peso', render: (j: Jugador) => `${j.peso} kg` },
    {
      key: 'activo', header: 'Estado', render: (j: Jugador) => (
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${j.activo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          {j.activo ? 'Activo' : 'Inactivo'}
        </span>
      )
    },
    {
      key: 'actions', header: 'Acciones', render: (j: Jugador) => (
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); navigate(`/jugadores/${j.id}/editar`) }} className="p-1.5 text-gray-500 hover:text-secondary rounded transition-colors">
            <Pencil size={14} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); handleDelete(j.id, j.nombre) }} className="p-1.5 text-gray-500 hover:text-red-500 rounded transition-colors">
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
        title="Jugadores"
        subtitle={`${jugadores.length} jugadores registrados`}
        actionLabel="Nuevo jugador"
        actionPath="/jugadores/nuevo"
      />
      <DataTable columns={columns} data={jugadores} onRowClick={(j) => navigate(`/jugadores/${j.id}`)} />
    </div>
  )
}
