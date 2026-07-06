import type { ZionRoutingPayload } from "./routingTypes";

type RouterInput = {
  rawInput: string;
  inputMode: "voice" | "text";
};

const includesAny = (text: string, terms: string[]) =>
  terms.some((term) => {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`, "i").test(text);
  });

export function mockOracleRouter(input: RouterInput): ZionRoutingPayload {
  const normalizedInput = input.rawInput.trim().toLowerCase();
  const base = {
    rawInput: input.rawInput,
    normalizedInput,
    inputMode: input.inputMode,
    shouldStoreMemory: false
  } as const;

  if (includesAny(normalizedInput, ["hello", "hi", "hey", "good morning"])) {
    return {
      ...base,
      scope: "mixed",
      container: "General",
      privacyLevel: "L1_NORMAL",
      agent: "Oracle",
      skill: "Greeting",
      confidence: 0.98,
      responseText: "Hello Garret. Zion is online. Oracle is ready to route your command."
    };
  }

  if (includesAny(normalizedInput, ["redstone", "client", "ticket", "server", "firewall", "backup", "microsoft", "msp"])) {
    return {
      ...base,
      scope: "work",
      container: "Redstone",
      privacyLevel: "L2_SENSITIVE",
      agent: "Trinity",
      skill: "Work Routing",
      confidence: 0.9,
      responseText: "I detected this as Redstone work. I would route this through Trinity with privacy controls enabled."
    };
  }

  if (includesAny(normalizedInput, ["synergy", "course", "training", "student", "certification", "enrollment"])) {
    return {
      ...base,
      scope: "work",
      container: "Synergy",
      privacyLevel: "L2_SENSITIVE",
      agent: "Morpheus",
      skill: "Training Business",
      confidence: 0.9,
      responseText: "I detected this as Synergy work. I would route this through Morpheus for training business support."
    };
  }

  if (includesAny(normalizedInput, ["sara", "eli", "samantha", "family", "parenting", "school", "daughter"])) {
    return {
      ...base,
      scope: "personal",
      container: "Family/Parenting",
      privacyLevel: "L3_PRIVATE",
      agent: "Switch",
      skill: "Family Context",
      confidence: 0.88,
      responseText: "I detected this as personal family context. I would keep this isolated from work containers."
    };
  }

  if (includesAny(normalizedInput, ["calendar", "schedule", "meeting", "appointment", "today", "tomorrow"])) {
    return {
      ...base,
      scope: "mixed",
      container: "Calendar/Availability",
      privacyLevel: "L1_NORMAL",
      agent: "Tank",
      skill: "Scheduling",
      confidence: 0.86,
      responseText: "I detected a scheduling request. I would route this to the calendar and availability workflow."
    };
  }

  return {
    ...base,
    scope: "mixed",
    container: "Productivity",
    privacyLevel: "L1_NORMAL",
    agent: "Oracle",
    skill: "General Command",
    confidence: 0.72,
    responseText: "I captured that. Oracle would clarify the scope, container, and next best action before proceeding."
  };
}
