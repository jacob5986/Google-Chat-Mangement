import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'
import { DashboardLayout } from './components/layout/dashboard-layout'
import LoginPage from './pages/auth/login'
import DashboardPage from './pages/dashboard'
import StaffManagementPage from './pages/dashboard/staff'
import ChatbotManagementPage from './pages/dashboard/chatbots'
import NamespaceManagementPage from './pages/dashboard/namespaces'
import RoleManagementPage from './pages/dashboard/roles'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="gdhardy-theme">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/overview" element={<DashboardPage />} />
          <Route path="staff" element={<StaffManagementPage />} />
          <Route path="chatbots" element={<ChatbotManagementPage />} />
          <Route path="namespaces" element={<NamespaceManagementPage />} />
          <Route path="roles" element={<RoleManagementPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
      <Toaster />
    </ThemeProvider >
  )
}