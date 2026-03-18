import api from './axios'
import type { DashboardData } from '../types'

export async function getDashboard(): Promise<DashboardData> {
  const response = await api.get('/dashboard')
  return response.data
}
