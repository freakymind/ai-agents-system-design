# AWS Bedrock Agent Core Integration Guide

This guide explains how to bring agents built on AWS Bedrock Agent Core into the BANKAI platform for centralized management.

---

## Overview

BANKAI supports importing and managing agents built with AWS Bedrock Agent Core, allowing you to:

- Centralize agent management across AWS and other platforms
- Apply consistent governance and compliance controls
- Maintain audit trails for all agent executions
- Integrate Bedrock agents with BANKAI tools
- Monitor performance across all agents in one dashboard

---

## Prerequisites

1. **AWS Account** with Bedrock Agent Core access
2. **IAM Credentials** with permissions:
   - `bedrock:GetAgent`
   - `bedrock:InvokeAgent`
   - `bedrock:ListAgents`
   - `bedrock:GetAgentActionGroup`
3. **BANKAI Account** with creator or admin role
4. **Agent ARN** from your AWS Bedrock console

---

## Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                        BANKAI Platform                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │          Agent Management Layer                         │ │
│  │  - Unified dashboard                                    │ │
│  │  - Execution orchestration                              │ │
│  │  - Audit logging                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                            │                                 │
│                            ▼                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │          Integration Adapter                            │ │
│  │  - Request translation                                  │ │
│  │  - Response normalization                               │ │
│  │  - Parameter mapping                                    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼ AWS SDK
┌─────────────────────────────────────────────────────────────┐
│                    AWS Bedrock Service                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │          Your Bedrock Agent                             │ │
│  │  - Foundation Model (Claude, etc)                       │ │
│  │  - Action Groups                                        │ │
│  │  - Knowledge Bases                                      │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## Step 1: Prepare Your Bedrock Agent

### 1.1 Document Your Agent

Create a JSON file describing your Bedrock agent:

