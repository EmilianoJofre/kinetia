import api from './axios'
import type { Usuario } from '../types'

export async function getUsuarios(): Promise<Usuario[]> {
  const response = await api.get('/usuarios')
  return response.data
}

export async function getUsuario(id: number): Promise<Usuario> {
  const response = await api.get(`/usuarios/${id}`)
  return response.data
}

export async function createUsuario(data: Partial<Usuario> & { password?: string }): Promise<Usuario> {
  const response = await api.post('/usuarios', { usuario: data })
  return response.data
}

export async function updateUsuario(id: number, data: Partial<Usuario>): Promise<Usuario> {
  const response = await api.put(`/usuarios/${id}`, { usuario: data })
  return response.data
}

export async function deleteUsuario(id: number): Promise<void> {
  await api.delete(`/usuarios/${id}`)
}
