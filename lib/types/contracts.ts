/**
 * BANKAI Platform - Data Contracts & Type Definitions
 * Enterprise AI Agent Management for Banking
 */

// ============================================
// TOOL DATA CONTRACTS
// ============================================

export type ToolType = 'api' | 'websocket' | 'llm' | 'database' | 'custom_script';
export type ToolStatus = 'active' | 'inactive' | 'deprecated' | 'testing';
export type AuthType = 'none' | 'bearer' | 'api_key' | 'basic' | 'oauth2' | 'aws_iam';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ToolParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
  required: boolean;
  default?: any;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    enum?: string[];
  };
}

export interface ToolConfiguration {
  // API Configuration
  endpoint?: string;
  method?: HttpMethod;
  headers?: Record<string, string>;
  queryParams?: Record<string, string>;
  
  // WebSocket Configuration
  wsUrl?: string;
  wsProtocol?: string;
  heartbeatInterval?: number;
  reconnectAttempts?: number;
  
  // LLM Configuration
  provider?: 'openai' | 'anthropic' | 'aws-bedrock' | 'groq' | 'custom';
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  
  // Database Configuration
  connectionString?: string;
  query?: string;
  queryType?: 'sql' | 'nosql' | 'graphql';
  
  // Custom Script Configuration
  scriptLanguage?: 'javascript' | 'python' | 'sql';
  scriptContent?: string;
  runtime?: 'node' | 'browser' | 'python';
  dependencies?: string[];
  
  // Common Configuration
  timeout?: number;
  retryAttempts?: number;
  rateLimitPerMinute?: number;
  caching?: {
    enabled: boolean;
    ttl?: number;
  };
}

export interface ToolMetadata {
  department: string;
  owner: string;
  teamId: string;
  tags: string[];
  category: string;
  compliance: {
    requiresApproval: boolean;
    dataClassification: 'public' | 'internal' | 'confidential' | 'restricted';
    regulatoryFramework?: string[];
  };
  version: string;
  createdAt: string;
  updatedAt: string;
  lastUsed?: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  type: ToolType;
  status: ToolStatus;
  configuration: ToolConfiguration;
  parameters: ToolParameter[];
  metadata: ToolMetadata;
  authentication: {
    type: AuthType;
    credentials?: Record<string, string>;
  };
  validation: {
    inputSchema?: object;
    outputSchema?: object;
  };
  monitoring: {
    totalRuns: number;
    successRate: number;
    avgResponseTime: number;
    errorRate: number;
    lastError?: string;
  };
}

// ============================================
// AGENT DATA CONTRACTS
// ============================================

export type AgentStatus = 'active' | 'inactive' | 'draft' | 'archived';
export type AgentType = 'kyc' | 'fraud' | 'compliance' | 'risk' | 'onboarding' | 'custom';
export type ExecutionMode = 'sequential' | 'parallel' | 'conditional';

export interface AgentTool {
  toolId: string;
  mandatory: boolean;
  order?: number;
  condition?: string;
  parameters?: Record<string, any>;
}

export interface AgentConfiguration {
  maxExecutionTime?: number;
  maxRetries?: number;
  executionMode: ExecutionMode;
  parallelLimit?: number;
  errorHandling: 'stop' | 'continue' | 'rollback';
  outputFormat?: 'json' | 'text' | 'structured';
}

export interface AgentMetadata {
  department: string;
  owner: string;
  teamId: string;
  type: AgentType;
  tags: string[];
  version: string;
  createdAt: string;
  updatedAt: string;
  approvalStatus?: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: AgentStatus;
  tools: AgentTool[];
  configuration: AgentConfiguration;
  metadata: AgentMetadata;
  systemPrompt?: string;
  capabilities: string[];
  constraints?: string[];
  monitoring: {
    totalExecutions: number;
    successRate: number;
    avgDuration: number;
    lastRun?: string;
    healthScore: number;
  };
}

// ============================================
// EXECUTION DATA CONTRACTS
// ============================================

export type ExecutionStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
export type ExecutionPriority = 'low' | 'normal' | 'high' | 'critical';

export interface ExecutionStep {
  stepId: string;
  toolId: string;
  toolName: string;
  status: ExecutionStatus;
  startTime: string;
  endTime?: string;
  duration?: number;
  input: any;
  output?: any;
  error?: string;
  confidence?: number;
  metadata?: Record<string, any>;
}

export interface ExecutionAudit {
  executionId: string;
  agentId: string;
  agentName: string;
  userId: string;
  department: string;
  status: ExecutionStatus;
  priority: ExecutionPriority;
  startTime: string;
  endTime?: string;
  duration?: number;
  input: any;
  output?: any;
  steps: ExecutionStep[];
  metrics: {
    totalSteps: number;
    completedSteps: number;
    failedSteps: number;
    totalTokens?: number;
    totalCost?: number;
  };
  compliance: {
    dataProcessed: string[];
    regulations: string[];
    auditLog: string[];
  };
  error?: {
    message: string;
    code: string;
    stack?: string;
  };
}

// ============================================
// AWS BEDROCK AGENT INTEGRATION
// ============================================

export interface AWSBedrockAgentImport {
  agentId: string;
  agentArn: string;
  agentName: string;
  agentVersion?: string;
  region: string;
  actionGroups: {
    actionGroupId: string;
    actionGroupName: string;
    apiSchema?: any;
    lambdaArn?: string;
  }[];
  knowledgeBases?: {
    knowledgeBaseId: string;
    knowledgeBaseArn: string;
  }[];
  instructions?: string;
  foundationModel: string;
  idleSessionTTL?: number;
}

export interface AWSBedrockMapping {
  bedrockAgentId: string;
  bankaiAgentId: string;
  toolMappings: {
    actionGroupId: string;
    bankaiToolId: string;
    parameterMapping: Record<string, string>;
  }[];
  syncEnabled: boolean;
  lastSyncedAt?: string;
}

// ============================================
// DEPARTMENT & ACCESS CONTROL
// ============================================

export interface Department {
  id: string;
  name: string;
  code: string;
  parentDepartmentId?: string;
  description?: string;
  teams: Team[];
}

export interface Team {
  id: string;
  name: string;
  departmentId: string;
  members: string[];
  ownedAgents: string[];
  ownedTools: string[];
}

export interface UserRole {
  userId: string;
  email: string;
  name: string;
  department: string;
  teamId: string;
  roles: ('admin' | 'creator' | 'viewer' | 'auditor')[];
  permissions: {
    canCreateAgents: boolean;
    canCreateTools: boolean;
    canExecuteAgents: boolean;
    canViewAudits: boolean;
    canApproveAgents: boolean;
    departments: string[];
  };
}

// ============================================
// API RESPONSE CONTRACTS
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata?: {
    timestamp: string;
    requestId: string;
    version: string;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export interface ListFilters {
  search?: string;
  department?: string;
  owner?: string;
  status?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
