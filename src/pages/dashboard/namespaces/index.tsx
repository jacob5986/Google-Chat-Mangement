import React, { useState } from "react"
import { Layers, Pencil, Trash2, UserPlus, UserMinus, Users } from "lucide-react"
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

type Member = {
  id: string
  name: string
  email: string
  addedAt?: number
}

type Namespace = {
  number: string
  name: string
  documentTitle: string
  members: Member[]
}

const availableMembers: Member[] = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Robert Johnson", email: "robert@example.com" },
  { id: "4", name: "Emily Davis", email: "emily@example.com" },
  { id: "5", name: "Michael Wilson", email: "michael@example.com" },
]

const initialNamespaces: Namespace[] = [
  {
    number: "NS001",
    name: "Customer Support",
    documentTitle: "Support Documentation",
    members: [availableMembers[0], availableMembers[1]],
  },
  {
    number: "NS002",
    name: "Sales Knowledge",
    documentTitle: "Sales Playbook",
    members: [availableMembers[1], availableMembers[4]],
  },
  {
    number: "NS003",
    name: "Technical Docs",
    documentTitle: "Technical Documentation",
    members: [availableMembers[2], availableMembers[3]],
  },
  {
    number: "NS004",
    name: "Product Specs",
    documentTitle: "Product Specifications",
    members: [availableMembers[0], availableMembers[2], availableMembers[4]],
  },
]

export default function NamespaceManagementPage() {
  const { toast } = useToast()
  const [namespaces, setNamespaces] = useState<Namespace[]>(initialNamespaces)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)
  const [isMemberListModalOpen, setIsMemberListModalOpen] = useState(false)
  const [selectedNamespace, setSelectedNamespace] = useState<Namespace | null>(null)
  const [formData, setFormData] = useState<Partial<Namespace>>({
    name: "",
    documentTitle: "",
    members: [],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddNamespace = () => {
    const newNamespace: Namespace = {
      number: `NS${String(namespaces.length + 1).padStart(3, "0")}`,
      name: formData.name!,
      documentTitle: formData.documentTitle!,
      members: [],
    }
    setNamespaces([...namespaces, newNamespace])
    setIsAddModalOpen(false)
    setFormData({
      name: "",
      documentTitle: "",
      members: [],
    })
    toast({
      title: "Namespace Added",
      description: "New namespace has been added successfully.",
    })
  }

  const handleEditNamespace = () => {
    if (!selectedNamespace) return
    const updatedNamespaces = namespaces.map((ns) =>
      ns.number === selectedNamespace.number
        ? {
            ...ns,
            name: formData.name || ns.name,
            documentTitle: formData.documentTitle || ns.documentTitle,
          }
        : ns
    )
    setNamespaces(updatedNamespaces)
    setIsEditModalOpen(false)
    setSelectedNamespace(null)
    toast({
      title: "Namespace Updated",
      description: "Namespace has been updated successfully.",
    })
  }

  const handleDeleteNamespace = (namespace: Namespace) => {
    const updatedNamespaces = namespaces.filter((ns) => ns.number !== namespace.number)
    setNamespaces(updatedNamespaces)
    toast({
      title: "Namespace Deleted",
      description: "Namespace has been deleted successfully.",
      variant: "destructive",
    })
  }

  const openEditModal = (namespace: Namespace) => {
    setSelectedNamespace(namespace)
    setFormData({
      name: namespace.name,
      documentTitle: namespace.documentTitle,
      members: namespace.members,
    })
    setIsEditModalOpen(true)
  }

  const openMemberModal = (namespace: Namespace) => {
    setSelectedNamespace(namespace)
    setIsMemberModalOpen(true)
  }

  const handleAddMember = (member: Member) => {
    if (!selectedNamespace) return
    const updatedNamespaces = namespaces.map((ns) =>
      ns.number === selectedNamespace.number
        ? {
            ...ns,
            members: [...ns.members, { ...member, addedAt: Date.now() }],
          }
        : ns
    )
    setNamespaces(updatedNamespaces)
    toast({
      title: "Member Added",
      description: `${member.name} has been added to ${selectedNamespace.name}.`,
    })
  }

  const handleRemoveMember = (namespace: Namespace, member: Member) => {
    const updatedNamespaces = namespaces.map((ns) =>
      ns.number === namespace.number
        ? {
            ...ns,
            members: ns.members.filter((m) => m.id !== member.id),
          }
        : ns
    )
    setNamespaces(updatedNamespaces)
    toast({
      title: "Member Removed",
      description: `${member.name} has been removed from ${namespace.name}.`,
    })
  }

  const NamespaceModal = ({ isEdit = false }) => (
    <Dialog
      open={isEdit ? isEditModalOpen : isAddModalOpen}
      onOpenChange={isEdit ? setIsEditModalOpen : setIsAddModalOpen}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Namespace" : "Add New Namespace"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the namespace information below."
              : "Fill in the information for the new namespace."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Namespace Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter namespace name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="documentTitle">Document Title</Label>
            <Input
              id="documentTitle"
              name="documentTitle"
              value={formData.documentTitle}
              onChange={handleInputChange}
              placeholder="Enter document title"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => (isEdit ? setIsEditModalOpen(false) : setIsAddModalOpen(false))}
          >
            Cancel
          </Button>
          <Button onClick={isEdit ? handleEditNamespace : handleAddNamespace}>
            {isEdit ? "Save Changes" : "Add Namespace"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  const MemberModal = () => (
    <Dialog open={isMemberModalOpen} onOpenChange={setIsMemberModalOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Manage Members</DialogTitle>
          <DialogDescription>
            Add or remove members from {selectedNamespace?.name}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <h3 className="font-semibold">Available Members</h3>
          <div className="grid gap-2">
            {availableMembers
              .filter(
                (member) =>
                  !selectedNamespace?.members.find((m) => m.id === member.id)
              )
              .map((member) => (
                <div
                  key={`available-${member.id}`}
                  className="flex items-center justify-between p-2 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddMember(member)}
                  >
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsMemberModalOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  const MemberListModal = () => (
    <Dialog open={isMemberListModalOpen} onOpenChange={setIsMemberListModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Members of {selectedNamespace?.name}</DialogTitle>
          <DialogDescription>
            Current members and their details
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {selectedNamespace?.members.map((member) => (
            <div
              key={`list-${member.id}-${member.addedAt}`}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-muted-foreground">{member.email}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (selectedNamespace) {
                    handleRemoveMember(selectedNamespace, member)
                  }
                }}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <UserMinus className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (selectedNamespace) {
                setIsMemberListModalOpen(false)
                openMemberModal(selectedNamespace)
              }
            }}
          >
            Add Members
          </Button>
          <Button onClick={() => setIsMemberListModalOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Namespace Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>Add Namespace</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Namespaces</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Namespace Name</TableHead>
                <TableHead>Document Title</TableHead>
                <TableHead>Members</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {namespaces.map((namespace) => (
                <TableRow key={namespace.number}>
                  <TableCell className="font-medium">{namespace.number}</TableCell>
                  <TableCell>{namespace.name}</TableCell>
                  <TableCell>{namespace.documentTitle}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedNamespace(namespace)
                        setIsMemberListModalOpen(true)
                      }}
                      className="hover:bg-secondary"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      {namespace.members.length} Members
                    </Button>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(namespace)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteNamespace(namespace)}
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
      <NamespaceModal isEdit={false} />
      <NamespaceModal isEdit={true} />
      <MemberModal />
      <MemberListModal />
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}