export type ProviderType = "openai" | "openai_codex" | "anthropic" | "google_gemini" | "local" | "other";
export type CostTier = "low" | "medium" | "high" | "premium";
export type ExecutionMode = "answer_now" | "draft_only" | "tool_action" | "development_request" | "github_issue" | "codex_prompt" | "approval_required";
export type DevelopmentRequestStatus =
  | "captured"
  | "clarified"
  | "ready_for_github"
  | "github_issue_created"
  | "ready_for_codex"
  | "in_progress"
  | "preview_ready"
  | "sentinel_review"
  | "approved"
  | "rejected"
  | "completed";

export type AiProviderConfig = {
  providerId: string;
  providerName: string;
  providerType: ProviderType;
  enabled: boolean;
  defaultModel: string;
  fallbackModel?: string;
  costTier: CostTier;
  supportsStreaming: boolean;
  supportsTools: boolean;
  supportsVision: boolean;
  supportsAudio: boolean;
  supportsCodeExecution: boolean;
  supportsLongContext: boolean;
  supportsAgentMode: boolean;
  supportsStructuredOutput: boolean;
  maxContextTokens?: number;
  notes?: string;
};

export type AgentProfile = {
  agentKey: string;
  agentName: string;
  purpose: string;
  defaultProviderId: string;
  defaultModel: string;
  escalationProviderId?: string;
  riskCeiling: number;
  canUseTools: boolean;
  canCreateDevelopmentRequests: boolean;
  requiresApprovalAboveLevel: number;
  enabled: boolean;
};

export type AiSettings = {
  defaultFastProviderId: string;
  defaultSmartProviderId: string;
  defaultCodingProviderId: string;
  defaultLongDocumentProviderId?: string;
  defaultMultimodalProviderId?: string;
  askBeforeHighCostModel: boolean;
  monthlyAiBudget: number;
  warnAtBudgetPercent: number;
  disablePremiumModelsWithoutApproval: boolean;
  preferFastModelByDefault: boolean;
  logTokenUsage: boolean;
  showCostEstimates: boolean;
  requireApprovalAboveRiskLevel: number;
  allowVoiceCreatedDevelopmentRequests: boolean;
  allowAutomaticGithubIssueCreation: boolean;
  allowAutomaticBranchCreation: boolean;
  allowAutomaticPrCreation: boolean;
  allowAutomaticMerge: boolean;
  allowProductionDeployment: boolean;
  allowProductionDataChanges: boolean;
  requireSentinelReviewForLevel5: boolean;
};

export type OracleTaskClassification = {
  originalUserInput: string;
  normalizedTask: string;
  intent: string;
  containerKey: string;
  sensitivity: "normal" | "private" | "sensitive" | "vault";
  riskLevel: number;
  requiredCapabilities: string[];
  preferredAgent: string;
  preferredProvider: string;
  approvalRequired: boolean;
  estimatedCostTier: CostTier;
  executionMode: ExecutionMode;
  modelSelectionReason: string;
};

export type DevelopmentRequest = {
  id: string;
  title: string;
  originalUserInput: string;
  normalizedRequest: string;
  source: "voice" | "text" | "system";
  targetArea: string;
  priority: "low" | "medium" | "high" | "critical";
  status: DevelopmentRequestStatus;
  assignedAgent: "Operator";
  recommendedProvider: "Codex";
  requiresApproval: true;
  productionWriteAllowed: false;
  acceptanceCriteria: string[];
  constraints: string[];
  githubIssueUrl?: string;
  branchName?: string;
  pullRequestUrl?: string;
  previewUrl?: string;
  sentinelReviewStatus: "not_requested" | "requested" | "passed" | "blocked";
  githubIssueBody: string;
  codexPrompt: string;
  createdAt: string;
  updatedAt: string;
};

export type ProviderUsageLog = {
  id: string;
  userId: string;
  requestId?: string;
  agentKey: string;
  intent: string;
  executionMode: ExecutionMode;
  providerId: string;
  model: string;
  riskLevel: number;
  estimatedInputTokens: number;
  estimatedOutputTokens: number;
  estimatedCost?: number;
  modelSelectionReason: string;
  status: "planned" | "started" | "completed" | "failed" | "suppressed" | "approval_required";
  createdAt: string;
};

