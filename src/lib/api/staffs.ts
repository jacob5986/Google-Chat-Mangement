import api from './axios'

export interface Staff {
  id: string
  number: string
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive'
  created_at: string
  updated_at: string
}

export interface CreateStaffDto {
  name: string
  email: string
  role: string
  status: Staff['status']
}

export interface UpdateStaffDto extends Partial<CreateStaffDto> { }

export const staffApi = {
  getAll: async () => {
    const response = await api.get<Staff[]>('/staff_all')
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get<Staff>(`/staff/${id}`)
    return response.data
  },

  create: async (data: CreateStaffDto) => {
    const response = await api.post<Staff>('/staff', data)
    return response.data
  },

  update: async (id: string, data: UpdateStaffDto) => {
    const response = await api.patch<Staff>(`/staff/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    await api.delete(`/staff/${id}`)
  },
}