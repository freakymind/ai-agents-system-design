"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface Tool {
  id: string
  name: string
  description: string
  category: string
  required: boolean
}

export default function CreateAgentPage() {
  const [agentName, setAgentName] = useState("")
  const [agentDescription, setAgentDescription] = useState("")
  const [selectedTools, setSelectedTools] = useState<{ [key: string]: { mandatory: boolean; selected: boolean } }>({})

  const availableTools: Tool[] = [
    {
      id: "doc-verification",
      name: "Document Verification",
      description: "Verifies authenticity of business documents",
      category: "KYC",
      required: false,
    },
    {
      id: "identity-check",
      name: "Identity Check",
      description: "Validates identity of business owners and directors",
      category: "KYC",
      required: false,
    },
    {
      id: "sanctions-screening",
      name: "Sanctions Screening",
      description: "Checks against sanctions and watchlists",
      category: "Compliance",
      required: false,
    },
    {
      id: "credit-check",
      name: "Credit Check",
      description: "Evaluates creditworthiness and financial history",
      category: "Risk Assessment",
      required: false,
    },
    {
      id: "financial-analysis",
      name: "Financial Analysis",
      description: "Analyzes financial statements and ratios",
      category: "Risk Assessment",
      required: false,
    },
    {
      id: "risk-scoring",
      name: "Risk Scoring",
      description: "Calculates comprehensive risk score",
      category: "Risk Assessment",
      required: false,
    },
    {
      id: "ocr-processing",
      name: "OCR Processing",
      description: "Extracts text from documents using OCR",
      category: "Document Processing",
      required: false,
    },
    {
      id: "regulatory-check",
      name: "Regulatory Check",
      description: "Ensures compliance with banking regulations",
      category: "Compliance",
      required: false,
    },
    {
      id: "enhanced-dd",
      name: "Enhanced Due Diligence",
      description: "Performs enhanced due diligence checks",
      category: "KYC",
      required: false,
    },
    {
      id: "pep-check",
      name: "PEP Check",
      description: "Checks for Politically Exposed Persons",
      category: "Compliance",
      required: false,
    },
  ]

  const categories = [...new Set(availableTools.map((tool) => tool.category))]

  const handleToolSelection = (toolId: string, selected: boolean, mandatory = false) => {
    setSelectedTools((prev) => ({
      ...prev,
      [toolId]: { selected, mandatory },
    }))
  }

  const handleMandatoryToggle = (toolId: string) => {
    setSelectedTools((prev) => ({
      ...prev,
      [toolId]: {
        ...prev[toolId],
        mandatory: !prev[toolId]?.mandatory,
      },
    }))
  }

  const getSelectedMandatoryTools = () => {
    return Object.entries(selectedTools)
      .filter(([_, config]) => config.selected && config.mandatory)
      .map(([toolId]) => availableTools.find((t) => t.id === toolId)?.name)
      .filter(Boolean)
  }

  const getSelectedOptionalTools = () => {
    return Object.entries(selectedTools)
      .filter(([_, config]) => config.selected && !config.mandatory)
      .map(([toolId]) => availableTools.find((t) => t.id === toolId)?.name)
      .filter(Boolean)
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
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Agent</h1>
                <p className="text-gray-600">Configure a new AI agent for banking onboarding</p>
              </div>
            </div>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Agent
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Configure the basic details of your agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="agent-name">Agent Name</Label>
                  <Input
                    id="agent-name"
                    placeholder="e.g., KYC Specialist"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="agent-description">Description</Label>
                  <Textarea
                    id="agent-description"
                    placeholder="Describe what this agent does and its purpose..."
                    value={agentDescription}
                    onChange={(e) => setAgentDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tool Assignment</CardTitle>
                <CardDescription>Select tools and mark them as mandatory or optional</CardDescription>
              </CardHeader>
              <CardContent>
                {categories.map((category) => (
                  <div key={category} className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-3">{category}</h3>
                    <div className="space-y-3">
                      {availableTools
                        .filter((tool) => tool.category === category)
                        .map((tool) => (
                          <div key={tool.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Checkbox
                                checked={selectedTools[tool.id]?.selected || false}
                                onCheckedChange={(checked) => handleToolSelection(tool.id, checked as boolean)}
                              />
                              <div>
                                <p className="font-medium">{tool.name}</p>
                                <p className="text-sm text-gray-600">{tool.description}</p>
                              </div>
                            </div>
                            {selectedTools[tool.id]?.selected && (
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant={selectedTools[tool.id]?.mandatory ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleMandatoryToggle(tool.id)}
                                >
                                  {selectedTools[tool.id]?.mandatory ? "Mandatory" : "Optional"}
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agent Preview</CardTitle>
                <CardDescription>Preview of your agent configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Name</Label>
                  <p className="font-medium">{agentName || "Untitled Agent"}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Description</Label>
                  <p className="text-sm">{agentDescription || "No description provided"}</p>
                </div>

                {getSelectedMandatoryTools().length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Mandatory Tools</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {getSelectedMandatoryTools().map((tool) => (
                        <Badge key={tool} variant="default" className="bg-red-100 text-red-800">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {getSelectedOptionalTools().length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Optional Tools</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {getSelectedOptionalTools().map((tool) => (
                        <Badge key={tool} variant="outline" className="border-blue-200 text-blue-800">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuration Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Tools:</span>
                    <span>{Object.values(selectedTools).filter((t) => t.selected).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mandatory:</span>
                    <span>{getSelectedMandatoryTools().length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Optional:</span>
                    <span>{getSelectedOptionalTools().length}</span>
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
