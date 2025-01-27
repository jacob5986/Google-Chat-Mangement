import api from './axios'

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post<AuthResponse>('/auth/login', credentials)
    return response.data
  },

  logout: async () => {
    await api.post('/auth/logout')
    localStorage.removeItem('token')
  },

  getCurrentUser: async () => {
    const response = await api.get<AuthResponse['user']>('/auth/me')
    return response.data
  },
}