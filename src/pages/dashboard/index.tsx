import React from "react"
import { Bot, Users, MessageSquare, Layers, Shield, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"

// Sample data for charts
const botUsageData = [
  { name: 'Mon', messages: 1200 },
  { name: 'Tue', messages: 1800 },
  { name: 'Wed', messages: 1600 },
  { name: 'Thu', messages: 2100 },
  { name: 'Fri', messages: 1900 },
  { name: 'Sat', messages: 1000 },
  { name: 'Sun', messages: 800 },
]

const namespaceUsageData = [
  { name: 'Customer Support', usage: 850 },
  { name: 'Sales Knowledge', usage: 620 },
  { name: 'Technical Docs', usage: 540 },
  { name: 'Product Specs', usage: 480 },
]

const recentInteractions = [
  { id: 1, bot: 'Customer Support Bot', user: 'john@example.com', time: '5 mins ago', status: 'success' },
  { id: 2, bot: 'Sales Assistant', user: 'sarah@example.com', time: '12 mins ago', status: 'success' },
  { id: 3, bot: 'Technical Support', user: 'mike@example.com', time: '25 mins ago', status: 'failed' },
  { id: 4, bot: 'Product Advisor', user: 'emma@example.com', time: '32 mins ago', status: 'success' },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover p-2 rounded-lg border shadow-sm">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">
          {payload[0].name === "messages" ? "Messages: " : "Usage: "}
          {payload[0].value}
        </p>
      </div>
    )
  }
  return null
}

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-emerald-500 dark:text-emerald-400 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +2 this month
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Chatbots</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-emerald-500 dark:text-emerald-400 inline-flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                All operational
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Namespaces</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-emerald-500 dark:text-emerald-400 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +1 this week
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9,432</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-red-500 dark:text-red-400 inline-flex items-center">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -5% from yesterday
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bot Usage Over Time</CardTitle>
            <CardDescription>Messages processed per day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={botUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="messages"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Namespaces</CardTitle>
            <CardDescription>Usage by namespace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={namespaceUsageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    tick={{ fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="usage"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Interactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Interactions</CardTitle>
          <CardDescription>Latest bot-user interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bot</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentInteractions.map((interaction) => (
                <TableRow key={interaction.id}>
                  <TableCell className="font-medium">{interaction.bot}</TableCell>
                  <TableCell>{interaction.user}</TableCell>
                  <TableCell>{interaction.time}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${interaction.status === 'success'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-red-500/20 text-red-400'
                        }`}
                    >
                      {interaction.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}