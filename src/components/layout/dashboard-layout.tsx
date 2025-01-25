import React from "react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "./sidebar"

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-64">
        <main className="h-full min-h-screen p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}