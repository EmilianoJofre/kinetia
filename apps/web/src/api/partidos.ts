import api from './axios'
import type { Partido } from '../types'

export async function getPartidos(): Promise<Partido[]> {
  const response = await api.get('/partidos')
  return response.data
}

export async function getPartido(id: number): Promise<Partido> {
  const response = await api.get(`/partidos/${id}`)
  return response.data
}

export async function createPartido(data: Partial<Partido>): Promise<Partido> {
  const response = await api.post('/partidos', { partido: data })
  return response.data
}

export async function updatePartido(id: number, data: Partial<Partido>): Promise<Partido> {
  const response = await api.put(`/partidos/${id}`, { partido: data })
  return response.data
}

export async function deletePartido(id: number): Promise<void> {
  await api.delete(`/partidos/${id}`)
}