export const defaultAiProviders: AiProviderConfig[] = [
  {
    providerId: "openai_fast_chat",
    providerName: "OpenAI Fast Chat",
    providerType: "openai",
    enabled: true,
    defaultModel: "gpt-5.4-nano",
    fallbackModel: "gpt-5.4-mini",
    costTier: "low",
    supportsStreaming: true,
    supportsTools: true,
    supportsVision: false,
    supportsAudio: false,
    supportsCodeExecution: false,
    supportsLongContext: false,
    supportsAgentMode: false,
    supportsStructuredOutput: true,
    notes: "Default for routine chat, simple planning, dashboard Q&A, reminders, memory capture, and short summaries."
  },
  {
    providerId: "openai_smart_chat",
    providerName: "OpenAI Smart Chat",
    providerType: "openai",
    enabled: true,
    defaultModel: "gpt-5.4-mini",
    fallbackModel: "gpt-5.4",
    costTier: "medium",
    supportsStreaming: true,
    supportsTools: true,
    supportsVision: true,
    supportsAudio: false,
    supportsCodeExecution: false,
    supportsLongContext: true,
    supportsAgentMode: false,
    supportsStructuredOutput: true,
    notes: "Escalation tier for business writing, planning, structured analysis, and complex reasoning."
  },
  {
    providerId: "openai_codex_operator",
    providerName: "OpenAI Codex / Operator",
    providerType: "openai_codex",
    enabled: false,
    defaultModel: "gpt-5.3-codex",
    costTier: "high",
    supportsStreaming: true,
    supportsTools: true,
    supportsVision: false,
    supportsAudio: false,
    supportsCodeExecution: true,
    supportsLongContext: true,
    supportsAgentMode: true,
    supportsStructuredOutput: true,
    notes: "Coding, GitHub, repo review, bug fixes, tests, PRs, and self-improvement only."
  },
  {
    providerId: "claude_long_document",
    providerName: "Claude Long Document Specialist",
    providerType: "anthropic",
    enabled: false,
    defaultModel: "claude-haiku-4.5",
    costTier: "medium",
    supportsStreaming: true,
    supportsTools: true,
    supportsVision: false,
    supportsAudio: false,
    supportsCodeExecution: false,
    supportsLongContext: true,
    supportsAgentMode: false,
    supportsStructuredOutput: true,
    notes: "Planned for long-document review, careful writing, and nuanced analysis."
  },
  {
    providerId: "gemini_multimodal",
    providerName: "Gemini Multimodal Specialist",
    providerType: "google_gemini",
    enabled: false,
    defaultModel: "gemini-flash-lite",
    costTier: "medium",
    supportsStreaming: true,
    supportsTools: true,
    supportsVision: true,
    supportsAudio: true,
    supportsCodeExecution: false,
    supportsLongContext: true,
    supportsAgentMode: false,
    supportsStructuredOutput: true,
    notes: "Planned for multimodal, Google Workspace, image, video, and long-context document workflows."
  }
];

export const defaultAiSettings: AiSettings = {
  defaultFastProviderId: "openai_fast_chat",
  defaultSmartProviderId: "openai_smart_chat",
  defaultCodingProviderId: "openai_codex_operator",
  defaultLongDocumentProviderId: undefined,
  defaultMultimodalProviderId: undefined,
  askBeforeHighCostModel: true,
  monthlyAiBudget: 100,
  warnAtBudgetPercent: 80,
  disablePremiumModelsWithoutApproval: true,
  preferFastModelByDefault: true,
  logTokenUsage: true,
  showCostEstimates: true,
  requireApprovalAboveRiskLevel: 2,
  allowVoiceCreatedDevelopmentRequests: true,
  allowAutomaticGithubIssueCreation: false,
  allowAutomaticBranchCreation: false,
  allowAutomaticPrCreation: false,
  allowAutomaticMerge: false,
  allowProductionDeployment: false,
  allowProductionDataChanges: false,
  requireSentinelReviewForLevel5: true
};

