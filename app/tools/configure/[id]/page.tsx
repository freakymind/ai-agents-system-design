"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, TestTube, Plus, Trash2, Code, Database, Settings } from "lucide-react"
import Link from "next/link"

interface ToolParameter {
  name: string
  type: "string" | "number" | "boolean" | "object"
  required: boolean
  description: string
  defaultValue?: any
}

interface ToolConfiguration {
  id: string
  name: string
  description: string
  category: string
  type: "api" | "search" | "database" | "processing" | "external"
  status: "active" | "inactive" | "maintenance"
  configuration: {
    endpoint?: string
    method?: string
    headers?: Record<string, string>
    parameters?: ToolParameter[]
    searchQuery?: string
    databaseTable?: string
    processingScript?: string
    timeout?: number
    retries?: number
    rateLimit?: {
      requests: number
      period: string
    }
  }
}

export default function ConfigureToolPage({ params }: { params: { id: string } }) {
  const [tool, setTool] = useState<ToolConfiguration | null>(null)
  const [testResult, setTestResult] = useState<any>(null)
  const [isTesting, setIsTesting] = useState(false)

  useEffect(() => {
    // Mock data - in real app, fetch based on params.id
    const mockTool: ToolConfiguration = {
      id: params.id,
      name: "Document Verification API",
      description: "AI-powered document authenticity verification using external OCR service",
      category: "KYC",
      type: "api",
      status: "active",
      configuration: {
        endpoint: "https://api.docverify.com/v2/verify",
        method: "POST",
        headers: {
          Authorization: "Bearer ${DOC_VERIFY_API_KEY}",
          "Content-Type": "application/json",
          "X-Client-Version": "2.1",
        },
        parameters: [
          {
            name: "document_image",
            type: "string",
            required: true,
            description: "Base64 encoded document image",
          },
          {
            name: "document_type",
            type: "string",
            required: true,
            description: "Type of document (passport, license, certificate, etc.)",
          },
          {
            name: "confidence_threshold",
            type: "number",
            required: false,
            description: "Minimum confidence score (0.0 - 1.0)",
            defaultValue: 0.85,
          },
          {
            name: "extract_text",
            type: "boolean",
            required: false,
            description: "Whether to extract text from document",
            defaultValue: true,
          },
        ],
        timeout: 30000,
        retries: 3,
        rateLimit: {
          requests: 100,
          period: "1h",
        },
      },
    }
    setTool(mockTool)
  }, [params.id])

  const handleSave = async () => {
    if (!tool) return

    try {
      // In real app, save to backend
      console.log("Saving tool configuration:", tool)
      alert("Tool configuration saved successfully!")
    } catch (error) {
      alert("Failed to save configuration")
    }
  }

  const handleTest = async () => {
    if (!tool) return

    setIsTesting(true)
    try {
      // Mock test execution
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockResult = {
        success: true,
        responseTime: "1.2s",
        statusCode: 200,
        response: {
          document_valid: true,
          confidence: 0.94,
          extracted_text: "Sample document text...",
          verification_details: {
            format_valid: true,
            security_features: "detected",
            tampering_detected: false,
          },
        },
      }

      setTestResult(mockResult)
    } catch (error) {
      setTestResult({
        success: false,
        error: "Connection timeout",
      })
    } finally {
      setIsTesting(false)
    }
  }

  const addParameter = () => {
    if (!tool) return

    const newParameter: ToolParameter = {
      name: "new_parameter",
      type: "string",
      required: false,
      description: "New parameter description",
    }

    setTool({
      ...tool,
      configuration: {
        ...tool.configuration,
        parameters: [...(tool.configuration.parameters || []), newParameter],
      },
    })
  }

  const removeParameter = (index: number) => {
    if (!tool) return

    const updatedParameters = tool.configuration.parameters?.filter((_, i) => i !== index) || []
    setTool({
      ...tool,
      configuration: {
        ...tool.configuration,
        parameters: updatedParameters,
      },
    })
  }

  const updateParameter = (index: number, field: keyof ToolParameter, value: any) => {
    if (!tool) return

    const updatedParameters =
      tool.configuration.parameters?.map((param, i) => (i === index ? { ...param, [field]: value } : param)) || []

    setTool({
      ...tool,
      configuration: {
        ...tool.configuration,
        parameters: updatedParameters,
      },
    })
  }

  const addHeader = () => {
    if (!tool) return

    setTool({
      ...tool,
      configuration: {
        ...tool.configuration,
        headers: {
          ...tool.configuration.headers,
          "New-Header": "value",
        },
      },
    })
  }

  const removeHeader = (headerName: string) => {
    if (!tool) return

    const { [headerName]: removed, ...remainingHeaders } = tool.configuration.headers || {}
    setTool({
      ...tool,
      configuration: {
        ...tool.configuration,
        headers: remainingHeaders,
      },
    })
  }

  const updateHeader = (oldName: string, newName: string, value: string) => {
    if (!tool) return

    const headers = { ...tool.configuration.headers }
    if (oldName !== newName) {
      delete headers[oldName]
    }
    headers[newName] = value

    setTool({
      ...tool,
      configuration: {
        ...tool.configuration,
        headers,
      },
    })
  }

  if (!tool) {
    return <div>Loading...</div>
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "api":
        return <Code className="w-4 h-4" />
      case "database":
      case "search":
        return <Database className="w-4 h-4" />
      default:
        return <Settings className="w-4 h-4" />
    }
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
              <div className="flex items-center gap-2">
                {getTypeIcon(tool.type)}
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{tool.name}</h1>
                  <p className="text-gray-600">Configure tool settings and parameters</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleTest} disabled={isTesting}>
                <TestTube className="w-4 h-4 mr-2" />
                {isTesting ? "Testing..." : "Test Tool"}
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Configuration
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="basic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="connection">Connection</TabsTrigger>
                <TabsTrigger value="parameters">Parameters</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Configure basic tool properties</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="tool-name">Tool Name</Label>
                      <Input
                        id="tool-name"
                        value={tool.name}
                        onChange={(e) => setTool({ ...tool, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="tool-description">Description</Label>
                      <Textarea
                        id="tool-description"
                        value={tool.description}
                        onChange={(e) => setTool({ ...tool, description: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tool-category">Category</Label>
                        <Select value={tool.category} onValueChange={(value) => setTool({ ...tool, category: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="KYC">KYC</SelectItem>
                            <SelectItem value="Risk Assessment">Risk Assessment</SelectItem>
                            <SelectItem value="Compliance">Compliance</SelectItem>
                            <SelectItem value="Document Processing">Document Processing</SelectItem>
                            <SelectItem value="Data Enrichment">Data Enrichment</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="tool-type">Type</Label>
                        <Select value={tool.type} onValueChange={(value: any) => setTool({ ...tool, type: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="api">API Call</SelectItem>
                            <SelectItem value="search">Search Query</SelectItem>
                            <SelectItem value="database">Database Query</SelectItem>
                            <SelectItem value="processing">Data Processing</SelectItem>
                            <SelectItem value="external">External Service</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="tool-status">Status</Label>
                      <Select value={tool.status} onValueChange={(value: any) => setTool({ ...tool, status: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="connection" className="space-y-6">
                {tool.type === "api" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>API Configuration</CardTitle>
                      <CardDescription>Configure API endpoint and connection settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="endpoint">Endpoint URL</Label>
                        <Input
                          id="endpoint"
                          value={tool.configuration.endpoint || ""}
                          onChange={(e) =>
                            setTool({
                              ...tool,
                              configuration: { ...tool.configuration, endpoint: e.target.value },
                            })
                          }
                          placeholder="https://api.example.com/v1/endpoint"
                        />
                      </div>

                      <div>
                        <Label htmlFor="method">HTTP Method</Label>
                        <Select
                          value={tool.configuration.method || "GET"}
                          onValueChange={(value) =>
                            setTool({
                              ...tool,
                              configuration: { ...tool.configuration, method: value },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="GET">GET</SelectItem>
                            <SelectItem value="POST">POST</SelectItem>
                            <SelectItem value="PUT">PUT</SelectItem>
                            <SelectItem value="DELETE">DELETE</SelectItem>
                            <SelectItem value="PATCH">PATCH</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Headers</Label>
                          <Button variant="outline" size="sm" onClick={addHeader}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Header
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {Object.entries(tool.configuration.headers || {}).map(([name, value]) => (
                            <div key={name} className="flex gap-2">
                              <Input
                                placeholder="Header name"
                                value={name}
                                onChange={(e) => updateHeader(name, e.target.value, value)}
                                className="flex-1"
                              />
                              <Input
                                placeholder="Header value"
                                value={value}
                                onChange={(e) => updateHeader(name, name, e.target.value)}
                                className="flex-1"
                              />
                              <Button variant="outline" size="sm" onClick={() => removeHeader(name)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {tool.type === "search" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Search Configuration</CardTitle>
                      <CardDescription>Configure search query and data source</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="search-query">Search Query</Label>
                        <Textarea
                          id="search-query"
                          value={tool.configuration.searchQuery || ""}
                          onChange={(e) =>
                            setTool({
                              ...tool,
                              configuration: { ...tool.configuration, searchQuery: e.target.value },
                            })
                          }
                          placeholder="SELECT * FROM table WHERE condition = ?"
                          rows={4}
                        />
                      </div>

                      <div>
                        <Label htmlFor="database-table">Database/Table</Label>
                        <Input
                          id="database-table"
                          value={tool.configuration.databaseTable || ""}
                          onChange={(e) =>
                            setTool({
                              ...tool,
                              configuration: { ...tool.configuration, databaseTable: e.target.value },
                            })
                          }
                          placeholder="database.table_name"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {tool.type === "processing" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Processing Configuration</CardTitle>
                      <CardDescription>Configure data processing script</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="processing-script">Processing Script</Label>
                        <Textarea
                          id="processing-script"
                          value={tool.configuration.processingScript || ""}
                          onChange={(e) =>
                            setTool({
                              ...tool,
                              configuration: { ...tool.configuration, processingScript: e.target.value },
                            })
                          }
                          placeholder="// JavaScript processing function
function processData(input) {
  // Your processing logic here
  return result;
}"
                          rows={10}
                          className="font-mono text-sm"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="parameters" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Parameters</CardTitle>
                        <CardDescription>Define input parameters for this tool</CardDescription>
                      </div>
                      <Button variant="outline" onClick={addParameter}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Parameter
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {tool.configuration.parameters?.map((param, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">Parameter {index + 1}</h4>
                            <Button variant="outline" size="sm" onClick={() => removeParameter(index)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Name</Label>
                              <Input
                                value={param.name}
                                onChange={(e) => updateParameter(index, "name", e.target.value)}
                                placeholder="parameter_name"
                              />
                            </div>

                            <div>
                              <Label>Type</Label>
                              <Select
                                value={param.type}
                                onValueChange={(value: any) => updateParameter(index, "type", value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="string">String</SelectItem>
                                  <SelectItem value="number">Number</SelectItem>
                                  <SelectItem value="boolean">Boolean</SelectItem>
                                  <SelectItem value="object">Object</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="mt-3">
                            <Label>Description</Label>
                            <Textarea
                              value={param.description}
                              onChange={(e) => updateParameter(index, "description", e.target.value)}
                              placeholder="Parameter description"
                              rows={2}
                            />
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={param.required}
                                onCheckedChange={(checked) => updateParameter(index, "required", checked)}
                              />
                              <Label>Required</Label>
                            </div>

                            <div className="flex-1 ml-4">
                              <Label>Default Value</Label>
                              <Input
                                value={param.defaultValue || ""}
                                onChange={(e) => updateParameter(index, "defaultValue", e.target.value)}
                                placeholder="Default value (optional)"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      {(!tool.configuration.parameters || tool.configuration.parameters.length === 0) && (
                        <div className="text-center py-8 text-gray-500">
                          <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No parameters configured</p>
                          <p className="text-sm">Click "Add Parameter" to get started</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                    <CardDescription>Configure timeout, retries, and rate limiting</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="timeout">Timeout (ms)</Label>
                        <Input
                          id="timeout"
                          type="number"
                          value={tool.configuration.timeout || 30000}
                          onChange={(e) =>
                            setTool({
                              ...tool,
                              configuration: { ...tool.configuration, timeout: Number.parseInt(e.target.value) },
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="retries">Max Retries</Label>
                        <Input
                          id="retries"
                          type="number"
                          value={tool.configuration.retries || 3}
                          onChange={(e) =>
                            setTool({
                              ...tool,
                              configuration: { ...tool.configuration, retries: Number.parseInt(e.target.value) },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Rate Limiting</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <Label htmlFor="rate-requests">Requests</Label>
                          <Input
                            id="rate-requests"
                            type="number"
                            value={tool.configuration.rateLimit?.requests || 100}
                            onChange={(e) =>
                              setTool({
                                ...tool,
                                configuration: {
                                  ...tool.configuration,
                                  rateLimit: {
                                    ...tool.configuration.rateLimit,
                                    requests: Number.parseInt(e.target.value),
                                    period: tool.configuration.rateLimit?.period || "1h",
                                  },
                                },
                              })
                            }
                          />
                        </div>

                        <div>
                          <Label htmlFor="rate-period">Period</Label>
                          <Select
                            value={tool.configuration.rateLimit?.period || "1h"}
                            onValueChange={(value) =>
                              setTool({
                                ...tool,
                                configuration: {
                                  ...tool.configuration,
                                  rateLimit: {
                                    requests: tool.configuration.rateLimit?.requests || 100,
                                    period: value,
                                  },
                                },
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1m">1 minute</SelectItem>
                              <SelectItem value="5m">5 minutes</SelectItem>
                              <SelectItem value="1h">1 hour</SelectItem>
                              <SelectItem value="1d">1 day</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview and Test Results */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuration Preview</CardTitle>
                <CardDescription>Current tool configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <Label className="text-xs text-gray-600">Type</Label>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(tool.type)}
                      <Badge variant="outline">{tool.type}</Badge>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Status</Label>
                    <Badge variant={tool.status === "active" ? "default" : "secondary"}>{tool.status}</Badge>
                  </div>

                  {tool.type === "api" && (
                    <div>
                      <Label className="text-xs text-gray-600">Endpoint</Label>
                      <p className="text-xs font-mono bg-gray-100 p-2 rounded">
                        {tool.configuration.method} {tool.configuration.endpoint}
                      </p>
                    </div>
                  )}

                  <div>
                    <Label className="text-xs text-gray-600">Parameters</Label>
                    <p className="text-xs">{tool.configuration.parameters?.length || 0} configured</p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Timeout</Label>
                    <p className="text-xs">{tool.configuration.timeout || 30000}ms</p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Rate Limit</Label>
                    <p className="text-xs">
                      {tool.configuration.rateLimit?.requests || 100} requests per{" "}
                      {tool.configuration.rateLimit?.period || "1h"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {testResult && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="w-4 h-4" />
                    Test Results
                  </CardTitle>
                  <CardDescription>Latest tool test execution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-gray-600">Status</Label>
                      <Badge variant={testResult.success ? "default" : "destructive"}>
                        {testResult.success ? "Success" : "Failed"}
                      </Badge>
                    </div>

                    {testResult.success && (
                      <>
                        <div className="flex items-center justify-between">
                          <Label className="text-xs text-gray-600">Response Time</Label>
                          <span className="text-xs">{testResult.responseTime}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <Label className="text-xs text-gray-600">Status Code</Label>
                          <Badge variant="outline">{testResult.statusCode}</Badge>
                        </div>

                        <div>
                          <Label className="text-xs text-gray-600">Response</Label>
                          <div className="bg-gray-50 p-3 rounded text-xs font-mono mt-1">
                            <pre className="whitespace-pre-wrap">{JSON.stringify(testResult.response, null, 2)}</pre>
                          </div>
                        </div>
                      </>
                    )}

                    {!testResult.success && (
                      <div>
                        <Label className="text-xs text-gray-600">Error</Label>
                        <p className="text-xs text-red-600 bg-red-50 p-2 rounded">{testResult.error}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>Tool usage metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Total Calls:</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate:</span>
                    <span className="font-medium text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Response Time:</span>
                    <span className="font-medium">1.8s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Used:</span>
                    <span className="font-medium">2 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
