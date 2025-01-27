import api from './axios'

export interface Role {
  id: string
  number: string
  name: string
  level: number
  created_at: string
  updated_at: string
}

export interface CreateRoleDto {
  name: string
  level: number
}

export interface UpdateRoleDto extends Partial<CreateRoleDto> { }

export const roleApi = {
  getAll: async () => {
    const response = await api.get<Role[]>('/roles')
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get<Role>(`/roles/${id}`)
    return response.data
  },

  create: async (data: CreateRoleDto) => {
    const response = await api.post<Role>('/roles', data)
    return response.data
  },

  update: async (id: string, data: UpdateRoleDto) => {
    const response = await api.patch<Role>(`/roles/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    await api.delete(`/roles/${id}`)
  },
}