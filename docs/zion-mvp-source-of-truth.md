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

## Core Layers

1. Scope Layer
2. Container Layer
3. Privacy / Vault Layer
4. Agent / Personality Layer
5. Skill Layer
6. Knowledge Steward Layer
7. Evolution Engine

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
   - Speak placeholder
   - Send button
   - Footer intelligence strip
   - Context bar: Scope / Container / Agent / Skill / Privacy

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