export function classifyOracleTask(input: string, settings: AiSettings = defaultAiSettings): OracleTaskClassification {
  const normalizedTask = input.trim().replace(/\s+/g, " ");
  const text = normalizedTask.toLowerCase();
  const appImprovement = /\b(improve|fix|bug|change|add|update|implement|codex|github|pull request|repo review|dashboard better|ui)\b/.test(text);
  const longDocument = /\b(long document|pdf|document review|contract|policy|manual|large file)\b/.test(text);
  const multimodal = /\b(image|video|screenshot|visual|multimodal|photo)\b/.test(text);
  const business = /\b(strategy|proposal|business plan|analysis|important writing|campaign)\b/.test(text);
  const highRisk = /\b(deploy|production|delete|billing|auth|security|database|merge)\b/.test(text);

  if (appImprovement) {
    return {
      originalUserInput: input,
      normalizedTask,
      intent: text.includes("bug") ? "bug_report" : "app_improvement",
      containerKey: "project.zion",
      sensitivity: "private",
      riskLevel: 5,
      requiredCapabilities: ["code_execution", "agent_mode", "github"],
      preferredAgent: "Operator",
      preferredProvider: settings.defaultCodingProviderId,
      approvalRequired: true,
      estimatedCostTier: "high",
      executionMode: "development_request",
      modelSelectionReason: "Code or app improvement requests route to Operator/Codex and require staging plus approval."
    };
  }

  if (highRisk) {
    return {
      originalUserInput: input,
      normalizedTask,
      intent: "security_review",
      containerKey: "project.zion",
      sensitivity: "sensitive",
      riskLevel: 6,
      requiredCapabilities: ["reasoning", "approval_gate"],
      preferredAgent: "Sentinel",
      preferredProvider: settings.defaultSmartProviderId,
      approvalRequired: true,
      estimatedCostTier: "medium",
      executionMode: "approval_required",
      modelSelectionReason: "Security-sensitive, production, destructive, or deployment actions require Sentinel review."
    };
  }

  if (longDocument) {
    return {
      originalUserInput: input,
      normalizedTask,
      intent: "long_context_review",
      containerKey: "project.zion",
      sensitivity: "private",
      riskLevel: 2,
      requiredCapabilities: ["long_context"],
      preferredAgent: "Scout",
      preferredProvider: settings.defaultLongDocumentProviderId ?? settings.defaultSmartProviderId,
      approvalRequired: settings.askBeforeHighCostModel,
      estimatedCostTier: "medium",
      executionMode: settings.askBeforeHighCostModel ? "approval_required" : "draft_only",
      modelSelectionReason: "Long document review may need a long-context specialist or smart fallback."
    };
  }

  if (multimodal) {
    return {
      originalUserInput: input,
      normalizedTask,
      intent: "multimodal_analysis",
      containerKey: "project.zion",
      sensitivity: "private",
      riskLevel: 2,
      requiredCapabilities: ["vision", "long_context"],
      preferredAgent: "Scout",
      preferredProvider: settings.defaultMultimodalProviderId ?? settings.defaultSmartProviderId,
      approvalRequired: settings.askBeforeHighCostModel,
      estimatedCostTier: "medium",
      executionMode: settings.askBeforeHighCostModel ? "approval_required" : "draft_only",
      modelSelectionReason: "Multimodal work uses a specialist when enabled, otherwise smart chat fallback."
    };
  }

  if (business) {
    return {
      originalUserInput: input,
      normalizedTask,
      intent: "business_analysis",
      containerKey: "business.general",
      sensitivity: "private",
      riskLevel: 2,
      requiredCapabilities: ["reasoning", "structured_output"],
      preferredAgent: "Analyst",
      preferredProvider: settings.defaultSmartProviderId,
      approvalRequired: false,
      estimatedCostTier: "medium",
      executionMode: "draft_only",
      modelSelectionReason: "Business planning and important writing use smart chat when complexity justifies it."
    };
  }

  return {
    originalUserInput: input,
    normalizedTask,
    intent: "general_chat",
    containerKey: "general",
    sensitivity: "normal",
    riskLevel: 0,
    requiredCapabilities: ["chat"],
    preferredAgent: "Zion",
    preferredProvider: settings.defaultFastProviderId,
    approvalRequired: false,
    estimatedCostTier: "low",
    executionMode: "answer_now",
    modelSelectionReason: "Routine chat starts on the cheapest fast model."
  };
}

export function createDevelopmentRequest(input: {
  userId: string;
  originalUserInput: string;
  source?: "voice" | "text" | "system";
  targetArea?: string;
  priority?: "low" | "medium" | "high" | "critical";
}): DevelopmentRequest {
  const normalizedRequest = input.originalUserInput.trim().replace(/\s+/g, " ");
  const title = makeTitle(normalizedRequest);
  const acceptanceCriteria = [
    "Requested behavior is implemented without rebuilding unrelated app areas.",
    "Existing command, dashboard, memory, routing, and upload functionality still works.",
    "Risk level 5 changes remain staged behind review and approval.",
    "Manual QA steps are documented."
  ];
  const constraints = [
    "Do not push directly to main.",
    "Do not auto-merge.",
    "Do not deploy to production without explicit approval.",
    "Do not modify production data.",
    "Do not change authentication, permissions, billing, or security rules without explicit approval."
  ];
  const request: Omit<DevelopmentRequest, "githubIssueBody" | "codexPrompt"> = {
    id: cryptoId(),
    title,
    originalUserInput: input.originalUserInput,
    normalizedRequest,
    source: input.source ?? "text",
    targetArea: input.targetArea ?? inferTargetArea(normalizedRequest),
    priority: input.priority ?? "medium",
    status: "captured",
    assignedAgent: "Operator",
    recommendedProvider: "Codex",
    requiresApproval: true,
    productionWriteAllowed: false,
    acceptanceCriteria,
    constraints,
    sentinelReviewStatus: "not_requested",
    createdAt: now(),
    updatedAt: now()
  };

  return {
    ...request,
    githubIssueBody: generateGithubIssueBody(request),
    codexPrompt: generateCodexPrompt(request)
  };
}

