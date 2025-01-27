import React, { useState } from "react"
import { Shield, Pencil, Trash2 } from "lucide-react"
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

type Role = {
  number: string
  name: string
  level: number
}

const initialRoles: Role[] = [
  {
    number: "ROLE001",
    name: "Administrator",
    level: 5,
  },
  {
    number: "ROLE002",
    name: "Manager",
    level: 4,
  },
  {
    number: "ROLE003",
    name: "Team Lead",
    level: 3,
  },
  {
    number: "ROLE004",
    name: "Support Agent",
    level: 2,
  },
  {
    number: "ROLE005",
    name: "Viewer",
    level: 1,
  },
]

export default function RoleManagementPage() {
  const { toast } = useToast()
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [formData, setFormData] = useState<Partial<Role>>({
    name: "",
    level: 1,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "level" ? parseInt(value) || 1 : value,
    }))
  }

  const handleAddRole = () => {
    const newRole: Role = {
      number: `ROLE${String(roles.length + 1).padStart(3, "0")}`,
      name: formData.name!,
      level: formData.level || 1,
    }
    setRoles([...roles, newRole])
    handleCloseModal(false)
    toast({
      title: "Role Added",
      description: "New role has been added successfully.",
    })
  }

  const handleEditRole = () => {
    if (!selectedRole) return
    const updatedRoles = roles.map((role) =>
      role.number === selectedRole.number
        ? {
          ...role,
          name: formData.name || role.name,
          level: formData.level || role.level,
        }
        : role
    )
    setRoles(updatedRoles)
    handleCloseModal(true)
    toast({
      title: "Role Updated",
      description: "Role has been updated successfully.",
    })
  }

  const handleDeleteRole = (role: Role) => {
    const updatedRoles = roles.filter((r) => r.number !== role.number)
    setRoles(updatedRoles)
    toast({
      title: "Role Deleted",
      description: "Role has been deleted successfully.",
      variant: "destructive",
    })
  }

  const openEditModal = (role: Role) => {
    setSelectedRole(role)
    setFormData({
      name: role.name,
      level: role.level,
    })
    setIsEditModalOpen(true)
  }

  const handleCloseModal = (isEdit: boolean) => {
    if (isEdit) {
      setIsEditModalOpen(false)
      setSelectedRole(null)
    } else {
      setIsAddModalOpen(false)
    }
    setFormData({
      name: "",
      level: 1,
    })
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 5:
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case 4:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case 3:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case 2:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Role Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>Add Role</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Role Name</TableHead>
                <TableHead>Level</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.number}>
                  <TableCell className="font-medium">{role.number}</TableCell>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        getLevelColor(role.level)
                      )}
                    >
                      Level {role.level}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(role)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRole(role)}
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

      {/* Add Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Role</DialogTitle>
            <DialogDescription>
              Fill in the information for the new role.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Role Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter role name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="level">Role Level</Label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
              >
                <option value="1">Level 1 (Viewer)</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3 (Team Lead)</option>
                <option value="4">Level 4 (Manager)</option>
                <option value="5">Level 5 (Administrator)</option>
              </select>
              <p className="text-sm text-muted-foreground">
                Level 5: Administrator, Level 1: Viewer
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleCloseModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddRole}>Add Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription>
              Update the role's information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Role Name</Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter role name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-level">Role Level</Label>
              <select
                id="edit-level"
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-foreground"
              >
                <option value="1">Level 1 (Viewer)</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3 (Team Lead)</option>
                <option value="4">Level 4 (Manager)</option>
                <option value="5">Level 5 (Administrator)</option>
              </select>
              <p className="text-sm text-muted-foreground">
                Level 5: Administrator, Level 1: Viewer
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleCloseModal(true)}>
              Cancel
            </Button>
            <Button onClick={handleEditRole}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}