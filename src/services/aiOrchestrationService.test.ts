import assert from "node:assert/strict";
import test from "node:test";
import {
  classifyOracleTask,
  createDevelopmentRequest,
  createProviderUsageLog,
  defaultAiProviders,
  defaultAiSettings
} from "./aiOrchestrationService.ts";

test("routes routine chat to fast chat", () => {
  const classification = classifyOracleTask("What should I focus on today?", defaultAiSettings);

  assert.equal(classification.intent, "general_chat");
  assert.equal(classification.preferredProvider, "openai_fast_chat");
  assert.equal(classification.executionMode, "answer_now");
  assert.equal(classification.approvalRequired, false);
});

test("routes app improvement to Operator and requires approval", () => {
  const classification = classifyOracleTask("Improve this app dashboard and have Codex build it.", defaultAiSettings);

  assert.equal(classification.intent, "app_improvement");
  assert.equal(classification.preferredAgent, "Operator");
  assert.equal(classification.preferredProvider, "openai_codex_operator");
  assert.equal(classification.executionMode, "development_request");
  assert.equal(classification.riskLevel, 5);
  assert.equal(classification.approvalRequired, true);
});

test("creates a development request with safe defaults", () => {
  const request = createDevelopmentRequest({
    userId: "user-1",
    originalUserInput: "Fix the watchlist layout in the dashboard.",
    source: "voice"
  });

  assert.equal(request.assignedAgent, "Operator");
  assert.equal(request.recommendedProvider, "Codex");
  assert.equal(request.requiresApproval, true);
  assert.equal(request.productionWriteAllowed, false);
  assert.match(request.githubIssueBody, /Do not auto-merge/);
  assert.match(request.codexPrompt, /Do not rebuild the app/);
});

test("marks provider usage as approval required for gated work", () => {
  const classification = classifyOracleTask("Create a pull request for this app improvement.", defaultAiSettings);
  const provider = defaultAiProviders.find((item) => item.providerId === classification.preferredProvider);

  assert.ok(provider);
  const log = createProviderUsageLog({ userId: "user-1", classification, provider });

  assert.equal(log.status, "approval_required");
  assert.equal(log.riskLevel, 5);
});
