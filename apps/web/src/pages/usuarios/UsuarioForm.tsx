import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsuario, createUsuario, updateUsuario } from '../../api/usuarios'
import PageHeader from '../../components/shared/PageHeader'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

const ROLES = [
  { value: 'admin', label: 'Administrador' },
  { value: 'entrenador', label: 'Entrenador' },
  { value: 'analista', label: 'Analista' },
]

export default function UsuarioForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEdit = !!id

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'analista',
    activo: true
  })

  const { data: usuario, isLoading: loadingUsuario } = useQuery({
    queryKey: ['usuario', id],
    queryFn: () => getUsuario(Number(id)),
    enabled: isEdit
  })

  useEffect(() => {
    if (usuario) {
      setForm({
        nombre: usuario.nombre || '',
        email: usuario.email || '',
        password: '',
        rol: usuario.rol || 'analista',
        activo: usuario.activo
      })
    }
  }, [usuario])

  const mutation = useMutation({
    mutationFn: (data: any) => {
      if (isEdit) {
        const { password, ...rest } = data
        return updateUsuario(Number(id), rest)
      }
      return createUsuario(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
      navigate('/usuarios')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload: any = { ...form }
    if (!isEdit && !payload.password) {
      return
    }
    if (isEdit && !payload.password) {
      delete payload.password
    }
    mutation.mutate(payload)
  }

  if (isEdit && loadingUsuario) return <LoadingSpinner />

  return (
    <div>
      <PageHeader title={isEdit ? 'Editar usuario' : 'Nuevo usuario'} showBack />
      <div className="card max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Nombre completo</label>
            <input
              className="input-field"
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
              required
              placeholder="Nombre y apellido"
            />
          </div>
          <div>
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="input-field"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              placeholder="usuario@email.com"
            />
          </div>
          {!isEdit && (
            <div>
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="input-field"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required={!isEdit}
                placeholder="••••••••"
                minLength={6}
              />
              <p className="text-xs text-text-secondary mt-1">Mínimo 6 caracteres</p>
            </div>
          )}
          <div>
            <label className="form-label">Rol</label>
            <select
              className="input-field"
              value={form.rol}
              onChange={e => setForm({ ...form, rol: e.target.value })}
            >
              {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
          {isEdit && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="activo"
                checked={form.activo}
                onChange={e => setForm({ ...form, activo: e.target.checked })}
                className="w-4 h-4 accent-accent"
              />
              <label htmlFor="activo" className="form-label">Usuario activo</label>
            </div>
          )}
          {mutation.isError && <p className="text-red-500 text-sm">Error al guardar. Verifica los datos.</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={mutation.isPending} className="btn-primary disabled:opacity-50">
              {mutation.isPending ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear usuario'}
            </button>
            <button type="button" onClick={() => navigate('/usuarios')} className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-background transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
