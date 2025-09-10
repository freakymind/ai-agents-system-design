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
import { ArrowLeft, Save, Settings, Trash2, Code, Database } from "lucide-react"
import Link from "next/link"

interface Tool {
  id: string
  name: string
  description: string
  category: string
  type: "api" | "search" | "database" | "processing" | "external"
  configuration: {
    endpoint?: string
    method?: string
    parameters?: any[]
  }
}

interface AgentTool {
  toolId: string
  mandatory: boolean
  configuration: {
    [key: string]: any
  }
}

interface AgentConfiguration {
  id: string
  name: string
  description: string
  background: string
  maxSteps: number
  tools: AgentTool[]
  executionSettings: {
    timeout: number
    retries: number
    parallelExecution: boolean
    errorHandling: "stop" | "continue" | "retry"
  }
}

export default function ConfigureAgentPage({ params }: { params: { id: string } }) {
  const [agent, setAgent] = useState<AgentConfiguration | null>(null)
  const [availableTools, setAvailableTools] = useState<Tool[]>([])

  useEffect(() => {
    // Mock data - in real app, fetch based on params.id
    const mockAgent: AgentConfiguration = {
      id: params.id,
      name: "KYC Specialist",
      description: "Handles Know Your Customer verification and compliance checks",
      background:
        "You are a KYC specialist AI agent responsible for verifying customer identities and ensuring compliance with banking regulations. You have access to document verification, identity checking, and sanctions screening tools.",
      maxSteps: 5,
      tools: [
        {
          toolId: "doc-verification",
          mandatory: true,
          configuration: {
            confidence_threshold: 0.9,
            extract_text: true,
          },
        },
        {
          toolId: "identity-search",
          mandatory: true,
          configuration: {
            verification_level: "enhanced",
          },
        },
        {
          toolId: "sanctions-screening",
          mandatory: true,
          configuration: {
            check_pep: true,
            check_sanctions: true,
            check_adverse_media: false,
          },
        },
      ],
      executionSettings: {
        timeout: 300000,
        retries: 2,
        parallelExecution: false,
        errorHandling: "retry",
      },
    }

    const mockTools: Tool[] = [
      {
        id: "doc-verification",
        name: "Document Verification API",
        description: "AI-powered document authenticity verification",
        category: "KYC",
        type: "api",
        configuration: {
          endpoint: "https://api.docverify.com/v2/verify",
          method: "POST",
          parameters: [
            { name: "document_image", type: "string", required: true },
            { name: "confidence_threshold", type: "number", required: false, defaultValue: 0.85 },
            { name: "extract_text", type: "boolean", required: false, defaultValue: true },
          ],
        },
      },
      {
        id: "identity-search",
        name: "Identity Database Search",
        description: "Search government identity databases",
        category: "KYC",
        type: "search",
        configuration: {
          parameters: [
            { name: "document_number", type: "string", required: true },
            { name: "full_name", type: "string", required: true },
            { name: "verification_level", type: "string", required: false, defaultValue: "standard" },
          ],
        },
      },
      {
        id: "sanctions-screening",
        name: "Sanctions Screening",
        description: "Screen against sanctions and watchlists",
        category: "Compliance",
        type: "database",
        configuration: {
          parameters: [
            { name: "entity_name", type: "string", required: true },
            { name: "check_pep", type: "boolean", required: false, defaultValue: true },
            { name: "check_sanctions", type: "boolean", required: false, defaultValue: true },
            { name: "check_adverse_media", type: "boolean", required: false, defaultValue: false },
          ],
        },
      },
      {
        id: "credit-check",
        name: "Credit Assessment",
        description: "Evaluate creditworthiness and financial history",
        category: "Risk Assessment",
        type: "api",
        configuration: {
          endpoint: "https://api.creditbureau.com/v1/check",
          method: "POST",
          parameters: [
            { name: "business_id", type: "string", required: true },
            { name: "check_type", type: "string", required: false, defaultValue: "standard" },
          ],
        },
      },
      {
        id: "risk-scoring",
        name: "Risk Scoring Engine",
        description: "Calculate comprehensive risk score",
        category: "Risk Assessment",
        type: "processing",
        configuration: {
          parameters: [
            { name: "business_profile", type: "object", required: true },
            { name: "financial_data", type: "object", required: false },
            { name: "industry_factors", type: "object", required: false },
          ],
        },
      },
    ]

    setAgent(mockAgent)
    setAvailableTools(mockTools)
  }, [params.id])

  const handleSave = async () => {
    if (!agent) return

    try {
      console.log("Saving agent configuration:", agent)
      alert("Agent configuration saved successfully!")
    } catch (error) {
      alert("Failed to save configuration")
    }
  }

  const addTool = (toolId: string) => {
    if (!agent) return

    const tool = availableTools.find((t) => t.id === toolId)
    if (!tool) return

    const newAgentTool: AgentTool = {
      toolId,
      mandatory: false,
      configuration: {},
    }

    // Set default configuration values
    tool.configuration.parameters?.forEach((param) => {
      if (param.defaultValue !== undefined) {
        newAgentTool.configuration[param.name] = param.defaultValue
      }
    })

    setAgent({
      ...agent,
      tools: [...agent.tools, newAgentTool],
    })
  }

  const removeTool = (toolId: string) => {
    if (!agent) return

    setAgent({
      ...agent,
      tools: agent.tools.filter((t) => t.toolId !== toolId),
    })
  }

  const updateToolConfig = (toolId: string, field: string, value: any) => {
    if (!agent) return

    setAgent({
      ...agent,
      tools: agent.tools.map((tool) => (tool.toolId === toolId ? { ...tool, [field]: value } : tool)),
    })
  }

  const updateToolParameter = (toolId: string, paramName: string, value: any) => {
    if (!agent) return

    setAgent({
      ...agent,
      tools: agent.tools.map((tool) =>
        tool.toolId === toolId
          ? {
              ...tool,
              configuration: {
                ...tool.configuration,
                [paramName]: value,
              },
            }
          : tool,
      ),
    })
  }

  const getToolById = (toolId: string) => {
    return availableTools.find((t) => t.id === toolId)
  }

  const getAvailableToolsToAdd = () => {
    const usedToolIds = agent?.tools.map((t) => t.toolId) || []
    return availableTools.filter((t) => !usedToolIds.includes(t.id))
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

  if (!agent) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/agents">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Agents
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
                <p className="text-gray-600">Configure agent settings and tools</p>
              </div>
            </div>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="basic" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="execution">Execution</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Configuration</CardTitle>
                    <CardDescription>Configure basic agent properties</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="agent-name">Agent Name</Label>
                      <Input
                        id="agent-name"
                        value={agent.name}
                        onChange={(e) => setAgent({ ...agent, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="agent-description">Description</Label>
                      <Textarea
                        id="agent-description"
                        value={agent.description}
                        onChange={(e) => setAgent({ ...agent, description: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="agent-background">Background/System Prompt</Label>
                      <Textarea
                        id="agent-background"
                        value={agent.background}
                        onChange={(e) => setAgent({ ...agent, background: e.target.value })}
                        rows={6}
                        placeholder="Define the agent's role, expertise, and behavior..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="max-steps">Maximum Steps</Label>
                      <Input
                        id="max-steps"
                        type="number"
                        value={agent.maxSteps}
                        onChange={(e) => setAgent({ ...agent, maxSteps: Number.parseInt(e.target.value) })}
                        min="1"
                        max="20"
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        Maximum number of tool calls the agent can make in one execution
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tools" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Tool Configuration</CardTitle>
                        <CardDescription>Configure tools and their parameters for this agent</CardDescription>
                      </div>
                      <Select onValueChange={addTool}>
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="Add Tool" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAvailableToolsToAdd().map((tool) => (
                            <SelectItem key={tool.id} value={tool.id}>
                              <div className="flex items-center gap-2">
                                {getTypeIcon(tool.type)}
                                <span>{tool.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {agent.tools.map((agentTool, index) => {
                        const tool = getToolById(agentTool.toolId)
                        if (!tool) return null

                        return (
                          <div key={agentTool.toolId} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                {getTypeIcon(tool.type)}
                                <div>
                                  <h4 className="font-medium">{tool.name}</h4>
                                  <p className="text-sm text-gray-600">{tool.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant={agentTool.mandatory ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => updateToolConfig(agentTool.toolId, "mandatory", !agentTool.mandatory)}
                                >
                                  {agentTool.mandatory ? "Mandatory" : "Optional"}
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => removeTool(agentTool.toolId)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            {tool.configuration.parameters && tool.configuration.parameters.length > 0 && (
                              <div>
                                <h5 className="font-medium mb-3">Parameters</h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {tool.configuration.parameters.map((param: any) => (
                                    <div key={param.name}>
                                      <Label htmlFor={`${agentTool.toolId}-${param.name}`}>
                                        {param.name}
                                        {param.required && <span className="text-red-500 ml-1">*</span>}
                                      </Label>

                                      {param.type === "boolean" ? (
                                        <div className="flex items-center space-x-2 mt-1">
                                          <Checkbox
                                            checked={agentTool.configuration[param.name] || param.defaultValue || false}
                                            onCheckedChange={(checked) =>
                                              updateToolParameter(agentTool.toolId, param.name, checked)
                                            }
                                          />
                                          <span className="text-sm">{param.description}</span>
                                        </div>
                                      ) : param.type === "number" ? (
                                        <Input
                                          id={`${agentTool.toolId}-${param.name}`}
                                          type="number"
                                          value={agentTool.configuration[param.name] || param.defaultValue || ""}
                                          onChange={(e) =>
                                            updateToolParameter(
                                              agentTool.toolId,
                                              param.name,
                                              Number.parseFloat(e.target.value),
                                            )
                                          }
                                          placeholder={param.description}
                                        />
                                      ) : (
                                        <Input
                                          id={`${agentTool.toolId}-${param.name}`}
                                          value={agentTool.configuration[param.name] || param.defaultValue || ""}
                                          onChange={(e) =>
                                            updateToolParameter(agentTool.toolId, param.name, e.target.value)
                                          }
                                          placeholder={param.description}
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}

                      {agent.tools.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Settings className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No tools configured</p>
                          <p className="text-sm">Select a tool from the dropdown to get started</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="execution" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Execution Settings</CardTitle>
                    <CardDescription>Configure how the agent executes tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="timeout">Execution Timeout (ms)</Label>
                        <Input
                          id="timeout"
                          type="number"
                          value={agent.executionSettings.timeout}
                          onChange={(e) =>
                            setAgent({
                              ...agent,
                              executionSettings: {
                                ...agent.executionSettings,
                                timeout: Number.parseInt(e.target.value),
                              },
                            })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="retries">Max Retries</Label>
                        <Input
                          id="retries"
                          type="number"
                          value={agent.executionSettings.retries}
                          onChange={(e) =>
                            setAgent({
                              ...agent,
                              executionSettings: {
                                ...agent.executionSettings,
                                retries: Number.parseInt(e.target.value),
                              },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="error-handling">Error Handling</Label>
                      <Select
                        value={agent.executionSettings.errorHandling}
                        onValueChange={(value: any) =>
                          setAgent({
                            ...agent,
                            executionSettings: {
                              ...agent.executionSettings,
                              errorHandling: value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stop">Stop on Error</SelectItem>
                          <SelectItem value="continue">Continue on Error</SelectItem>
                          <SelectItem value="retry">Retry on Error</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={agent.executionSettings.parallelExecution}
                        onCheckedChange={(checked) =>
                          setAgent({
                            ...agent,
                            executionSettings: {
                              ...agent.executionSettings,
                              parallelExecution: checked as boolean,
                            },
                          })
                        }
                      />
                      <Label>Enable Parallel Tool Execution</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                    <CardDescription>Advanced configuration options</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Tool Execution Order</Label>
                      <p className="text-sm text-gray-600 mb-2">
                        Drag to reorder tools (only applies when parallel execution is disabled)
                      </p>
                      <div className="space-y-2">
                        {agent.tools.map((agentTool, index) => {
                          const tool = getToolById(agentTool.toolId)
                          return (
                            <div key={agentTool.toolId} className="flex items-center gap-3 p-2 border rounded">
                              <span className="text-sm font-medium w-6">{index + 1}</span>
                              <div className="flex items-center gap-2">
                                {tool && getTypeIcon(tool.type)}
                                <span className="text-sm">{tool?.name}</span>
                              </div>
                              <Badge variant={agentTool.mandatory ? "default" : "outline"} className="ml-auto">
                                {agentTool.mandatory ? "Mandatory" : "Optional"}
                              </Badge>
                            </div>
                          )
                        })}
                      </div>
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
                <CardTitle>Configuration Summary</CardTitle>
                <CardDescription>Current agent configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <Label className="text-xs text-gray-600">Name</Label>
                    <p className="font-medium">{agent.name}</p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Max Steps</Label>
                    <p className="font-medium">{agent.maxSteps}</p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Tools Configured</Label>
                    <p className="font-medium">{agent.tools.length}</p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Mandatory Tools</Label>
                    <p className="font-medium">{agent.tools.filter((t) => t.mandatory).length}</p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Optional Tools</Label>
                    <p className="font-medium">{agent.tools.filter((t) => !t.mandatory).length}</p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Timeout</Label>
                    <p className="font-medium">{agent.executionSettings.timeout / 1000}s</p>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Error Handling</Label>
                    <Badge variant="outline" className="text-xs">
                      {agent.executionSettings.errorHandling}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tool Summary</CardTitle>
                <CardDescription>Configured tools overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {agent.tools.map((agentTool) => {
                    const tool = getToolById(agentTool.toolId)
                    return (
                      <div key={agentTool.toolId} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          {tool && getTypeIcon(tool.type)}
                          <span className="text-sm font-medium">{tool?.name}</span>
                        </div>
                        <Badge variant={agentTool.mandatory ? "default" : "outline"} className="text-xs">
                          {agentTool.mandatory ? "Required" : "Optional"}
                        </Badge>
                      </div>
                    )
                  })}

                  {agent.tools.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">No tools configured</p>
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
