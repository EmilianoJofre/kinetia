import api from './axios'
import type { Lesion } from '../types'

export async function getLesiones(params?: { jugador_id?: number; estado?: string }): Promise<Lesion[]> {
  const response = await api.get('/lesiones', { params })
  return response.data
}

export async function getLesion(id: number): Promise<Lesion> {
  const response = await api.get(`/lesiones/${id}`)
  return response.data
}

export async function createLesion(data: Partial<Lesion>): Promise<Lesion> {
  const response = await api.post('/lesiones', { lesion: data })
  return response.data
}

export async function updateLesion(id: number, data: Partial<Lesion>): Promise<Lesion> {
  const response = await api.put(`/lesiones/${id}`, { lesion: data })
  return response.data
}

export async function deleteLesion(id: number): Promise<void> {
  await api.delete(`/lesiones/${id}`)
}
