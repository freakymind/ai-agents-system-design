"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Plus,
  Search,
  Shield,
  UserCheck,
  AlertTriangle,
  FileCheck,
  TrendingUp,
  Eye,
  Lock,
  Globe,
  Database,
  Zap,
  Activity,
} from "lucide-react"
import Link from "next/link"

interface BankingTool {
  id: string
  name: string
  description: string
  category: string
  icon: any
  status: "active" | "inactive"
  usageCount: number
  healthScore: number
  color: string
}

export default function ToolsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const bankingTools: BankingTool[] = [
    // Customer Onboarding Tools
    {
      id: "kyc-verification",
      name: "KYC Verification Engine",
      description: "Automated Know Your Customer verification using government databases and AI document analysis",
      category: "Onboarding",
      icon: UserCheck,
      status: "active",
      usageCount: 2847,
      healthScore: 98,
      color: "blue",
    },
    {
      id: "business-registry-check",
      name: "Business Registry Verification",
      description: "Verify company registration and corporate structure across multiple jurisdictions",
      category: "Onboarding",
      icon: FileCheck,
      status: "active",
      usageCount: 1923,
      healthScore: 95,
      color: "blue",
    },
    {
      id: "beneficial-ownership",
      name: "Beneficial Ownership Analyzer",
      description: "Identify ultimate beneficial owners and corporate ownership structures",
      category: "Onboarding",
      icon: TrendingUp,
      status: "active",
      usageCount: 1456,
      healthScore: 92,
      color: "blue",
    },
    {
      id: "document-verification",
      name: "Document Verification API",
      description: "AI-powered authenticity verification for passports, licenses, and business documents",
      category: "Onboarding",
      icon: FileCheck,
      status: "active",
      usageCount: 3201,
      healthScore: 97,
      color: "blue",
    },

    // Fraud Detection Tools
    {
      id: "transaction-fraud",
      name: "Transaction Fraud Detector",
      description: "Real-time ML-based fraud detection for commercial transactions and payments",
      category: "Fraud",
      icon: Shield,
      status: "active",
      usageCount: 8934,
      healthScore: 99,
      color: "red",
    },
    {
      id: "behavioral-analysis",
      name: "Behavioral Analytics Engine",
      description: "Detect anomalous customer behavior patterns and potential fraud indicators",
      category: "Fraud",
      icon: Activity,
      status: "active",
      usageCount: 5672,
      healthScore: 96,
      color: "red",
    },
    {
      id: "identity-fraud",
      name: "Identity Fraud Screening",
      description: "Synthetic identity detection and identity theft prevention system",
      category: "Fraud",
      icon: Lock,
      status: "active",
      usageCount: 2134,
      healthScore: 94,
      color: "red",
    },
    {
      id: "aml-screening",
      name: "AML Transaction Monitoring",
      description: "Anti-money laundering monitoring with pattern recognition and risk scoring",
      category: "Fraud",
      icon: AlertTriangle,
      status: "active",
      usageCount: 4523,
      healthScore: 97,
      color: "red",
    },

    // Compliance Tools
    {
      id: "sanctions-screening",
      name: "Sanctions List Screening",
      description: "Real-time screening against global sanctions lists (OFAC, UN, EU, HMT)",
      category: "Compliance",
      icon: Shield,
      status: "active",
      usageCount: 6789,
      healthScore: 99,
      color: "emerald",
    },
    {
      id: "pep-screening",
      name: "PEP Database Check",
      description: "Politically Exposed Persons screening with continuous monitoring",
      category: "Compliance",
      icon: Eye,
      status: "active",
      usageCount: 3456,
      healthScore: 96,
      color: "emerald",
    },
    {
      id: "adverse-media",
      name: "Adverse Media Screening",
      description: "AI-powered negative news and adverse media monitoring across global sources",
      category: "Compliance",
      icon: Globe,
      status: "active",
      usageCount: 2891,
      healthScore: 93,
      color: "emerald",
    },
    {
      id: "regulatory-reporting",
      name: "Regulatory Reporting Engine",
      description: "Automated compliance reporting for FCA, FinCEN, and other regulators",
      category: "Compliance",
      icon: FileCheck,
      status: "active",
      usageCount: 1234,
      healthScore: 98,
      color: "emerald",
    },
    {
      id: "watchlist-monitoring",
      name: "Watchlist Monitoring",
      description: "Continuous monitoring against terrorism, crime, and enforcement watchlists",
      category: "Compliance",
      icon: AlertTriangle,
      status: "active",
      usageCount: 4567,
      healthScore: 97,
      color: "emerald",
    },

    // Risk Assessment Tools
    {
      id: "credit-risk",
      name: "Credit Risk Analyzer",
      description: "ML-powered credit risk assessment for commercial lending decisions",
      category: "Risk Assessment",
      icon: TrendingUp,
      status: "active",
      usageCount: 3789,
      healthScore: 95,
      color: "amber",
    },
    {
      id: "financial-analysis",
      name: "Financial Statement Analyzer",
      description: "Automated financial health analysis and ratio calculation",
      category: "Risk Assessment",
      icon: Database,
      status: "active",
      usageCount: 2567,
      healthScore: 94,
      color: "amber",
    },
    {
      id: "country-risk",
      name: "Country Risk Intelligence",
      description: "Geopolitical and economic risk assessment for cross-border transactions",
      category: "Risk Assessment",
      icon: Globe,
      status: "active",
      usageCount: 1876,
      healthScore: 92,
      color: "amber",
    },
    {
      id: "industry-risk",
      name: "Industry Risk Profiler",
      description: "Sector-specific risk analysis and industry benchmarking",
      category: "Risk Assessment",
      icon: TrendingUp,
      status: "active",
      usageCount: 1543,
      healthScore: 93,
      color: "amber",
    },

    // Additional Banking Tools
    {
      id: "payment-screening",
      name: "Payment Screening Gateway",
      description: "Real-time payment transaction screening for compliance and fraud",
      category: "Operations",
      icon: Zap,
      status: "active",
      usageCount: 12456,
      healthScore: 98,
      color: "purple",
    },
    {
      id: "address-verification",
      name: "Address Verification System",
      description: "Global address validation and geocoding for customer data quality",
      category: "Operations",
      icon: Globe,
      status: "active",
      usageCount: 5432,
      healthScore: 96,
      color: "purple",
    },
  ]

  const categories = ["all", ...new Set(bankingTools.map((tool) => tool.category))]

  const filteredTools = bankingTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const stats = {
    total: bankingTools.length,
    active: bankingTools.filter((t) => t.status === "active").length,
    avgHealth: Math.round(bankingTools.reduce((sum, t) => sum + t.healthScore, 0) / bankingTools.length),
    totalUsage: bankingTools.reduce((sum, t) => sum + t.usageCount, 0),
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Banking Tools Library</h1>
            <p className="text-muted-foreground text-lg">Enterprise-grade tools for commercial banking operations</p>
          </div>
          <Link href="/tools/create">
            <Button size="lg" className="shadow-lg">
              <Plus className="w-5 h-5 mr-2" />
              Add Tool
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Tools</p>
                  <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                </div>
                <Database className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Tools</p>
                  <p className="text-3xl font-bold text-foreground">{stats.active}</p>
                </div>
                <Activity className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Health</p>
                  <p className="text-3xl font-bold text-foreground">{stats.avgHealth}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Usage</p>
                  <p className="text-3xl font-bold text-foreground">{stats.totalUsage.toLocaleString()}</p>
                </div>
                <Zap className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-card"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Tools" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Card key={tool.id} className="hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-3 bg-${tool.color}-500/10 rounded-lg`}>
                      <Icon className={`w-6 h-6 text-${tool.color}-500`} />
                    </div>
                    <Badge
                      variant={tool.status === "active" ? "default" : "secondary"}
                      className={
                        tool.status === "active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : ""
                      }
                    >
                      {tool.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Health Score</span>
                      <span className="font-bold text-emerald-500">{tool.healthScore}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Usage Count</span>
                      <span className="font-bold text-foreground">{tool.usageCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Category</span>
                      <Badge variant="outline">{tool.category}</Badge>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Configure
                      </Button>
                      <Button size="sm" className="flex-1">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredTools.length === 0 && (
          <Card className="p-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No tools found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </Card>
        )}
      </div>
    </div>
  )
}
