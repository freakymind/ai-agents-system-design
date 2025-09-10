"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Download, Eye, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

interface AuditLog {
  id: string
  executionId: string
  agentName: string
  businessName: string
  status: "completed" | "failed" | "in-progress" | "cancelled"
  startTime: string
  endTime: string
  duration: string
  stepsExecuted: number
  totalSteps: number
  toolsUsed: string[]
  inputData: any
  outputData: any
  errorMessage?: string
}

export default function AuditPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const auditLogs: AuditLog[] = [
    {
      id: "audit-001",
      executionId: "exec-001",
      agentName: "KYC Specialist",
      businessName: "TechCorp Solutions",
      status: "completed",
      startTime: "2024-01-15 14:30:22",
      endTime: "2024-01-15 14:33:07",
      duration: "2m 45s",
      stepsExecuted: 5,
      totalSteps: 5,
      toolsUsed: ["Document Verification", "Identity Check", "Sanctions Screening"],
      inputData: {
        businessId: "BUS-12345",
        documents: ["certificate.pdf", "id_card.jpg"],
        ownerInfo: { name: "John Doe", email: "john@techcorp.com" },
      },
      outputData: {
        kycStatus: "approved",
        riskScore: "low",
        verificationResults: { documentValid: true, identityConfirmed: true, sanctionsClean: true },
      },
    },
    {
      id: "audit-002",
      executionId: "exec-002",
      agentName: "Risk Assessor",
      businessName: "Green Energy Ltd",
      status: "in-progress",
      startTime: "2024-01-15 14:28:15",
      endTime: "",
      duration: "1m 12s",
      stepsExecuted: 2,
      totalSteps: 4,
      toolsUsed: ["Credit Check", "Financial Analysis"],
      inputData: {
        businessId: "BUS-12346",
        financialStatements: ["balance_sheet.pdf", "income_statement.pdf"],
        industryCode: "ENERGY-001",
      },
      outputData: null,
    },
    {
      id: "audit-003",
      executionId: "exec-003",
      agentName: "Document Verifier",
      businessName: "Metro Consulting",
      status: "failed",
      startTime: "2024-01-15 14:25:08",
      endTime: "2024-01-15 14:25:53",
      duration: "45s",
      stepsExecuted: 1,
      totalSteps: 3,
      toolsUsed: ["OCR Processing"],
      inputData: {
        businessId: "BUS-12347",
        documents: ["corrupted_file.pdf"],
      },
      outputData: null,
      errorMessage: "Document format not supported or file corrupted",
    },
    {
      id: "audit-004",
      executionId: "exec-004",
      agentName: "Compliance Officer",
      businessName: "FinTech Innovations",
      status: "completed",
      startTime: "2024-01-15 13:45:30",
      endTime: "2024-01-15 13:48:15",
      duration: "2m 45s",
      stepsExecuted: 3,
      totalSteps: 3,
      toolsUsed: ["Regulatory Check", "Policy Validation", "Audit Trail"],
      inputData: {
        businessId: "BUS-12348",
        businessType: "fintech",
        jurisdiction: "US",
      },
      outputData: {
        complianceStatus: "approved",
        regulatoryFlags: [],
        policyViolations: [],
      },
    },
  ]

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.executionId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || log.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "cancelled":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "failed":
        return "destructive"
      case "in-progress":
        return "secondary"
      case "cancelled":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
              <p className="text-gray-600">Complete execution history and audit trail</p>
            </div>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by business name, agent, or execution ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["all", "completed", "failed", "in-progress", "cancelled"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Audit Logs */}
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <Card key={log.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(log.status)}
                    <div>
                      <CardTitle className="text-lg">{log.businessName}</CardTitle>
                      <CardDescription>
                        {log.agentName} • Execution ID: {log.executionId}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(log.status)}>{log.status}</Badge>
                    <Link href={`/audit/${log.executionId}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Start Time</p>
                    <p className="text-sm">{log.startTime}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Duration</p>
                    <p className="text-sm">{log.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Progress</p>
                    <p className="text-sm">
                      {log.stepsExecuted}/{log.totalSteps} steps
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Tools Used</p>
                    <p className="text-sm">{log.toolsUsed.length} tools</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Tools Used</p>
                    <div className="flex flex-wrap gap-2">
                      {log.toolsUsed.map((tool) => (
                        <Badge key={tool} variant="outline">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {log.errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm font-medium text-red-800">Error Message</p>
                      <p className="text-sm text-red-700">{log.errorMessage}</p>
                    </div>
                  )}

                  {log.status === "in-progress" && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(log.stepsExecuted / log.totalSteps) * 100}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
