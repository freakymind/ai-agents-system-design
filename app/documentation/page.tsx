'use client'

import Link from "next/link"
import { CheckCircle } from 'lucide-react';

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Book, Code, Cloud, FileText, Download, ExternalLink, Search, BookOpen, Layers, Zap, PlayCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Documentation
              </h1>
              <p className="text-slate-600 mt-1">Complete guide to building and managing AI agents</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-white border-slate-200"
            />
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              <Book className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              <Layers className="w-4 h-4 mr-2" />
              Tools
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              <Zap className="w-4 h-4 mr-2" />
              Agents
            </TabsTrigger>
            <TabsTrigger value="execution" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              <PlayCircle className="w-4 h-4 mr-2" />
              Execution & Audit
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              <Code className="w-4 h-4 mr-2" />
              API Reference
            </TabsTrigger>
            <TabsTrigger value="aws" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state-active]:to-indigo-600 data-[state=active]:text-white">
              <Cloud className="w-4 h-4 mr-2" />
              AWS Integration
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="p-8 bg-white border-slate-200">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">What is BANKAI?</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                BANKAI is an enterprise AI agent management platform designed for banking operations. 
                It allows you to create, configure, and manage AI agents that automate complex banking processes 
                like customer onboarding, fraud detection, compliance checks, and risk assessment.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                  <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center mb-4">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 text-slate-900">Modular Tools</h3>
                  <p className="text-sm text-slate-600">
                    Create reusable tools that agents can use to gather data from APIs, databases, and external services.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                  <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 text-slate-900">AI Agents</h3>
                  <p className="text-sm text-slate-600">
                    Build specialized agents by combining tools with AI models to automate complex workflows.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                  <div className="w-12 h-12 rounded-lg bg-emerald-600 flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 text-slate-900">Full Audit Trail</h3>
                  <p className="text-sm text-slate-600">
                    Every agent execution is logged with complete input/output data for compliance and debugging.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white border-slate-200">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">Quick Start</h2>
              <ol className="space-y-4 text-slate-600">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">1</span>
                  <div>
                    <strong className="text-slate-900">Create Tools:</strong> Define the tools your agents will use (APIs, databases, LLMs, custom scripts)
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">2</span>
                  <div>
                    <strong className="text-slate-900">Build Agents:</strong> Create agents and assign tools (mandatory or optional)
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">3</span>
                  <div>
                    <strong className="text-slate-900">Execute:</strong> Run agents with input data and monitor execution
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">4</span>
                  <div>
                    <strong className="text-slate-900">Audit:</strong> Review complete audit trails and execution logs
                  </div>
                </li>
              </ol>
            </Card>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <Card className="p-8 bg-white border-slate-200">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">Creating Tools</h2>
              <p className="text-slate-600 mb-6">
                Tools are modular components that agents use to gather data and perform operations. 
                BANKAI supports multiple tool types for different use cases.
              </p>

              <div className="space-y-6">
                <div className="border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-3 text-slate-900">Tool Types</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <strong className="text-blue-600">API Tools</strong>
                      <p className="text-sm text-slate-600 mt-1">Call external REST APIs with custom headers and authentication</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <strong className="text-purple-600">WebSocket Tools</strong>
                      <p className="text-sm text-slate-600 mt-1">Real-time data streams and live connections</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <strong className="text-indigo-600">LLM Tools</strong>
                      <p className="text-sm text-slate-600 mt-1">Integrate with AI models for text generation and analysis</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <strong className="text-emerald-600">Database Tools</strong>
                      <p className="text-sm text-slate-600 mt-1">Query databases with SQL or NoSQL</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <strong className="text-amber-600">Custom Scripts</strong>
                      <p className="text-sm text-slate-600 mt-1">JavaScript, Python, or SQL scripts for custom logic</p>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-3 text-slate-900">Example: Creating an API Tool</h3>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "name": "Document Verification API",
  "type": "api",
  "configuration": {
    "endpoint": "https://api.docverify.com/v2/verify",
    "method": "POST",
    "headers": {
      "Authorization": "Bearer \${API_KEY}",
      "Content-Type": "application/json"
    },
    "timeout": 30000,
    "retryAttempts": 3
  },
  "parameters": [
    {
      "name": "document_image",
      "type": "string",
      "required": true,
      "description": "Base64 encoded document"
    }
  ],
  "metadata": {
    "department": "Compliance",
    "owner": "compliance@bank.com",
    "tags": ["kyc", "verification"]
  }
}`}
                  </pre>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download Tool Schema
                  </Button>
                  <Button variant="outline">
                    View Full Documentation
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white border-slate-200">
              <h3 className="font-semibold mb-4 text-slate-900">Tool Configuration Options</h3>
              <div className="space-y-4 text-sm">
                <div className="flex gap-4">
                  <code className="bg-slate-100 px-2 py-1 rounded text-blue-600 font-mono">endpoint</code>
                  <span className="text-slate-600">API endpoint URL</span>
                </div>
                <div className="flex gap-4">
                  <code className="bg-slate-100 px-2 py-1 rounded text-blue-600 font-mono">method</code>
                  <span className="text-slate-600">HTTP method (GET, POST, PUT, DELETE)</span>
                </div>
                <div className="flex gap-4">
                  <code className="bg-slate-100 px-2 py-1 rounded text-blue-600 font-mono">headers</code>
                  <span className="text-slate-600">Custom headers including authentication</span>
                </div>
                <div className="flex gap-4">
                  <code className="bg-slate-100 px-2 py-1 rounded text-blue-600 font-mono">timeout</code>
                  <span className="text-slate-600">Request timeout in milliseconds</span>
                </div>
                <div className="flex gap-4">
                  <code className="bg-slate-100 px-2 py-1 rounded text-blue-600 font-mono">retryAttempts</code>
                  <span className="text-slate-600">Number of retry attempts on failure</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Execution & Audit Tab */}
          <TabsContent value="execution" className="space-y-6">
            <Card className="p-8 bg-white border-slate-200">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">Executing Agents via API</h2>
              <p className="text-slate-600 mb-6">
                Execute agents programmatically and receive comprehensive audit trails with every execution.
              </p>

              <div className="space-y-6">
                <div className="border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-3 text-slate-900">API Endpoint</h3>
                  <code className="bg-slate-900 text-slate-100 px-4 py-2 rounded block">
                    POST /api/agents/:agentId/execute
                  </code>
                </div>

                <div className="border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-3 text-slate-900">Request Example (Node.js)</h3>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
{`const response = await fetch(\`\${BANKAI_API_URL}/agents/\${agentId}/execute\`, {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${API_TOKEN}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    input: {
      customerName: 'Acme Corporation Ltd',
      businessNumber: '12345678',
      riskProfile: 'medium'
    },
    options: {
      executionMode: 'sequential',
      returnDetailedLogs: true
    },
    metadata: {
      requestId: 'req_abc123',
      userId: 'user_xyz789',
      department: 'onboarding'
    }
  })
});

const result = await response.json();`}
                  </pre>
                </div>

                <div className="border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-3 text-slate-900">Complete Audit Response</h3>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm max-h-96">
{`{
  "executionId": "exec_20240315_abc123",
  "agentId": "agent_kyc_001",
  "agentName": "Commercial KYC Agent",
  "status": "completed",
  "startTime": "2024-03-15T10:30:00.000Z",
  "endTime": "2024-03-15T10:30:12.345Z",
  "duration": 12345,
  
  "input": {
    "customerName": "Acme Corporation Ltd",
    "businessNumber": "12345678",
    "riskProfile": "medium"
  },
  
  "output": {
    "decision": "approved",
    "confidence": 0.92,
    "riskScore": 35,
    "recommendations": [
      "Standard onboarding process approved"
    ]
  },
  
  "toolExecutions": [
    {
      "toolId": "tool_doc_verify_001",
      "toolName": "Document Verification API",
      "mandatory": true,
      "status": "completed",
      "startTime": "2024-03-15T10:30:00.123Z",
      "endTime": "2024-03-15T10:30:05.456Z",
      "duration": 5333,
      "input": { "document_image": "[REDACTED]" },
      "output": {
        "valid": true,
        "confidence": 0.95
      },
      "logs": [
        {
          "timestamp": "2024-03-15T10:30:00.123Z",
          "level": "info",
          "message": "Starting document verification"
        },
        {
          "timestamp": "2024-03-15T10:30:05.456Z",
          "level": "info",
          "message": "Verification completed"
        }
      ],
      "apiCalls": [
        {
          "url": "https://api.docverify.com/v2/verify",
          "method": "POST",
          "statusCode": 200,
          "duration": 4890
        }
      ]
    },
    {
      "toolId": "tool_business_registry_002",
      "toolName": "Business Registry Check",
      "mandatory": true,
      "status": "completed",
      "duration": 2734,
      "output": {
        "found": true,
        "status": "active"
      }
    },
    {
      "toolId": "tool_sanctions_003",
      "toolName": "Sanctions Screening",
      "mandatory": false,
      "status": "completed",
      "duration": 3800,
      "output": {
        "matches": 0,
        "riskLevel": "low"
      }
    }
  ],
  
  "metrics": {
    "totalTools": 3,
    "mandatoryTools": 2,
    "optionalTools": 1,
    "successfulTools": 3,
    "failedTools": 0,
    "totalApiCalls": 3,
    "avgToolDuration": 4122
  },
  
  "audit": {
    "executionId": "exec_20240315_abc123",
    "userId": "user_xyz789",
    "department": "onboarding",
    "requestId": "req_abc123",
    "timestamp": "2024-03-15T10:30:00.000Z",
    "dataClassification": "confidential",
    "retentionPeriod": "7 years",
    "complianceFlags": ["KYC", "AML"]
  }
}`}
                  </pre>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
                  <h4 className="font-semibold mb-3 text-slate-900">What You Get</h4>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Complete Execution Data:</strong> Input, output, timestamps, duration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Tool-by-Tool Breakdown:</strong> Individual tool execution details and performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>API Call Tracking:</strong> All external API calls with status codes and timing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Detailed Logs:</strong> Step-by-step execution logs for debugging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Compliance Info:</strong> Data classification, retention, and audit flags</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span><strong>Performance Metrics:</strong> Success rates, durations, and system health</span>
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <a 
                    href="/docs/api-execution-guide.md" 
                    download
                    className="block"
                  >
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      <Download className="w-4 h-4 mr-2" />
                      Download Full Guide
                    </Button>
                  </a>
                  <Link href="/audit">
                    <Button className="w-full bg-transparent" variant="outline">
                      View Live Executions
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-white border-slate-200">
              <h3 className="text-xl font-semibold mb-4 text-slate-900">Code Examples</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-slate-900">Python Example</h4>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import requests

