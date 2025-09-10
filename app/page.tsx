"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Settings,
  FileText,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  AlertCircle,
  XCircle,
  ArrowUp,
  ArrowDown,
  Eye,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [stats] = useState({
    totalAgents: 5,
    activeExecutions: 12,
    completedOnboardings: 847,
    pendingReviews: 23,
    systemHealth: 94,
    avgProcessingTime: 2.4,
    successRate: 96.2,
    dailyVolume: 156,
  })

  const [agentMetrics] = useState([
    {
      id: "kyc-specialist",
      name: "KYC Specialist",
      status: "active",
      health: 98,
      executions: 234,
      successRate: 94.2,
      avgTime: "2m 15s",
      issues: { critical: 0, warning: 1, info: 2 },
      trend: "up",
    },
    {
      id: "risk-assessor",
      name: "Risk Assessor",
      status: "active",
      health: 87,
      executions: 189,
      successRate: 91.8,
      avgTime: "3m 42s",
      issues: { critical: 1, warning: 2, info: 1 },
      trend: "down",
    },
    {
      id: "document-verifier",
      name: "Document Verifier",
      status: "active",
      health: 95,
      executions: 456,
      successRate: 97.1,
      avgTime: "1m 28s",
      issues: { critical: 0, warning: 0, info: 1 },
      trend: "up",
    },
    {
      id: "compliance-officer",
      name: "Compliance Officer",
      status: "maintenance",
      health: 72,
      executions: 67,
      successRate: 89.5,
      avgTime: "4m 12s",
      issues: { critical: 2, warning: 3, info: 0 },
      trend: "down",
    },
  ])

  const recentExecutions = [
    {
      id: "exec-001",
      agentName: "KYC Specialist",
      businessName: "TechCorp Solutions",
      status: "completed",
      timestamp: "2024-01-15 14:30:22",
      duration: "2m 45s",
      riskScore: "Low",
      confidence: 96,
    },
    {
      id: "exec-002",
      agentName: "Risk Assessor",
      businessName: "Green Energy Ltd",
      status: "in-progress",
      timestamp: "2024-01-15 14:28:15",
      duration: "1m 12s",
      riskScore: "Medium",
      confidence: 78,
    },
    {
      id: "exec-003",
      agentName: "Document Verifier",
      businessName: "Metro Consulting",
      status: "failed",
      timestamp: "2024-01-15 14:25:08",
      duration: "45s",
      riskScore: "High",
      confidence: 23,
    },
    {
      id: "exec-004",
      agentName: "Compliance Officer",
      businessName: "FinTech Innovations",
      status: "completed",
      timestamp: "2024-01-15 13:45:30",
      duration: "3m 18s",
      riskScore: "Low",
      confidence: 92,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-slate-100 text-slate-600 border-slate-200"
    }
  }

  const getHealthColor = (score: number) => {
    if (score >= 90) return "text-emerald-600"
    if (score >= 70) return "text-amber-600"
    return "text-red-600"
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-emerald-100 text-emerald-800"
      case "medium":
        return "bg-amber-100 text-amber-800"
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-slate-100 text-slate-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            System Dashboard
          </h1>
          <p className="text-slate-600 mt-1">AI-powered business onboarding platform overview</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Agents
            </TabsTrigger>
            <TabsTrigger
              value="executions"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Activity className="w-4 h-4 mr-2" />
              Executions
            </TabsTrigger>
            <TabsTrigger
              value="monitoring"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Monitoring
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Total Agents</p>
                      <p className="text-3xl font-bold">{stats.totalAgents}</p>
                      <p className="text-purple-200 text-xs mt-1">+2 this month</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Active Executions</p>
                      <p className="text-3xl font-bold">{stats.activeExecutions}</p>
                      <p className="text-blue-200 text-xs mt-1">Real-time processing</p>
                    </div>
                    <Activity className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100 text-sm font-medium">Completed Today</p>
                      <p className="text-3xl font-bold">{stats.dailyVolume}</p>
                      <p className="text-emerald-200 text-xs mt-1">+12% vs yesterday</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-emerald-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-indigo-100 text-sm font-medium">Success Rate</p>
                      <p className="text-3xl font-bold">{stats.successRate}%</p>
                      <p className="text-indigo-200 text-xs mt-1">+2.1% this week</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-indigo-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Health & Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
                  <CardTitle className="text-slate-800 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    System Health
                  </CardTitle>
                  <CardDescription>Real-time system performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-700">Overall Health</span>
                        <span className={`text-lg font-bold ${getHealthColor(stats.systemHealth)}`}>
                          {stats.systemHealth}%
                        </span>
                      </div>
                      <Progress value={stats.systemHealth} className="h-3" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-slate-800">{stats.avgProcessingTime}s</div>
                        <div className="text-sm text-slate-600">Avg Processing Time</div>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-slate-800">{stats.pendingReviews}</div>
                        <div className="text-sm text-slate-600">Pending Reviews</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
                  <CardTitle className="text-slate-800 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Agent Performance
                  </CardTitle>
                  <CardDescription>Individual agent health and metrics</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {agentMetrics.slice(0, 3).map((agent) => (
                      <div key={agent.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${agent.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`}
                          />
                          <div>
                            <p className="font-medium text-slate-800">{agent.name}</p>
                            <p className="text-sm text-slate-600">{agent.executions} executions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getHealthColor(agent.health)}`}>{agent.health}%</div>
                          <div className="flex items-center gap-1">
                            {agent.trend === "up" ? (
                              <ArrowUp className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <ArrowDown className="w-3 h-3 text-red-500" />
                            )}
                            <span className="text-xs text-slate-600">{agent.successRate}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agentMetrics.map((agent) => (
                <Card key={agent.id} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full ${agent.status === "active" ? "bg-emerald-500" : agent.status === "maintenance" ? "bg-amber-500" : "bg-slate-400"}`}
                        />
                        <div>
                          <CardTitle className="text-lg text-slate-800">{agent.name}</CardTitle>
                          <Badge
                            variant="outline"
                            className={
                              agent.status === "active"
                                ? "border-emerald-200 text-emerald-700"
                                : "border-amber-200 text-amber-700"
                            }
                          >
                            {agent.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getHealthColor(agent.health)}`}>{agent.health}%</div>
                        <div className="text-xs text-slate-500">Health Score</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-slate-800">{agent.executions}</div>
                        <div className="text-xs text-slate-600">Total Executions</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-slate-800">{agent.avgTime}</div>
                        <div className="text-xs text-slate-600">Avg Duration</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600">Success Rate</span>
                        <span className="font-medium text-slate-800">{agent.successRate}%</span>
                      </div>
                      <Progress value={agent.successRate} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Issues:</span>
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
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Link href={`/agents/${agent.id}/configure`} className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                        >
                          Configure
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 bg-transparent"
                      >
                        Monitor
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="executions" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
                <CardTitle className="text-slate-800">Recent Executions</CardTitle>
                <CardDescription>Latest agent execution results and performance</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentExecutions.map((execution) => (
                    <div
                      key={execution.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center gap-2">
                          {execution.status === "completed" && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                          {execution.status === "in-progress" && (
                            <Clock className="w-5 h-5 text-blue-600 animate-spin" />
                          )}
                          {execution.status === "failed" && <XCircle className="w-5 h-5 text-red-600" />}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{execution.businessName}</p>
                          <p className="text-sm text-slate-600">{execution.agentName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <Badge variant="outline" className={`${getRiskColor(execution.riskScore)} border-0`}>
                            {execution.riskScore} Risk
                          </Badge>
                          <p className="text-xs text-slate-500 mt-1">{execution.confidence}% confidence</p>
                        </div>
                        <div className="text-right text-sm text-slate-600">
                          <p className="font-medium">{execution.duration}</p>
                          <p>{execution.timestamp.split(" ")[1]}</p>
                        </div>
                        <Link href={`/audit/${execution.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-200 text-slate-700 hover:bg-slate-50 bg-transparent"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b">
                  <CardTitle className="text-red-800 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Critical Issues
                  </CardTitle>
                  <CardDescription>Agents requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {agentMetrics
                      .filter((agent) => agent.issues.critical > 0)
                      .map((agent) => (
                        <div
                          key={agent.id}
                          className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                            <div>
                              <p className="font-medium text-red-800">{agent.name}</p>
                              <p className="text-sm text-red-600">{agent.issues.critical} critical issues</p>
                            </div>
                          </div>
                          <Button size="sm" variant="destructive">
                            Investigate
                          </Button>
                        </div>
                      ))}
                    {agentMetrics.filter((agent) => agent.issues.critical > 0).length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        <CheckCircle className="w-12 h-12 mx-auto mb-2 text-emerald-500" />
                        <p>No critical issues detected</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100 border-b">
                  <CardTitle className="text-amber-800 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Performance Alerts
                  </CardTitle>
                  <CardDescription>Agents with performance degradation</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {agentMetrics
                      .filter((agent) => agent.health < 90 || agent.issues.warning > 0)
                      .map((agent) => (
                        <div
                          key={agent.id}
                          className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                            <div>
                              <p className="font-medium text-amber-800">{agent.name}</p>
                              <p className="text-sm text-amber-600">
                                Health: {agent.health}% • {agent.issues.warning} warnings
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-amber-300 text-amber-700 hover:bg-amber-100 bg-transparent"
                          >
                            Review
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Link href="/agents">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader className="text-center">
                <Users className="w-8 h-8 mx-auto text-purple-600 mb-2" />
                <CardTitle className="text-purple-800">Manage Agents</CardTitle>
                <CardDescription className="text-purple-600">
                  Create, configure, and manage your AI agents
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/tools">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md bg-gradient-to-br from-indigo-50 to-indigo-100">
              <CardHeader className="text-center">
                <Settings className="w-8 h-8 mx-auto text-indigo-600 mb-2" />
                <CardTitle className="text-indigo-800">Tool Library</CardTitle>
                <CardDescription className="text-indigo-600">
                  Manage tools and modules for agent assignment
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/audit">
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md bg-gradient-to-br from-emerald-50 to-emerald-100">
              <CardHeader className="text-center">
                <FileText className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
                <CardTitle className="text-emerald-800">Audit Logs</CardTitle>
                <CardDescription className="text-emerald-600">
                  View detailed execution logs and audit trails
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
