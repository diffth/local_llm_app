import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export async function fetchModels() {
  const response = await api.get('/models')
  return response.data.models
}

export async function sendChatMessage(payload) {
  const response = await api.post('/chat', payload)
  return response.data
}
