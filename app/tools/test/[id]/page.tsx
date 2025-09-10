"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Play, Loader2, CheckCircle, XCircle, Code, Database, Activity, Brain, FileCode } from 'lucide-react'
import Link from "next/link"

interface TestResult {
  success: boolean
  executionId: string
  result: any
  error?: string
}

export default function TestToolPage({ params }: { params: { id: string } }) {
  const [tool, setTool] = useState<any>(null)
  const [testInput, setTestInput] = useState<string>("")
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)

  useEffect(() => {
    // Mock tool data - in real app, fetch from API
    const mockTool = {
      id: params.id,
      name: "Document Verification API",
      type: "api",
      configuration: {
        endpoint: "https://api.docverify.com/v2/verify",
        method: "POST",
        authentication: {
          type: "bearer",
          credentials: { token: "test_token_123" }
        },
        parameters: [
          { name: "document_image", type: "string", required: true },
          { name: "document_type", type: "string", required: true },
          { name: "confidence_threshold", type: "number", required: false, defaultValue: 0.85 }
        ]
      }
    }
    setTool(mockTool)
    
    // Set default test input
    setTestInput(JSON.stringify({
      document_image: "base64_encoded_image_data...",
      document_type: "passport",
      confidence_threshold: 0.9
    }, null, 2))
  }, [params.id])

  const handleExecuteTest = async () => {
    if (!tool) return

    setIsExecuting(true)
    setTestResult(null)

    try {
      let inputData
      try {
        inputData = JSON.parse(testInput)
      } catch {
        inputData = testInput
      }

      const response = await fetch("/api/tools/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolId: tool.id,
          toolConfig: tool,
          inputData,
          testMode: true
        })
      })

      const result = await response.json()
      setTestResult(result)

    } catch (error) {
      setTestResult({
        success: false,
        executionId: "",
        result: null,
        error: error instanceof Error ? error.message : "Unknown error"
      })
    } finally {
      setIsExecuting(false)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "api":
        return <Code className="w-5 h-5" />
      case "websocket":
        return <Activity className="w-5 h-5" />
      case "llm":
        return <Brain className="w-5 h-5" />
      case "script":
        return <FileCode className="w-5 h-5" />
      case "database":
      case "search":
        return <Database className="w-5 h-5" />
      default:
        return <Code className="w-5 h-5" />
    }
  }

  const getExampleInput = (toolType: string) => {
    switch (toolType) {
      case "api":
        return JSON.stringify({
          document_image: "base64_encoded_image_data...",
          document_type: "passport",
          confidence_threshold: 0.9
        }, null, 2)
      
      case "websocket":
        return JSON.stringify({
          subscribe: ["market_data", "price_updates"],
          symbols: ["AAPL", "GOOGL", "MSFT"]
        }, null, 2)
      
      case "llm":
        return "Analyze the risk profile of a technology startup with 50 employees, $2M annual revenue, and 3 years in business."
      
      case "script":
        return JSON.stringify({
          businessData: {
            name: "TechCorp Solutions",
            industry: "Technology",
            revenue: 2000000,
            employees: 50
          }
        }, null, 2)
      
      case "database":
        return JSON.stringify({
          customer_id: "CUST001",
          date_range: "30_days"
        }, null, 2)
      
      case "search":
        return JSON.stringify({
          query: "banking compliance requirements",
          filters: ["regulatory", "kyc"]
        }, null, 2)
      
      default:
        return "{}"
    }
  }

  if (!tool) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/tools">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tools
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                {getTypeIcon(tool.type)}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{tool.name}</h1>
                  <p className="text-gray-600">Test tool execution and validate configuration</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              {tool.type.toUpperCase()}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Input */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Input</CardTitle>
                <CardDescription>Configure test data for tool execution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="test-input">Input Data</Label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setTestInput(getExampleInput(tool.type))}
                    >
                      Load Example
                    </Button>
                  </div>
                  <Textarea
                    id="test-input"
                    value={testInput}
                    onChange={(e) => setTestInput(e.target.value)}
                    placeholder="Enter test input data..."
                    rows={12}
                    className="font-mono text-sm"
                  />
                </div>

                <Button 
                  onClick={handleExecuteTest} 
                  disabled={isExecuting || !testInput.trim()}
                  className="w-full"
                >
                  {isExecuting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Executing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Execute Test
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Tool Configuration Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Tool Configuration</CardTitle>
                <CardDescription>Current tool settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {tool.type === "api" && (
                    <>
                      <div>
                        <Label className="text-xs text-gray-600">Endpoint</Label>
                        <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                          {tool.configuration.method} {tool.configuration.endpoint}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Authentication</Label>
                        <Badge variant="outline" className="text-xs">
                          {tool.configuration.authentication?.type || "none"}
                        </Badge>
                      </div>
                    </>
                  )}

                  {tool.type === "websocket" && (
                    <>
                      <div>
                        <Label className="text-xs text-gray-600">WebSocket URL</Label>
                        <p className="font-mono text-xs bg-gray-100 p-2 rounded">
                          {tool.configuration.wsUrl}
                        </p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Auto Reconnect</Label>
                        <Badge variant="outline" className="text-xs">
                          {tool.configuration.wsReconnect ? "enabled" : "disabled"}
                        </Badge>
                      </div>
                    </>
                  )}

                  {tool.type === "llm" && (
                    <>
                      <div>
                        <Label className="text-xs text-gray-600">Provider</Label>
                        <Badge variant="outline" className="text-xs">
                          {tool.configuration.llmProvider}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Model</Label>
                        <p className="text-xs">{tool.configuration.llmModel}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Temperature</Label>
                        <p className="text-xs">{tool.configuration.temperature || 0.7}</p>
                      </div>
                    </>
                  )}

                  {tool.type === "script" && (
                    <>
                      <div>
                        <Label className="text-xs text-gray-600">Script Type</Label>
                        <Badge variant="outline" className="text-xs">
                          {tool.configuration.scriptType}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">Environment</Label>
                        <p className="text-xs">{tool.configuration.scriptEnvironment}</p>
                      </div>
                    </>
                  )}

                  <div>
                    <Label className="text-xs text-gray-600">Parameters</Label>
                    <p className="text-xs">{tool.configuration.parameters?.length || 0} configured</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test Results */}
          <div className="space-y-6">
            {testResult ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {testResult.success ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                      Test Results
                    </CardTitle>
                    <Badge variant={testResult.success ? "default" : "destructive"}>
                      {testResult.success ? "Success" : "Failed"}
                    </Badge>
                  </div>
                  {testResult.executionId && (
                    <CardDescription>Execution ID: {testResult.executionId}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="result" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="result">Result</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="raw">Raw Response</TabsTrigger>
                    </TabsList>

                    <TabsContent value="result" className="space-y-4">
                      {testResult.success ? (
                        <div className="space-y-4">
                          {testResult.result.statusCode && (
                            <div className="flex items-center justify-between">
                              <Label className="text-sm text-gray-600">Status Code</Label>
                              <Badge variant="outline">{testResult.result.statusCode}</Badge>
                            </div>
                          )}

                          {testResult.result.executionTime && (
                            <div className="flex items-center justify-between">
                              <Label className="text-sm text-gray-600">Execution Time</Label>
                              <span className="text-sm font-medium">{testResult.result.executionTime}</span>
                            </div>
                          )}

                          {testResult.result.data && (
                            <div>
                              <Label className="text-sm text-gray-600">Response Data</Label>
                              <div className="bg-gray-50 p-3 rounded mt-2">
                                <pre className="text-xs whitespace-pre-wrap">
                                  {JSON.stringify(testResult.result.data, null, 2)}
                                </pre>
                              </div>
                            </div>
                          )}

                          {testResult.result.response && (
                            <div>
                              <Label className="text-sm text-gray-600">LLM Response</Label>
                              <div className="bg-gray-50 p-3 rounded mt-2">
                                <p className="text-sm whitespace-pre-wrap">{testResult.result.response}</p>
                              </div>
                            </div>
                          )}

                          {testResult.result.output && (
                            <div>
                              <Label className="text-sm text-gray-600">Script Output</Label>
                              <div className="bg-gray-50 p-3 rounded mt-2">
                                <pre className="text-xs whitespace-pre-wrap">
                                  {JSON.stringify(testResult.result.output, null, 2)}
                                </pre>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <XCircle className="w-12 h-12 mx-auto mb-4 text-red-600" />
                          <p className="text-red-600 font-medium">Test Failed</p>
                          <p className="text-gray-600 text-sm mt-2">{testResult.error}</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="details" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-gray-600">Tool Type</Label>
                          <p className="font-medium">{testResult.result?.toolType}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Test Mode</Label>
                          <Badge variant="outline" className="text-xs">
                            {testResult.result?.testMode ? "enabled" : "disabled"}
                          </Badge>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">Start Time</Label>
                          <p className="text-xs">{testResult.result?.startTime}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">End Time</Label>
                          <p className="text-xs">{testResult.result?.endTime}</p>
                        </div>
                      </div>

                      {testResult.result?.usage && (
                        <div>
                          <Label className="text-sm text-gray-600">Token Usage</Label>
                          <div className="bg-gray-50 p-3 rounded mt-2">
                            <pre className="text-xs">
                              {JSON.stringify(testResult.result.usage, null, 2)}
                            </pre>
                          </div>
                        </div>
                      )}

                      {testResult.result?.console && (
                        <div>
                          <Label className="text-sm text-gray-600">Console Output</Label>
                          <div className="bg-gray-900 text-green-400 p-3 rounded mt-2 font-mono text-xs">
                            {testResult.result.console.map((line: string, index: number) => (
                              <div key={index}>{line}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="raw" className="space-y-4">
                      <div>
                        <Label className="text-sm text-gray-600">Raw Response</Label>
                        <div className="bg-gray-50 p-3 rounded mt-2">
                          <pre className="text-xs whitespace-pre-wrap">
                            {JSON.stringify(testResult, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Play className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Configure test input and click Execute to see results</p>
                </CardContent>
              </Card>
            )}

            {/* Quick Test Examples */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Test Examples</CardTitle>
                <CardDescription>Common test scenarios for this tool type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tool.type === "api" && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => setTestInput(JSON.stringify({
                          document_image: "sample_passport_image_base64",
                          document_type: "passport"
                        }, null, 2))}
                      >
                        Passport Verification
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => setTestInput(JSON.stringify({
                          document_image: "sample_license_image_base64",
                          document_type: "drivers_license",
                          confidence_threshold: 0.95
                        }, null, 2))}
                      >
                        Driver's License Check
                      </Button>
                    </>
                  )}

                  {tool.type === "llm" && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => setTestInput("Analyze the compliance risk for a fintech startup with cryptocurrency trading services.")}
                      >
                        Risk Analysis
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => setTestInput("Summarize the key KYC requirements for onboarding a new business customer.")}
                      >
                        KYC Summary
                      </Button>
                    </>
                  )}

                  {tool.type === "script" && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={() => setTestInput(JSON.stringify({
                          businessData: {
                            name: "Sample Corp",
                            revenue: 1000000,
                            employees: 25,
                            industry: "retail"
                          }
                        }, null, 2))}
                      >
                        Business Analysis
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