def execute_agent(agent_id, input_data):
    url = f'{BANKAI_API_URL}/agents/{agent_id}/execute'
    headers = {
        'Authorization': f'Bearer {API_TOKEN}',
        'Content-Type': 'application/json'
    }
    
    payload = {
        'input': input_data,
        'options': {
            'executionMode': 'sequential',
            'returnDetailedLogs': True
        }
    }
    
    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()
    
    result = response.json()
    
    # Access audit trail
    print(f"Execution ID: {result['executionId']}")
    print(f"Status: {result['status']}")
    print(f"Duration: {result['duration']}ms")
    
    # Tool execution details
    for tool in result['toolExecutions']:
        print(f"\\nTool: {tool['toolName']}")
        print(f"  Status: {tool['status']}")
        print(f"  Duration: {tool['duration']}ms")
    
    return result`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-slate-900">Error Handling</h4>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Retry logic with exponential backoff
async function executeWithRetry(agentId, inputData, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await executeAgent(agentId, inputData);
    } catch (error) {
      if (error.code === 'INVALID_INPUT') throw error;
      
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
}`}
                  </pre>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <Card className="p-8 bg-white border-slate-200">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">Creating Agents</h2>
              <p className="text-slate-600 mb-6">
                Agents are AI-powered workflows that combine multiple tools to automate complex banking processes.
              </p>

              <div className="space-y-6">
                <div className="border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-3 text-slate-900">Agent Architecture</h3>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
                    <pre className="text-sm text-slate-700 whitespace-pre-wrap">
{`Agent
  ├─ Tool 1 (Mandatory) → Document Verification
  ├─ Tool 2 (Mandatory) → Business Registry Check
  ├─ Tool 3 (Optional)  → Sanctions Screening
  └─ Tool 4 (Optional)  → Credit Bureau Check`}
                    </pre>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-3 text-slate-900">Example: KYC Agent</h3>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "name": "Commercial KYC Agent",
  "description": "Performs KYC checks for commercial customers",
  "tools": [
    {
      "toolId": "tool_doc_verify",
      "mandatory": true,
      "order": 1
    },
    {
      "toolId": "tool_business_registry",
      "mandatory": true,
      "order": 2
    },
    {
      "toolId": "tool_sanctions",
      "mandatory": false,
      "order": 3,
      "condition": "if risk_score > 50"
    }
  ],
  "configuration": {
    "executionMode": "sequential",
    "maxExecutionTime": 300000,
    "errorHandling": "stop"
  },
  "metadata": {
    "department": "Onboarding",
    "type": "kyc",
    "tags": ["commercial", "kyc"]
  }
}`}
                  </pre>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold mb-2 text-slate-900">Mandatory Tools</h4>
                    <p className="text-sm text-slate-600">
                      Required for every execution. Agent fails if mandatory tool fails.
                    </p>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <h4 className="font-semibold mb-2 text-slate-900">Optional Tools</h4>
                    <p className="text-sm text-slate-600">
                      Executed conditionally or for enhanced results. Failure doesn't stop agent.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* API Reference Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card className="p-8 bg-white border-slate-200">
              <h2 className="text-2xl font-bold mb-4 text-slate-900">API Reference</h2>
              <p className="text-slate-600 mb-6">
                Complete API documentation for integrating with BANKAI programmatically.
              </p>

              <div className="space-y-6">
                <div className="border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-3 text-slate-900">Base URL</h3>
                  <code className="bg-slate-900 text-slate-100 px-4 py-2 rounded block">
                    https://bankai.yourbank.com/api
                  </code>
                </div>

                <div className="border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-3 text-slate-900">Authentication</h3>
                  <p className="text-sm text-slate-600 mb-3">All requests require Bearer token authentication:</p>
                  <code className="bg-slate-900 text-slate-100 px-4 py-2 rounded block">
                    Authorization: Bearer YOUR_API_TOKEN
                  </code>
                </div>

                <div className="border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-3 text-slate-900">Key Endpoints</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-3 bg-green-50 border border-green-200 rounded">
                      <span className="px-2 py-1 bg-green-600 text-white text-xs font-mono rounded">POST</span>
                      <code className="text-sm">/api/tools</code>
                      <span className="text-sm text-slate-600 ml-auto">Create tool</span>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-blue-50 border border-blue-200 rounded">
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-mono rounded">GET</span>
                      <code className="text-sm">/api/tools</code>
                      <span className="text-sm text-slate-600 ml-auto">List tools</span>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-green-50 border border-green-200 rounded">
                      <span className="px-2 py-1 bg-green-600 text-white text-xs font-mono rounded">POST</span>
                      <code className="text-sm">/api/agents</code>
                      <span className="text-sm text-slate-600 ml-auto">Create agent</span>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-blue-50 border border-blue-200 rounded">
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-mono rounded">GET</span>
                      <code className="text-sm">/api/agents</code>
                      <span className="text-sm text-slate-600 ml-auto">List agents</span>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-purple-50 border border-purple-200 rounded">
                      <span className="px-2 py-1 bg-purple-600 text-white text-xs font-mono rounded">POST</span>
                      <code className="text-sm">/api/agents/:id/execute</code>
                      <span className="text-sm text-slate-600 ml-auto">Execute agent</span>
                    </div>
                  </div>
                </div>

                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download Full API Spec
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* AWS Integration Tab */}
          <TabsContent value="aws" className="space-y-6">
            <Card className="p-8 bg-white border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <Cloud className="w-8 h-8 text-orange-500" />
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">AWS Bedrock Agent Core Integration</h2>
                  <p className="text-slate-600">Import and manage AWS Bedrock agents in BANKAI</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-3 text-slate-900">Why Integrate?</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex gap-2">
                      <span className="text-orange-500">•</span>
                      Centralize management of agents across AWS and other platforms
                    </li>
                    <li className="flex gap-2">
                      <span className="text-orange-500">•</span>
                      Apply consistent governance and compliance controls
                    </li>
                    <li className="flex gap-2">
                      <span className="text-orange-500">•</span>
                      Maintain complete audit trails for all executions
                    </li>
                    <li className="flex gap-2">
                      <span className="text-orange-500">•</span>
                      Monitor performance across all agents in one dashboard
                    </li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-3 text-slate-900">Integration Steps</h3>
                  <ol className="space-y-4">
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-sm">1</span>
                      <div>
                        <strong className="text-slate-900">Prepare IAM Credentials</strong>
                        <p className="text-sm text-slate-600 mt-1">Create IAM user with Bedrock permissions</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-sm">2</span>
                      <div>
                        <strong className="text-slate-900">Map Action Groups to Tools</strong>
                        <p className="text-sm text-slate-600 mt-1">Create equivalent BANKAI tools for each action group</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-sm">3</span>
                      <div>
                        <strong className="text-slate-900">Import Agent</strong>
                        <p className="text-sm text-slate-600 mt-1">Use API or UI to import Bedrock agent</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-sm">4</span>
                      <div>
                        <strong className="text-slate-900">Execute & Monitor</strong>
                        <p className="text-sm text-slate-600 mt-1">Run agent executions through BANKAI</p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="border border-slate-200 rounded-lg p-6">
                  <h3 className="font-semibold mb-3 text-slate-900">Example: Import Bedrock Agent</h3>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm">
{`curl -X POST https://bankai.yourbank.com/api/integrations/aws-bedrock/import \\
  -H "Authorization: Bearer YOUR_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agentId": "AGENT123456",
    "agentArn": "arn:aws:bedrock:us-east-1:123456789012:agent/AGENT123456",
    "region": "us-east-1",
    "awsCredentials": {
      "accessKeyId": "AKIA...",
      "secretAccessKey": "..."
    },
    "mapping": {
      "department": "Risk",
      "owner": "risk-team@bank.com"
    }
  }'`}
                  </pre>
                </div>

                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Download Integration Guide
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
