"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Play, Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface ExecutionResult {
  executionId: string
  status: "running" | "completed" | "failed"
  steps: any[]
  result?: any
}

export default function ExecutePage() {
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null)
  const [formData, setFormData] = useState({
    agentId: "",
    businessName: "",
    businessType: "",
    ownerName: "",
    ownerEmail: "",
    documents: [] as string[],
  })
  const [selectedTools, setSelectedTools] = useState<string[]>([])

  const availableAgents = [
    { id: "kyc-specialist", name: "KYC Specialist", description: "Handles Know Your Customer verification" },
    { id: "risk-assessor", name: "Risk Assessor", description: "Evaluates business risk profile" },
    { id: "compliance-officer", name: "Compliance Officer", description: "Ensures regulatory compliance" },
  ]

  const availableTools = [
    { id: "documentVerification", name: "Document Verification", description: "Verify document authenticity" },
    { id: "identityCheck", name: "Identity Check", description: "Validate owner identity" },
    { id: "sanctionsScreening", name: "Sanctions Screening", description: "Screen against watchlists" },
    { id: "riskAssessment", name: "Risk Assessment", description: "Calculate risk score" },
  ]

  const handleToolToggle = (toolId: string) => {
    setSelectedTools((prev) => (prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId]))
  }

  const handleExecute = async () => {
    if (!formData.agentId || !formData.businessName || selectedTools.length === 0) {
      alert("Please fill in all required fields and select at least one tool")
      return
    }

    setIsExecuting(true)
    setExecutionResult({ executionId: "", status: "running", steps: [] })

    try {
      const response = await fetch("/api/agents/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: formData.agentId,
          businessData: formData,
          selectedTools,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setExecutionResult({
          executionId: result.executionId,
          status: "completed",
          steps: result.result.outputData.toolResults || [],
          result: result.result,
        })
      } else {
        setExecutionResult({
          executionId: "",
          status: "failed",
          steps: [],
          result: { error: result.error },
        })
      }
    } catch (error) {
      setExecutionResult({
        executionId: "",
        status: "failed",
        steps: [],
        result: { error: "Network error occurred" },
      })
    } finally {
      setIsExecuting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Execute Agent</h1>
            <p className="text-gray-600">Run an AI agent for business onboarding</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Configuration</CardTitle>
                <CardDescription>Select agent and configure execution parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="agent-select">Select Agent</Label>
                  <Select
                    value={formData.agentId}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, agentId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableAgents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>
                          <div>
                            <p className="font-medium">{agent.name}</p>
                            <p className="text-sm text-gray-600">{agent.description}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Available Tools</Label>
                  <div className="space-y-2 mt-2">
                    {availableTools.map((tool) => (
                      <div key={tool.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={tool.id}
                          checked={selectedTools.includes(tool.id)}
                          onCheckedChange={() => handleToolToggle(tool.id)}
                        />
                        <div>
                          <Label htmlFor={tool.id} className="font-medium">
                            {tool.name}
                          </Label>
                          <p className="text-sm text-gray-600">{tool.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Enter the business details for onboarding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="business-name">Business Name *</Label>
                  <Input
                    id="business-name"
                    value={formData.businessName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                    placeholder="Enter business name"
                  />
                </div>

                <div>
                  <Label htmlFor="business-type">Business Type</Label>
                  <Input
                    id="business-type"
                    value={formData.businessType}
                    onChange={(e) => setFormData((prev) => ({ ...prev, businessType: e.target.value }))}
                    placeholder="e.g., Technology, Retail, Consulting"
                  />
                </div>

                <div>
                  <Label htmlFor="owner-name">Owner Name</Label>
                  <Input
                    id="owner-name"
                    value={formData.ownerName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, ownerName: e.target.value }))}
                    placeholder="Enter owner's full name"
                  />
                </div>

                <div>
                  <Label htmlFor="owner-email">Owner Email</Label>
                  <Input
                    id="owner-email"
                    type="email"
                    value={formData.ownerEmail}
                    onChange={(e) => setFormData((prev) => ({ ...prev, ownerEmail: e.target.value }))}
                    placeholder="Enter owner's email"
                  />
                </div>

                <Button onClick={handleExecute} disabled={isExecuting} className="w-full">
                  {isExecuting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Executing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Execute Agent
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Execution Results */}
          <div className="space-y-6">
            {executionResult && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Execution Results</CardTitle>
                    <div className="flex items-center gap-2">
                      {executionResult.status === "running" && (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                          <Badge variant="secondary">Running</Badge>
                        </>
                      )}
                      {executionResult.status === "completed" && (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <Badge variant="default">Completed</Badge>
                        </>
                      )}
                      {executionResult.status === "failed" && (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <Badge variant="destructive">Failed</Badge>
                        </>
                      )}
                    </div>
                  </div>
                  {executionResult.executionId && (
                    <CardDescription>Execution ID: {executionResult.executionId}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {executionResult.status === "running" && (
                    <div className="text-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                      <p className="text-gray-600">Agent is processing your request...</p>
                    </div>
                  )}

                  {executionResult.status === "completed" && executionResult.result && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Agent Recommendation</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm whitespace-pre-wrap">
                            {executionResult.result.outputData.recommendation}
                          </p>
                        </div>
                      </div>

                      {executionResult.result.outputData.executionSummary && (
                        <div>
                          <h3 className="font-medium mb-2">Execution Summary</h3>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="text-center p-3 bg-blue-50 rounded">
                              <p className="font-medium text-blue-900">
                                {executionResult.result.outputData.executionSummary.totalSteps}
                              </p>
                              <p className="text-blue-700">Total Steps</p>
                            </div>
                            <div className="text-center p-3 bg-green-50 rounded">
                              <p className="font-medium text-green-900">
                                {executionResult.result.outputData.executionSummary.successfulSteps}
                              </p>
                              <p className="text-green-700">Successful</p>
                            </div>
                            <div className="text-center p-3 bg-red-50 rounded">
                              <p className="font-medium text-red-900">
                                {executionResult.result.outputData.executionSummary.failedSteps}
                              </p>
                              <p className="text-red-700">Failed</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <h3 className="font-medium mb-2">Tool Results</h3>
                        <div className="space-y-2">
                          {executionResult.result.outputData.toolResults.map((result: any, index: number) => (
                            <div key={index} className="border rounded-lg p-3">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-medium">{result.toolName || `Tool ${index + 1}`}</p>
                                <Badge variant={result.error ? "destructive" : "default"}>
                                  {result.error ? "Failed" : "Success"}
                                </Badge>
                              </div>
                              <div className="text-sm bg-gray-50 p-2 rounded">
                                <pre className="whitespace-pre-wrap">
                                  {JSON.stringify(result.result || result.error, null, 2)}
                                </pre>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {executionResult.status === "failed" && (
                    <div className="text-center py-8">
                      <AlertCircle className="w-8 h-8 mx-auto mb-4 text-red-600" />
                      <p className="text-red-600 font-medium">Execution Failed</p>
                      <p className="text-gray-600 text-sm mt-2">
                        {executionResult.result?.error || "An unknown error occurred"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {!executionResult && (
              <Card>
                <CardContent className="text-center py-12">
                  <Play className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Configure your agent and click Execute to see results</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
