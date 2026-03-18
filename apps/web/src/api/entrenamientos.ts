import api from './axios'
import type { SesionEntrenamiento } from '../types'

export async function getEntrenamientos(): Promise<SesionEntrenamiento[]> {
  const response = await api.get('/sesiones_entrenamiento')
  return response.data
}

export async function getEntrenamiento(id: number): Promise<SesionEntrenamiento> {
  const response = await api.get(`/sesiones_entrenamiento/${id}`)
  return response.data
}

export async function createEntrenamiento(data: Partial<SesionEntrenamiento>): Promise<SesionEntrenamiento> {
  const response = await api.post('/sesiones_entrenamiento', { sesion_entrenamiento: data })
  return response.data
}

export async function updateEntrenamiento(id: number, data: Partial<SesionEntrenamiento>): Promise<SesionEntrenamiento> {
  const response = await api.put(`/sesiones_entrenamiento/${id}`, { sesion_entrenamiento: data })
  return response.data
}

export async function deleteEntrenamiento(id: number): Promise<void> {
  await api.delete(`/sesiones_entrenamiento/${id}`)
}
