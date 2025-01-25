import React, { useState } from "react"
import { Users, Pencil, Trash2 } from "lucide-react"
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

type Staff = {
  number: string
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
}

// Example data
const initialStaffMembers: Staff[] = [
  {
    number: "001",
    name: "John Doe",
    email: "john.doe@gdhardy.com",
    role: "Administrator",
    status: "Active",
  },
  {
    number: "002",
    name: "Jane Smith",
    email: "jane.smith@gdhardy.com",
    role: "Manager",
    status: "Active",
  },
  {
    number: "003",
    name: "Robert Johnson",
    email: "robert.johnson@gdhardy.com",
    role: "Support Agent",
    status: "Inactive",
  },
  {
    number: "004",
    name: "Emily Davis",
    email: "emily.davis@gdhardy.com",
    role: "Support Agent",
    status: "Active",
  },
  {
    number: "005",
    name: "Michael Wilson",
    email: "michael.wilson@gdhardy.com",
    role: "Manager",
    status: "Active",
  },
]

export default function StaffManagementPage() {
  const { toast } = useToast()
  const [staffMembers, setStaffMembers] = useState<Staff[]>(initialStaffMembers)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [formData, setFormData] = useState<Partial<Staff>>({
    name: "",
    email: "",
    role: "",
    status: "Active",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddStaff = () => {
    const newStaff: Staff = {
      number: String(staffMembers.length + 1).padStart(3, "0"),
      name: formData.name!,
      email: formData.email!,
      role: formData.role!,
      status: formData.status as "Active" | "Inactive",
    }
    setStaffMembers([...staffMembers, newStaff])
    setIsAddModalOpen(false)
    setFormData({
      name: "",
      email: "",
      role: "",
      status: "Active",
    })
    toast({
      title: "Staff Added",
      description: "New staff member has been added successfully.",
    })
  }

  const handleEditStaff = () => {
    if (!selectedStaff) return
    const updatedStaffMembers = staffMembers.map((staff) =>
      staff.number === selectedStaff.number
        ? {
            ...staff,
            name: formData.name || staff.name,
            email: formData.email || staff.email,
            role: formData.role || staff.role,
            status: (formData.status as "Active" | "Inactive") || staff.status,
          }
        : staff
    )
    setStaffMembers(updatedStaffMembers)
    setIsEditModalOpen(false)
    setSelectedStaff(null)
    toast({
      title: "Staff Updated",
      description: "Staff member has been updated successfully.",
    })
  }

  const handleDeleteStaff = (staff: Staff) => {
    const updatedStaffMembers = staffMembers.filter((s) => s.number !== staff.number)
    setStaffMembers(updatedStaffMembers)
    toast({
      title: "Staff Deleted",
      description: "Staff member has been deleted successfully.",
      variant: "destructive",
    })
  }

  const openEditModal = (staff: Staff) => {
    setSelectedStaff(staff)
    setFormData({
      name: staff.name,
      email: staff.email,
      role: staff.role,
      status: staff.status,
    })
    setIsEditModalOpen(true)
  }

  const StaffModal = ({ isEdit = false }) => (
    <Dialog
      open={isEdit ? isEditModalOpen : isAddModalOpen}
      onOpenChange={isEdit ? setIsEditModalOpen : setIsAddModalOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Staff Member" : "Add New Staff Member"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the staff member's information below."
              : "Fill in the information for the new staff member."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="Enter role"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
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
          <Button onClick={isEdit ? handleEditStaff : handleAddStaff}>
            {isEdit ? "Save Changes" : "Add Staff"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>Add Staff Member</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffMembers.map((staff) => (
                <TableRow key={staff.number}>
                  <TableCell className="font-medium">{staff.number}</TableCell>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        staff.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      )}
                    >
                      {staff.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(staff)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteStaff(staff)}
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
      <StaffModal isEdit={false} />
      <StaffModal isEdit={true} />
    </div>
  )
}

// Helper function for conditional class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}