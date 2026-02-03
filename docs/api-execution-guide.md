# Agent Execution API Guide

Complete guide for executing agents via API and understanding audit trail responses.

## Table of Contents
- [Authentication](#authentication)
- [Executing Agents](#executing-agents)
- [Response Structure](#response-structure)
- [Audit Trail Details](#audit-trail-details)
- [Code Examples](#code-examples)
- [Error Handling](#error-handling)

---

## Authentication

All API requests require Bearer token authentication:

```bash
Authorization: Bearer YOUR_API_TOKEN
```

Contact your BANKAI administrator to obtain an API token.

---

## Executing Agents

### Endpoint
```
POST /api/agents/{agentId}/execute
```

### Request Body

```json
{
  "input": {
    "customerName": "Acme Corporation Ltd",
    "businessNumber": "12345678",
    "documentImages": ["base64_encoded_image_1", "base64_encoded_image_2"],
    "customerEmail": "contact@acmecorp.com",
    "riskProfile": "medium"
  },
  "options": {
    "executionMode": "sequential",
    "timeoutMs": 300000,
    "skipOptionalTools": false,
    "returnDetailedLogs": true
  },
  "metadata": {
    "requestId": "req_abc123",
    "userId": "user_xyz789",
    "department": "onboarding"
  }
}
```

### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `input` | object | Yes | Input data for the agent execution |
| `options.executionMode` | string | No | `sequential` or `parallel` (default: sequential) |
| `options.timeoutMs` | number | No | Maximum execution time in milliseconds (default: 300000) |
| `options.skipOptionalTools` | boolean | No | Skip optional tools (default: false) |
| `options.returnDetailedLogs` | boolean | No | Include detailed tool execution logs (default: true) |
| `metadata` | object | No | Custom metadata for tracking and audit purposes |

---

## Response Structure

### Successful Execution

```json
{
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
    "documentImages": ["[REDACTED]"],
    "customerEmail": "contact@acmecorp.com",
    "riskProfile": "medium"
  },
  "output": {
    "decision": "approved",
    "confidence": 0.92,
    "riskScore": 35,
    "recommendations": [
      "Standard onboarding process approved",
      "Enhanced monitoring not required"
    ],
    "findings": {
      "documentVerification": {
        "status": "passed",
        "confidence": 0.95,
        "documents": [
          {
            "type": "incorporation_certificate",
            "valid": true,
            "issueDate": "2020-01-15"
          }
        ]
      },
      "businessRegistryCheck": {
        "status": "passed",
        "registered": true,
        "businessName": "Acme Corporation Ltd",
        "registrationNumber": "12345678",
        "status": "active"
      },
      "sanctionsScreening": {
        "status": "passed",
        "matches": 0,
        "listChecked": ["OFAC", "EU", "UN"]
      }
    }
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
      "input": {
        "document_image": "[REDACTED]"
      },
      "output": {
        "valid": true,
        "confidence": 0.95,
        "documentType": "incorporation_certificate",
        "extractedData": {
          "companyName": "Acme Corporation Ltd",
          "registrationNumber": "12345678",
          "issueDate": "2020-01-15"
        }
      },
      "logs": [
        {
          "timestamp": "2024-03-15T10:30:00.123Z",
          "level": "info",
          "message": "Starting document verification"
        },
        {
          "timestamp": "2024-03-15T10:30:02.456Z",
          "level": "info",
          "message": "Document uploaded successfully"
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
          "duration": 4890,
          "requestHeaders": {
            "Authorization": "[REDACTED]",
            "Content-Type": "application/json"
          },
          "responseHeaders": {
            "content-type": "application/json",
            "x-request-id": "req_doc_xyz"
          }
        }
      ]
    },
    {
      "toolId": "tool_business_registry_002",
      "toolName": "Business Registry Check",
      "mandatory": true,
      "status": "completed",
      "startTime": "2024-03-15T10:30:05.500Z",
      "endTime": "2024-03-15T10:30:08.234Z",
      "duration": 2734,
      "input": {
        "businessNumber": "12345678",
        "businessName": "Acme Corporation Ltd"
      },
      "output": {
        "found": true,
        "status": "active",
        "registeredName": "Acme Corporation Ltd",
        "registrationDate": "2020-01-15",
        "directors": [
          {
            "name": "John Smith",
            "appointmentDate": "2020-01-15"
          }
        ]
      },
      "logs": [
        {
          "timestamp": "2024-03-15T10:30:05.500Z",
          "level": "info",
          "message": "Querying business registry"
        },
        {
          "timestamp": "2024-03-15T10:30:08.234Z",
          "level": "info",
          "message": "Business record found and validated"
        }
      ],
      "apiCalls": [
        {
          "url": "https://api.companieshouse.gov.uk/company/12345678",
          "method": "GET",
          "statusCode": 200,
          "duration": 2234
        }
      ]
    },
    {
      "toolId": "tool_sanctions_003",
      "toolName": "Sanctions Screening",
      "mandatory": false,
      "status": "completed",
      "startTime": "2024-03-15T10:30:08.300Z",
      "endTime": "2024-03-15T10:30:12.100Z",
      "duration": 3800,
      "input": {
        "entityName": "Acme Corporation Ltd",
        "directors": ["John Smith"]
      },
      "output": {
        "matches": 0,
        "screening": {
          "OFAC": { "matches": 0, "checked": true },
          "EU": { "matches": 0, "checked": true },
          "UN": { "matches": 0, "checked": true }
        },
        "riskLevel": "low"
      },
      "logs": [
        {
          "timestamp": "2024-03-15T10:30:08.300Z",
          "level": "info",
          "message": "Screening against OFAC list"
        },
        {
          "timestamp": "2024-03-15T10:30:10.100Z",
          "level": "info",
          "message": "Screening against EU sanctions list"
        },
        {
          "timestamp": "2024-03-15T10:30:12.100Z",
          "level": "info",
          "message": "Screening completed - no matches"
        }
      ],
      "apiCalls": [
        {
          "url": "https://api.sanctionscheck.com/v1/screen",
          "method": "POST",
          "statusCode": 200,
          "duration": 3600
        }
      ]
    }
  ],
  "metrics": {
    "totalTools": 3,
    "mandatoryTools": 2,
    "optionalTools": 1,
    "successfulTools": 3,
    "failedTools": 0,
    "skippedTools": 0,
    "totalApiCalls": 3,
    "totalDuration": 12345,
    "avgToolDuration": 4122
  },
  "audit": {
    "executionId": "exec_20240315_abc123",
    "userId": "user_xyz789",
    "department": "onboarding",
    "requestId": "req_abc123",
    "ipAddress": "192.168.1.100",
    "userAgent": "BANKAI-Client/1.0",
    "timestamp": "2024-03-15T10:30:00.000Z",
    "dataClassification": "confidential",
    "retentionPeriod": "7 years",
    "complianceFlags": ["KYC", "AML"]
  }
}
```

### Failed Execution

```json
{
  "executionId": "exec_20240315_xyz789",
  "agentId": "agent_kyc_001",
  "agentName": "Commercial KYC Agent",
  "status": "failed",
  "startTime": "2024-03-15T11:00:00.000Z",
  "endTime": "2024-03-15T11:00:08.123Z",
  "duration": 8123,
  "error": {
    "code": "TOOL_EXECUTION_FAILED",
    "message": "Mandatory tool 'Document Verification API' failed",
    "details": {
      "toolId": "tool_doc_verify_001",
      "toolName": "Document Verification API",
      "errorType": "API_TIMEOUT",
      "errorMessage": "Request timeout after 30000ms",
      "retryAttempts": 3,
      "lastAttemptTime": "2024-03-15T11:00:08.000Z"
    }
  },
  "toolExecutions": [
    {
      "toolId": "tool_doc_verify_001",
      "toolName": "Document Verification API",
      "mandatory": true,
      "status": "failed",
      "startTime": "2024-03-15T11:00:00.100Z",
      "endTime": "2024-03-15T11:00:08.100Z",
      "duration": 8000,
      "error": {
        "type": "API_TIMEOUT",
        "message": "Request timeout after 30000ms",
        "code": "ETIMEDOUT"
      },
      "logs": [
        {
          "timestamp": "2024-03-15T11:00:00.100Z",
          "level": "info",
          "message": "Starting document verification"
        },
        {
          "timestamp": "2024-03-15T11:00:02.100Z",
          "level": "info",
          "message": "Retry attempt 1 of 3"
        },
        {
          "timestamp": "2024-03-15T11:00:05.100Z",
          "level": "info",
          "message": "Retry attempt 2 of 3"
        },
        {
          "timestamp": "2024-03-15T11:00:08.100Z",
          "level": "error",
          "message": "All retry attempts exhausted - API timeout"
        }
      ],
      "apiCalls": [
        {
          "url": "https://api.docverify.com/v2/verify",
          "method": "POST",
          "statusCode": null,
          "duration": 30000,
          "error": "ETIMEDOUT"
        }
      ]
    }
  ],
  "metrics": {
    "totalTools": 1,
    "mandatoryTools": 1,
    "optionalTools": 0,
    "successfulTools": 0,
    "failedTools": 1,
    "skippedTools": 2,
    "totalApiCalls": 1,
    "totalDuration": 8123
  },
  "audit": {
    "executionId": "exec_20240315_xyz789",
    "userId": "user_xyz789",
    "department": "onboarding",
    "timestamp": "2024-03-15T11:00:00.000Z",
    "failureReason": "TOOL_EXECUTION_FAILED",
    "complianceFlags": ["KYC", "AML"]
  }
}
```

---

## Code Examples

### Node.js / JavaScript

```javascript
const BANKAI_API_URL = 'https://bankai.yourbank.com/api';
const API_TOKEN = process.env.BANKAI_API_TOKEN;

async function executeAgent(agentId, inputData) {
  try {
    const response = await fetch(`${BANKAI_API_URL}/agents/${agentId}/execute`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: inputData,
        options: {
          executionMode: 'sequential',
          returnDetailedLogs: true
        },
        metadata: {
          requestId: `req_${Date.now()}`,
          userId: 'user_123',
          department: 'onboarding'
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    console.log('Execution ID:', result.executionId);
    console.log('Status:', result.status);
    console.log('Decision:', result.output.decision);
    console.log('Confidence:', result.output.confidence);
    
    // Access tool execution details
    result.toolExecutions.forEach(tool => {
      console.log(`\nTool: ${tool.toolName}`);
      console.log(`  Status: ${tool.status}`);
      console.log(`  Duration: ${tool.duration}ms`);
      
      if (tool.error) {
        console.error(`  Error: ${tool.error.message}`);
      }
    });
    
    return result;
    
  } catch (error) {
    console.error('Failed to execute agent:', error);
    throw error;
  }
}

// Usage
const inputData = {
  customerName: 'Acme Corporation Ltd',
  businessNumber: '12345678',
  documentImages: ['base64_encoded_image'],
  riskProfile: 'medium'
};

executeAgent('agent_kyc_001', inputData)
  .then(result => {
    console.log('Agent execution completed successfully');
  })
  .catch(error => {
    console.error('Agent execution failed:', error);
  });
```

### Python

```python
import requests
import os
import json
from datetime import datetime

BANKAI_API_URL = 'https://bankai.yourbank.com/api'
API_TOKEN = os.getenv('BANKAI_API_TOKEN')

def execute_agent(agent_id, input_data):
    """Execute a BANKAI agent and return detailed results"""
    
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
        },
        'metadata': {
            'requestId': f'req_{int(datetime.now().timestamp())}',
            'userId': 'user_123',
            'department': 'onboarding'
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=300)
        response.raise_for_status()
        
        result = response.json()
        
        print(f"Execution ID: {result['executionId']}")
        print(f"Status: {result['status']}")
        print(f"Duration: {result['duration']}ms")
        print(f"Decision: {result['output']['decision']}")
        print(f"Confidence: {result['output']['confidence']}")
        
        # Print tool execution details
        print("\nTool Executions:")
        for tool in result['toolExecutions']:
            print(f"\n  {tool['toolName']}:")
            print(f"    Status: {tool['status']}")
            print(f"    Duration: {tool['duration']}ms")
            print(f"    Mandatory: {tool['mandatory']}")
            
            if tool.get('error'):
                print(f"    Error: {tool['error']['message']}")
            
            # Print API call details
            if tool.get('apiCalls'):
                for api_call in tool['apiCalls']:
                    print(f"    API Call: {api_call['method']} {api_call['url']}")
                    print(f"      Status: {api_call.get('statusCode', 'N/A')}")
                    print(f"      Duration: {api_call['duration']}ms")
        
        return result
        
    except requests.exceptions.Timeout:
        print("Error: Request timeout")
        raise
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error: {e}")
        print(f"Response: {response.text}")
        raise
    except Exception as e:
        print(f"Error: {e}")
        raise

# Usage
if __name__ == '__main__':
    input_data = {
        'customerName': 'Acme Corporation Ltd',
        'businessNumber': '12345678',
        'documentImages': ['base64_encoded_image'],
        'riskProfile': 'medium'
    }
    
    try:
        result = execute_agent('agent_kyc_001', input_data)
        print("\nAgent execution completed successfully")
        
        # Save audit trail to file
        with open(f"audit_{result['executionId']}.json", 'w') as f:
            json.dump(result, f, indent=2)
            print(f"Audit trail saved to audit_{result['executionId']}.json")
            
    except Exception as e:
        print(f"Agent execution failed: {e}")
```

### cURL

```bash
curl -X POST https://bankai.yourbank.com/api/agents/agent_kyc_001/execute \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "customerName": "Acme Corporation Ltd",
      "businessNumber": "12345678",
      "documentImages": ["base64_encoded_image"],
      "riskProfile": "medium"
    },
    "options": {
      "executionMode": "sequential",
      "returnDetailedLogs": true
    },
    "metadata": {
      "requestId": "req_abc123",
      "userId": "user_xyz789",
      "department": "onboarding"
    }
  }'
```

---

## Audit Trail Details

Every agent execution creates a comprehensive audit trail that includes:

### 1. **Execution Metadata**
- Unique execution ID
- Agent ID and name
- User ID and department
- Start/end timestamps
- Total duration

### 2. **Input/Output Data**
- Complete input data (sensitive fields may be redacted)
- Full output with decision, confidence scores, and findings
- Recommendations and extracted insights

### 3. **Tool Execution Logs**
- Individual tool execution details
- Input/output for each tool
- Success/failure status
- Duration metrics
- Error messages if applicable

### 4. **API Call Tracking**
- All external API calls made
- Request/response details
- HTTP status codes
- Duration and performance metrics
- Headers (sensitive data redacted)

### 5. **Compliance Information**
- Data classification level
- Retention period requirements
- Compliance flags (KYC, AML, etc.)
- Regulatory markers

### 6. **Error Information**
- Error codes and messages
- Retry attempts
- Failure reasons
- Stack traces (if available)

---

## Error Handling

### Error Codes

| Code | Description | Action |
|------|-------------|--------|
| `TOOL_EXECUTION_FAILED` | A mandatory tool failed | Review tool configuration and logs |
| `API_TIMEOUT` | External API timeout | Check network connectivity and increase timeout |
| `API_RATE_LIMIT` | Rate limit exceeded | Implement backoff and retry logic |
| `INVALID_INPUT` | Input validation failed | Check input data structure and types |
| `AGENT_NOT_FOUND` | Agent ID doesn't exist | Verify agent ID is correct |
| `UNAUTHORIZED` | Invalid or expired token | Refresh API token |
| `EXECUTION_TIMEOUT` | Overall execution timeout | Increase timeout or optimize tools |

### Retry Strategy

```javascript
async function executeWithRetry(agentId, inputData, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt} of ${maxRetries}`);
      const result = await executeAgent(agentId, inputData);
      return result;
    } catch (error) {
      lastError = error;
      
      // Don't retry on validation errors
      if (error.code === 'INVALID_INPUT') {
        throw error;
      }
      
      // Exponential backoff
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}
```

---

## Best Practices

1. **Always include metadata** - Track request IDs and user information for audit purposes
2. **Handle errors gracefully** - Implement retry logic with exponential backoff
3. **Monitor execution times** - Set appropriate timeouts based on your agent complexity
4. **Store audit trails** - Save complete execution results for compliance and debugging
5. **Secure your tokens** - Never hardcode API tokens, use environment variables
6. **Test in non-production** - Validate agent behavior before production deployment
7. **Monitor rate limits** - Track API usage to avoid rate limiting
8. **Review logs regularly** - Check tool execution logs for performance issues

---

## Support

For additional help:
- View the [full API documentation](/documentation)
- Contact your BANKAI administrator
- Review execution logs in the [Audit Dashboard](/audit)
