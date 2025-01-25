import React, { useState } from "react"
import { Bot, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

type Chatbot = {
  number: string
  name: string
  role: string
  status: "Online" | "Offline" | "Maintenance"
}

const initialChatbots: Chatbot[] = [
  {
    number: "BOT001",
    name: "Customer Support Bot",
    role: "Customer Service",
    status: "Online",
  },
  {
    number: "BOT002",
    name: "Sales Assistant",
    role: "Sales",
    status: "Online",
  },
  {
    number: "BOT003",
    name: "Technical Support",
    role: "Technical Support",
    status: "Maintenance",
  },
  {
    number: "BOT004",
    name: "Product Advisor",
    role: "Product Consultation",
    status: "Online",
  },
  {
    number: "BOT005",
    name: "FAQ Bot",
    role: "General Support",
    status: "Offline",
  },
]

export default function ChatbotManagementPage() {
  const { toast } = useToast()
  const [chatbots, setChatbots] = useState<Chatbot[]>(initialChatbots)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedBot, setSelectedBot] = useState<Chatbot | null>(null)
  const [formData, setFormData] = useState<Partial<Chatbot>>({
    name: "",
    role: "",
    status: "Online",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddBot = () => {
    const newBot: Chatbot = {
      number: `BOT${String(chatbots.length + 1).padStart(3, "0")}`,
      name: formData.name!,
      role: formData.role!,
      status: formData.status as "Online" | "Offline" | "Maintenance",
    }
    setChatbots([...chatbots, newBot])
    setIsAddModalOpen(false)
    setFormData({
      name: "",
      role: "",
      status: "Online",
    })
    toast({
      title: "Chatbot Added",
      description: "New chatbot has been added successfully.",
    })
  }

  const handleEditBot = () => {
    if (!selectedBot) return
    const updatedChatbots = chatbots.map((bot) =>
      bot.number === selectedBot.number
        ? {
          ...bot,
          name: formData.name || bot.name,
          role: formData.role || bot.role,
          status: (formData.status as "Online" | "Offline" | "Maintenance") || bot.status,
        }
        : bot
    )
    setChatbots(updatedChatbots)
    setIsEditModalOpen(false)
    setSelectedBot(null)
    toast({
      title: "Chatbot Updated",
      description: "Chatbot has been updated successfully.",
    })
  }

  const handleDeleteBot = (bot: Chatbot) => {
    const updatedChatbots = chatbots.filter((b) => b.number !== bot.number)
    setChatbots(updatedChatbots)
    toast({
      title: "Chatbot Deleted",
      description: "Chatbot has been deleted successfully.",
      variant: "destructive",
    })
  }

  const openEditModal = (bot: Chatbot) => {
    setSelectedBot(bot)
    setFormData({
      name: bot.name,
      role: bot.role,
      status: bot.status,
    })
    setIsEditModalOpen(true)
  }

  const getStatusColor = (status: Chatbot["status"]) => {
    switch (status) {
      case "Online":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Offline":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const ChatbotModal = ({ isEdit = false }) => (
    <Dialog
      open={isEdit ? isEditModalOpen : isAddModalOpen}
      onOpenChange={isEdit ? setIsEditModalOpen : setIsAddModalOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Chatbot" : "Add New Chatbot"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the chatbot's information below."
              : "Fill in the information for the new chatbot."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Bot Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter bot name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Bot Role</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="Enter bot role"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => (isEdit ? setIsEditModalOpen(false) : setIsAddModalOpen(false))}
          >
            Cancel
          </Button>
          <Button onClick={isEdit ? handleEditBot : handleAddBot}>
            {isEdit ? "Save Changes" : "Add Chatbot"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Chatbot Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>Add Chatbot</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Chatbots</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Bot Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chatbots.map((bot) => (
                <TableRow key={bot.number}>
                  <TableCell className="font-medium">{bot.number}</TableCell>
                  <TableCell>{bot.name}</TableCell>
                  <TableCell>{bot.role}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        getStatusColor(bot.status)
                      )}
                    >
                      {bot.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(bot)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteBot(bot)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ChatbotModal isEdit={false} />
      <ChatbotModal isEdit={true} />
    </div>
  )
}

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}