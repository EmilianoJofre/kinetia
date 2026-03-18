import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getJugador, createJugador, updateJugador } from '../../api/jugadores'
import { getEquipos } from '../../api/equipos'
import PageHeader from '../../components/shared/PageHeader'
import LoadingSpinner from '../../components/shared/LoadingSpinner'

const POSICIONES = ['portero', 'defensa', 'mediocampista', 'delantero']

export default function JugadorForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isEdit = !!id

  const [form, setForm] = useState({
    nombre: '', apellido: '', posicion: 'defensa', edad: '', altura: '', peso: '', numero: '', equipo_id: '', activo: true
  })

  const { data: jugador, isLoading: loadingJugador } = useQuery({
    queryKey: ['jugador', id],
    queryFn: () => getJugador(Number(id)),
    enabled: isEdit
  })
  const { data: equipos = [] } = useQuery({ queryKey: ['equipos'], queryFn: getEquipos })

  useEffect(() => {
    if (jugador) {
      setForm({
        nombre: jugador.nombre,
        apellido: jugador.apellido,
        posicion: jugador.posicion || 'defensa',
        edad: String(jugador.edad || ''),
        altura: String(jugador.altura || ''),
        peso: String(jugador.peso || ''),
        numero: String(jugador.numero || ''),
        equipo_id: String(jugador.equipo_id || ''),
        activo: jugador.activo
      })
    }
  }, [jugador])

  const mutation = useMutation({
    mutationFn: (data: any) => isEdit ? updateJugador(Number(id), data) : createJugador(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jugadores'] })
      navigate('/jugadores')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      ...form,
      edad: Number(form.edad),
      altura: Number(form.altura),
      peso: Number(form.peso),
      numero: Number(form.numero),
      equipo_id: Number(form.equipo_id)
    })
  }

  if (isEdit && loadingJugador) return <LoadingSpinner />

  return (
    <div>
      <PageHeader title={isEdit ? 'Editar jugador' : 'Nuevo jugador'} showBack />
      <div className="card max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input className="input-field" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
              <input className="input-field" value={form.apellido} onChange={e => setForm({ ...form, apellido: e.target.value })} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Posición</label>
              <select className="input-field" value={form.posicion} onChange={e => setForm({ ...form, posicion: e.target.value })}>
                {POSICIONES.map(p => <option key={p} value={p} className="capitalize">{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipo</label>
              <select className="input-field" value={form.equipo_id} onChange={e => setForm({ ...form, equipo_id: e.target.value })} required>
                <option value="">Seleccionar equipo</option>
                {equipos.map(eq => <option key={eq.id} value={eq.id}>{eq.nombre}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
              <input type="number" className="input-field" value={form.edad} onChange={e => setForm({ ...form, edad: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Altura (m)</label>
              <input type="number" step="0.01" className="input-field" value={form.altura} onChange={e => setForm({ ...form, altura: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label>
              <input type="number" step="0.1" className="input-field" value={form.peso} onChange={e => setForm({ ...form, peso: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dorsal</label>
              <input type="number" className="input-field" value={form.numero} onChange={e => setForm({ ...form, numero: e.target.value })} />
            </div>
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
              <label htmlFor="activo" className="text-sm font-medium text-gray-700">Jugador activo</label>
            </div>
          )}
          {mutation.isError && <p className="text-red-500 text-sm">Error al guardar. Verifica los datos.</p>}
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={mutation.isPending} className="btn-primary disabled:opacity-50">
              {mutation.isPending ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Crear jugador'}
            </button>
            <button type="button" onClick={() => navigate('/jugadores')} className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-background transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
