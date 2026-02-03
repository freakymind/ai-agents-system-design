"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Search,
  Bot,
  Settings,
  Activity,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
} from "lucide-react"
import Link from "next/link"

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const agents = [
    {
      id: "kyc-specialist",
      name: "KYC Specialist Agent",
      description: "Automated Know Your Customer verification and compliance checks",
      status: "active",
      health: 98,
      executions: 234,
      successRate: 94.2,
      avgTime: "2m 15s",
      lastRun: "2024-01-15 14:30:22",
      issues: { critical: 0, warning: 1, info: 2 },
      trend: "up",
      tools: ["Identity Verification API", "Sanctions Screening", "PEP Database", "Document Parser"],
      category: "Compliance",
    },
    {
      id: "risk-assessor",
      name: "Risk Assessment Agent",
      description: "Comprehensive business risk evaluation and scoring",
      status: "active",
      health: 87,
      executions: 189,
      successRate: 91.8,
      avgTime: "3m 42s",
      lastRun: "2024-01-15 14:25:15",
      issues: { critical: 1, warning: 2, info: 1 },
      trend: "down",
      tools: ["Risk Scoring Engine", "Industry Database", "Financial Analysis Tool", "Credit Bureau API"],
      category: "Risk Management",
    },
    {
      id: "document-verifier",
      name: "Document Verification Agent",
      description: "Automated document processing and validation",
      status: "active",
      health: 95,
      executions: 456,
      successRate: 97.1,
      avgTime: "1m 28s",
      lastRun: "2024-01-15 14:28:08",
      issues: { critical: 0, warning: 0, info: 1 },
      trend: "up",
      tools: ["OCR Engine", "Document Parser", "Data Validator", "Fraud Detection"],
      category: "Document Processing",
    },
    {
      id: "compliance-officer",
      name: "Compliance Officer Agent",
      description: "Regulatory compliance and legal verification",
      status: "maintenance",
      health: 72,
      executions: 67,
      successRate: 89.5,
      avgTime: "4m 12s",
      lastRun: "2024-01-15 13:45:30",
      issues: { critical: 2, warning: 3, info: 0 },
      trend: "down",
      tools: ["Regulatory Database", "License Checker", "AML Screening", "Legal Entity Validator"],
      category: "Compliance",
    },
    {
      id: "financial-analyzer",
      name: "Financial Analysis Agent",
      description: "Deep financial analysis and creditworthiness assessment",
      status: "active",
      health: 91,
      executions: 312,
      successRate: 93.7,
      avgTime: "5m 18s",
      lastRun: "2024-01-15 14:20:45",
      issues: { critical: 0, warning: 1, info: 3 },
      trend: "up",
      tools: ["Financial Ratio Calculator", "Cash Flow Analyzer", "Credit Scoring Model", "Market Data API"],
      category: "Financial Analysis",
    },
  ]

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || agent.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getHealthColor = (score: number) => {
    if (score >= 90) return "text-emerald-600"
    if (score >= 70) return "text-amber-600"
    return "text-red-600"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "maintenance":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "inactive":
        return "bg-slate-100 text-slate-600 border-slate-200"
      default:
        return "bg-slate-100 text-slate-600 border-slate-200"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Compliance":
        return "bg-purple-100 text-purple-800"
      case "Risk Management":
        return "bg-red-100 text-red-800"
      case "Document Processing":
        return "bg-blue-100 text-blue-800"
      case "Financial Analysis":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-slate-100 text-slate-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            AI Agents Management
          </h1>
          <p className="text-slate-600 mt-1">Create, configure, and monitor your intelligent banking agents</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Agents</p>
                  <p className="text-3xl font-bold">{agents.length}</p>
                  <p className="text-purple-200 text-xs mt-1">Across all categories</p>
                </div>
                <Bot className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Active Agents</p>
                  <p className="text-3xl font-bold">{agents.filter((a) => a.status === "active").length}</p>
                  <p className="text-emerald-200 text-xs mt-1">Currently running</p>
                </div>
                <CheckCircle className="w-8 h-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Avg Success Rate</p>
                  <p className="text-3xl font-bold">
                    {Math.round(agents.reduce((acc, agent) => acc + agent.successRate, 0) / agents.length)}%
                  </p>
                  <p className="text-blue-200 text-xs mt-1">Across all agents</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-sm font-medium">Total Executions</p>
                  <p className="text-3xl font-bold">
                    {agents.reduce((acc, agent) => acc + agent.executions, 0).toLocaleString()}
                  </p>
                  <p className="text-indigo-200 text-xs mt-1">All time</p>
                </div>
                <Activity className="w-8 h-8 text-indigo-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-slate-800">Agent Library</CardTitle>
                <CardDescription>Manage and monitor your AI agents</CardDescription>
              </div>
              <Link href="/agents/create">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Agent
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search agents by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  className={filterStatus === "all" ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "active" ? "default" : "outline"}
                  onClick={() => setFilterStatus("active")}
                  className={filterStatus === "active" ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  Active
                </Button>
                <Button
                  variant={filterStatus === "maintenance" ? "default" : "outline"}
                  onClick={() => setFilterStatus("maintenance")}
                  className={filterStatus === "maintenance" ? "bg-purple-600 hover:bg-purple-700" : ""}
                >
                  Maintenance
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAgents.map((agent) => (
                <Card key={agent.id} className="shadow-md border-0 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            agent.status === "active"
                              ? "bg-emerald-500"
                              : agent.status === "maintenance"
                                ? "bg-amber-500"
                                : "bg-slate-400"
                          }`}
                        />
                        <div>
                          <CardTitle className="text-lg text-slate-800">{agent.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={getStatusColor(agent.status)}>
                              {agent.status}
                            </Badge>
                            <Badge variant="outline" className={getCategoryColor(agent.category)}>
                              {agent.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getHealthColor(agent.health)}`}>{agent.health}%</div>
                        <div className="text-xs text-slate-500">Health Score</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 text-sm">{agent.description}</p>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-slate-50 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-slate-800">{agent.executions}</div>
                        <div className="text-xs text-slate-600">Executions</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-slate-800">{agent.successRate}%</div>
                        <div className="text-xs text-slate-600">Success Rate</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg text-center">
                        <div className="text-lg font-bold text-slate-800">{agent.avgTime}</div>
                        <div className="text-xs text-slate-600">Avg Time</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Performance</span>
                        <span className="font-medium text-slate-800">{agent.successRate}%</span>
                      </div>
                      <Progress value={agent.successRate} className="h-2" />
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-800 mb-2 text-sm">Assigned Tools</h4>
                      <div className="flex flex-wrap gap-1">
                        {agent.tools.slice(0, 3).map((tool, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                        {agent.tools.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{agent.tools.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex gap-2">
                        {agent.issues.critical > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {agent.issues.critical}
                          </Badge>
                        )}
                        {agent.issues.warning > 0 && (
                          <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {agent.issues.warning}
                          </Badge>
                        )}
                        {agent.issues.critical === 0 && agent.issues.warning === 0 && (
                          <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Healthy
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        {agent.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                        <span>Last run: {new Date(agent.lastRun).toLocaleTimeString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Link href={`/agents/${agent.id}/configure`} className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                        >
                          <Settings className="w-4 h-4 mr-1" />
                          Configure
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Monitor
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-slate-200 text-slate-700 hover:bg-slate-50 bg-transparent"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAgents.length === 0 && (
              <div className="text-center py-12">
                <Bot className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">No agents found</h3>
                <p className="text-slate-600 mb-4">
                  {searchTerm || filterStatus !== "all"
                    ? "Try adjusting your search or filter criteria"
                    : "Get started by creating your first AI agent"}
                </p>
                <Link href="/agents/create">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Agent
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
