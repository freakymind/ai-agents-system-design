# BANKAI Platform - API Reference

Enterprise AI Agent Management System for Banking Operations

---

## Table of Contents

1. [Tools API](#tools-api)
2. [Agents API](#agents-api)
3. [Executions API](#executions-api)
4. [AWS Bedrock Integration](#aws-bedrock-integration)
5. [Authentication](#authentication)

---

## Tools API

### Create Tool

Create a new tool that agents can use to gather data and perform operations.

**Endpoint:** `POST /api/tools`

**Request Body:**
```json
{
  "name": "Document Verification API",
  "description": "Verifies authenticity of business documents",
  "type": "api",
  "status": "active",
  "configuration": {
    "endpoint": "https://api.docverify.com/v2/verify",
    "method": "POST",
    "headers": {
      "Authorization": "Bearer ${API_KEY}",
      "Content-Type": "application/json"
    },
    "timeout": 30000,
    "retryAttempts": 3,
    "rateLimitPerMinute": 60
  },
  "parameters": [
    {
      "name": "document_image",
      "type": "string",
      "description": "Base64 encoded document image",
      "required": true
    },
    {
      "name": "document_type",
      "type": "string",
      "description": "Type of document (passport, drivers_license, etc)",
      "required": true,
      "validation": {
        "enum": ["passport", "drivers_license", "utility_bill", "bank_statement"]
      }
    }
  ],
  "authentication": {
    "type": "bearer",
    "credentials": {
      "apiKey": "${DOC_VERIFY_API_KEY}"
    }
  },
  "metadata": {
    "department": "Compliance",
    "owner": "john.doe@bank.com",
    "teamId": "compliance-kyc-team",
    "tags": ["kyc", "document-verification", "onboarding"],
    "category": "verification",
    "compliance": {
      "requiresApproval": true,
      "dataClassification": "confidential",
      "regulatoryFramework": ["GDPR", "KYC", "AML"]
    },
    "version": "1.0.0"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "tool_12345",
    "name": "Document Verification API",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z"
  },
  "metadata": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_abc123",
    "version": "1.0"
  }
}
```

---

### List Tools

Get a paginated list of tools with filtering options.

**Endpoint:** `GET /api/tools`

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `pageSize` (number): Items per page (default: 20)
- `search` (string): Search by name or description
- `department` (string): Filter by department
- `owner` (string): Filter by owner email
- `status` (string): Filter by status (active, inactive, deprecated, testing)
- `type` (string): Filter by type (api, websocket, llm, database, custom_script)
- `tags` (string[]): Filter by tags
- `sortBy` (string): Sort field (name, createdAt, lastUsed)
- `sortOrder` (string): Sort order (asc, desc)

**Example Request:**
```
GET /api/tools?department=Compliance&status=active&page=1&pageSize=20&sortBy=name
```

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "tool_12345",
        "name": "Document Verification API",
        "description": "Verifies authenticity of business documents",
        "type": "api",
        "status": "active",
        "metadata": {
          "department": "Compliance",
          "owner": "john.doe@bank.com",
          "tags": ["kyc", "document-verification"]
        },
        "monitoring": {
          "totalRuns": 1523,
          "successRate": 98.5,
          "avgResponseTime": 2300,
          "errorRate": 1.5
        }
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 45,
      "totalPages": 3,
      "hasNext": true,
      "hasPrevious": false
    }
  }
}
```

---

### Get Tool Details

Get detailed information about a specific tool.

**Endpoint:** `GET /api/tools/:toolId`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "tool_12345",
    "name": "Document Verification API",
    "description": "Verifies authenticity of business documents",
    "type": "api",
    "status": "active",
    "configuration": {
      "endpoint": "https://api.docverify.com/v2/verify",
      "method": "POST",
      "timeout": 30000,
      "retryAttempts": 3
    },
    "parameters": [...],
    "metadata": {...},
    "monitoring": {...}
  }
}
```

---

### Test Tool

Execute a tool with test parameters to validate configuration.

**Endpoint:** `POST /api/tools/:toolId/test`

**Request Body:**
```json
{
  "parameters": {
    "document_image": "base64_encoded_image_data",
    "document_type": "passport"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "executionTime": 2345,
    "status": "success",
    "output": {
      "valid": true,
      "confidence": 0.95,
      "documentDetails": {
        "type": "passport",
        "country": "UK",
        "expiryDate": "2030-12-31"
      }
    }
  }
}
```

---

## Agents API

### Create Agent

Create a new AI agent with assigned tools.

**Endpoint:** `POST /api/agents`

**Request Body:**
```json
{
  "name": "Commercial KYC Agent",
  "description": "Performs comprehensive KYC checks for commercial customers",
  "status": "active",
  "tools": [
    {
      "toolId": "tool_12345",
      "mandatory": true,
      "order": 1,
      "parameters": {
        "document_type": "business_registration"
      }
    },
    {
      "toolId": "tool_67890",
      "mandatory": true,
      "order": 2
    },
    {
      "toolId": "tool_11111",
      "mandatory": false,
      "order": 3,
      "condition": "if risk_score > 50"
    }
  ],
  "configuration": {
    "maxExecutionTime": 300000,
    "maxRetries": 2,
    "executionMode": "sequential",
    "errorHandling": "stop",
    "outputFormat": "structured"
  },
  "systemPrompt": "You are a KYC specialist agent. Verify all documents thoroughly and flag any inconsistencies.",
  "capabilities": [
    "document_verification",
    "business_registry_check",
    "sanctions_screening"
  ],
  "metadata": {
    "department": "Onboarding",
    "owner": "jane.smith@bank.com",
    "teamId": "commercial-onboarding",
    "type": "kyc",
    "tags": ["commercial", "kyc", "onboarding"],
    "version": "1.0.0"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "agent_abc123",
    "name": "Commercial KYC Agent",
    "status": "active",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### List Agents

Get a paginated list of agents with filtering options.

**Endpoint:** `GET /api/agents`

**Query Parameters:**
- `page` (number): Page number
- `pageSize` (number): Items per page
- `search` (string): Search by name or description
- `department` (string): Filter by department
- `owner` (string): Filter by owner
- `status` (string): Filter by status
- `type` (string): Filter by agent type
- `tags` (string[]): Filter by tags

**Response:** Similar to List Tools response structure

---

### Execute Agent

Execute an agent with input data.

**Endpoint:** `POST /api/agents/:agentId/execute`

**Request Body:**
```json
{
  "input": {
    "customerId": "CUS12345",
    "customerName": "ABC Trading Ltd",
    "businessRegistrationNumber": "12345678",
    "documents": [
      {
        "type": "business_registration",
        "url": "https://storage.example.com/doc1.pdf"
      }
    ]
  },
  "priority": "high",
  "metadata": {
    "requestedBy": "user@bank.com",
    "referenceId": "ONB-2024-001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "executionId": "exec_xyz789",
    "agentId": "agent_abc123",
    "status": "running",
    "startTime": "2024-01-15T10:30:00Z",
    "estimatedDuration": 45000
  }
}
```

---

### Get Execution Status

Check the status of an agent execution.

**Endpoint:** `GET /api/executions/:executionId`

**Response:**
```json
{
  "success": true,
  "data": {
    "executionId": "exec_xyz789",
    "agentId": "agent_abc123",
    "status": "completed",
    "startTime": "2024-01-15T10:30:00Z",
    "endTime": "2024-01-15T10:31:30Z",
    "duration": 90000,
    "steps": [
      {
        "stepId": "step_1",
        "toolId": "tool_12345",
        "toolName": "Document Verification",
        "status": "completed",
        "startTime": "2024-01-15T10:30:00Z",
        "endTime": "2024-01-15T10:30:15Z",
        "duration": 15000,
        "output": {
          "valid": true,
          "confidence": 0.95
        }
      }
    ],
    "output": {
      "kycResult": "PASS",
      "riskScore": 35,
      "recommendation": "Approve onboarding"
    },
    "metrics": {
      "totalSteps": 3,
      "completedSteps": 3,
      "failedSteps": 0,
      "totalCost": 0.15
    }
  }
}
```

---

## AWS Bedrock Integration

### Import AWS Bedrock Agent

Import an existing AWS Bedrock Agent into BANKAI platform.

**Endpoint:** `POST /api/integrations/aws-bedrock/import`

**Request Body:**
```json
{
  "agentId": "AGENT123456",
  "agentArn": "arn:aws:bedrock:us-east-1:123456789012:agent/AGENT123456",
  "region": "us-east-1",
  "awsCredentials": {
    "accessKeyId": "${AWS_ACCESS_KEY_ID}",
    "secretAccessKey": "${AWS_SECRET_ACCESS_KEY}"
  },
  "mapping": {
    "department": "Compliance",
    "owner": "integration@bank.com",
    "teamId": "platform-team"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "bankaiAgentId": "agent_imported_123",
    "bedrockAgentId": "AGENT123456",
    "toolMappings": [
      {
        "actionGroupId": "ACTION_GROUP_1",
        "bankaiToolId": "tool_mapped_1"
      }
    ],
    "syncEnabled": true
  }
}
```

---

### Sync Bedrock Agent

Sync changes from AWS Bedrock Agent to BANKAI.

**Endpoint:** `POST /api/integrations/aws-bedrock/:agentId/sync`

**Response:**
```json
{
  "success": true,
  "data": {
    "synced": true,
    "changes": {
      "toolsAdded": 2,
      "toolsUpdated": 1,
      "configUpdated": true
    },
    "lastSyncedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

## Authentication

All API requests require authentication using Bearer tokens.

**Headers:**
```
Authorization: Bearer <your_api_token>
Content-Type: application/json
```

**Rate Limits:**
- Standard: 100 requests per minute
- Premium: 1000 requests per minute

**Error Codes:**
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Rate Limit Exceeded
- `500` - Internal Server Error
