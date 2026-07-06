import assert from "node:assert/strict";
import test from "node:test";
import { mockOracleRouter } from "./mockOracleRouter.ts";

test("routes hello voice input to Oracle greeting", () => {
  const payload = mockOracleRouter({ rawInput: "Hello Zion", inputMode: "voice" });

  assert.equal(payload.scope, "mixed");
  assert.equal(payload.container, "General");
  assert.equal(payload.agent, "Oracle");
  assert.equal(payload.skill, "Greeting");
  assert.equal(payload.shouldStoreMemory, false);
  assert.match(payload.responseText, /Zion is online/);
});

test("routes Redstone work terms to work container", () => {
  const payload = mockOracleRouter({ rawInput: "Check the Redstone server backup ticket", inputMode: "voice" });

  assert.equal(payload.scope, "work");
  assert.equal(payload.container, "Redstone");
  assert.equal(payload.privacyLevel, "L2_SENSITIVE");
});

test("routes family terms to private personal container", () => {
  const payload = mockOracleRouter({ rawInput: "Schedule something for Eli and Samantha", inputMode: "voice" });

  assert.equal(payload.scope, "personal");
  assert.equal(payload.container, "Family/Parenting");
  assert.equal(payload.privacyLevel, "L3_PRIVATE");
});