export function generateGithubIssueBody(request: Omit<DevelopmentRequest, "githubIssueBody" | "codexPrompt"> | DevelopmentRequest) {
  return [
    "## User Intent",
    request.normalizedRequest,
    "",
    "## Original Request",
    request.originalUserInput,
    "",
    "## Normalized Scope",
    `Target area: ${request.targetArea}`,
    `Priority: ${request.priority}`,
    "",
    "## Acceptance Criteria",
    ...request.acceptanceCriteria.map((item) => `- ${item}`),
    "",
    "## Non-Regression Requirements",
    "- Preserve existing command center behavior.",
    "- Preserve dashboard, intelligence, settings, file upload, and routing UI.",
    "- Do not regress mobile layout.",
    "",
    "## Safety Constraints",
    ...request.constraints.map((item) => `- ${item}`),
    "",
    "## Suggested Implementation Notes",
    "- Keep the change additive and scoped.",
    "- Prefer existing app patterns and components.",
    "- Add or update tests where the repo supports them.",
    "",
    "## Testing Requirements",
    "- Run lint and production build.",
    "- Verify the affected UI in desktop and mobile viewports.",
    "- Document manual QA steps.",
    "",
    "## Approval Requirements",
    "- Requires Sentinel review before merge/deploy when risk level is 5 or higher.",
    "- Requires explicit user approval before merge or production deployment."
  ].join("\n");
}

export function generateCodexPrompt(request: Omit<DevelopmentRequest, "githubIssueBody" | "codexPrompt"> | DevelopmentRequest) {
  return [
    "You are implementing a scoped Zion MVP app improvement.",
    "",
    "## App Context",
    "Zion is a private AI operating system with Oracle routing, command center, dashboard intelligence, memory, vault, settings, and Operator self-improvement workflows.",
    "",
    "## User Intent",
    request.normalizedRequest,
    "",
    "## Scope",
    `Target area: ${request.targetArea}`,
    "",
    "## Acceptance Criteria",
    ...request.acceptanceCriteria.map((item) => `- ${item}`),
    "",
    "## Non-Regression Requirements",
    "- Do not rebuild the app.",
    "- Preserve existing functionality.",
    "- Preserve mobile friendliness.",
    "",
    "## UI/UX Requirements",
    "- Follow the existing light-mode product UI.",
    "- Keep controls compact, scannable, and operational.",
    "- Avoid unrelated landing-page or marketing sections.",
    "",
    "## Safety Rules",
    ...request.constraints.map((item) => `- ${item}`),
    "- Create a branch.",
    "- Open a pull request or provide patch instructions.",
    "- Add or update tests where appropriate.",
    "",
    "## GitHub Workflow Expectations",
    "- Link the GitHub issue.",
    "- Summarize files changed.",
    "- Include manual QA steps and known limitations."
  ].join("\n");
}

export function createProviderUsageLog(input: {
  userId: string;
  classification: OracleTaskClassification;
  provider: AiProviderConfig;
  estimatedInputTokens?: number;
  estimatedOutputTokens?: number;
}): ProviderUsageLog {
  return {
    id: cryptoId(),
    userId: input.userId,
    agentKey: input.classification.preferredAgent.toLowerCase(),
    intent: input.classification.intent,
    executionMode: input.classification.executionMode,
    providerId: input.provider.providerId,
    model: input.provider.defaultModel,
    riskLevel: input.classification.riskLevel,
    estimatedInputTokens: input.estimatedInputTokens ?? estimateTokens(input.classification.originalUserInput),
    estimatedOutputTokens: input.estimatedOutputTokens ?? 700,
    modelSelectionReason: input.classification.modelSelectionReason,
    status: input.classification.approvalRequired ? "approval_required" : "planned",
    createdAt: now()
  };
}

function makeTitle(value: string) {
  const cleaned = value.replace(/[^\w\s-]/g, "").trim();
  const words = cleaned.split(/\s+/).slice(0, 9).join(" ");
  return words || "App improvement request";
}

function inferTargetArea(value: string) {
  const text = value.toLowerCase();
  if (text.includes("dashboard")) return "Dashboard";
  if (text.includes("settings") || text.includes("model")) return "AI Settings";
  if (text.includes("command") || text.includes("chat")) return "Command Center";
  if (text.includes("github") || text.includes("codex") || text.includes("operator")) return "Operator Workflow";
  return "Zion App";
}

function estimateTokens(value: string) {
  return Math.max(1, Math.ceil(value.length / 4));
}

function now() {
  return new Date().toISOString();
}

function cryptoId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
