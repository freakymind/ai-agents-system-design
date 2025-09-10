import { type NextRequest, NextResponse } from "next/server"
import { generateText, tool } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

// Enhanced banking tools with configuration support
const createBankingTool = (toolConfig: any) => {
  switch (toolConfig.id) {
    case "documentVerification":
      return tool({
        description: "Verify the authenticity and validity of business documents using external API",
        parameters: z.object({
          documentType: z.string().describe("Type of document to verify"),
          documentData: z.string().describe("Document content or metadata"),
          confidenceThreshold: z.number().optional().describe("Minimum confidence threshold"),
          extractText: z.boolean().optional().describe("Whether to extract text from document"),
        }),
        execute: async ({ documentType, documentData, confidenceThreshold = 0.85, extractText = true }) => {
          // Simulate API call to external document verification service
          await new Promise((resolve) => setTimeout(resolve, 1500))

          // Simulate API response based on configuration
          const confidence = Math.random() * 20 + 80
          const isValid = confidence > confidenceThreshold * 100

          return {
            documentType,
            isValid,
            confidence: Math.round(confidence),
            extractedText: extractText ? "Sample extracted text from document..." : null,
            verificationDetails: {
              formatValid: isValid,
              securityFeatures: isValid ? "detected" : "missing",
              tamperingDetected: !isValid,
            },
            apiResponse: {
              endpoint: toolConfig.configuration?.endpoint || "https://api.docverify.com/v2/verify",
              method: toolConfig.configuration?.method || "POST",
              statusCode: isValid ? 200 : 400,
              responseTime: "1.2s",
            },
            timestamp: new Date().toISOString(),
          }
        },
      })

    case "identityCheck":
      return tool({
        description: "Perform identity verification using database search",
        parameters: z.object({
          personName: z.string().describe("Full name of the person"),
          documentNumber: z.string().describe("ID document number"),
          verificationLevel: z.string().optional().describe("Level of verification (standard, enhanced)"),
        }),
        execute: async ({ personName, documentNumber, verificationLevel = "standard" }) => {
          await new Promise((resolve) => setTimeout(resolve, 2000))

          const matchScore = Math.random() * 15 + 85
          const isVerified = matchScore > 90

          return {
            personName,
            documentNumber,
            verificationLevel,
            isVerified,
            matchScore: Math.round(matchScore),
            databaseQuery: {
              table: toolConfig.configuration?.databaseTable || "government_identity_db",
              query: "SELECT * FROM identity_records WHERE document_number = ? AND full_name = ?",
              executionTime: "0.8s",
            },
            biometricMatch: isVerified,
            addressVerification: isVerified ? "confirmed" : "pending",
            timestamp: new Date().toISOString(),
          }
        },
      })

    case "sanctionsScreening":
      return tool({
        description: "Screen against sanctions lists, watchlists, and PEP databases",
        parameters: z.object({
          entityName: z.string().describe("Name of business or individual to screen"),
          entityType: z.enum(["business", "individual"]).describe("Type of entity"),
          checkPep: z.boolean().optional().describe("Check for Politically Exposed Persons"),
          checkSanctions: z.boolean().optional().describe("Check sanctions lists"),
          checkAdverseMedia: z.boolean().optional().describe("Check adverse media"),
        }),
        execute: async ({
          entityName,
          entityType,
          checkPep = true,
          checkSanctions = true,
          checkAdverseMedia = false,
        }) => {
          await new Promise((resolve) => setTimeout(resolve, 1200))

          const riskScore = Math.random() * 10
          const isClean = riskScore < 2

          return {
            entityName,
            entityType,
            isClean,
            riskScore: Math.round(riskScore * 10) / 10,
            screeningResults: {
              sanctions: checkSanctions ? !isClean && Math.random() > 0.7 : null,
              watchlist: checkSanctions ? !isClean && Math.random() > 0.8 : null,
              pep: checkPep ? !isClean && Math.random() > 0.9 : null,
              adverseMedia: checkAdverseMedia ? !isClean && Math.random() > 0.6 : null,
            },
            databasesChecked: {
              ofac: checkSanctions,
              un: checkSanctions,
              eu: checkSanctions,
              pepDatabase: checkPep,
              mediaDatabase: checkAdverseMedia,
            },
            configuration: {
              checkPep,
              checkSanctions,
              checkAdverseMedia,
            },
            timestamp: new Date().toISOString(),
          }
        },
      })

    case "riskAssessment":
      return tool({
        description: "Calculate comprehensive risk score using processing engine",
        parameters: z.object({
          businessType: z.string().describe("Type of business or industry"),
          financialData: z
            .object({
              revenue: z.number().optional(),
              employees: z.number().optional(),
              yearsInBusiness: z.number().optional(),
            })
            .describe("Financial and business metrics"),
          verificationResults: z
            .object({
              documentVerified: z.boolean(),
              identityVerified: z.boolean(),
              sanctionsClean: z.boolean(),
            })
            .describe("Results from previous verification steps"),
        }),
        execute: async ({ businessType, financialData, verificationResults }) => {
          await new Promise((resolve) => setTimeout(resolve, 1800))

          let riskScore = 50

          if (verificationResults.documentVerified) riskScore -= 15
          if (verificationResults.identityVerified) riskScore -= 15
          if (verificationResults.sanctionsClean) riskScore -= 10

          const lowRiskIndustries = ["technology", "consulting", "retail"]
          const highRiskIndustries = ["crypto", "gambling", "money_services"]

          if (lowRiskIndustries.some((industry) => businessType.toLowerCase().includes(industry))) {
            riskScore -= 10
          } else if (highRiskIndustries.some((industry) => businessType.toLowerCase().includes(industry))) {
            riskScore += 20
          }

          if (financialData.yearsInBusiness && financialData.yearsInBusiness > 5) riskScore -= 5
          if (financialData.employees && financialData.employees > 50) riskScore -= 5

          riskScore = Math.max(0, Math.min(100, riskScore))
          const riskLevel = riskScore < 30 ? "low" : riskScore < 60 ? "medium" : "high"

          return {
            riskScore,
            riskLevel,
            processingEngine: {
              script: toolConfig.configuration?.processingScript || "default_risk_calculation.js",
              executionTime: "2.1s",
              version: "v2.3.1",
            },
            factors: {
              documentVerification: verificationResults.documentVerified ? "positive" : "negative",
              identityVerification: verificationResults.identityVerified ? "positive" : "negative",
              sanctionsScreening: verificationResults.sanctionsClean ? "positive" : "negative",
              businessType: lowRiskIndustries.some((industry) => businessType.toLowerCase().includes(industry))
                ? "low_risk"
                : "standard",
              businessMaturity:
                financialData.yearsInBusiness && financialData.yearsInBusiness > 5 ? "established" : "new",
            },
            recommendations:
              riskLevel === "low"
                ? ["Approve for standard services", "Annual review recommended"]
                : riskLevel === "medium"
                  ? ["Additional documentation may be required", "Enhanced monitoring recommended"]
                  : ["Manual review required", "Enhanced due diligence recommended"],
            configuration: toolConfig.configuration || {},
            timestamp: new Date().toISOString(),
          }
        },
      })

    default:
      throw new Error(`Unknown tool: ${toolConfig.id}`)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { agentId, businessData, selectedTools } = await request.json()

    // Create audit log entry
    const executionId = `exec-${Date.now()}`
    const startTime = new Date().toISOString()

    // Simulate agent execution with selected tools
    const model = openai("gpt-4o")

    // Update the main execution logic to use configured tools
    const availableTools: any = {}
    selectedTools.forEach((toolId) => {
      const toolConfig = {
        id: toolId,
        configuration: {}, // In real app, get from database
      }
      availableTools[toolId] = createBankingTool(toolConfig)
    })

    const { text, toolCalls, toolResults } = await generateText({
      model,
      system: `You are a banking onboarding specialist AI agent. Your role is to process business onboarding applications by using the available tools to verify documents, check identities, screen for sanctions, and assess risk.

For the business "${businessData.businessName}", you should:
1. Verify any provided documents using documentVerification
2. Check the identity of business owners using identityCheck  
3. Screen the business and owners against sanctions lists using sanctionsScreening
4. Calculate a comprehensive risk assessment using riskAssessment

Use the tools in a logical sequence and make decisions based on the results. Provide a final recommendation on whether to approve the business for onboarding.`,
      prompt: `Process the onboarding application for ${businessData.businessName}. 

Business Details:
- Name: ${businessData.businessName}
- Type: ${businessData.businessType}
- Owner: ${businessData.ownerName}
- Email: ${businessData.ownerEmail}
- Documents: ${businessData.documents?.join(", ") || "None provided"}

Please use the available tools to complete the verification process and provide a final recommendation.`,
      tools: availableTools,
      maxSteps: 5,
    })

    const endTime = new Date().toISOString()
    const duration = Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000)

    // Create execution log
    const executionLog = {
      executionId,
      agentId,
      businessName: businessData.businessName,
      status: "completed",
      startTime,
      endTime,
      duration: `${duration}s`,
      toolCalls: toolCalls?.length || 0,
      toolResults: toolResults?.length || 0,
      inputData: businessData,
      outputData: {
        recommendation: text,
        toolResults: toolResults || [],
        executionSummary: {
          totalSteps: toolCalls?.length || 0,
          successfulSteps: toolResults?.filter((r: any) => !r.error)?.length || 0,
          failedSteps: toolResults?.filter((r: any) => r.error)?.length || 0,
        },
      },
    }

    return NextResponse.json({
      success: true,
      executionId,
      result: executionLog,
    })
  } catch (error) {
    console.error("Agent execution error:", error)
    return NextResponse.json({ success: false, error: "Failed to execute agent" }, { status: 500 })
  }
}
