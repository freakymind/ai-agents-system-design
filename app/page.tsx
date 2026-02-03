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
  Shield,
  Zap,
  ArrowUpRight,
  Clock,
  Target,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const [stats] = useState({
    totalAgents: 12,
    activeTools: 18,
    executionsToday: 2847,
    fraudDetected: 34,
    complianceScore: 98.5,
    avgResponseTime: 1.8,
  })

  const recentAlerts = [
    { type: "fraud", message: "High-risk transaction detected", severity: "critical", time: "2 min ago" },
    { type: "compliance", message: "Adverse media found for entity", severity: "warning", time: "15 min ago" },
    { type: "kyc", message: "Document verification pending", severity: "info", time: "1 hour ago" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Banking Intelligence Platform</h1>
          <p className="text-muted-foreground text-lg">Real-time monitoring of AI agents and banking operations</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:border-blue-500/40 transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Active Agents</p>
                  <p className="text-4xl font-bold text-foreground mb-1">{stats.totalAgents}</p>
                  <div className="flex items-center gap-1 text-emerald-500 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+3 this week</span>
                  </div>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Users className="w-6 h-6 text-blue-500" />
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
                    <ArrowUpRight className="w-4 h-4" />
                    <span>+12% vs yesterday</span>
                  </div>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-lg">
                  <Activity className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20 hover:border-amber-500/40 transition-all">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Fraud Detected</p>
                  <p className="text-4xl font-bold text-foreground mb-1">{stats.fraudDetected}</p>
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Requires review</span>
                  </div>
                </div>
                <div className="p-3 bg-amber-500/10 rounded-lg">
                  <Shield className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Agent Status */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">System Performance</CardTitle>
                    <CardDescription>Real-time operational metrics</CardDescription>
                  </div>
                  <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    All Systems Operational
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Compliance Score</span>
                      <span className="text-sm font-bold text-emerald-500">{stats.complianceScore}%</span>
                    </div>
                    <Progress value={stats.complianceScore} className="h-2" />
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
                      <p className="text-2xl font-bold text-foreground">96.4%</p>
                    </div>

                    <div className="p-4 bg-secondary rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-amber-500" />
                        <span className="text-xs text-muted-foreground">Tools Active</span>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{stats.activeTools}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Banking Operations</CardTitle>
                <CardDescription>AI-powered tools for commercial banking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Customer Onboarding", count: 847, icon: Users, color: "blue" },
                    { name: "Fraud Detection", count: 34, icon: Shield, color: "red" },
                    { name: "Compliance Checks", count: 1203, icon: CheckCircle, color: "emerald" },
                    { name: "Risk Assessment", count: 562, icon: TrendingUp, color: "amber" },
                  ].map((op) => (
                    <div
                      key={op.name}
                      className="p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <op.icon className={`w-5 h-5 text-${op.color}-500`} />
                        <span className="text-2xl font-bold text-foreground">{op.count}</span>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">{op.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Alerts */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recent Alerts</CardTitle>
                <CardDescription>Critical system notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert, i) => (
                    <div key={i} className="p-4 bg-secondary rounded-lg border-l-4 border-l-blue-500">
                      <div className="flex items-start justify-between mb-2">
                        <Badge
                          variant={alert.severity === "critical" ? "destructive" : "secondary"}
                          className="text-xs"
                        >
                          {alert.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                      <p className="text-sm text-foreground font-medium">{alert.message}</p>
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
                <Link href="/tools">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Tools Library
                  </Button>
                </Link>
                <Link href="/audit">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Activity className="w-4 h-4 mr-2" />
                    Audit Logs
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
