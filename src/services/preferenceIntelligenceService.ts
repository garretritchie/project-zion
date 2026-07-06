export type Strength = "low" | "medium" | "high" | "critical";
export type PermissionLevel = "session_only" | "approved_memory" | "approved_proactive" | "do_not_store";
export type WatchState = "candidate" | "active_passive" | "active_explicit" | "paused" | "completed" | "archived" | "dismissed";
export type Priority = "low" | "medium" | "high" | "critical" | "digest_only" | "silent";

export type PreferenceMemory = {
  id: string;
  userId: string;
  containerKey: string;
  scope: string;
  domain: string;
  category?: string;
  preferenceType: string;
  subject?: string;
  objectLabel?: string;
  summary: string;
  reason?: string;
  strength: Strength;
  confidence: number;
  traits: string[];
  constraints: Record<string, unknown>;
  examples: string[];
  sourceType: string;
  sourceReference?: string;
  permissionLevel: PermissionLevel;
  proactiveAllowed: boolean;
  createdByAgent?: string;
  lastUsedAt?: string;
  useCount: number;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type WatchItem = {
  id: string;
  userId: string;
  containerKey: string;
  scope: string;
  domain: string;
  category?: string;
  itemType: string;
  itemLabel: string;
  itemExternalId?: string;
  description?: string;
  importance: Strength;
  status: "active" | "paused" | "completed" | "archived" | "dismissed";
  watchState: WatchState;
  inferredFrom?: string;
  inferenceReason?: string;
  watchFor: string[];
  triggerRules: Record<string, unknown>;
  notificationStyle: string;
  notificationPriority: Priority;
  notificationFrequencyLimit: string;
  proactiveAllowed: boolean;
  confirmationRequired: boolean;
  userConfirmedAt?: string;
  relevanceScore: number;
  autoCreated: boolean;
  lastCheckedAt?: string;
  lastNotifiedAt?: string;
  source?: string;
  createdByAgent?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type UsageTrend = {
  id: string;
  userId: string;
  containerKey: string;
  scope: string;
  domain?: string;
  trendType: string;
  trendLabel: string;
  summary: string;
  evidence: UsageTrendEvidence[];
  frequencyCount: number;
  confidence: number;
  recommendation: Record<string, unknown>;
  status: "detected" | "suggested" | "accepted" | "dismissed" | "archived";
  createdByAgent?: string;
  firstDetectedAt: string;
  lastDetectedAt: string;
  acceptedAt?: string;
  dismissedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type ProactiveAlert = {
  id: string;
  userId: string;
  containerKey: string;
  scope: string;
  domain?: string;
  alertType: string;
  title: string;
  message: string;
  priority: Priority;
  sourceType?: string;
  sourceId?: string;
  reason?: string;
  actionSuggestions: Array<{ label: string; actionType: string; payload?: Record<string, unknown> }>;
  status: "pending" | "delivered" | "dismissed" | "acted_on" | "archived" | "suppressed";
  generatedByAgent?: string;
  scheduledFor?: string;
  deliveredAt?: string;
  dismissedAt?: string;
  actedOnAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type SavePreferenceMemoryInput = {
  userId: string;
  containerKey: string;
  scope: string;
  domain: string;
  category?: string;
  preferenceType: string;
  subject?: string;
  objectLabel?: string;
  summary: string;
  reason?: string;
  strength?: Strength;
  confidence?: number;
  traits?: string[];
  constraints?: Record<string, unknown>;
  examples?: string[];
  sourceType?: string;
  sourceReference?: string;
  permissionLevel?: PermissionLevel;
  proactiveAllowed?: boolean;
  createdByAgent?: string;
};

export type GetRelevantPreferencesInput = {
  userId: string;
  containerKey: string;
  scope?: string;
  domain?: string;
  category?: string;
  query?: string;
  includeGlobal?: boolean;
  limit?: number;
  markUsed?: boolean;
};

export type SaveWatchItemInput = {
  userId: string;
  containerKey: string;
  scope: string;
  domain: string;
  category?: string;
  itemType: string;
  itemLabel: string;
  itemExternalId?: string;
  description?: string;
  importance?: Strength;
  watchState?: WatchState;
  inferredFrom?: string;
  inferenceReason?: string;
  watchFor: string[];
  triggerRules?: Record<string, unknown>;
  notificationStyle?: string;
  notificationPriority?: Priority;
  notificationFrequencyLimit?: string;
  proactiveAllowed?: boolean;
  confirmationRequired?: boolean;
  relevanceScore?: number;
  autoCreated?: boolean;
  source?: string;
  createdByAgent?: string;
};

export type GetActiveWatchItemsInput = {
  userId: string;
  containerKey?: string;
  scope?: string;
  domain?: string;
  category?: string;
  importance?: string;
  watchState?: string;
  limit?: number;
};

export type InferPassiveWatchCandidatesInput = {
  userId: string;
  containerKey: string;
  scope: string;
  domain?: string;
  category?: string;
  promptSummary: string;
  extractedSignals: Array<{
    label: string;
    signalType: string;
    strength: Strength;
    confidence: number;
    reason: string;
  }>;
  createdByAgent?: string;
};

export type UsageTrendEvidence = {
  timestamp: string;
  promptSummary: string;
  outputType?: string;
  agent?: string;
  containerKey?: string;
};

export type DetectUsageTrendInput = {
  userId: string;
  containerKey: string;
  scope: string;
  domain?: string;
  trendType: string;
  trendLabel: string;
  summary: string;
  evidence: UsageTrendEvidence[];
  recommendation?: {
    recommendationType: string;
    name: string;
    reason: string;
    suggestedBehavior?: string;
  };
  createdByAgent?: string;
};

export type CreateProactiveAlertInput = {
  userId: string;
  containerKey: string;
  scope: string;
  domain?: string;
  alertType: string;
  title: string;
  message: string;
  priority?: Priority;
  sourceType?: string;
  sourceId?: string;
  reason?: string;
  actionSuggestions?: Array<{ label: string; actionType: string; payload?: Record<string, unknown> }>;
  generatedByAgent?: string;
  scheduledFor?: string;
};

export type PreferenceIntelligenceStore = {
  insertPreference(memory: PreferenceMemory): Promise<PreferenceMemory>;
  listPreferences(userId: string): Promise<PreferenceMemory[]>;
  updatePreference(id: string, patch: Partial<PreferenceMemory>): Promise<PreferenceMemory>;
  insertWatchItem(item: WatchItem): Promise<WatchItem>;
  listWatchItems(userId: string): Promise<WatchItem[]>;
  updateWatchItem(id: string, patch: Partial<WatchItem>): Promise<WatchItem>;
  insertUsageTrend(trend: UsageTrend): Promise<UsageTrend>;
  listUsageTrends(userId: string): Promise<UsageTrend[]>;
  updateUsageTrend(id: string, patch: Partial<UsageTrend>): Promise<UsageTrend>;
  insertProactiveAlert(alert: ProactiveAlert): Promise<ProactiveAlert>;
  listProactiveAlerts(userId: string): Promise<ProactiveAlert[]>;
};

export class InMemoryPreferenceIntelligenceStore implements PreferenceIntelligenceStore {
  private preferences: PreferenceMemory[] = [];
  private watches: WatchItem[] = [];
  private trends: UsageTrend[] = [];
  private alerts: ProactiveAlert[] = [];

  async insertPreference(memory: PreferenceMemory) {
    this.preferences.push(memory);
    return memory;
  }

  async listPreferences(userId: string) {
    return this.preferences.filter((item) => item.userId === userId);
  }

  async updatePreference(id: string, patch: Partial<PreferenceMemory>) {
    const current = this.preferences.find((item) => item.id === id);
    if (!current) throw new Error("Preference memory not found.");
    Object.assign(current, patch, { updatedAt: now() });
    return current;
  }

  async insertWatchItem(item: WatchItem) {
    this.watches.push(item);
    return item;
  }

  async listWatchItems(userId: string) {
    return this.watches.filter((item) => item.userId === userId);
  }

  async updateWatchItem(id: string, patch: Partial<WatchItem>) {
    const current = this.watches.find((item) => item.id === id);
    if (!current) throw new Error("Watch item not found.");
    Object.assign(current, patch, { updatedAt: now() });
    return current;
  }

  async insertUsageTrend(trend: UsageTrend) {
    this.trends.push(trend);
    return trend;
  }

  async listUsageTrends(userId: string) {
    return this.trends.filter((item) => item.userId === userId);
  }

  async updateUsageTrend(id: string, patch: Partial<UsageTrend>) {
    const current = this.trends.find((item) => item.id === id);
    if (!current) throw new Error("Usage trend not found.");
    Object.assign(current, patch, { updatedAt: now() });
    return current;
  }

  async insertProactiveAlert(alert: ProactiveAlert) {
    this.alerts.push(alert);
    return alert;
  }

  async listProactiveAlerts(userId: string) {
    return this.alerts.filter((item) => item.userId === userId);
  }
}

export function createPreferenceIntelligenceService(store: PreferenceIntelligenceStore) {
  return {
    async savePreferenceMemory(input: SavePreferenceMemoryInput): Promise<PreferenceMemory | null> {
      requireFields(input, ["userId", "containerKey", "scope", "domain", "preferenceType", "summary"]);
      const permissionLevel = input.permissionLevel ?? "approved_memory";
      if (permissionLevel === "do_not_store") return null;

      const stamp = now();
      return store.insertPreference({
        id: cryptoId(),
        userId: input.userId,
        containerKey: normalizeContainerKey(input.containerKey),
        scope: input.scope,
        domain: input.domain,
        category: input.category,
        preferenceType: input.preferenceType,
        subject: input.subject,
        objectLabel: input.objectLabel,
        summary: input.summary,
        reason: input.reason,
        strength: input.strength ?? "medium",
        confidence: clamp(input.confidence ?? 0.5),
        traits: input.traits ?? [],
        constraints: input.constraints ?? {},
        examples: input.examples ?? [],
        sourceType: input.sourceType ?? "user_approved",
        sourceReference: input.sourceReference,
        permissionLevel,
        proactiveAllowed: permissionLevel === "approved_proactive" || Boolean(input.proactiveAllowed),
        createdByAgent: input.createdByAgent,
        useCount: 0,
        createdAt: stamp,
        updatedAt: stamp
      });
    },

    async getRelevantPreferences(input: GetRelevantPreferencesInput): Promise<PreferenceMemory[]> {
      requireFields(input, ["userId", "containerKey"]);
      const containerKey = normalizeContainerKey(input.containerKey);
      const all = (await store.listPreferences(input.userId)).filter((item) => !item.archivedAt);
      const exact = all.filter((item) => item.containerKey === containerKey);
      const sameScopeDomain = all.filter(
        (item) =>
          item.containerKey !== containerKey &&
          item.scope !== "global" &&
          (!input.scope || item.scope === input.scope) &&
          (!input.domain || item.domain === input.domain)
      );
      const global = input.includeGlobal === false ? [] : all.filter((item) => item.scope === "global" || item.containerKey === "global");
      const scored = [...exact, ...sameScopeDomain, ...global]
        .filter((item, index, array) => array.findIndex((candidate) => candidate.id === item.id) === index)
        .filter((item) => matchesPreference(item, input))
        .sort((a, b) => preferenceRank(b, containerKey, input) - preferenceRank(a, containerKey, input))
        .slice(0, input.limit ?? 12);

      if (input.markUsed) {
        await Promise.all(scored.map((item) => store.updatePreference(item.id, { lastUsedAt: now(), useCount: item.useCount + 1 })));
      }

      return scored;
    },

    async archivePreferenceMemory(userId: string, memoryId: string): Promise<void> {
      const memory = (await store.listPreferences(userId)).find((item) => item.id === memoryId);
      if (!memory) throw new Error("Preference memory not found.");
      await store.updatePreference(memoryId, { archivedAt: now() });
    },

    async saveWatchItem(input: SaveWatchItemInput): Promise<WatchItem> {
      requireFields(input, ["userId", "containerKey", "scope", "domain", "itemType", "itemLabel"]);
      const containerKey = normalizeContainerKey(input.containerKey);
      const active = (await store.listWatchItems(input.userId)).find(
        (item) =>
          item.containerKey === containerKey &&
          item.itemType === input.itemType &&
          item.itemLabel.toLowerCase() === input.itemLabel.toLowerCase() &&
          item.status !== "archived" &&
          item.status !== "dismissed"
      );

      if (active) {
        return store.updateWatchItem(active.id, {
          watchFor: unique([...active.watchFor, ...(input.watchFor ?? [])]),
          triggerRules: { ...active.triggerRules, ...(input.triggerRules ?? {}) },
          relevanceScore: Math.max(active.relevanceScore, clamp(input.relevanceScore ?? active.relevanceScore)),
          watchState: promoteWatchState(active.watchState, input.watchState),
          proactiveAllowed: active.proactiveAllowed || Boolean(input.proactiveAllowed),
          confirmationRequired: active.confirmationRequired && input.confirmationRequired !== false
        });
      }

      const stamp = now();
      return store.insertWatchItem({
        id: cryptoId(),
        userId: input.userId,
        containerKey,
        scope: input.scope,
        domain: input.domain,
        category: input.category,
        itemType: input.itemType,
        itemLabel: input.itemLabel,
        itemExternalId: input.itemExternalId,
        description: input.description,
        importance: input.importance ?? "medium",
        status: "active",
        watchState: input.watchState ?? "candidate",
        inferredFrom: input.inferredFrom,
        inferenceReason: input.inferenceReason,
        watchFor: input.watchFor ?? [],
        triggerRules: input.triggerRules ?? {},
        notificationStyle: input.notificationStyle ?? "standard",
        notificationPriority: input.notificationPriority ?? "medium",
        notificationFrequencyLimit: input.notificationFrequencyLimit ?? "daily",
        proactiveAllowed: Boolean(input.proactiveAllowed),
        confirmationRequired: input.confirmationRequired ?? true,
        relevanceScore: clamp(input.relevanceScore ?? 0.5),
        autoCreated: Boolean(input.autoCreated),
        source: input.source,
        createdByAgent: input.createdByAgent,
        createdAt: stamp,
        updatedAt: stamp
      });
    },

    async getActiveWatchItems(input: GetActiveWatchItemsInput): Promise<WatchItem[]> {
      const items = (await store.listWatchItems(input.userId)).filter((item) => !item.archivedAt && item.status !== "archived");
      return items
        .filter((item) => !input.containerKey || item.containerKey === normalizeContainerKey(input.containerKey))
        .filter((item) => !input.scope || item.scope === input.scope)
        .filter((item) => !input.domain || item.domain === input.domain)
        .filter((item) => !input.category || item.category === input.category)
        .filter((item) => !input.importance || item.importance === input.importance)
        .filter((item) => !input.watchState || item.watchState === input.watchState)
        .slice(0, input.limit ?? 50);
    },

    async inferPassiveWatchCandidates(input: InferPassiveWatchCandidatesInput): Promise<WatchItem[]> {
      const created: WatchItem[] = [];
      for (const signal of input.extractedSignals) {
        const relevanceScore = scoreSignal(signal);
        if (relevanceScore < 0.4) continue;

        const watchState: WatchState = relevanceScore >= 0.8 && isBusinessOrProject(input.scope) ? "active_passive" : "candidate";
        created.push(
          await this.saveWatchItem({
            userId: input.userId,
            containerKey: input.containerKey,
            scope: input.scope,
            domain: input.domain ?? "general",
            category: input.category,
            itemType: signal.signalType,
            itemLabel: signal.label,
            importance: signal.strength,
            watchState,
            inferredFrom: inferSource(signal, input.scope),
            inferenceReason: signal.reason,
            description: input.promptSummary,
            watchFor: defaultWatchTriggers(signal.signalType),
            notificationPriority: signal.strength === "critical" ? "high" : "medium",
            proactiveAllowed: watchState === "active_passive",
            confirmationRequired: watchState !== "active_passive",
            relevanceScore,
            autoCreated: true,
            createdByAgent: input.createdByAgent
          })
        );
      }
      return created;
    },

    async detectUsageTrend(input: DetectUsageTrendInput): Promise<UsageTrend | null> {
      requireFields(input, ["userId", "containerKey", "scope", "trendType", "trendLabel", "summary"]);
      const containerKey = normalizeContainerKey(input.containerKey);
      const existing = (await store.listUsageTrends(input.userId)).find(
        (trend) =>
          trend.containerKey === containerKey &&
          trend.trendType === input.trendType &&
          trend.trendLabel.toLowerCase() === input.trendLabel.toLowerCase() &&
          trend.status !== "dismissed" &&
          trend.status !== "archived"
      );

      if (existing) {
        return store.updateUsageTrend(existing.id, {
          evidence: [...existing.evidence, ...input.evidence],
          frequencyCount: existing.frequencyCount + Math.max(1, input.evidence.length),
          confidence: clamp(Math.max(existing.confidence, 0.65 + existing.frequencyCount * 0.05)),
          recommendation: input.recommendation ?? existing.recommendation,
          status: existing.frequencyCount >= 2 ? "suggested" : existing.status,
          lastDetectedAt: now()
        });
      }

      if (input.evidence.length < 2) return null;
      const stamp = now();
      return store.insertUsageTrend({
        id: cryptoId(),
        userId: input.userId,
        containerKey,
        scope: input.scope,
        domain: input.domain,
        trendType: input.trendType,
        trendLabel: input.trendLabel,
        summary: input.summary,
        evidence: input.evidence,
        frequencyCount: input.evidence.length,
        confidence: clamp(0.62 + input.evidence.length * 0.05),
        recommendation: input.recommendation ?? {},
        status: input.evidence.length >= 3 ? "suggested" : "detected",
        createdByAgent: input.createdByAgent,
        firstDetectedAt: stamp,
        lastDetectedAt: stamp,
        createdAt: stamp,
        updatedAt: stamp
      });
    },

    async createProactiveAlert(input: CreateProactiveAlertInput): Promise<ProactiveAlert> {
      requireFields(input, ["userId", "containerKey", "scope", "alertType", "title", "message"]);
      const priority = input.priority ?? "medium";
      const status = priority === "low" || priority === "silent" ? "suppressed" : "pending";
      const stamp = now();
      return store.insertProactiveAlert({
        id: cryptoId(),
        userId: input.userId,
        containerKey: normalizeContainerKey(input.containerKey),
        scope: input.scope,
        domain: input.domain,
        alertType: input.alertType,
        title: input.title,
        message: input.message,
        priority,
        sourceType: input.sourceType,
        sourceId: input.sourceId,
        reason: input.reason,
        actionSuggestions: input.actionSuggestions ?? [],
        status,
        generatedByAgent: input.generatedByAgent,
        scheduledFor: input.scheduledFor,
        createdAt: stamp,
        updatedAt: stamp
      });
    }
  };
}

function normalizeContainerKey(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.+|\.+$/g, "");
}

function requireFields(input: Record<string, unknown>, fields: string[]) {
  for (const field of fields) {
    if (!input[field]) throw new Error(`Missing required field: ${field}`);
  }
}

function now() {
  return new Date().toISOString();
}

function cryptoId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function clamp(value: number) {
  return Math.max(0, Math.min(1, Number(value.toFixed(3))));
}

function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function matchesPreference(memory: PreferenceMemory, input: GetRelevantPreferencesInput) {
  if (input.category && memory.category && memory.category !== input.category) return false;
  if (!input.query) return true;
  const haystack = [memory.summary, memory.subject, memory.objectLabel, memory.reason, ...memory.traits].join(" ").toLowerCase();
  return input.query.toLowerCase().split(/\s+/).some((term) => haystack.includes(term));
}

function preferenceRank(memory: PreferenceMemory, containerKey: string, input: GetRelevantPreferencesInput) {
  const strength = { low: 1, medium: 2, high: 3, critical: 4 }[memory.strength];
  const container = memory.containerKey === containerKey ? 10 : 0;
  const scopeDomain = memory.scope === input.scope || memory.domain === input.domain ? 4 : 0;
  const global = memory.scope === "global" || memory.containerKey === "global" ? 1 : 0;
  return container + scopeDomain + global + strength + memory.confidence;
}

function promoteWatchState(current: WatchState, incoming?: WatchState): WatchState {
  const rank: WatchState[] = ["candidate", "active_passive", "active_explicit"];
  if (!incoming) return current;
  if (!rank.includes(current) || !rank.includes(incoming)) return incoming;
  return rank.indexOf(incoming) > rank.indexOf(current) ? incoming : current;
}

function scoreSignal(signal: InferPassiveWatchCandidatesInput["extractedSignals"][number]) {
  const strengthScore = { low: 0.2, medium: 0.45, high: 0.7, critical: 0.9 }[signal.strength];
  return clamp(strengthScore * 0.55 + signal.confidence * 0.45);
}

function isBusinessOrProject(scope: string) {
  return ["business", "project", "technical", "marketing", "sales", "finance"].includes(scope);
}

function inferSource(signal: InferPassiveWatchCandidatesInput["extractedSignals"][number], scope: string) {
  if (signal.signalType.includes("dependency")) return "active_project";
  if (signal.strength === "critical") return "business_risk";
  if (isBusinessOrProject(scope)) return "active_project";
  return "repeated_user_interest";
}

function defaultWatchTriggers(signalType: string) {
  if (signalType.includes("dependency") || signalType.includes("platform")) {
    return ["breaking_changes", "deprecations", "security_advisories", "pricing_changes", "new_relevant_features"];
  }
  if (signalType.includes("deadline") || signalType.includes("renewal")) {
    return ["deadline_change", "upcoming_due_date", "renewal_window", "required_action"];
  }
  return ["meaningful_updates", "major_risk", "clear_opportunity", "required_user_action"];
}
