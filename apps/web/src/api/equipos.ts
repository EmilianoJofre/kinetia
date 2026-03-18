import api from './axios'
import type { Equipo } from '../types'

export async function getEquipos(): Promise<Equipo[]> {
  const response = await api.get('/equipos')
  return response.data
}

export async function getEquipo(id: number): Promise<Equipo> {
  const response = await api.get(`/equipos/${id}`)
  return response.data
}

export async function createEquipo(data: Partial<Equipo>): Promise<Equipo> {
  const response = await api.post('/equipos', { equipo: data })
  return response.data
}

export async function updateEquipo(id: number, data: Partial<Equipo>): Promise<Equipo> {
  const response = await api.put(`/equipos/${id}`, { equipo: data })
  return response.data
}

export async function deleteEquipo(id: number): Promise<void> {
  await api.delete(`/equipos/${id}`)
}
