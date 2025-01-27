import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Bot, Users, Layers, Shield, LayoutDashboard, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

const routes = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    href: "/overview",
  },
  {
    title: "Staff Management",
    icon: Users,
    href: "/staff",
  },
  {
    title: "Chatbot Management",
    icon: Bot,
    href: "/chatbots",
  },
  {
    title: "Namespaces",
    icon: Layers,
    href: "/namespaces",
  },
  {
    title: "Role Management",
    icon: Shield,
    href: "/roles",
  },
]

export function Sidebar() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleLogout = () => {
    // TODO: Implement actual logout logic here
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    navigate("/login")
  }

  return (
    <div className="fixed inset-y-0 left-0 z-50 hidden w-64 border-r bg-background lg:flex lg:flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 font-semibold">
          <Bot className="h-6 w-6" />
          <span className="text-xl">GDHardy</span>
        </div>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 p-4">
          {routes.map((route, i) => (
            <NavLink
              key={route.href}
              to={route.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )
              }
            >
              <route.icon className="h-4 w-4" />
              {route.title}
            </NavLink>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 mt-auto">
        <Separator className="mb-4" />
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}