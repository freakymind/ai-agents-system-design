"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Shield,
  MapPin,
  ArrowRight,
  Bot,
  Settings,
  Eye,
  Zap,
  Target,
  Activity,
  TrendingUp,
} from "lucide-react"

export default function OnboardingJourney() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const journeySteps = [
    {
      id: 1,
      title: "Initial Application Review",
      agent: "Document Intake Agent",
      description: "Automated review of business application and initial document collection",
      tools: ["Document Parser", "OCR Engine", "Data Validator"],
      duration: "2-3 minutes",
      status: "pending",
      details: {
        inputs: ["Business Registration Form", "Director Information", "Financial Statements"],
        outputs: ["Structured Data Extract", "Document Quality Score", "Missing Document List"],
        riskFactors: ["Incomplete documentation", "Poor document quality"],
      },
    },
    {
      id: 2,
      title: "Identity & KYC Verification",
      agent: "KYC Specialist Agent",
      description: "Comprehensive identity verification and Know Your Customer checks",
      tools: ["Identity Verification API", "Sanctions Screening", "PEP Database", "Credit Bureau API"],
      duration: "3-5 minutes",
      status: "pending",
      details: {
        inputs: ["Director IDs", "Beneficial Owner Info", "Business Details"],
        outputs: ["Identity Verification Report", "Sanctions Check Results", "Risk Rating"],
        riskFactors: ["PEP matches", "Sanctions hits", "Identity discrepancies"],
      },
    },
    {
      id: 3,
      title: "Business Risk Assessment",
      agent: "Risk Assessment Agent",
      description: "Automated business risk evaluation and compliance scoring",
      tools: ["Risk Scoring Engine", "Industry Database", "Financial Analysis Tool", "Compliance Checker"],
      duration: "4-6 minutes",
      status: "pending",
      details: {
        inputs: ["Financial Data", "Industry Classification", "Business Model"],
        outputs: ["Risk Score", "Industry Risk Profile", "Compliance Rating"],
        riskFactors: ["High-risk industry", "Poor financials", "Regulatory concerns"],
      },
    },
    {
      id: 4,
      title: "Financial Due Diligence",
      agent: "Financial Analysis Agent",
      description: "Deep financial analysis and creditworthiness assessment",
      tools: ["Financial Ratio Calculator", "Cash Flow Analyzer", "Credit Scoring Model", "Fraud Detection"],
      duration: "5-8 minutes",
      status: "pending",
      details: {
        inputs: ["Bank Statements", "Tax Returns", "Financial Projections"],
        outputs: ["Credit Score", "Financial Health Report", "Fraud Risk Assessment"],
        riskFactors: ["Poor cash flow", "Inconsistent financials", "Fraud indicators"],
      },
    },
    {
      id: 5,
      title: "Regulatory Compliance Check",
      agent: "Compliance Officer Agent",
      description: "Comprehensive regulatory and legal compliance verification",
      tools: ["Regulatory Database", "License Checker", "AML Screening", "Legal Entity Validator"],
      duration: "3-4 minutes",
      status: "pending",
      details: {
        inputs: ["Business Licenses", "Regulatory Filings", "Legal Structure"],
        outputs: ["Compliance Status", "License Verification", "AML Risk Score"],
        riskFactors: ["Missing licenses", "Regulatory violations", "AML concerns"],
      },
    },
    {
      id: 6,
      title: "Final Decision & Account Setup",
      agent: "Decision Engine Agent",
      description: "Automated decision making and account provisioning",
      tools: ["Decision Matrix", "Account Provisioning", "Terms Generator", "Welcome Package Creator"],
      duration: "2-3 minutes",
      status: "pending",
      details: {
        inputs: ["All Previous Assessments", "Risk Scores", "Compliance Results"],
        outputs: ["Final Decision", "Account Details", "Terms & Conditions"],
        riskFactors: ["Overall risk threshold", "Policy violations"],
      },
    },
  ]

  const [steps, setSteps] = useState(journeySteps)

  const simulateStep = async (stepIndex: number) => {
    setCurrentStep(stepIndex)
    setIsRunning(true)

    // Update step status to running
    const updatedSteps = [...steps]
    updatedSteps[stepIndex].status = "running"
    setSteps(updatedSteps)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Complete the step
    updatedSteps[stepIndex].status = "completed"
    setSteps(updatedSteps)
    setCompletedSteps([...completedSteps, stepIndex])
    setIsRunning(false)

    // Auto-advance to next step if available
    if (stepIndex < steps.length - 1) {
      setTimeout(() => simulateStep(stepIndex + 1), 1000)
    }
  }

  const resetJourney = () => {
    const resetSteps = steps.map((step) => ({ ...step, status: "pending" }))
    setSteps(resetSteps)
    setCompletedSteps([])
    setCurrentStep(0)
    setIsRunning(false)
  }

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-emerald-600" />
      case "running":
        return <Clock className="w-5 h-5 text-blue-600 animate-spin" />
      default:
        return <Clock className="w-5 h-5 text-slate-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "running":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-slate-100 text-slate-600 border-slate-200"
    }
  }

  const overallProgress = (completedSteps.length / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Commercial Customer Onboarding Journey
          </h1>
          <p className="text-slate-600 mt-1">
            Interactive demonstration of AI agents working with tools for business onboarding
          </p>
        </div>

        {/* Journey Overview */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Journey Overview
            </CardTitle>
            <CardDescription>End-to-end automated onboarding process for commercial banking customers</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Total Steps</p>
                    <p className="text-2xl font-bold">{steps.length}</p>
                  </div>
                  <Target className="w-6 h-6 text-purple-200" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Completed</p>
                    <p className="text-2xl font-bold">{completedSteps.length}</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-blue-200" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">Progress</p>
                    <p className="text-2xl font-bold">{Math.round(overallProgress)}%</p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-emerald-200" />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Overall Progress</span>
                <span className="font-medium text-slate-800">{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => simulateStep(0)}
                disabled={isRunning}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Journey
                  </>
                )}
              </Button>
              <Button onClick={resetJourney} variant="outline" className="border-slate-200 bg-transparent">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="journey" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-slate-200 p-1">
            <TabsTrigger value="journey" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <MapPin className="w-4 h-4 mr-2" />
              Journey Flow
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Bot className="w-4 h-4 mr-2" />
              Agents & Tools
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              <Activity className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="journey" className="space-y-6">
            {/* Journey Steps */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <Card
                  key={step.id}
                  className={`shadow-lg border-0 transition-all duration-300 ${
                    currentStep === index ? "ring-2 ring-purple-500 shadow-xl" : ""
                  }`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100">
                          {getStepIcon(step.status)}
                        </div>
                        <div>
                          <CardTitle className="text-lg text-slate-800">{step.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="border-purple-200 text-purple-700">
                              <Bot className="w-3 h-3 mr-1" />
                              {step.agent}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(step.status)}>
                              {step.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-600">Duration</p>
                        <p className="font-medium text-slate-800">{step.duration}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600">{step.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          Tools Used
                        </h4>
                        <div className="space-y-1">
                          {step.tools.map((tool, toolIndex) => (
                            <Badge key={toolIndex} variant="secondary" className="mr-1 mb-1 text-xs">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Key Inputs
                        </h4>
                        <ul className="text-sm text-slate-600 space-y-1">
                          {step.details.inputs.slice(0, 3).map((input, inputIndex) => (
                            <li key={inputIndex} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-slate-400 rounded-full" />
                              {input}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-medium text-slate-800 mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Risk Factors
                        </h4>
                        <ul className="text-sm text-slate-600 space-y-1">
                          {step.details.riskFactors.slice(0, 2).map((risk, riskIndex) => (
                            <li key={riskIndex} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-amber-500 rounded-full" />
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-200 text-slate-700 hover:bg-slate-50 bg-transparent"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                          onClick={() => simulateStep(index)}
                          disabled={isRunning}
                        >
                          <Zap className="w-4 h-4 mr-1" />
                          Run Step
                        </Button>
                      </div>
                      {index < steps.length - 1 && <ArrowRight className="w-5 h-5 text-slate-400" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from(new Set(steps.map((step) => step.agent))).map((agentName, index) => {
                const agentSteps = steps.filter((step) => step.agent === agentName)
                const allTools = Array.from(new Set(agentSteps.flatMap((step) => step.tools)))

                return (
                  <Card key={index} className="shadow-lg border-0">
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
                      <CardTitle className="text-slate-800 flex items-center gap-2">
                        <Bot className="w-5 h-5" />
                        {agentName}
                      </CardTitle>
                      <CardDescription>
                        Handles {agentSteps.length} step{agentSteps.length > 1 ? "s" : ""} in the journey
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-slate-800 mb-2">Assigned Tools</h4>
                          <div className="flex flex-wrap gap-1">
                            {allTools.map((tool, toolIndex) => (
                              <Badge key={toolIndex} variant="outline" className="text-xs">
                                <Settings className="w-3 h-3 mr-1" />
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-800 mb-2">Responsibilities</h4>
                          <ul className="text-sm text-slate-600 space-y-1">
                            {agentSteps.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-purple-500 rounded-full" />
                                {step.title}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Avg Processing Time</p>
                      <p className="text-2xl font-bold">18 mins</p>
                      <p className="text-purple-200 text-xs mt-1">-23% vs manual</p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Success Rate</p>
                      <p className="text-2xl font-bold">94.2%</p>
                      <p className="text-blue-200 text-xs mt-1">+8.1% improvement</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100 text-sm font-medium">Risk Detection</p>
                      <p className="text-2xl font-bold">97.8%</p>
                      <p className="text-emerald-200 text-xs mt-1">High accuracy</p>
                    </div>
                    <Shield className="w-8 h-8 text-emerald-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-indigo-100 text-sm font-medium">Cost Reduction</p>
                      <p className="text-2xl font-bold">67%</p>
                      <p className="text-indigo-200 text-xs mt-1">vs manual process</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-indigo-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 border-b">
                <CardTitle className="text-slate-800">Journey Performance Metrics</CardTitle>
                <CardDescription>Detailed analytics for each step in the onboarding process</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600 font-medium text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{step.title}</p>
                          <p className="text-sm text-slate-600">{step.agent}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="font-medium text-slate-800">96.2%</p>
                          <p className="text-slate-600">Success Rate</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-slate-800">{step.duration}</p>
                          <p className="text-slate-600">Avg Duration</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-slate-800">{step.tools.length}</p>
                          <p className="text-slate-600">Tools Used</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
