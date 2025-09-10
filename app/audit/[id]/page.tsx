"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"

interface ExecutionStep {
  id: string
  stepNumber: number
  toolName: string
  status: "completed" | "failed" | "in-progress" | "skipped"
  startTime: string
  endTime?: string
  duration?: string
  inputData: any
  outputData?: any
  errorMessage?: string
  confidence?: number
}

export default function AuditDetailPage({ params }: { params: { id: string } }) {
  const executionId = params.id

  // Mock data - in real app, fetch based on executionId
  const executionDetails = {
    id: executionId,
    agentName: "KYC Specialist",
    businessName: "TechCorp Solutions",
    status: "completed",
    startTime: "2024-01-15 14:30:22",
    endTime: "2024-01-15 14:33:07",
    totalDuration: "2m 45s",
    inputData: {
      businessId: "BUS-12345",
      businessName: "TechCorp Solutions",
      businessType: "Technology Services",
      ownerInfo: {
        name: "John Doe",
        email: "john@techcorp.com",
        phone: "+1-555-0123",
      },
      documents: [
        { name: "business_certificate.pdf", size: "2.3MB", type: "Business Certificate" },
        { name: "owner_id.jpg", size: "1.1MB", type: "Owner ID" },
        { name: "financial_statement.pdf", size: "4.7MB", type: "Financial Statement" },
      ],
    },
    outputData: {
      kycStatus: "approved",
      riskScore: "low",
      complianceScore: 94,
      verificationResults: {
        documentVerification: "passed",
        identityVerification: "passed",
        sanctionsScreening: "clean",
        enhancedDueDiligence: "not_required",
      },
      recommendations: [
        "Business approved for standard banking services",
        "No additional documentation required",
        "Periodic review recommended in 12 months",
      ],
    },
  }

  const executionSteps: ExecutionStep[] = [
    {
      id: "step-001",
      stepNumber: 1,
      toolName: "Document Verification",
      status: "completed",
      startTime: "2024-01-15 14:30:22",
      endTime: "2024-01-15 14:31:15",
      duration: "53s",
      confidence: 96,
      inputData: {
        documents: ["business_certificate.pdf", "owner_id.jpg"],
        verificationLevel: "standard",
      },
      outputData: {
        businessCertificate: { valid: true, issuer: "State of California", expiryDate: "2025-12-31" },
        ownerID: { valid: true, type: "Driver License", verified: true },
      },
    },
    {
      id: "step-002",
      stepNumber: 2,
      toolName: "Identity Check",
      status: "completed",
      startTime: "2024-01-15 14:31:15",
      endTime: "2024-01-15 14:32:08",
      duration: "53s",
      confidence: 98,
      inputData: {
        ownerName: "John Doe",
        documentNumber: "DL123456789",
        dateOfBirth: "1985-03-15",
      },
      outputData: {
        identityConfirmed: true,
        matchScore: 98,
        biometricVerification: "passed",
        addressVerification: "confirmed",
      },
    },
    {
      id: "step-003",
      stepNumber: 3,
      toolName: "Sanctions Screening",
      status: "completed",
      startTime: "2024-01-15 14:32:08",
      endTime: "2024-01-15 14:32:45",
      duration: "37s",
      confidence: 100,
      inputData: {
        entityName: "TechCorp Solutions",
        ownerName: "John Doe",
        jurisdiction: "US",
      },
      outputData: {
        sanctionsMatch: false,
        watchlistMatch: false,
        pepMatch: false,
        adverseMediaMatch: false,
      },
    },
    {
      id: "step-004",
      stepNumber: 4,
      toolName: "Enhanced Due Diligence",
      status: "skipped",
      startTime: "2024-01-15 14:32:45",
      inputData: {
        riskLevel: "low",
        businessType: "technology",
      },
      outputData: {
        reason: "Low risk profile - EDD not required",
      },
    },
    {
      id: "step-005",
      stepNumber: 5,
      toolName: "Risk Assessment",
      status: "completed",
      startTime: "2024-01-15 14:32:45",
      endTime: "2024-01-15 14:33:07",
      duration: "22s",
      confidence: 92,
      inputData: {
        businessProfile: executionDetails.inputData,
        verificationResults: "all_passed",
      },
      outputData: {
        overallRiskScore: "low",
        riskFactors: [],
        mitigatingFactors: ["Clean verification results", "Established business", "Low-risk industry"],
      },
    },
  ]

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "failed":
        return <XCircle className="w-5 h-5 text-red-600" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-600" />
      case "skipped":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed":
        return "border-green-200 bg-green-50"
      case "failed":
        return "border-red-200 bg-red-50"
      case "in-progress":
        return "border-blue-200 bg-blue-50"
      case "skipped":
        return "border-yellow-200 bg-yellow-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/audit">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Audit Logs
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Execution Details</h1>
                <p className="text-gray-600">
                  {executionDetails.businessName} • {executionDetails.agentName}
                </p>
              </div>
            </div>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Execution Overview */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Execution Overview</CardTitle>
                <CardDescription>Summary of the agent execution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <Badge variant="default" className="mt-1">
                      {executionDetails.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Duration</p>
                    <p className="font-medium">{executionDetails.totalDuration}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Steps</p>
                    <p className="font-medium">{executionSteps.length}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="font-medium">100%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Execution Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Execution Steps</CardTitle>
                <CardDescription>Detailed step-by-step execution log</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {executionSteps.map((step, index) => (
                    <div key={step.id} className={`border rounded-lg p-4 ${getStepColor(step.status)}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getStepIcon(step.status)}
                          <div>
                            <h3 className="font-medium">
                              Step {step.stepNumber}: {step.toolName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {step.startTime} {step.duration && `• ${step.duration}`}
                            </p>
                          </div>
                        </div>
                        {step.confidence && <Badge variant="outline">{step.confidence}% confidence</Badge>}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Input</p>
                          <div className="bg-white p-3 rounded border text-xs">
                            <pre className="whitespace-pre-wrap">{JSON.stringify(step.inputData, null, 2)}</pre>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-2">Output</p>
                          <div className="bg-white p-3 rounded border text-xs">
                            <pre className="whitespace-pre-wrap">{JSON.stringify(step.outputData, null, 2)}</pre>
                          </div>
                        </div>
                      </div>

                      {step.errorMessage && (
                        <div className="mt-3 p-3 bg-red-100 border border-red-200 rounded">
                          <p className="text-sm font-medium text-red-800">Error</p>
                          <p className="text-sm text-red-700">{step.errorMessage}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Input/Output Data */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Data</CardTitle>
                <CardDescription>Original request data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Business ID</p>
                    <p className="text-sm">{executionDetails.inputData.businessId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Business Name</p>
                    <p className="text-sm">{executionDetails.inputData.businessName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Business Type</p>
                    <p className="text-sm">{executionDetails.inputData.businessType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Owner</p>
                    <p className="text-sm">{executionDetails.inputData.ownerInfo.name}</p>
                    <p className="text-xs text-gray-500">{executionDetails.inputData.ownerInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Documents</p>
                    <div className="space-y-1">
                      {executionDetails.inputData.documents.map((doc: any, index: number) => (
                        <div key={index} className="text-xs bg-gray-100 p-2 rounded">
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-gray-600">
                            {doc.type} • {doc.size}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Final Results</CardTitle>
                <CardDescription>Agent execution output</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-600">KYC Status</p>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      {executionDetails.outputData.kycStatus}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Risk Score</p>
                    <Badge variant="outline">{executionDetails.outputData.riskScore}</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Compliance Score</p>
                    <p className="text-lg font-semibold text-green-600">
                      {executionDetails.outputData.complianceScore}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Verification Results</p>
                    <div className="space-y-1">
                      {Object.entries(executionDetails.outputData.verificationResults).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-xs">
                          <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                          <Badge
                            variant={value === "passed" || value === "clean" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {value as string}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Recommendations</p>
                    <div className="space-y-1">
                      {executionDetails.outputData.recommendations.map((rec: string, index: number) => (
                        <p key={index} className="text-xs bg-blue-50 p-2 rounded border-l-2 border-blue-200">
                          {rec}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Execution Timeline</CardTitle>
                <CardDescription>Step execution timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {executionSteps.map((step) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      <div className="flex-1">
                        <p className="text-xs font-medium">{step.toolName}</p>
                        <p className="text-xs text-gray-600">{step.startTime}</p>
                      </div>
                      <div className="text-xs text-gray-500">{step.duration || "N/A"}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
