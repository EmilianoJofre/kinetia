import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getEvaluacion, createEvaluacion, updateEvaluacion } from '../../api/evaluaciones'
import { getJugadores } from '../../api/jugadores'
import PageHeader from '../../components/shared/PageHeader'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

export default function EvaluacionForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEdit = !!id

  const [form, setForm] = useState({
    jugador_id: '',
    fecha: '',
    peso: '',
    velocidad_maxima: '',
    resistencia: '',
    fuerza: '',
    agilidad: '',
    vo2_max: '',
    notas: ''
  })

  const { data: evaluacion, isLoading: loadingEval } = useQuery({
    queryKey: ['evaluacion', id],
    queryFn: () => getEvaluacion(Number(id)),
    enabled: isEdit
  })

  const { data: jugadores = [] } = useQuery({ queryKey: ['jugadores'], queryFn: () => getJugadores() })

  useEffect(() => {
    if (evaluacion) {
      setForm({
        jugador_id: String(evaluacion.jugador_id || ''),
        fecha: evaluacion.fecha ? evaluacion.fecha.slice(0, 10) : '',
        peso: String(evaluacion.peso || ''),
        velocidad_maxima: String(evaluacion.velocidad_maxima || ''),
        resistencia: String(evaluacion.resistencia || ''),
        fuerza: String(evaluacion.fuerza || ''),
        agilidad: String(evaluacion.agilidad || ''),
        vo2_max: String(evaluacion.vo2_max || ''),
        notas: evaluacion.notas || ''
      })
    }
  }, [evaluacion])

  const mutation = useMutation({
    mutationFn: (data: any) => isEdit ? updateEvaluacion(Number(id), data) : createEvaluacion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['evaluaciones'] })
      navigate('/evaluaciones')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      ...form,
      jugador_id: Number(form.jugador_id),
      peso: Number(form.peso),
      velocidad_maxima: Number(form.velocidad_maxima),
      resistencia: Number(form.resistencia),
      fuerza: Number(form.fuerza),
      agilidad: Number(form.agilidad),
      vo2_max: Number(form.vo2_max)
    })
  }

  if (isEdit && loadingEval) return <LoadingSpinner />

  return (
    <div>
      <PageHeader title={isEdit ? 'Editar evaluación física' : 'Nueva evaluación física'} showBack />
      <div className="card max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jugador</label>
              <select
                className="input-field"
                value={form.jugador_id}
                onChange={e => setForm({ ...form, jugador_id: e.target.value })}
                required
              >
                <option value="">Seleccionar jugador</option>
                {jugadores.map(j => (
                  <option key={j.id} value={j.id}>{j.nombre} {j.apellido}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
              <input
                type="date"
                className="input-field"
                value={form.fecha}
                onChange={e => setForm({ ...form, fecha: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
              <input
                type="number"
                step="0.1"
                className="input-field"
                value={form.peso}
                onChange={e => setForm({ ...form, peso: e.target.value })}
                placeholder="75.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Velocidad máxima (km/h)</label>
              <input
                type="number"
                step="0.1"
                className="input-field"
                value={form.velocidad_maxima}
                onChange={e => setForm({ ...form, velocidad_maxima: e.target.value })}
                placeholder="32.0"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resistencia</label>
              <input
                type="number"
                step="0.1"
                className="input-field"
                value={form.resistencia}
                onChange={e => setForm({ ...form, resistencia: e.target.value })}
                placeholder="0-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fuerza</label>
              <input
                type="number"
                step="0.1"
                className="input-field"
                value={form.fuerza}
                onChange={e => setForm({ ...form, fuerza: e.target.value })}
                placeholder="0-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Agilidad</label>
              <input
                type="number"
                step="0.1"
                className="input-field"
                value={form.agilidad}
                onChange={e => setForm({ ...form, agilidad: e.target.value })}
                placeholder="0-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">VO2 máx</label>
              <input
                type="number"
                step="0.1"
                className="input-field"
                value={form.vo2_max}
                onChange={e => setForm({ ...form, vo2_max: e.target.value })}
                placeholder="60.0"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notas (opcional)</label>
            <textarea
              className="input-field resize-none"
              rows={3}
              value={form.notas}
              onChange={e => setForm({ ...form, notas: e.target.value })}
              placeholder="Observaciones sobre la evaluación..."
            />
          </div>
          {mutation.isError && <p className="text-red-500 text-sm">Error al guardar. Verifica los datos.</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={mutation.isPending} className="btn-primary disabled:opacity-50">
              {mutation.isPending ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear evaluación'}
            </button>
            <button type="button" onClick={() => navigate('/evaluaciones')} className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-background transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
