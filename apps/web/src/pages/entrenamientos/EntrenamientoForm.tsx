import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getEntrenamiento, createEntrenamiento, updateEntrenamiento } from '../../api/entrenamientos'
import { getEquipos } from '../../api/equipos'
import PageHeader from '../../components/shared/PageHeader'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

const TIPOS = [
  { value: 'tactica', label: 'Táctica' },
  { value: 'fisica', label: 'Física' },
  { value: 'tecnica', label: 'Técnica' },
  { value: 'mixta', label: 'Mixta' },
  { value: 'recuperacion', label: 'Recuperación' },
]

const INTENSIDADES = [
  { value: 'baja', label: 'Baja' },
  { value: 'media', label: 'Media' },
  { value: 'alta', label: 'Alta' },
  { value: 'maxima', label: 'Máxima' },
]

export default function EntrenamientoForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEdit = !!id

  const [form, setForm] = useState({
    equipo_id: '',
    fecha: '',
    duracion: '',
    tipo: 'tactica',
    intensidad: 'media',
    asistentes: '',
    descripcion: ''
  })

  const { data: sesion, isLoading: loadingSesion } = useQuery({
    queryKey: ['entrenamiento', id],
    queryFn: () => getEntrenamiento(Number(id)),
    enabled: isEdit
  })

  const { data: equipos = [] } = useQuery({ queryKey: ['equipos'], queryFn: getEquipos })

  useEffect(() => {
    if (sesion) {
      setForm({
        equipo_id: String(sesion.equipo_id || ''),
        fecha: sesion.fecha ? sesion.fecha.slice(0, 16) : '',
        duracion: String(sesion.duracion || ''),
        tipo: sesion.tipo || 'tactica',
        intensidad: sesion.intensidad || 'media',
        asistentes: String(sesion.asistentes || ''),
        descripcion: sesion.descripcion || ''
      })
    }
  }, [sesion])

  const mutation = useMutation({
    mutationFn: (data: any) => isEdit ? updateEntrenamiento(Number(id), data) : createEntrenamiento(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entrenamientos'] })
      navigate('/entrenamientos')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      ...form,
      equipo_id: Number(form.equipo_id),
      duracion: Number(form.duracion),
      asistentes: Number(form.asistentes)
    })
  }

  if (isEdit && loadingSesion) return <LoadingSpinner />

  return (
    <div>
      <PageHeader title={isEdit ? 'Editar entrenamiento' : 'Nueva sesión de entrenamiento'} showBack />
      <div className="card max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Equipo</label>
              <select
                className="input-field"
                value={form.equipo_id}
                onChange={e => setForm({ ...form, equipo_id: e.target.value })}
                required
              >
                <option value="">Seleccionar equipo</option>
                {equipos.map(eq => <option key={eq.id} value={eq.id}>{eq.nombre}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Fecha y hora</label>
              <input
                type="datetime-local"
                className="input-field"
                value={form.fecha}
                onChange={e => setForm({ ...form, fecha: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Tipo de sesión</label>
              <select
                className="input-field"
                value={form.tipo}
                onChange={e => setForm({ ...form, tipo: e.target.value })}
              >
                {TIPOS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Intensidad</label>
              <select
                className="input-field"
                value={form.intensidad}
                onChange={e => setForm({ ...form, intensidad: e.target.value })}
              >
                {INTENSIDADES.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Duración (minutos)</label>
              <input
                type="number"
                min="1"
                className="input-field"
                value={form.duracion}
                onChange={e => setForm({ ...form, duracion: e.target.value })}
                required
                placeholder="90"
              />
            </div>
            <div>
              <label className="form-label">Asistentes</label>
              <input
                type="number"
                min="0"
                className="input-field"
                value={form.asistentes}
                onChange={e => setForm({ ...form, asistentes: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>
          <div>
            <label className="form-label">Descripción</label>
            <textarea
              className="input-field resize-none"
              rows={4}
              value={form.descripcion}
              onChange={e => setForm({ ...form, descripcion: e.target.value })}
              placeholder="Describe los objetivos y actividades de la sesión..."
            />
          </div>
          {mutation.isError && <p className="text-red-500 text-sm">Error al guardar. Verifica los datos.</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={mutation.isPending} className="btn-primary disabled:opacity-50">
              {mutation.isPending ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear sesión'}
            </button>
            <button type="button" onClick={() => navigate('/entrenamientos')} className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-background transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
