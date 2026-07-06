# Project Zion

Zion is a private AI command center for Garret that routes messy input into the right scope, container, privacy level, agent, skill, and storage location.

The current MVP source of truth is [docs/zion-mvp-source-of-truth.md](docs/zion-mvp-source-of-truth.md). That revised plan supersedes earlier Zion planning notes for this build.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Current Foundation

- Next.js App Router
- TypeScript
- Tailwind CSS
- Command-first MVP shell
- Mock Oracle routing by scope/container/privacy/agent/skill
- Dashboard, Knowledge, Vault, and Settings tabs
- Revised Work / Personal / Mixed scope model
- Vault-first privacy guardrails

## Near-Term MVP

1. Core Command orb workflow
2. Routing engine stub
3. Dashboard tab
4. Knowledge inbox and tags
5. Vault locked-state workflow
6. Seeded agents and skills
7. Usage events and routing corrections
8. Phase 1A connector placeholders
