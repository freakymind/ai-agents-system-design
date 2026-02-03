"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Target,
  BarChart3,
  PlayCircle,
  Settings,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [stats] = useState({
    totalAgents: 12,
    activeAgents: 10,
    totalTools: 18,
    activeTools: 16,
    executionsToday: 2847,
    successfulExecutions: 2721,
    failedExecutions: 126,
    avgResponseTime: 1.8,
    systemHealth: 96.4,
  })

  const recentIssues = [
    { 
      agent: "KYC Verification Agent", 
      tool: "Document OCR", 
      message: "Tool execution timeout - increased latency detected", 
      severity: "critical", 
      time: "2 min ago",
      executionId: "exec_abc123"
    },
    { 
      agent: "Risk Assessment Agent", 
      tool: "Credit Bureau API", 
      message: "API rate limit exceeded - 429 response", 
      severity: "warning", 
      time: "15 min ago",
      executionId: "exec_def456"
    },
    { 
      agent: "Compliance Agent", 
      tool: "Sanctions Database", 
      message: "Slow response time - 8.2s (threshold: 5s)", 
      severity: "warning", 
      time: "1 hour ago",
      executionId: "exec_ghi789"
    },
  ]

  const agentPerformance = [
    { name: "KYC Verification Agent", runs: 847, success: 92.3, avgTime: 2.1, issues: 2, status: "warning" },
    { name: "Fraud Detection Agent", runs: 1203, success: 98.7, avgTime: 1.3, issues: 0, status: "healthy" },
    { name: "Risk Assessment Agent", runs: 562, success: 89.1, avgTime: 3.8, issues: 5, status: "critical" },
    { name: "Compliance Agent", runs: 235, success: 95.4, avgTime: 1.9, issues: 1, status: "healthy" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Agent Operations Dashboard</h1>
          <p className="text-muted-foreground text-lg">Monitor agent executions, tool performance, and system health</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:border-blue-500/40 transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Agents</p>
                  <p className="text-4xl font-bold text-foreground mb-1">{stats.totalAgents}</p>
                  <div className="flex items-center gap-1 text-blue-500 text-sm">
                    <Users className="w-3 h-3" />
                    <span>{stats.activeAgents} active</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 hover:border-purple-500/40 transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Tools</p>
                  <p className="text-4xl font-bold text-foreground mb-1">{stats.totalTools}</p>
                  <div className="flex items-center gap-1 text-purple-500 text-sm">
                    <Zap className="w-3 h-3" />
                    <span>{stats.activeTools} active</span>
                  </div>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <Settings className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 hover:border-emerald-500/40 transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Executions Today</p>
                  <p className="text-4xl font-bold text-foreground mb-1">{stats.executionsToday.toLocaleString()}</p>
                  <div className="flex items-center gap-1 text-emerald-500 text-sm">
                    <ArrowUpRight className="w-3 h-3" />
                    <span>+12% vs yesterday</span>
                  </div>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-lg">
                  <PlayCircle className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-500/10 to-rose-600/5 border-rose-500/20 hover:border-rose-500/40 transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Failed Executions</p>
                  <p className="text-4xl font-bold text-foreground mb-1">{stats.failedExecutions}</p>
                  <div className="flex items-center gap-1 text-rose-500 text-sm">
                    <ArrowDownRight className="w-3 h-3" />
                    <span>4.4% failure rate</span>
                  </div>
                </div>
                <div className="p-3 bg-rose-500/10 rounded-lg">
                  <XCircle className="w-6 h-6 text-rose-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Agent Performance */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">System Health</CardTitle>
                    <CardDescription>Overall platform performance metrics</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    System Healthy
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">System Health Score</span>
                      <span className="text-sm font-bold text-emerald-500">{stats.systemHealth}%</span>
                    </div>
                    <Progress value={stats.systemHealth} className="h-2" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        <span className="text-xs text-muted-foreground">Avg Response</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{stats.avgResponseTime}s</p>
                    </div>

                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs text-muted-foreground">Success Rate</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{stats.systemHealth}%</p>
                    </div>

                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs text-muted-foreground">Successful</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{stats.successfulExecutions}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Agent Performance</CardTitle>
                <CardDescription>Real-time execution metrics by agent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentPerformance.map((agent) => (
                    <div
                      key={agent.name}
                      className="p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">{agent.name}</h4>
                            <Badge
                              variant="outline"
                              className={
                                agent.status === "healthy"
                                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                                  : agent.status === "warning"
                                  ? "border-amber-500/20 bg-amber-500/10 text-amber-600"
                                  : "border-rose-500/20 bg-rose-500/10 text-rose-600"
                              }
                            >
                              {agent.status === "healthy" && <CheckCircle className="w-3 h-3 mr-1" />}
                              {agent.status === "warning" && <AlertTriangle className="w-3 h-3 mr-1" />}
                              {agent.status === "critical" && <AlertCircle className="w-3 h-3 mr-1" />}
                              {agent.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{agent.runs} runs today</p>
                        </div>
                        {agent.issues > 0 && (
                          <Badge variant="destructive" className="ml-2">
                            {agent.issues} issues
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                          <div className="flex items-center gap-2">
                            <Progress value={agent.success} className="h-1.5 flex-1" />
                            <span className="text-sm font-semibold text-foreground">{agent.success}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Avg Time</p>
                          <p className="text-sm font-semibold text-foreground">{agent.avgTime}s</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Issues & Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Recent Issues</CardTitle>
                    <CardDescription>Agent & tool execution problems</CardDescription>
                  </div>
                  <Badge variant="destructive">8 active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentIssues.map((issue, i) => (
                    <div 
                      key={i} 
                      className={`p-4 bg-secondary rounded-lg border-l-4 ${
                        issue.severity === "critical" ? "border-l-rose-500" : "border-l-amber-500"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge
                          variant={issue.severity === "critical" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {issue.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{issue.time}</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground mb-1">{issue.agent}</p>
                      <p className="text-xs text-muted-foreground mb-2">Tool: {issue.tool}</p>
                      <p className="text-sm text-foreground">{issue.message}</p>
                      <Link href={`/audit/${issue.executionId}`} className="text-xs text-blue-500 hover:underline mt-2 inline-block">
                        View execution details →
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/agents/create">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Create New Agent
                  </Button>
                </Link>
                <Link href="/tools/create">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Create New Tool
                  </Button>
                </Link>
                <Link href="/audit">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Activity className="w-4 h-4 mr-2" />
                    View All Executions
                  </Button>
                </Link>
                <Link href="/documentation">
                  <Button className="w-full justify-start bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    API Documentation
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
