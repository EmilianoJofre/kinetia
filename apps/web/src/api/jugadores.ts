import api from './axios'
import type { Jugador } from '../types'

export async function getJugadores(equipoId?: number): Promise<Jugador[]> {
  const params = equipoId ? { equipo_id: equipoId } : {}
  const response = await api.get('/jugadores', { params })
  return response.data
}

export async function getJugador(id: number): Promise<Jugador & { estadisticas: any[]; evaluaciones: any[]; lesiones: any[] }> {
  const response = await api.get(`/jugadores/${id}`)
  return response.data
}

export async function createJugador(data: Partial<Jugador>): Promise<Jugador> {
  const response = await api.post('/jugadores', { jugador: data })
  return response.data
}

export async function updateJugador(id: number, data: Partial<Jugador>): Promise<Jugador> {
  const response = await api.put(`/jugadores/${id}`, { jugador: data })
  return response.data
}

export async function deleteJugador(id: number): Promise<void> {
  await api.delete(`/jugadores/${id}`)
}
