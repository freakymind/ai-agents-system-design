"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, Settings, Play, Pause, Trash2 } from "lucide-react"
import Link from "next/link"

interface Agent {
  id: string
  name: string
  description: string
  status: "active" | "inactive" | "draft"
  mandatoryTools: string[]
  optionalTools: string[]
  executionCount: number
  successRate: number
  lastUsed: string
  health: number
  issues: {
    critical: number
    warning: number
    info: number
  }
}

export default function AgentsPage() {
  const [agents] = useState<Agent[]>([
    {
      id: "agent-001",
      name: "KYC Specialist",
      description: "Handles Know Your Customer verification and compliance checks",
      status: "active",
      mandatoryTools: ["Document Verification", "Identity Check", "Sanctions Screening"],
      optionalTools: ["Enhanced Due Diligence", "PEP Check"],
      executionCount: 234,
      successRate: 94.2,
      lastUsed: "2024-01-15 14:30:22",
      health: 98,
      issues: { critical: 0, warning: 1, info: 2 },
    },
    {
      id: "agent-002",
      name: "Risk Assessor",
      description: "Evaluates business risk profile and creditworthiness",
      status: "active",
      mandatoryTools: ["Credit Check", "Financial Analysis", "Risk Scoring"],
      optionalTools: ["Industry Analysis", "Market Research"],
      executionCount: 189,
      successRate: 91.8,
      lastUsed: "2024-01-15 13:45:10",
      health: 87,
      issues: { critical: 1, warning: 2, info: 1 },
    },
    {
      id: "agent-003",
      name: "Document Verifier",
      description: "Validates and processes business documentation",
      status: "active",
      mandatoryTools: ["OCR Processing", "Document Authentication"],
      optionalTools: ["Translation Service", "Format Conversion"],
      executionCount: 456,
      successRate: 97.1,
      lastUsed: "2024-01-15 15:12:33",
      health: 95,
      issues: { critical: 0, warning: 0, info: 1 },
    },
    {
      id: "agent-004",
      name: "Compliance Officer",
      description: "Ensures regulatory compliance and policy adherence",
      status: "inactive",
      mandatoryTools: ["Regulatory Check", "Policy Validation"],
      optionalTools: ["Audit Trail", "Reporting"],
      executionCount: 67,
      successRate: 89.5,
      lastUsed: "2024-01-10 09:22:15",
      health: 72,
      issues: { critical: 2, warning: 3, info: 0 },
    },
    {
      id: "agent-005",
      name: "Onboarding Coordinator",
      description: "Orchestrates the complete onboarding workflow",
      status: "draft",
      mandatoryTools: ["Workflow Management", "Status Tracking"],
      optionalTools: ["Notification Service", "Escalation Management"],
      executionCount: 0,
      successRate: 0,
      lastUsed: "Never",
      health: 0,
      issues: { critical: 0, warning: 0, info: 0 },
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "inactive":
        return "bg-slate-100 text-slate-600 border-slate-200"
      case "draft":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-slate-100 text-slate-600 border-slate-200"
    }
  }

  const getHealthColor = (score: number) => {
    if (score >= 90) return "text-emerald-600"
    if (score >= 70) return "text-amber-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Agent Management
            </h1>
            <p className="text-slate-600 mt-1">Configure and manage your AI agents</p>
          </div>
          <Link href="/agents/create">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Create Agent
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {agents.map((agent) => (
            <Card key={agent.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        agent.status === "active"
                          ? "bg-emerald-500"
                          : agent.status === "inactive"
                            ? "bg-slate-400"
                            : "bg-amber-500"
                      }`}
                    />
                    <div>
                      <CardTitle className="flex items-center gap-3 text-slate-800">
                        {agent.name}
                        <Badge variant="outline" className={getStatusColor(agent.status)}>
                          {agent.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="text-slate-600">{agent.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getHealthColor(agent.health)}`}>
                        {agent.status === "draft" ? "N/A" : `${agent.health}%`}
                      </div>
                      <div className="text-xs text-slate-500">Health Score</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50 bg-transparent">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={agent.status === "draft"}
                        className="border-slate-200 hover:bg-slate-50 bg-transparent"
                      >
                        {agent.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button variant="outline" size="sm" className="border-slate-200 hover:bg-slate-50 bg-transparent">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-slate-600">Executions</p>
                    <p className="text-2xl font-bold text-slate-800">{agent.executionCount}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-slate-600">Success Rate</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {agent.status === "draft" ? "N/A" : `${agent.successRate}%`}
                    </p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-slate-600">Last Used</p>
                    <p className="text-sm text-slate-700">{agent.lastUsed}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-slate-600">Issues</p>
                    <div className="flex gap-1 mt-1">
                      {agent.issues.critical > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {agent.issues.critical}
                        </Badge>
                      )}
                      {agent.issues.warning > 0 && (
                        <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">
                          {agent.issues.warning}
                        </Badge>
                      )}
                      {agent.issues.critical === 0 && agent.issues.warning === 0 && agent.status !== "draft" && (
                        <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-200">
                          Healthy
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <Link href={`/agents/${agent.id}/configure`}>
                      <Button
                        variant="outline"
                        className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                      >
                        Configure
                      </Button>
                    </Link>
                  </div>
                </div>

                {agent.status !== "draft" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Performance</span>
                      <span className="font-medium text-slate-800">{agent.successRate}%</span>
                    </div>
                    <Progress value={agent.successRate} className="h-2" />
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">Mandatory Tools</p>
                    <div className="flex flex-wrap gap-2">
                      {agent.mandatoryTools.map((tool) => (
                        <Badge key={tool} variant="default" className="bg-red-100 text-red-800 border-red-200">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">Optional Tools</p>
                    <div className="flex flex-wrap gap-2">
                      {agent.optionalTools.map((tool) => (
                        <Badge key={tool} variant="outline" className="border-blue-200 text-blue-800">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
