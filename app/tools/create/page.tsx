"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Plus, Trash2, Code, Database, Search, Settings, TestTube, Activity, Brain, FileCode } from 'lucide-react'
import Link from "next/link"

interface ToolParameter {
  name: string
  type: "string" | "number" | "boolean" | "object"
  required: boolean
  description: string
  defaultValue?: any
}

interface NewTool {
  name: string
  description: string
  category: string
  type: "api" | "websocket" | "llm" | "script" | "database" | "search" | "external"
  configuration: {
    // API Configuration
    endpoint?: string
    method?: string
    headers?: Record<string, string>
    authentication?: {
      type: "bearer" | "api_key" | "basic" | "oauth2"
      credentials?: Record<string, string>
    }
    
    // WebSocket Configuration
    wsUrl?: string
    wsProtocols?: string[]
    wsReconnect?: boolean
    wsHeartbeat?: number
    
    // LLM Configuration
    llmProvider?: "openai" | "anthropic" | "groq" | "xai" | "custom"
    llmModel?: string
    llmApiKey?: string
    llmEndpoint?: string
    systemPrompt?: string
    temperature?: number
    maxTokens?: number
    
    // Script Configuration
    scriptType?: "javascript" | "python" | "sql"
    scriptContent?: string
    scriptEnvironment?: "node" | "browser" | "python" | "database"
    scriptDependencies?: string[]
    
    // Common Configuration
    parameters?: ToolParameter[]
    searchQuery?: string
    databaseTable?: string
    timeout?: number
    retries?: number
    rateLimit?: {
      requests: number
      period: string
    }
    
    // Advanced Options
    streaming?: boolean
    realtime?: boolean
    caching?: {
      enabled: boolean
      ttl: number
    }
  }
}

