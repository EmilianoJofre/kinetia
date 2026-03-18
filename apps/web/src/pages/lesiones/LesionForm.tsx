import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getLesion, createLesion, updateLesion } from '../../api/lesiones'
import { getJugadores } from '../../api/jugadores'
import PageHeader from '../../components/shared/PageHeader'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

export default function LesionForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEdit = !!id

  const [form, setForm] = useState({
    jugador_id: '',
    tipo: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_estimada_retorno: '',
    estado: 'activa'
  })

  const { data: lesion, isLoading: loadingLesion } = useQuery({
    queryKey: ['lesion', id],
    queryFn: () => getLesion(Number(id)),
    enabled: isEdit
  })

  const { data: jugadores = [] } = useQuery({ queryKey: ['jugadores'], queryFn: () => getJugadores() })

  useEffect(() => {
    if (lesion) {
      setForm({
        jugador_id: String(lesion.jugador_id || ''),
        tipo: lesion.tipo || '',
        descripcion: lesion.descripcion || '',
        fecha_inicio: lesion.fecha_inicio ? lesion.fecha_inicio.slice(0, 10) : '',
        fecha_estimada_retorno: lesion.fecha_estimada_retorno ? lesion.fecha_estimada_retorno.slice(0, 10) : '',
        estado: lesion.estado || 'activa'
      })
    }
  }, [lesion])

  const mutation = useMutation({
    mutationFn: (data: any) => isEdit ? updateLesion(Number(id), data) : createLesion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lesiones'] })
      navigate('/lesiones')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload: any = {
      ...form,
      jugador_id: Number(form.jugador_id)
    }
    if (!payload.fecha_estimada_retorno) delete payload.fecha_estimada_retorno
    mutation.mutate(payload)
  }

  if (isEdit && loadingLesion) return <LoadingSpinner />

  return (
    <div>
      <PageHeader title={isEdit ? 'Editar lesión' : 'Registrar lesión'} showBack />
      <div className="card max-w-xl">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de lesión</label>
              <input
                className="input-field"
                value={form.tipo}
                onChange={e => setForm({ ...form, tipo: e.target.value })}
                required
                placeholder="Ej: Esguince de tobillo"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              className="input-field resize-none"
              rows={3}
              value={form.descripcion}
              onChange={e => setForm({ ...form, descripcion: e.target.value })}
              placeholder="Describe el diagnóstico y tratamiento..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de inicio</label>
              <input
                type="date"
                className="input-field"
                value={form.fecha_inicio}
                onChange={e => setForm({ ...form, fecha_inicio: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Retorno estimado (opcional)</label>
              <input
                type="date"
                className="input-field"
                value={form.fecha_estimada_retorno}
                onChange={e => setForm({ ...form, fecha_estimada_retorno: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              className="input-field"
              value={form.estado}
              onChange={e => setForm({ ...form, estado: e.target.value })}
            >
              <option value="activa">Activa</option>
              <option value="recuperada">Recuperada</option>
            </select>
          </div>
          {mutation.isError && <p className="text-red-500 text-sm">Error al guardar. Verifica los datos.</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={mutation.isPending} className="btn-primary disabled:opacity-50">
              {mutation.isPending ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Registrar lesión'}
            </button>
            <button type="button" onClick={() => navigate('/lesiones')} className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-background transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
