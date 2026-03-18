import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPartido, createPartido, updatePartido } from '../../api/partidos'
import { getEquipos } from '../../api/equipos'
import PageHeader from '../../components/shared/PageHeader'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

const ESTADOS = [
  { value: 'programado', label: 'Programado' },
  { value: 'en_curso', label: 'En curso' },
  { value: 'finalizado', label: 'Finalizado' },
]

export default function PartidoForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEdit = !!id

  const [form, setForm] = useState({
    equipo_local_id: '',
    equipo_visitante_id: '',
    fecha: '',
    goles_local: '0',
    goles_visitante: '0',
    estado: 'programado'
  })

  const { data: partido, isLoading: loadingPartido } = useQuery({
    queryKey: ['partido', id],
    queryFn: () => getPartido(Number(id)),
    enabled: isEdit
  })

  const { data: equipos = [] } = useQuery({ queryKey: ['equipos'], queryFn: getEquipos })

  useEffect(() => {
    if (partido) {
      setForm({
        equipo_local_id: String(partido.equipo_local_id || ''),
        equipo_visitante_id: String(partido.equipo_visitante_id || ''),
        fecha: partido.fecha ? partido.fecha.slice(0, 16) : '',
        goles_local: String(partido.goles_local ?? 0),
        goles_visitante: String(partido.goles_visitante ?? 0),
        estado: partido.estado || 'programado'
      })
    }
  }, [partido])

  const mutation = useMutation({
    mutationFn: (data: any) => isEdit ? updatePartido(Number(id), data) : createPartido(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partidos'] })
      navigate('/partidos')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      ...form,
      equipo_local_id: Number(form.equipo_local_id),
      equipo_visitante_id: Number(form.equipo_visitante_id),
      goles_local: Number(form.goles_local),
      goles_visitante: Number(form.goles_visitante)
    })
  }

  if (isEdit && loadingPartido) return <LoadingSpinner />

  return (
    <div>
      <PageHeader title={isEdit ? 'Editar partido' : 'Nuevo partido'} showBack />
      <div className="card max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y hora</label>
            <input
              type="datetime-local"
              className="input-field"
              value={form.fecha}
              onChange={e => setForm({ ...form, fecha: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipo local</label>
              <select
                className="input-field"
                value={form.equipo_local_id}
                onChange={e => setForm({ ...form, equipo_local_id: e.target.value })}
                required
              >
                <option value="">Seleccionar equipo</option>
                {equipos.map(eq => <option key={eq.id} value={eq.id}>{eq.nombre}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipo visitante</label>
              <select
                className="input-field"
                value={form.equipo_visitante_id}
                onChange={e => setForm({ ...form, equipo_visitante_id: e.target.value })}
                required
              >
                <option value="">Seleccionar equipo</option>
                {equipos.map(eq => <option key={eq.id} value={eq.id}>{eq.nombre}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Goles local</label>
              <input
                type="number"
                min="0"
                className="input-field"
                value={form.goles_local}
                onChange={e => setForm({ ...form, goles_local: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Goles visitante</label>
              <input
                type="number"
                min="0"
                className="input-field"
                value={form.goles_visitante}
                onChange={e => setForm({ ...form, goles_visitante: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                className="input-field"
                value={form.estado}
                onChange={e => setForm({ ...form, estado: e.target.value })}
              >
                {ESTADOS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>
          {mutation.isError && <p className="text-red-500 text-sm">Error al guardar. Verifica los datos.</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={mutation.isPending} className="btn-primary disabled:opacity-50">
              {mutation.isPending ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear partido'}
            </button>
            <button type="button" onClick={() => navigate('/partidos')} className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-background transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