export default function CreateToolPage() {
  const [tool, setTool] = useState<NewTool>({
    name: "",
    description: "",
    category: "KYC",
    type: "api",
    configuration: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      parameters: [],
      timeout: 30000,
      retries: 3,
      rateLimit: {
        requests: 100,
        period: "1h",
      },
    },
  })

  const [testResult, setTestResult] = useState<any>(null)
  const [isTesting, setIsTesting] = useState(false)

  const handleSave = async () => {
    try {
      console.log("Creating new tool:", tool)
      alert("Tool created successfully!")
    } catch (error) {
      alert("Failed to create tool")
    }
  }

  const handleTest = async () => {
    setIsTesting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockResult = {
        success: true,
        responseTime: "1.5s",
        statusCode: 200,
        response: {
          message: "Tool test successful",
          configuration_valid: true,
          parameters_validated: true,
        },
      }

      setTestResult(mockResult)
    } catch (error) {
      setTestResult({
        success: false,
        error: "Test failed",
      })
    } finally {
      setIsTesting(false)
    }
  }

  const addParameter = () => {
    const newParameter: ToolParameter = {
      name: "new_parameter",
      type: "string",
      required: false,
      description: "Parameter description",
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "api":
        return <Code className="w-4 h-4" />
    case "websocket":
      return <Activity className="w-4 h-4" />
    case "llm":
      return <Brain className="w-4 h-4" />
    case "script":
      return <FileCode className="w-4 h-4" />
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
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Tool</h1>
                <p className="text-gray-600">Configure a new tool for agent assignment</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleTest} disabled={isTesting}>
                <TestTube className="w-4 h-4 mr-2" />
                {isTesting ? "Testing..." : "Test Tool"}
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Create Tool
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                      <Label htmlFor="tool-name">Tool Name *</Label>
                      <Input
                        id="tool-name"
                        value={tool.name}
                        onChange={(e) => setTool({ ...tool, name: e.target.value })}
                        placeholder="e.g., Document Verification API"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tool-description">Description *</Label>
                      <Textarea
                        id="tool-description"
                        value={tool.description}
                        onChange={(e) => setTool({ ...tool, description: e.target.value })}
                        placeholder="Describe what this tool does and its purpose..."
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
                            <SelectItem value="External Services">External Services</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="tool-type">Type *</Label>
                        <Select value={tool.type} onValueChange={(value: any) => setTool({ ...tool, type: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="api">API Call</SelectItem>
                            <SelectItem value="websocket">WebSocket Connection</SelectItem>
                            <SelectItem value="llm">LLM Integration</SelectItem>
                            <SelectItem value="script">Custom Script</SelectItem>
                            <SelectItem value="database">Database Query</SelectItem>
                            <SelectItem value="search">Search Query</SelectItem>
                            <SelectItem value="external">External Service</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="connection" className="space-y-6">
                {tool.type === "api" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>API Configuration</CardTitle>
                      <CardDescription>Configure API endpoint and authentication</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="endpoint">Endpoint URL *</Label>
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

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="method">HTTP Method</Label>
                          <Select
                            value={tool.configuration.method || "POST"}
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
                          <Label htmlFor="auth-type">Authentication</Label>
                          <Select
                            value={tool.configuration.authentication?.type || "bearer"}
                            onValueChange={(value) =>
                              setTool({
                                ...tool,
                                configuration: { 
                                  ...tool.configuration, 
                                  authentication: { 
                                    ...tool.configuration.authentication,
                                    type: value as any
                                  }
                                },
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bearer">Bearer Token</SelectItem>
                              <SelectItem value="api_key">API Key</SelectItem>
                              <SelectItem value="basic">Basic Auth</SelectItem>
                              <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Authentication Configuration */}
                      {tool.configuration.authentication?.type === "bearer" && (
                        <div>
                          <Label htmlFor="bearer-token">Bearer Token</Label>
                          <Input
                            id="bearer-token"
                            type="password"
                            value={tool.configuration.authentication?.credentials?.token || ""}
                            onChange={(e) =>
                              setTool({
                                ...tool,
                                configuration: {
                                  ...tool.configuration,
                                  authentication: {
                                    ...tool.configuration.authentication,
                                    credentials: {
                                      ...tool.configuration.authentication?.credentials,
                                      token: e.target.value
                                    }
                                  }
                                },
                              })
                            }
                            placeholder="Enter bearer token or use ${ENV_VAR}"
                          />
                        </div>
                      )}

                      {tool.configuration.authentication?.type === "api_key" && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="api-key-name">API Key Header Name</Label>
                            <Input
                              id="api-key-name"
                              value={tool.configuration.authentication?.credentials?.keyName || "X-API-Key"}
                              onChange={(e) =>
                                setTool({
                                  ...tool,
                                  configuration: {
                                    ...tool.configuration,
                                    authentication: {
                                      ...tool.configuration.authentication,
                                      credentials: {
                                        ...tool.configuration.authentication?.credentials,
                                        keyName: e.target.value
                                      }
                                    }
                                  },
                                })
                              }
                              placeholder="X-API-Key"
                            />
                          </div>
                          <div>
                            <Label htmlFor="api-key-value">API Key Value</Label>
                            <Input
                              id="api-key-value"
                              type="password"
                              value={tool.configuration.authentication?.credentials?.keyValue || ""}
                              onChange={(e) =>
                                setTool({
                                  ...tool,
                                  configuration: {
                                    ...tool.configuration,
                                    authentication: {
                                      ...tool.configuration.authentication,
                                      credentials: {
                                        ...tool.configuration.authentication?.credentials,
                                        keyValue: e.target.value
                                      }
                                    }
                                  },
                                })
                              }
                              placeholder="Enter API key or use ${ENV_VAR}"
                            />
                          </div>
                        </div>
                      )}

                      {tool.configuration.authentication?.type === "basic" && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="basic-username">Username</Label>
                            <Input
                              id="basic-username"
                              value={tool.configuration.authentication?.credentials?.username || ""}
                              onChange={(e) =>
                                setTool({
                                  ...tool,
                                  configuration: {
                                    ...tool.configuration,
                                    authentication: {
                                      ...tool.configuration.authentication,
                                      credentials: {
                                        ...tool.configuration.authentication?.credentials,
                                        username: e.target.value
                                      }
                                    }
                                  },
                                })
                              }
                              placeholder="Username"
                            />
                          </div>
                          <div>
                            <Label htmlFor="basic-password">Password</Label>
                            <Input
                              id="basic-password"
                              type="password"
                              value={tool.configuration.authentication?.credentials?.password || ""}
                              onChange={(e) =>
                                setTool({
                                  ...tool,
                                  configuration: {
                                    ...tool.configuration,
                                    authentication: {
                                      ...tool.configuration.authentication,
                                      credentials: {
                                        ...tool.configuration.authentication?.credentials,
                                        password: e.target.value
                                      }
                                    }
                                  },
                                })
                              }
                              placeholder="Password or use ${ENV_VAR}"
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={tool.configuration.streaming || false}
                          onCheckedChange={(checked) =>
                            setTool({
                              ...tool,
                              configuration: { ...tool.configuration, streaming: checked as boolean },
                            })
                          }
                        />
                        <Label>Enable Streaming Response</Label>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {tool.type === "websocket" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>WebSocket Configuration</CardTitle>
                      <CardDescription>Configure WebSocket connection for real-time data</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="ws-url">WebSocket URL *</Label>
                        <Input
                          id="ws-url"
                          value={tool.configuration.wsUrl || ""}
                          onChange={(e) =>
                            setTool({
                              ...tool,
                              configuration: { ...tool.configuration, wsUrl: e.target.value },
                            })
                          }
                          placeholder="wss://api.example.com/ws"
                        />
                      </div>

                      <div>
                        <Label htmlFor="ws-protocols">Protocols (comma-separated)</Label>
                        <Input
                          id="ws-protocols"
                          value={tool.configuration.wsProtocols?.join(", ") || ""}
                          onChange={(e) =>
                            setTool({
                              ...tool,
                              configuration: { 
                                ...tool.configuration, 
                                wsProtocols: e.target.value.split(",").map(p => p.trim()).filter(Boolean)
                              },
                            })
                          }
                          placeholder="protocol1, protocol2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="ws-heartbeat">Heartbeat Interval (ms)</Label>
                          <Input
                            id="ws-heartbeat"
                            type="number"
                            value={tool.configuration.wsHeartbeat || 30000}
                            onChange={(e) =>
                              setTool({
                                ...tool,
                                configuration: { ...tool.configuration, wsHeartbeat: parseInt(e.target.value) },
                              })
                            }
                          />
                        </div>

                        <div className="flex items-center space-x-2 mt-6">
                          <Checkbox
                            checked={tool.configuration.wsReconnect || false}
                            onCheckedChange={(checked) =>
                              setTool({
                                ...tool,
                                configuration: { ...tool.configuration, wsReconnect: checked as boolean },
                              })
                            }
                          />
                          <Label>Auto Reconnect</Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {tool.type === "llm" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>LLM Integration</CardTitle>
                      <CardDescription>Configure Large Language Model integration</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="llm-provider">LLM Provider *</Label>
                        <Select
                          value={tool.configuration.llmProvider || "openai"}
                          onValueChange={(value) =>
                            setTool({
                              ...tool,
                              configuration: { ...tool.configuration, llmProvider: value },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="openai">OpenAI</SelectItem>
                            <SelectItem value="anthropic">Anthropic (Claude)</SelectItem>
                            <SelectItem value="groq">Groq</SelectItem>
                            <SelectItem value="xai">xAI (Grok)</SelectItem>
                            <SelectItem value="custom">Custom Endpoint</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="llm-model">Model *</Label>
                        <Input
                          id="llm-model"
                          value={tool.configuration.llmModel || ""}
                          onChange={(e) =>
                            setTool({
                              ...tool,
                              configuration: { ...tool.configuration, llmModel: e.target.value },
                            })
                          }
                          placeholder="gpt-4o, claude-3-sonnet, grok-3, etc."
                        />
                      </div>

                      {tool.configuration.llmProvider === "custom" && (
                        <div>
                          <Label htmlFor="llm-endpoint">Custom Endpoint</Label>
                          <Input
                            id="llm-endpoint"
                            value={tool.configuration.llmEndpoint || ""}
                            onChange={(e) =>
                              setTool({
                                ...tool,
                                configuration: { ...tool.configuration, llmEndpoint: e.target.value },
                              })
                            }
                            placeholder="https://api.custom-llm.com/v1/chat/completions"
                          />
                        </div>
                      )}

                      <div>
                        <Label htmlFor="system-prompt">System Prompt</Label>
                        <Textarea
                          id="system-prompt"
                          value={tool.configuration.systemPrompt || ""}
                          onChange={(e) =>
                            setTool({
                              ...tool,
                              configuration: { ...tool.configuration, systemPrompt: e.target.value },
                            })
                          }
                          placeholder="You are a banking specialist AI that helps with..."
                          rows={4}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="temperature">Temperature</Label>
                          <Input
                            id="temperature"
                            type="number"
                            step="0.1"
                            min="0"
                            max="2"
                            value={tool.configuration.temperature || 0.7}
                            onChange={(e) =>
                              setTool({
                                ...tool,
                                configuration: { ...tool.configuration, temperature: parseFloat(e.target.value) },
                              })
                            }
                          />
                        </div>

                        <div>
                          <Label htmlFor="max-tokens">Max Tokens</Label>
                          <Input
                            id="max-tokens"
                            type="number"
                            value={tool.configuration.maxTokens || 1000}
                            onChange={(e) =>
                              setTool({
                                ...tool,
                                configuration: { ...tool.configuration, maxTokens: parseInt(e.target.value) },
                              })
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {tool.type === "script" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Custom Script Configuration</CardTitle>
                      <CardDescription>Configure custom script execution</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="script-type">Script Type *</Label>
                          <Select
                            value={tool.configuration.scriptType || "javascript"}
                            onValueChange={(value) =>
                              setTool({
                                ...tool,
                                configuration: { ...tool.configuration, scriptType: value },
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="javascript">JavaScript</SelectItem>
                              <SelectItem value="python">Python</SelectItem>
                              <SelectItem value="sql">SQL</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="script-environment">Environment</Label>
                          <Select
                            value={tool.configuration.scriptEnvironment || "node"}
                            onValueChange={(value) =>
                              setTool({
                                ...tool,
                                configuration: { ...tool.configuration, scriptEnvironment: value },
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="node">Node.js</SelectItem>
                              <SelectItem value="browser">Browser</SelectItem>
                              <SelectItem value="python">Python Runtime</SelectItem>
                              <SelectItem value="database">Database Engine</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="script-content">Script Content *</Label>
                        <Textarea
                          id="script-content"
                          value={tool.configuration.scriptContent || ""}
                          onChange={(e) =>
                            setTool({
                              ...tool,
                              configuration: { ...tool.configuration, scriptContent: e.target.value },
                            })
                          }
                          placeholder={
                            tool.configuration.scriptType === "javascript"
                              ? `// JavaScript function
async function processData(input, context) {
  // Your processing logic here
  const result = await fetch('https://api.example.com/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  
  return await result.json();
}`
                              : tool.configuration.scriptType === "python"
                              ? `# Python function
import requests
import json

def process_data(input_data, context):
    # Your processing logic here
    response = requests.post(
        'https://api.example.com/data',
        json=input_data,
        headers={'Content-Type': 'application/json'}
    )
    
    return response.json()`
                              : `-- SQL Query
SELECT 
  customer_id,
  risk_score,
  compliance_status
FROM customer_assessments 
WHERE business_id = ? 
  AND assessment_date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY assessment_date DESC
LIMIT 10;`
                          }
                          rows={15}
                          className="font-mono text-sm"
                        />
                      </div>

                      <div>
                        <Label htmlFor="script-dependencies">Dependencies (one per line)</Label>
                        <Textarea
                          id="script-dependencies"
                          value={tool.configuration.scriptDependencies?.join('\n') || ""}
                          onChange={(e) =>
                            setTool({
                              ...tool,
                              configuration: { 
                                ...tool.configuration, 
                                scriptDependencies: e.target.value.split('\n').filter(Boolean)
                              },
                            })
                          }
                          placeholder={
                            tool.configuration.scriptType === "javascript"
                              ? `axios
lodash
moment
crypto`
                              : tool.configuration.scriptType === "python"
                              ? `requests
pandas
numpy
beautifulsoup4`
                              : `-- SQL dependencies are managed by the database engine`
                          }
                          rows={4}
                        />
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
                        <Label htmlFor="search-query">Search Query *</Label>
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
                              <Label>Name *</Label>
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
                            <Label>Description *</Label>
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
                    <CardDescription>Configure timeout, retries, caching, and performance options</CardDescription>
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
                              configuration: { ...tool.configuration, timeout: parseInt(e.target.value) },
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
                              configuration: { ...tool.configuration, retries: parseInt(e.target.value) },
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
                                    requests: parseInt(e.target.value),
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

                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Checkbox
                          checked={tool.configuration.caching?.enabled || false}
                          onCheckedChange={(checked) =>
                            setTool({
                              ...tool,
                              configuration: {
                                ...tool.configuration,
                                caching: {
                                  ...tool.configuration.caching,
                                  enabled: checked as boolean,
                                  ttl: tool.configuration.caching?.ttl || 300
                                },
                              },
                            })
                          }
                        />
                        <Label>Enable Response Caching</Label>
                      </div>

                      {tool.configuration.caching?.enabled && (
                        <div>
                          <Label htmlFor="cache-ttl">Cache TTL (seconds)</Label>
                          <Input
                            id="cache-ttl"
                            type="number"
                            value={tool.configuration.caching?.ttl || 300}
                            onChange={(e) =>
                              setTool({
                                ...tool,
                                configuration: {
                                  ...tool.configuration,
                                  caching: {
                                    ...tool.configuration.caching,
                                    enabled: true,
                                    ttl: parseInt(e.target.value)
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={tool.configuration.realtime || false}
                        onCheckedChange={(checked) =>
                          setTool({
                            ...tool,
                            configuration: { ...tool.configuration, realtime: checked as boolean },
                          })
                        }
                      />
                      <Label>Real-time Processing</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tool Preview</CardTitle>
                <CardDescription>Preview of your tool configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <Label className="text-xs text-gray-600">Name</Label>
                    <p className="font-medium">{tool.name || "Untitled Tool"}</p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Type</Label>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(tool.type)}
                      <Badge variant="outline">{tool.type}</Badge>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Category</Label>
                    <Badge variant="secondary">{tool.category}</Badge>
                  </div>

                  {tool.type === "api" && tool.configuration.endpoint && (
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
          </div>
        </div>
      </div>
    </div>
  )
}