\`\`\`json
{
  "agentId": "AGENT123456",
  "agentArn": "arn:aws:bedrock:us-east-1:123456789012:agent/AGENT123456",
  "agentName": "Commercial Credit Risk Agent",
  "agentVersion": "1.0",
  "region": "us-east-1",
  "foundationModel": "anthropic.claude-3-sonnet-20240229-v1:0",
  "instructions": "You are a credit risk assessment agent...",
  "actionGroups": [
    {
      "actionGroupId": "ACTION_GROUP_1",
      "actionGroupName": "CreditBureauAPI",
      "description": "Fetches credit bureau reports",
      "apiSchema": {
        "type": "object",
        "paths": {
          "/credit-report": {
            "post": {
              "parameters": ["customer_id", "bureau_type"]
            }
          }
        }
      },
      "lambdaArn": "arn:aws:lambda:us-east-1:123456789012:function:credit-api"
    }
  ],
  "knowledgeBases": [
    {
      "knowledgeBaseId": "KB123456",
      "knowledgeBaseArn": "arn:aws:bedrock:us-east-1:123456789012:knowledge-base/KB123456"
    }
  ]
}
\`\`\`

### 1.2 Create IAM User for BANKAI

Create a dedicated IAM user with minimal permissions:

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:GetAgent",
        "bedrock:InvokeAgent",
        "bedrock:GetAgentActionGroup",
        "bedrock:ListAgentActionGroups"
      ],
      "Resource": [
        "arn:aws:bedrock:us-east-1:123456789012:agent/AGENT123456"
      ]
    }
  ]
}
\`\`\`

---

## Step 2: Map Action Groups to BANKAI Tools

Each Bedrock Action Group needs to be mapped to a BANKAI tool.

### 2.1 Create Equivalent BANKAI Tools

For each action group in your Bedrock agent, create a corresponding tool in BANKAI:

**Bedrock Action Group:**
\`\`\`json
{
  "actionGroupName": "CreditBureauAPI",
  "apiSchema": {
    "paths": {
      "/credit-report": {
        "post": {
          "parameters": ["customer_id", "bureau_type"]
        }
      }
    }
  }
}
\`\`\`

**BANKAI Tool (via API or UI):**
\`\`\`json
{
  "name": "Credit Bureau API",
  "type": "api",
  "configuration": {
    "endpoint": "https://api.creditbureau.com/v1/report",
    "method": "POST"
  },
  "parameters": [
    {
      "name": "customer_id",
      "type": "string",
      "required": true
    },
    {
      "name": "bureau_type",
      "type": "string",
      "required": true
    }
  ],
  "metadata": {
    "department": "Risk",
    "owner": "risk-team@bank.com",
    "tags": ["credit", "risk", "bureau"]
  }
}
\`\`\`

### 2.2 Create Parameter Mapping

Document how parameters map between systems:

\`\`\`json
{
  "mappings": [
    {
      "bedrockActionGroup": "CreditBureauAPI",
      "bedrockParameter": "customer_id",
      "bankaiTool": "Credit Bureau API",
      "bankaiParameter": "customer_id"
    },
    {
      "bedrockActionGroup": "CreditBureauAPI",
      "bedrockParameter": "bureau_type",
      "bankaiTool": "Credit Bureau API",
      "bankaiParameter": "bureau_type"
    }
  ]
}
\`\`\`

---

## Step 3: Import Agent into BANKAI

### 3.1 Via API

\`\`\`bash
curl -X POST https://bankai.yourbank.com/api/integrations/aws-bedrock/import \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "AGENT123456",
    "agentArn": "arn:aws:bedrock:us-east-1:123456789012:agent/AGENT123456",
    "region": "us-east-1",
    "awsCredentials": {
      "accessKeyId": "AKIA...",
      "secretAccessKey": "..."
    },
    "toolMappings": [
      {
        "actionGroupId": "ACTION_GROUP_1",
        "bankaiToolId": "tool_credit_bureau"
      }
    ],
    "mapping": {
      "department": "Risk",
      "owner": "risk-team@bank.com",
      "teamId": "risk-assessment-team"
    }
  }'
\`\`\`

### 3.2 Via BANKAI UI

1. Navigate to **Agents** → **Import Agent**
2. Select **AWS Bedrock Agent Core**
3. Enter your agent details:
   - Agent ARN
   - AWS Region
   - AWS Credentials (stored encrypted)
4. Map Action Groups to BANKAI Tools
5. Configure department and ownership
6. Click **Import Agent**

---

## Step 4: Configure Agent in BANKAI

### 4.1 Set Agent Metadata

\`\`\`json
{
  "name": "Commercial Credit Risk Agent",
  "description": "Assesses credit risk for commercial customers using AWS Bedrock",
  "status": "active",
  "metadata": {
    "department": "Risk",
    "owner": "risk-team@bank.com",
    "type": "risk",
    "tags": ["credit", "risk", "commercial", "bedrock"],
    "compliance": {
      "requiresApproval": true,
      "dataClassification": "confidential"
    }
  }
}
\`\`\`

### 4.2 Configure Execution Settings

\`\`\`json
{
  "configuration": {
    "maxExecutionTime": 120000,
    "maxRetries": 2,
    "executionMode": "sequential",
    "errorHandling": "stop"
  }
}
\`\`\`

---

## Step 5: Execute Agent via BANKAI

### 5.1 Execution Flow

\`\`\`
User Request → BANKAI Platform → Adapter → AWS Bedrock → Response
                      ↓
              Audit Logging
              Monitoring
              Governance
\`\`\`

### 5.2 Execute via API

\`\`\`bash
curl -X POST https://bankai.yourbank.com/api/agents/agent_bedrock_123/execute \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "customer_id": "CUS12345",
      "customer_name": "ABC Trading Ltd",
      "requested_credit_limit": 500000
    },
    "priority": "high"
  }'
\`\`\`

### 5.3 Behind the Scenes

BANKAI will:
1. Log the execution request
2. Translate input to Bedrock format
3. Invoke the Bedrock agent
4. Map tool calls to BANKAI tools
5. Execute tools and return results to Bedrock
6. Capture full audit trail
7. Return normalized response

---

## Step 6: Monitor and Audit

### 6.1 View Execution History

All executions are logged in BANKAI with:
- Complete input/output data
- Step-by-step tool execution
- Duration and performance metrics
- Error logs and debugging info
- Compliance audit trail

### 6.2 Access Audit Logs

\`\`\`bash
curl https://bankai.yourbank.com/api/audit?agentId=agent_bedrock_123 \
  -H "Authorization: Bearer YOUR_API_TOKEN"
\`\`\`

---

## Advanced Features

### Bi-directional Sync

Enable automatic synchronization between Bedrock and BANKAI:

\`\`\`json
{
  "syncConfig": {
    "enabled": true,
    "direction": "bidirectional",
    "syncInterval": "hourly",
    "conflictResolution": "bedrock_wins"
  }
}
\`\`\`

### Hybrid Execution

Execute some tools in Bedrock, others in BANKAI:

\`\`\`json
{
  "executionStrategy": "hybrid",
  "toolExecution": {
    "Credit Bureau API": "bedrock",
    "Internal Risk Model": "bankai",
    "Fraud Detection": "bankai"
  }
}
\`\`\`

---

## Troubleshooting

### Common Issues

**Issue: Agent not found**
- Verify Agent ARN is correct
- Check IAM permissions
- Confirm agent is in specified region

**Issue: Tool mapping fails**
- Ensure BANKAI tools exist before mapping
- Verify parameter names match
- Check tool authentication is configured

**Issue: Execution timeout**
- Increase `maxExecutionTime` in configuration
- Check Bedrock agent performance
- Review Lambda timeout settings

---

## Best Practices

1. **Use Dedicated IAM Users**: Create separate IAM users for each Bedrock agent
2. **Encrypt Credentials**: Store AWS credentials securely in BANKAI
3. **Test in Staging**: Import to staging environment first
4. **Monitor Costs**: Track Bedrock invocation costs through BANKAI
5. **Version Control**: Maintain agent versions in both systems
6. **Regular Sync**: Enable periodic sync to catch configuration drift

---

## Support

For integration support:
- Email: platform-support@yourbank.com
- Documentation: https://docs.bankai.yourbank.com
- Slack: #bankai-support
