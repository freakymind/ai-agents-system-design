"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  Settings,
  Code,
  Database,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface Tool {
  id: string
  name: string
  description: string
  category: string
  type: "api" | "websocket" | "llm" | "script" | "database" | "search" | "external"
  status: "active" | "inactive" | "maintenance"
  usageCount: number
  lastUpdated: string
  healthScore: number
  avgResponseTime: number
  errorRate: number
  agentRuns: {
    total: number
    successful: number
    failed: number
    lastRun: string
  }
  issues: {
    critical: number
    warning: number
    info: number
  }
  configuration: {
    endpoint?: string
    method?: string
    headers?: Record<string, string>
    parameters?: ToolParameter[]
    searchQuery?: string
    databaseTable?: string
    processingScript?: string
  }
}

interface ToolParameter {
  name: string
  type: "string" | "number" | "boolean" | "object"
  required: boolean
  description: string
  defaultValue?: any
}

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("overview")

  const tools: Tool[] = [
    {
      id: "doc-verification",
      name: "Document Verification API",
      description: "AI-powered document authenticity verification using external OCR service",
      category: "KYC",
      type: "api",
      status: "active",
      usageCount: 1247,
      lastUpdated: "2024-01-15",
      healthScore: 94,
      avgResponseTime: 1.2,
      errorRate: 2.1,
      agentRuns: {
        total: 1247,
        successful: 1221,
        failed: 26,
        lastRun: "2 minutes ago",
      },
      issues: {
        critical: 0,
        warning: 1,
        info: 2,
      },
      configuration: {
        endpoint: "https://api.docverify.com/v2/verify",
        method: "POST",
        headers: {
          Authorization: "Bearer ${API_KEY}",
          "Content-Type": "application/json",
        },
        parameters: [
          { name: "document_image", type: "string", required: true, description: "Base64 encoded document image" },
          {
            name: "document_type",
            type: "string",
            required: true,
            description: "Type of document (passport, license, etc.)",
          },
          {
            name: "confidence_threshold",
            type: "number",
            required: false,
            description: "Minimum confidence score",
            defaultValue: 0.85,
          },
        ],
      },
    },
    {
      id: "identity-search",
      name: "Identity Database Search",
      description: "Search government identity databases for verification",
      category: "KYC",
      type: "search",
      status: "active",
      usageCount: 892,
      lastUpdated: "2024-01-14",
      healthScore: 87,
      avgResponseTime: 2.8,
      errorRate: 5.2,
      agentRuns: {
        total: 892,
        successful: 847,
        failed: 45,
        lastRun: "5 minutes ago",
      },
      issues: {
        critical: 1,
        warning: 3,
        info: 1,
      },
      configuration: {
        searchQuery: "SELECT * FROM identity_records WHERE document_number = ? AND full_name = ?",
        databaseTable: "government_identity_db",
        parameters: [
          { name: "document_number", type: "string", required: true, description: "Government issued document number" },
          { name: "full_name", type: "string", required: true, description: "Full legal name" },
          {
            name: "date_of_birth",
            type: "string",
            required: false,
            description: "Date of birth for additional verification",
          },
        ],
      },
    },
    {
      id: "risk-assessment-llm",
      name: "AI Risk Assessment",
      description: "LLM-powered comprehensive business risk evaluation",
      category: "Risk Assessment",
      type: "llm",
      status: "active",
      usageCount: 634,
      lastUpdated: "2024-01-15",
      healthScore: 98,
      avgResponseTime: 3.4,
      errorRate: 0.8,
      agentRuns: {
        total: 634,
        successful: 629,
        failed: 5,
        lastRun: "1 minute ago",
      },
      issues: {
        critical: 0,
        warning: 0,
        info: 1,
      },
      configuration: {
        endpoint: "https://api.openai.com/v1/chat/completions",
        method: "POST",
      },
    },
    {
      id: "sanctions-screening",
      name: "Sanctions Screening Engine",
      description: "Real-time sanctions and watchlist screening service",
      category: "Compliance",
      type: "websocket",
      status: "maintenance",
      usageCount: 423,
      lastUpdated: "2024-01-13",
      healthScore: 65,
      avgResponseTime: 0.9,
      errorRate: 12.3,
      agentRuns: {
        total: 423,
        successful: 371,
        failed: 52,
        lastRun: "2 hours ago",
      },
      issues: {
        critical: 2,
        warning: 4,
        info: 0,
      },
      configuration: {
        endpoint: "wss://sanctions-api.compliance.com/stream",
      },
    },
  ]

  const categories = ["all", ...new Set(tools.map((tool) => tool.category))]

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Dashboard Statistics
  const totalTools = tools.length
  const activeTools = tools.filter((t) => t.status === "active").length
  const totalRuns = tools.reduce((sum, tool) => sum + tool.agentRuns.total, 0)
  const totalIssues = tools.reduce((sum, tool) => sum + tool.issues.critical + tool.issues.warning, 0)
  const avgHealthScore = Math.round(tools.reduce((sum, tool) => sum + tool.healthScore, 0) / tools.length)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "inactive":
        return "bg-slate-100 text-slate-600 border-slate-200"
      case "maintenance":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-slate-100 text-slate-600 border-slate-200"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "api":
        return <Code className="w-4 h-4 text-purple-600" />
      case "websocket":
        return <Activity className="w-4 h-4 text-blue-600" />
      case "llm":
        return <Zap className="w-4 h-4 text-indigo-600" />
      case "script":
        return <Settings className="w-4 h-4 text-green-600" />
      case "database":
      case "search":
        return <Database className="w-4 h-4 text-cyan-600" />
      case "external":
        return <Shield className="w-4 h-4 text-orange-600" />
      default:
        return <Settings className="w-4 h-4 text-gray-600" />
    }
  }

  const getHealthColor = (score: number) => {
    if (score >= 90) return "text-emerald-600"
    if (score >= 70) return "text-amber-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* NatWest Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Tool Library
              </h1>
              <p className="text-slate-600 mt-1">Manage and monitor your AI-powered banking tools</p>
            </div>
            <div className="flex gap-3">
              <Link href="/tools/create">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Tool
                </Button>
              </Link>
              <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                Configure Tools
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-slate-200 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Tools
            </TabsTrigger>
            <TabsTrigger
              value="monitoring"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Activity className="w-4 h-4 mr-2" />
              Monitoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Total Tools</p>
                      <p className="text-3xl font-bold">{totalTools}</p>
                    </div>
                    <Settings className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100 text-sm font-medium">Active Tools</p>
                      <p className="text-3xl font-bold">{activeTools}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-emerald-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Agent Runs</p>
                      <p className="text-3xl font-bold">{totalRuns.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-100 text-sm font-medium">Active Issues</p>
                      <p className="text-3xl font-bold">{totalIssues}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-amber-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-indigo-100 text-sm font-medium">Avg Health</p>
                      <p className="text-3xl font-bold">{avgHealthScore}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-indigo-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
                  <CardTitle className="text-slate-800">Recent Agent Runs</CardTitle>
                  <CardDescription>Latest tool executions and their status</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {tools.slice(0, 4).map((tool) => (
                      <div key={tool.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(tool.type)}
                          <div>
                            <p className="font-medium text-slate-800">{tool.name}</p>
                            <p className="text-sm text-slate-600">Last run: {tool.agentRuns.lastRun}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-800">
                            {tool.agentRuns.successful}/{tool.agentRuns.total}
                          </p>
                          <p className="text-xs text-slate-600">Success rate</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
                  <CardTitle className="text-slate-800">System Health</CardTitle>
                  <CardDescription>Tool performance and health metrics</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {tools.slice(0, 4).map((tool) => (
                      <div key={tool.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-700">{tool.name}</span>
                          <span className={`text-sm font-bold ${getHealthColor(tool.healthScore)}`}>
                            {tool.healthScore}%
                          </span>
                        </div>
                        <Progress value={tool.healthScore} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search tools by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-purple-300 focus:ring-purple-200"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "border-slate-200 text-slate-700 hover:bg-slate-50"
                    }
                  >
                    {category === "all" ? "All Categories" : category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <Card key={tool.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(tool.type)}
                        <div>
                          <CardTitle className="text-lg text-slate-800">{tool.name}</CardTitle>
                          <Badge variant="outline" className={`mt-1 ${getStatusColor(tool.status)}`}>
                            {tool.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getHealthColor(tool.healthScore)}`}>
                          {tool.healthScore}%
                        </div>
                        <div className="text-xs text-slate-500">Health</div>
                      </div>
                    </div>
                    <CardDescription className="text-slate-600 mt-2">{tool.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-slate-800">{tool.agentRuns.total}</div>
                        <div className="text-xs text-slate-600">Total Runs</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-slate-800">{tool.avgResponseTime}s</div>
                        <div className="text-xs text-slate-600">Avg Response</div>
                      </div>
                    </div>

                    {/* Success Rate */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Success Rate</span>
                        <span className="font-medium text-slate-800">
                          {Math.round((tool.agentRuns.successful / tool.agentRuns.total) * 100)}%
                        </span>
                      </div>
                      <Progress value={(tool.agentRuns.successful / tool.agentRuns.total) * 100} className="h-2" />
                    </div>

                    {/* Issues */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Issues:</span>
                      <div className="flex gap-2">
                        {tool.issues.critical > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {tool.issues.critical}
                          </Badge>
                        )}
                        {tool.issues.warning > 0 && (
                          <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {tool.issues.warning}
                          </Badge>
                        )}
                        {tool.issues.critical === 0 && tool.issues.warning === 0 && (
                          <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Healthy
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Link href={`/tools/configure/${tool.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                        >
                          Configure
                        </Button>
                      </Link>
                      <Link href={`/tools/test/${tool.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 bg-transparent"
                        >
                          Test
                        </Button>
                      </Link>
                    </div>

                    {/* Last Updated */}
                    <div className="text-xs text-slate-500 border-t pt-2">
                      Last updated: {tool.lastUpdated} • Last run: {tool.agentRuns.lastRun}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Critical Issues */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b">
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Critical Issues
                  </CardTitle>
                  <CardDescription>Tools requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {tools
                      .filter((t) => t.issues.critical > 0)
                      .map((tool) => (
                        <div
                          key={tool.id}
                          className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {getTypeIcon(tool.type)}
                            <div>
                              <p className="font-medium text-red-800">{tool.name}</p>
                              <p className="text-sm text-red-600">{tool.issues.critical} critical issues</p>
                            </div>
                          </div>
                          <Button size="sm" variant="destructive">
                            Investigate
                          </Button>
                        </div>
                      ))}
                    {tools.filter((t) => t.issues.critical > 0).length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        <CheckCircle className="w-12 h-12 mx-auto mb-2 text-emerald-500" />
                        <p>No critical issues detected</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Performance Monitoring */}
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                  <CardTitle className="text-blue-800 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Performance Monitoring
                  </CardTitle>
                  <CardDescription>Real-time tool performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {tools.map((tool) => (
                      <div key={tool.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(tool.type)}
                            <span className="text-sm font-medium text-slate-700">{tool.name}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-slate-600">{tool.avgResponseTime}s</span>
                            <span className={tool.errorRate < 5 ? "text-emerald-600" : "text-red-600"}>
                              {tool.errorRate}% error
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Progress value={tool.healthScore} className="flex-1 h-2" />
                          <span className={`text-xs font-medium ${getHealthColor(tool.healthScore)}`}>
                            {tool.healthScore}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
