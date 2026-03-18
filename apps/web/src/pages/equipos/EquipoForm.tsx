import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getEquipo, createEquipo, updateEquipo } from '../../api/equipos'
import PageHeader from '../../components/shared/PageHeader'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

export default function EquipoForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEdit = !!id

  const [form, setForm] = useState({
    nombre: '',
    categoria: '',
    entrenador: '',
    temporada: '',
    logo_url: ''
  })

  const { data: equipo, isLoading: loadingEquipo } = useQuery({
    queryKey: ['equipo', id],
    queryFn: () => getEquipo(Number(id)),
    enabled: isEdit
  })

  useEffect(() => {
    if (equipo) {
      setForm({
        nombre: equipo.nombre || '',
        categoria: equipo.categoria || '',
        entrenador: equipo.entrenador || '',
        temporada: equipo.temporada || '',
        logo_url: equipo.logo_url || ''
      })
    }
  }, [equipo])

  const mutation = useMutation({
    mutationFn: (data: any) => isEdit ? updateEquipo(Number(id), data) : createEquipo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipos'] })
      navigate('/equipos')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(form)
  }

  if (isEdit && loadingEquipo) return <LoadingSpinner />

  return (
    <div>
      <PageHeader title={isEdit ? 'Editar equipo' : 'Nuevo equipo'} showBack />
      <div className="card max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del equipo</label>
            <input
              className="input-field"
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
              required
              placeholder="Ej: Real Madrid CF"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <input
                className="input-field"
                value={form.categoria}
                onChange={e => setForm({ ...form, categoria: e.target.value })}
                required
                placeholder="Ej: Primera División"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temporada</label>
              <input
                className="input-field"
                value={form.temporada}
                onChange={e => setForm({ ...form, temporada: e.target.value })}
                required
                placeholder="Ej: 2024-2025"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Entrenador principal</label>
            <input
              className="input-field"
              value={form.entrenador}
              onChange={e => setForm({ ...form, entrenador: e.target.value })}
              required
              placeholder="Nombre del entrenador"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">URL del logo (opcional)</label>
            <input
              className="input-field"
              value={form.logo_url}
              onChange={e => setForm({ ...form, logo_url: e.target.value })}
              placeholder="https://..."
            />
          </div>
          {mutation.isError && <p className="text-red-500 text-sm">Error al guardar. Verifica los datos.</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={mutation.isPending} className="btn-primary disabled:opacity-50">
              {mutation.isPending ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear equipo'}
            </button>
            <button type="button" onClick={() => navigate('/equipos')} className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-background transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
