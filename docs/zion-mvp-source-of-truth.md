# Zion MVP Source Of Truth

This document supersedes earlier Zion planning notes for the current MVP build.

## Product Definition

Zion is a private AI command center for Garret that routes messy input into the right scope, container, privacy level, agent, skill, and storage location.

The MVP spine is:

```text
Capture -> Route -> Protect -> Execute -> Store -> Dashboard -> Learn -> Improve
```

## Locked Decisions

- Build target: Bolt.new-compatible web app.
- User base: Garret only for MVP.
- Startup view: Command orb screen.
- Dashboard: one-click tab from Command.
- Core success priority: routing accuracy by scope, container, mode, agent, and skill.
- Memory behavior: auto-save non-sensitive patterns; sensitive/vault material requires stronger controls.
- Vault behavior: auto-detect sensitive topics and ask what to do.
- Agent visibility: lightly visible context bar; Oracle routes quietly by default.
- Phase 1A integrations: file upload, calendar bridge, web research placeholders.
- Phase 1B placeholders: Gmail/Outlook, Drive/OneDrive, image generation/editing, GitHub.
- Finance connector: later, not Phase 1.
- AI model strategy: default routine chat to the cheapest fast OpenAI API chat model; escalate only when task complexity, risk, context length, coding, multimodal needs, or explicit user instruction requires it.
- Codex role: Codex is the Operator/build agent for GitHub, code, and app self-improvement workflows, not the default conversational brain.
- Voice MVP path: start with a browser-native inline command-panel proof of life before OpenAI Realtime, WebRTC, streaming audio, or backend voice APIs.

## Core Layers

1. Scope Layer
2. Container Layer
3. Privacy / Vault Layer
4. Agent / Personality Layer
5. Skill Layer
6. Knowledge Steward Layer
7. Evolution Engine
8. Global Preference Intelligence
9. Cost-Aware AI Orchestration
10. Operator / GitHub Self-Improvement
11. Browser Voice Modal

## Global Preference Intelligence

Internal module name: `preference_intelligence`.

Global Preference Intelligence is a shared layer for Oracle and all relevant agents. It learns reusable preferences, recurring patterns, active project dependencies, repeated corrections, and high-value context signals while preserving strict container boundaries.

It includes three connected capabilities:

- Preference Memory: approved preferences, constraints, output styles, corrections, and reusable context saved to the right container.
- Passive Watch Intelligence: automatically inferred watch candidates for dependencies, vendors, deadlines, lifecycle risks, security advisories, pricing changes, campaign milestones, and recurring workflows.
- Usage Trend Learning: repeated usage patterns that can recommend new agents, skills, buckets, rules, automations, templates, QA checklists, or dashboard widgets.

Default behavior:

- Internal passive watch candidates may be created silently when a signal is useful.
- Proactive alerts are permission-gated and low-noise.
- Person-specific, health, financial, client-sensitive, relationship, or other private details require explicit approval before memory or proactive use.
- Global preferences are only used when they clearly apply across contexts.
- Redstone, Synergy, personal, family, and app-project context must not mix unless explicitly connected.
- Dismissed candidates and dismissed trend recommendations should not repeatedly resurface.

Backend foundation:

- `preference_memories`
- `watch_items`
- `usage_trends`
- `proactive_alerts`

Service foundation:

- `src/services/preferenceIntelligenceService.ts`
- SQL migration: `db/migrations/001_preference_intelligence.sql`

## Cost-Aware AI Orchestration

Oracle is a provider-agnostic routing and governance layer, not a single model.

Default rule:

- Normal back-and-forth chat uses the cheapest fast OpenAI API chat model.
- Stronger models are used only through escalation rules.
- Codex is used only for coding, GitHub, repo review, bug fixes, tests, UI implementation, PRs, and self-improvement.
- Claude and Gemini remain optional specialist providers for long-document, multimodal, Google Workspace, image/video/document, and advanced synthesis workflows.

Initial provider tiers:

- `openai_fast_chat`: routine chat, quick answers, reminders, dashboard Q&A, memory capture, simple planning, short summaries.
- `openai_smart_chat`: important writing, business planning, structured analysis, complex reasoning.
- `openai_codex_operator`: app improvement, bug fixes, repo review, tests, GitHub issue/branch/PR workflows.
- `claude_long_document`: planned long-document and nuanced writing specialist.
- `gemini_multimodal`: planned multimodal, Google Workspace, image/video/document specialist.

Oracle classification must include:

- original user input
- normalized task
- intent
- container/project
- sensitivity
- risk level
- required capabilities
- preferred agent
- preferred provider
- approval required
- estimated cost tier
- execution mode
- model selection reason

Cost controls:

- Prefer the fast model by default.
- Ask before high-cost model use.
- Track estimated and actual token usage when available.
- Track estimated and actual provider cost when available.
- Store provider, model, agent, intent, risk level, status, and selection reason for auditability.
- Summarize long history before expensive model calls.
- Do not send full memory or unrelated project data to specialist providers.
- Let the user set monthly provider budgets and warning thresholds.

Risk levels:

- Level 0: read-only answer.
- Level 1: draft-only output.
- Level 2: personal workflow update.
- Level 3: external action.
- Level 4: business/client data modification.
- Level 5: code, infrastructure, deployment, or database change.
- Level 6: destructive or security-sensitive action.

Approval rules:

- Level 0: no approval.
- Level 1: user review recommended.
- Level 2: confirmation optional based on setting.
- Level 3: explicit approval required.
- Level 4: explicit approval and audit required.
- Level 5: staging/preview and explicit approval required.
- Level 6: multi-step confirmation required.

Service foundation:

- `src/services/aiOrchestrationService.ts`
- SQL migration: `db/migrations/002_ai_orchestration_self_improvement.sql`

## Operator / GitHub Self-Improvement

App improvement requests captured through voice or text become structured development requests routed to Operator/Codex.

Flow:

```text
Voice/Text Request -> Oracle classification -> Development Request -> GitHub Issue -> Operator Codex Prompt -> Branch/PR -> Preview -> Sentinel Review -> User Approval -> Merge/Deploy
```

MVP safety policy:

- Voice commands may create development requests, copy-ready Codex prompts, GitHub issues, branches, pull requests, and preview builds when configured.
- Voice commands may not directly merge to main, deploy to production, modify production data, delete files, alter authentication, change billing, or change security rules without explicit approval.
- Auto-merge is disabled.
- Production deployment is disabled.
- Production data changes are disabled.
- Sentinel review is required for level 5 work.

Development request records track:

- title
- original user input
- normalized request
- source
- target area
- priority
- status
- assigned agent
- recommended provider
- approval requirement
- production write permission
- acceptance criteria
- constraints
- GitHub issue URL
- branch name
- PR URL
- preview URL
- Sentinel review status
- GitHub issue body
- Codex prompt

## Browser Voice Command Panel

First milestone goal:

```text
Voice input -> transcript -> mock Oracle route -> spoken response
```

MVP choices:

- Speech-to-text: browser `SpeechRecognition` / `webkitSpeechRecognition`.
- Text-to-speech: browser `speechSynthesis`.
- AI response: local mock response.
- Routing payload: lightweight local `ZionRoutingPayload`.
- Voice UI: inline `Speak to Zion` panel inside the Command screen.
- Backend: none for this milestone.

Do not add OpenAI Realtime, WebRTC, streaming audio, Codex integration, Claude, Gemini, or backend APIs in this milestone.

Voice user flow:

1. User clicks Speak from Command.
2. The inline `Speak to Zion` panel starts listening in place.
3. User can also click Start listening in the right-side panel.
4. User says "Hello Zion".
5. Browser transcribes speech.
6. Mock Oracle router classifies scope, container, privacy, agent, skill, confidence, and response text.
7. The right-side panel displays transcript and routing payload.
8. Browser speaks the response aloud.
9. The bottom Routing Payload tile displays the latest voice route.

Interaction rule:

- Voice interactions must stay in the main Command area.
- Do not force the user to scroll to find Start listening, transcript, routing details, or response text.

Voice implementation files:

- `src/components/voice/VoiceCommandPanel.tsx`
- `src/components/voice/VoiceButton.tsx`
- `src/hooks/useSpeechRecognition.ts`
- `src/hooks/useSpeechSynthesis.ts`
- `src/lib/oracle/mockOracleRouter.ts`
- `src/lib/oracle/routingTypes.ts`

Next milestone after proof of life:

```text
Replace mockOracleRouter with /api/oracle/route while keeping the voice UI stable.
```

## Scopes

- Work
- Personal
- Mixed / Bridge

Mixed mode is filtered interoperability, not unrestricted blending.

## Containers

Work:
- Redstone
- Synergy
- Product Lab
- Finance/Admin
- Marketing/Creative
- Training/Education
- General Work

