import api from './axios'

export interface Namespace {
  id: string
  number: string
  name: string
  document_title: string
  created_at: string
  updated_at: string
  members: Array<{
    id: string
    name: string
    email: string
  }>
}

export interface CreateNamespaceDto {
  name: string
  document_title: string
}

export interface UpdateNamespaceDto extends Partial<CreateNamespaceDto> { }

export const namespaceApi = {
  getAll: async () => {
    const response = await api.get<Namespace[]>('/namespaces')
    return response.data
  },

  getById: async (id: string) => {
    const response = await api.get<Namespace>(`/namespaces/${id}`)
    return response.data
  },

  create: async (data: CreateNamespaceDto) => {
    const response = await api.post<Namespace>('/namespaces', data)
    return response.data
  },

  update: async (id: string, data: UpdateNamespaceDto) => {
    const response = await api.patch<Namespace>(`/namespaces/${id}`, data)
    return response.data
  },

  delete: async (id: string) => {
    await api.delete(`/namespaces/${id}`)
  },

  addMember: async (namespaceId: string, memberId: string) => {
    const response = await api.post<Namespace>(`/namespaces/${namespaceId}/members`, {
      member_id: memberId,
    })
    return response.data
  },

  removeMember: async (namespaceId: string, memberId: string) => {
    await api.delete(`/namespaces/${namespaceId}/members/${memberId}`)
  },
}