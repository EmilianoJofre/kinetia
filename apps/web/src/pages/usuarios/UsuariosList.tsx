import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { getUsuarios, deleteUsuario } from '../../api/usuarios'
import DataTable from '../../components/shared/DataTable'
import PageHeader from '../../components/shared/PageHeader'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import type { Usuario } from '../../types'
import { Pencil, UserX } from 'lucide-react'

const rolBadge = (rol: string) => {
  const cls: Record<string, string> = {
    admin: 'badge-danger',
    entrenador: 'badge-info',
    analista: 'badge-success'
  }
  const labels: Record<string, string> = {
    admin: 'Administrador',
    entrenador: 'Entrenador',
    analista: 'Analista'
  }
  return (
    <span className={cls[rol] || 'badge-neutral'}>
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
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
            {u.nombre.charAt(0).toUpperCase()}
          </div>
          <p className="font-medium text-text-primary">{u.nombre}</p>
        </div>
      )
    },
    {
      key: 'email', header: 'Correo electrónico', render: (u: Usuario) => (
        <span className="text-text-secondary">{u.email}</span>
      )
    },
    {
      key: 'rol', header: 'Rol', render: (u: Usuario) => rolBadge(u.rol)
    },
    {
      key: 'activo', header: 'Estado', render: (u: Usuario) => (
        <span className={u.activo ? 'badge-success' : 'badge-neutral'}>
          {u.activo ? 'Activo' : 'Inactivo'}
        </span>
      )
    },
    {
      key: 'created_at', header: 'Registrado', render: (u: Usuario) => (
        <span className="text-sm text-text-secondary">
          {new Date(u.created_at).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      )
    },
    {
      key: 'actions', header: 'Acciones', render: (u: Usuario) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/usuarios/${u.id}/editar`) }}
            className="action-btn"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDeactivate(u.id, u.nombre) }}
            className="action-btn-danger"
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
