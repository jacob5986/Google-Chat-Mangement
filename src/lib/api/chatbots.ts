import api from './axios'

export interface Chatbot {
  id: string
  number: string
  name: string
  role: string
  status: 'Online' | 'Offline' | 'Maintenance'
  created_at: string
  updated_at: string
}

export interface CreateChatbotDto {
  name: string
  role: string
  status: Chatbot['status']
}

export interface UpdateChatbotDto extends Partial<CreateChatbotDto> { }

export const chatbotApi = {
  getAll: async () => {
    const response = await api.get<Chatbot[]>('/chatbots')
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get<Chatbot>(`/chatbots/${id}`)
    return response.data
  },

  create: async (data: CreateChatbotDto) => {
    const response = await api.post<Chatbot>('/chatbots', data)
    return response.data
  },

  update: async (id: string, data: UpdateChatbotDto) => {
    const response = await api.patch<Chatbot>(`/chatbots/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    await api.delete(`/chatbots/${id}`)
  },
}