import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getUsuarios, deleteUsuario } from '../../api/usuarios'
import DataTable from '../../components/shared/DataTable'
import PageHeader from '../../components/shared/PageHeader'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import type { Usuario } from '../../types'
import { Pencil, UserX } from 'lucide-react'

const rolBadge = (rol: string) => {
  const map: Record<string, string> = {
    admin: 'bg-purple-100 text-purple-700',
    entrenador: 'bg-blue-100 text-blue-700',
    analista: 'bg-teal-100 text-teal-700'
  }
  const labels: Record<string, string> = {
    admin: 'Administrador',
    entrenador: 'Entrenador',
    analista: 'Analista'
  }
  return (
    <span className={`px-2 py-1 text-xs rounded-full font-medium ${map[rol] || 'bg-gray-100 text-gray-600'}`}>
      {labels[rol] || rol}
    </span>
  )
}

export default function UsuariosList() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { data: usuarios = [], isLoading } = useQuery({ queryKey: ['usuarios'], queryFn: getUsuarios })

  const deleteMutation = useMutation({
    mutationFn: deleteUsuario,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['usuarios'] })
  })

  const handleDeactivate = (id: number, nombre: string) => {
    if (confirm(`¿Desactivar al usuario ${nombre}?`)) deleteMutation.mutate(id)
  }

  const columns = [
    {
      key: 'nombre', header: 'Nombre', render: (u: Usuario) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
            {u.nombre.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-text-primary">{u.nombre}</p>
          </div>
        </div>
      )
    },
    {
      key: 'email', header: 'Correo electrónico', render: (u: Usuario) => (
        <span className="text-gray-600">{u.email}</span>
      )
    },
    {
      key: 'rol', header: 'Rol', render: (u: Usuario) => rolBadge(u.rol)
    },
    {
      key: 'activo', header: 'Estado', render: (u: Usuario) => (
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${u.activo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          {u.activo ? 'Activo' : 'Inactivo'}
        </span>
      )
    },
    {
      key: 'created_at', header: 'Registrado', render: (u: Usuario) => (
        <span className="text-sm text-gray-500">
          {new Date(u.created_at).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      )
    },
    {
      key: 'actions', header: 'Acciones', render: (u: Usuario) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/usuarios/${u.id}/editar`) }}
            className="p-1.5 text-gray-500 hover:text-secondary rounded transition-colors"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDeactivate(u.id, u.nombre) }}
            className="p-1.5 text-gray-500 hover:text-red-500 rounded transition-colors"
            title="Desactivar usuario"
          >
            <UserX size={14} />
          </button>
        </div>
      )
    }
  ]

  if (isLoading) return <LoadingSpinner />

  return (
    <div>
      <PageHeader
        title="Usuarios"
        subtitle={`${usuarios.length} usuarios registrados`}
        actionLabel="Nuevo usuario"
        actionPath="/usuarios/nuevo"
      />
      <DataTable columns={columns} data={usuarios} />
    </div>
  )
}
