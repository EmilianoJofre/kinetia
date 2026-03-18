import axios from 'axios'

const AUTH_BASE = '/api/v1'

export async function login(email: string, password: string) {
  const response = await axios.post(`${AUTH_BASE}/login`, { email, password })
  return response.data
}

export async function loginDemo() {
  const response = await axios.post(`${AUTH_BASE}/demo`)
  return response.data
}
