export type ScopeType = "work" | "personal" | "mixed";

export type PrivacyLevel = "L1_NORMAL" | "L2_SENSITIVE" | "L3_PRIVATE";

export type AgentName = "Oracle" | "Trinity" | "Morpheus" | "Cypher" | "Switch" | "Sparks" | "Architect" | "Tank";

export type ZionRoutingPayload = {
  rawInput: string;
  normalizedInput: string;
  inputMode: "voice" | "text";
  scope: ScopeType;
  container: string;
  privacyLevel: PrivacyLevel;
  agent: AgentName;
  skill: string;
  confidence: number;
  shouldStoreMemory: boolean;
  responseText: string;
};
