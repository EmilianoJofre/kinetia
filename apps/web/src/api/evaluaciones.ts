import api from './axios'
import type { EvaluacionFisica } from '../types'

export async function getEvaluaciones(jugadorId?: number): Promise<EvaluacionFisica[]> {
  const params = jugadorId ? { jugador_id: jugadorId } : {}
  const response = await api.get('/evaluaciones_fisicas', { params })
  return response.data
}

export async function getEvaluacion(id: number): Promise<EvaluacionFisica> {
  const response = await api.get(`/evaluaciones_fisicas/${id}`)
  return response.data
}

export async function createEvaluacion(data: Partial<EvaluacionFisica>): Promise<EvaluacionFisica> {
  const response = await api.post('/evaluaciones_fisicas', { evaluacion_fisica: data })
  return response.data
}

export async function updateEvaluacion(id: number, data: Partial<EvaluacionFisica>): Promise<EvaluacionFisica> {
  const response = await api.put(`/evaluaciones_fisicas/${id}`, { evaluacion_fisica: data })
  return response.data
}

export async function deleteEvaluacion(id: number): Promise<void> {
  await api.delete(`/evaluaciones_fisicas/${id}`)
}