Personal:
- General Personal
- Family/Parenting
- Romantic Relationships
- Mental Health/Reflection
- Health/Medical
- Immigration
- Personal Finance
- Recipes/Life Admin
- Private Vault

Mixed / Bridge:
- Calendar/Availability
- Work-life Planning
- Personal Productivity
- Future Planning
- Identity Profile
- Legacy/Proxy Preparation
- Capacity/Load Management

## Privacy Levels

- L1 Normal
- L2 Private
- L3 Sensitive
- L4 Vault
- L5 Never Share

Most restrictive tag wins.

Vault-tagged items are self-only, require explicit unlock, are excluded from Work contexts, excluded from Proxy/Legacy, excluded from cross-container use, and access-logged.

Vault content includes romantic relationships, mental health, therapy/coaching notes, crisis reflections, medical-adjacent private details, highly private personal details, and any manually tagged vault item.

## Protected Tags

`vault`, `never-share`, `sanitized-only`, `self-only`, `not-legacy`, `legacy-candidate`, `legacy-ok`, `proxy-ok`, `confidential`, `sensitive`, `redstone-only`, `synergy-only`, `personal-only`, `work-only`, `availability-only`, `bridge-ok`, `cypher-review`, `open-decision`, `waiting-on`, `template-candidate`.

## Agents

- Oracle: router
- Trinity: LifeOS
- Morpheus: business strategy
- Cypher: devil's advocate
- Switch: communications
- Sparks: creative studio
- Architect: product systems
- Tank: technical ops
- Link: Redstone ops
- Sati: training and learning
- Mouse: research
- Dozer: data and finance
- Seraph: security and privacy
- Keymaker: skills and integrations

Agents do not override privacy.

## Skills

- Writing/Rewriting
- Creative Production
- Research
- Technical Support
- Data Analysis
- Finance Review
- Personal Coaching
- Business Advisory
- Training Design
- Life Admin
- Knowledge Stewardship
- Skill Discovery

## MVP Screens

1. Command
   - Orb-first landing
   - Main command input
   - Speak button starts the browser-native inline voice panel
   - Send button
   - Footer intelligence strip
   - Context bar: Scope / Container / Agent / Skill / Privacy
   - Layout: Command / Oracle occupies the left 2/3, Speak to Zion transcript/details occupies the right 1/3.
   - Scope Containers, Routing Payload, and Agent Context are equal bottom tiles.
   - Main input orb uses the supplied blue/purple vortex orb artwork as the visual direction.

2. Dashboard
   - Today Brief
   - Calendar / Availability
   - Priority Stack
   - Waiting On
   - Open Decisions
   - Cypher Watch
   - Knowledge Inbox
   - Creative Queue
   - Technical / Research Queue
   - Skill Gaps / Evolution Suggestions
   - Intelligence tabs: Preferences, Watchlist, Usage Trends
   - Vault status

3. Knowledge
   - Knowledge Inbox
   - Stored knowledge items
   - Tags
   - Containers
   - Search/filter
   - Save as Task / Idea / Decision / Reference / Template / Vault Item

4. Vault
   - Locked by default
   - Counts/status only until unlocked
   - Explicit unlock
   - Access logging

5. Settings
   - Agents
   - Skills
   - Integrations
   - Memory rules
   - Privacy rules
   - Evolution Engine settings
   - AI Settings: provider settings, cost settings, safety settings, GitHub settings

6. Operator Build Queue
   - Development requests
   - GitHub issue status
   - Codex prompt status
   - PR/preview status
   - approval state
   - Sentinel review status

## Phase 1A Build Focus

Prove that Zion can route, store, summarize, dashboard, and protect work correctly before deep integrations dominate the build.

## MVP Test Examples

- "Rewrite this for Redstone" -> Work / Redstone / Switch / Writing
- "Help me reply to this relationship text" -> Personal / Romantic Relationships / Trinity + Switch / Vault prompt
- "Create a tech sprint for SVR-SFTP" -> Work / Redstone or Product Lab / Tank / Technical Support
- "Research immigration pathways" -> Personal / Immigration / Mouse / Sensitive
- "Create a Synergy flyer" -> Work / Synergy or Marketing / Sparks / Creative Production
- "Analyze this CSV" -> Work or Mixed / Dozer / Data Analysis
- "Challenge this business idea" -> Work or Product Lab / Morpheus + Cypher
- "Brain dump mode" -> Unknown until parsed / Knowledge Stewardship
- "Can I schedule this Thursday?" -> Mixed / Calendar bridge / availability-only
