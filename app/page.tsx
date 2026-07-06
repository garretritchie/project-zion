"use client";

import Image from "next/image";
import { useMemo, useRef, useState, type RefObject } from "react";
import {
  AlertTriangle,
  Archive,
  Brain,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Code2,
  Command,
  Database,
  DollarSign,
  FileText,
  Fingerprint,
  FolderKanban,
  Gauge,
  GitPullRequest,
  GitBranch,
  Inbox,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  MousePointer2,
  PenLine,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Tags,
  Upload,
  UserRoundCog,
  Vault,
  X,
  Zap
} from "lucide-react";
import { VoiceButton } from "@/src/components/voice/VoiceButton";
import { VoiceCommandPanel, type VoiceCommandPanelHandle } from "@/src/components/voice/VoiceCommandPanel";
import type { ZionRoutingPayload } from "@/src/lib/oracle/routingTypes";

type Tab = "Command" | "Dashboard" | "Knowledge" | "Operator" | "Vault" | "Settings";
type Scope = "All" | "Work" | "Personal" | "Mixed";
type IntelligenceTab = "Preferences" | "Watchlist" | "Usage Trends";
type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
};

const tabs: Array<{ name: Tab; icon: typeof Command }> = [
  { name: "Command", icon: Command },
  { name: "Dashboard", icon: Gauge },
  { name: "Knowledge", icon: Database },
  { name: "Operator", icon: Code2 },
  { name: "Vault", icon: Vault },
  { name: "Settings", icon: Settings }
];

const scopes: Scope[] = ["All", "Work", "Personal", "Mixed"];

const agents = [
  { name: "Oracle", role: "Router", type: "Command Core" },
  { name: "Trinity", role: "LifeOS", type: "Advisory" },
  { name: "Morpheus", role: "Business Strategy", type: "Advisory" },
  { name: "Cypher", role: "Devil's Advocate", type: "Advisory" },
  { name: "Switch", role: "Communications", type: "Execution" },
  { name: "Sparks", role: "Creative Studio", type: "Execution" },
  { name: "Architect", role: "Product Systems", type: "Execution" },
  { name: "Tank", role: "Technical Ops", type: "Execution" },
  { name: "Link", role: "Redstone Ops", type: "Execution" },
  { name: "Sati", role: "Training & Learning", type: "Execution" },
  { name: "Mouse", role: "Research", type: "Execution" },
  { name: "Dozer", role: "Data & Finance", type: "Execution" },
  { name: "Seraph", role: "Security & Privacy", type: "Governance" },
  { name: "Keymaker", role: "Skills & Integrations", type: "Governance" }
];

const skills = [
  "Writing/Rewriting",
  "Creative Production",
  "Research",
  "Technical Support",
  "Data Analysis",
  "Finance Review",
  "Personal Coaching",
  "Business Advisory",
  "Training Design",
  "Life Admin",
  "Knowledge Stewardship",
  "Skill Discovery"
];

const containers = {
  Work: ["Redstone", "Synergy", "Product Lab", "Finance/Admin", "Marketing/Creative", "Training/Education", "General Work"],
  Personal: [
    "General Personal",
    "Family/Parenting",
    "Romantic Relationships",
    "Mental Health/Reflection",
    "Health/Medical",
    "Immigration",
    "Personal Finance",
    "Recipes/Life Admin",
    "Private Vault"
  ],
  Mixed: ["Calendar/Availability", "Work-life Planning", "Personal Productivity", "Future Planning", "Identity Profile", "Legacy/Proxy Preparation", "Capacity/Load Management"]
};

const protectedTags = ["vault", "never-share", "sanitized-only", "self-only", "confidential", "bridge-ok", "cypher-review", "waiting-on", "open-decision"];

const dashboardCards = [
  { title: "Today Brief", detail: "3 priority actions, 2 protected notes abstracted", icon: Sparkles, status: "Curated" },
  { title: "Calendar / Availability", detail: "Mixed bridge: 2 open focus blocks after 1:30 PM", icon: CalendarDays, status: "Bridge" },
  { title: "Priority Stack", detail: "REDSTONE MSP schema review is ranked first", icon: Zap, status: "Next" },
  { title: "Waiting On", detail: "Synergy outline, PEB copy, GitHub deploy check", icon: CircleDot, status: "3" },
  { title: "Open Decisions", detail: "Auth provider, storage adapter, Vault unlock UX", icon: CheckCircle2, status: "Review" },
  { title: "Cypher Watch", detail: "Scope creep risk: integrations before routing proof", icon: AlertTriangle, status: "Watch" },
  { title: "Knowledge Inbox", detail: "5 items need tags or storage destination", icon: Inbox, status: "5" },
  { title: "Skill Gaps", detail: "Calendar bridge and file extraction need connectors", icon: GitBranch, status: "2 gaps" }
];

const preferenceMemories = [
  {
    summary: "Use self-contained Codex-ready implementation updates for AI Assistant v2 build-plan changes.",
    container: "project.ai_assistant_v2",
    scope: "project",
    domain: "product_development",
    category: "implementation_format",
    type: "explicit_preference",
    strength: "high",
    confidence: "95%",
    proactive: true,
    lastUsed: "Today",
    useCount: 8,
    created: "2026-07-06"
  },
  {
    summary: "Keep Redstone, Synergy, personal, family, and app-project context separated unless explicitly connected.",
    container: "global",
    scope: "global",
    domain: "privacy",
    category: "context_boundary",
    type: "constraint",
    strength: "critical",
    confidence: "98%",
    proactive: true,
    lastUsed: "Today",
    useCount: 14,
    created: "2026-07-06"
  },
  {
    summary: "Format Redstone infrastructure work as technician-facing sprints with commands, validation, rollback, risks, and completion criteria.",
    container: "business.redstone",
    scope: "business",
    domain: "technical_operations",
    category: "team_execution",
    type: "usage_pattern",
    strength: "high",
    confidence: "90%",
    proactive: true,
    lastUsed: "Yesterday",
    useCount: 5,
    created: "2026-07-06"
  }
];

const watchItems = [
  {
    item: "AI Assistant v2 database layer",
    container: "project.ai_assistant_v2",
    domain: "product_development",
    category: "platform_dependency",
    importance: "high",
    state: "active_passive",
    status: "active",
    watchFor: ["breaking changes", "security advisories", "pricing changes", "new relevant features"],
    priority: "high",
    score: "0.86",
    why: "Core project dependency with future compatibility risk.",
    signals: "active project, implementation dependency",
    proactive: true,
    lastChecked: "Not connected",
    lastNotified: "Never"
  },
  {
    item: "Codex-ready implementation pattern",
    container: "project.ai_assistant_v2",
    domain: "product_development",
    category: "output_format",
    importance: "high",
    state: "active_explicit",
    status: "active",
    watchFor: ["repeated usage", "new rule opportunity", "template improvement"],
    priority: "digest_only",
    score: "0.91",
    why: "User repeatedly ports planning output into Codex.",
    signals: "explicit preference, repeated usage",
    proactive: true,
    lastChecked: "Today",
    lastNotified: "Never"
  },
  {
    item: "Synergy campaign pack workflow",
    container: "business.synergy",
    domain: "marketing",
    category: "campaign_production",
    importance: "medium",
    state: "candidate",
    status: "active",
    watchFor: ["course promotion", "campaign timing", "new skill opportunity"],
    priority: "medium",
    score: "0.58",
    why: "Potential reusable marketing workflow.",
    signals: "workflow repetition candidate",
    proactive: false,
    lastChecked: "Not connected",
    lastNotified: "Never"
  }
];

const usageTrends = [
  {
    trend: "Codex-ready implementation sections",
    container: "project.ai_assistant_v2",
    domain: "product_development",
    frequency: 7,
    confidence: "92%",
    recommendation: "Make Codex-ready sections the default format for this project.",
    status: "suggested",
    lastDetected: "Today"
  },
  {
    trend: "Technician-facing Redstone sprint plans",
    container: "business.redstone",
    domain: "technical_operations",
    frequency: 5,
    confidence: "88%",
    recommendation: "Create a Redstone technician sprint template.",
    status: "detected",
    lastDetected: "Yesterday"
  },
  {
    trend: "Strict context boundaries",
    container: "global",
    domain: "privacy",
    frequency: 9,
    confidence: "96%",
    recommendation: "Create a default rule blocking cross-container memory retrieval.",
    status: "accepted",
    lastDetected: "Today"
  }
];

const aiProviders = [
  {
    name: "OpenAI Fast Chat",
    provider: "openai",
    model: "gpt-5.4-nano",
    fallback: "gpt-5.4-mini",
    tier: "low",
    status: "Enabled",
    role: "Routine chat, dashboard Q&A, memory capture, reminders, short summaries"
  },
  {
    name: "OpenAI Smart Chat",
    provider: "openai",
    model: "gpt-5.4-mini",
    fallback: "gpt-5.4",
    tier: "medium",
    status: "Enabled",
    role: "Business writing, planning, structured analysis, complex reasoning"
  },
  {
    name: "OpenAI Codex / Operator",
    provider: "openai_codex",
    model: "gpt-5.3-codex",
    fallback: "Smart Chat",
    tier: "high",
    status: "Configured gate",
    role: "Code, GitHub, repo review, tests, app improvement, PR workflows"
  },
  {
    name: "Claude Long Document",
    provider: "anthropic",
    model: "claude-haiku-4.5",
    fallback: "Smart Chat",
    tier: "medium",
    status: "Disabled",
    role: "Planned long-document review and nuanced writing specialist"
  },
  {
    name: "Gemini Multimodal",
    provider: "google_gemini",
    model: "gemini-flash-lite",
    fallback: "Smart Chat",
    tier: "medium",
    status: "Disabled",
    role: "Planned multimodal, Google Workspace, image, video, document workflows"
  }
];

const routingPolicies = [
  { intent: "general_chat", agent: "Zion", provider: "OpenAI Fast Chat", risk: "L0", mode: "answer_now", approval: "No" },
  { intent: "business_analysis", agent: "Analyst", provider: "OpenAI Smart Chat", risk: "L2", mode: "draft_only", approval: "No" },
  { intent: "document_review", agent: "Scout", provider: "Claude or Smart fallback", risk: "L2", mode: "approval_required", approval: "High-cost gate" },
  { intent: "multimodal_analysis", agent: "Scout", provider: "Gemini or Smart fallback", risk: "L2", mode: "approval_required", approval: "High-cost gate" },
  { intent: "app_improvement", agent: "Operator", provider: "Codex", risk: "L5", mode: "development_request", approval: "Required" },
  { intent: "security_review", agent: "Sentinel", provider: "Smart Chat", risk: "L6", mode: "approval_required", approval: "Multi-step" }
];

const developmentRequests = [
  {
    title: "Show active watch items more clearly",
    original: "Oracle, the dashboard should show my active watch items more clearly.",
    normalized: "Improve the Dashboard Intelligence watchlist so active watch items are easier to scan.",
    source: "voice",
    target: "Dashboard / Intelligence",
    priority: "medium",
    status: "ready_for_github",
    github: "Copy-ready issue",
    codex: "Prompt ready",
    pr: "Not started",
    approval: "Required",
    sentinel: "Not requested"
  },
  {
    title: "Add AI provider routing controls",
    original: "Add model routing and cost controls to the MVP.",
    normalized: "Add AI Settings controls for provider tiers, cost gates, risk levels, and GitHub/Codex workflow safety.",
    source: "text",
    target: "AI Settings",
    priority: "high",
    status: "captured",
    github: "Not connected",
    codex: "Prompt available",
    pr: "Not started",
    approval: "Required",
    sentinel: "Required before merge"
  }
];

const aiCostSettings = [
  ["Prefer cheapest model by default", "Enabled"],
  ["Ask before high-cost model", "Enabled"],
  ["Monthly AI budget", "$100 configurable"],
  ["Warning threshold", "80%"],
  ["Log token usage", "Enabled"],
  ["Show cost estimates", "Enabled"],
  ["Disable premium without approval", "Enabled"]
];

const aiSafetySettings = [
  ["Require approval above risk level", "Level 2"],
  ["Allow voice-created development requests", "Enabled"],
  ["Allow automatic GitHub issue creation", "Only when configured"],
  ["Allow automatic branch creation", "Disabled"],
  ["Allow automatic PR creation", "Disabled"],
  ["Allow automatic merge", "Disabled"],
  ["Allow production deployment", "Disabled"],
  ["Allow production data changes", "Disabled"],
  ["Require Sentinel review for Level 5", "Enabled"]
];

const knowledgeItems = [
  { title: "Zion MVP opens to Command orb", type: "decision", scope: "Mixed", privacy: "L1 Normal", tags: ["dashboard", "command"] },
  { title: "Vault items require explicit unlock", type: "privacy rule", scope: "Personal", privacy: "L4 Vault", tags: ["vault", "self-only"] },
  { title: "Mixed mode uses availability only", type: "bridge rule", scope: "Mixed", privacy: "L3 Sensitive", tags: ["bridge-ok", "availability-only"] },
  { title: "Route Redstone writing through Switch", type: "routing test", scope: "Work", privacy: "L1 Normal", tags: ["redstone-only", "template-candidate"] }
];

const integrations = [
  { name: "File upload", phase: "1A", status: "Foundation" },
  { name: "Calendar bridge", phase: "1A", status: "Placeholder" },
  { name: "Web research", phase: "1A", status: "Placeholder" },
  { name: "Gmail / Outlook", phase: "1B", status: "Later" },
  { name: "Drive / OneDrive", phase: "1B", status: "Later" },
  { name: "Image generation/editing", phase: "1B", status: "Later" },
  { name: "GitHub", phase: "1B", status: "Later" }
];

function routeInput(input: string) {
  const text = input.toLowerCase();

  if (text.includes("codex") || text.includes("github") || text.includes("improve this app") || text.includes("fix this bug") || text.includes("app improvement") || text.includes("pull request")) {
    return {
      scope: "Work",
      container: "Project Zion",
      privacy: "L5 Code / Approval",
      agent: "Operator + Sentinel",
      skill: "App Self-Improvement",
      confidence: "95%",
      action: "Capture as a development request, stage for GitHub/Codex, and require approval before merge or deployment.",
      compactContainer: "Project Zion",
      compactAgent: "Operator",
      compactSkill: "Codex",
      tags: ["development-request", "github-ready", "sentinel-review"]
    };
  }

  if (text.includes("relationship") || text.includes("romantic") || text.includes("mental health") || text.includes("therapy")) {
    return {
      scope: "Personal",
      container: text.includes("mental") ? "Mental Health/Reflection" : "Romantic Relationships",
      privacy: "L4 Vault",
      agent: "Trinity + Switch + Seraph",
      skill: "Personal Coaching",
      confidence: "88%",
      action: "Ask Vault/save behavior before storing or using details.",
      compactContainer: "Relationships",
      compactAgent: "Trinity",
      compactSkill: "Coaching",
      tags: ["vault", "self-only", "never-share"]
    };
  }

  if (text.includes("redstone")) {
    return {
      scope: "Work",
      container: "Redstone",
      privacy: "L2 Private",
      agent: text.includes("sprint") || text.includes("server") ? "Tank + Link" : "Switch + Link",
      skill: text.includes("sprint") || text.includes("server") ? "Technical Support" : "Writing/Rewriting",
      confidence: "93%",
      action: "Route inside Work without personal context.",
      compactContainer: "Redstone",
      compactAgent: text.includes("sprint") || text.includes("server") ? "Tank + Link" : "Switch",
      compactSkill: text.includes("sprint") || text.includes("server") ? "Tech" : "Writing",
      tags: ["redstone-only", "confidential"]
    };
  }

  if (text.includes("synergy") || text.includes("flyer") || text.includes("campaign")) {
    return {
      scope: "Work",
      container: text.includes("flyer") || text.includes("campaign") ? "Marketing/Creative" : "Synergy",
      privacy: "L2 Private",
      agent: "Sparks + Switch",
      skill: "Creative Production",
      confidence: "90%",
      action: "Store creative output under the owning Work container.",
      compactContainer: text.includes("flyer") || text.includes("campaign") ? "Marketing" : "Synergy",
      compactAgent: "Sparks",
      compactSkill: "Creative",
      tags: ["synergy-only", "template-candidate"]
    };
  }

  if (text.includes("immigration")) {
    return {
      scope: "Personal",
      container: "Immigration",
      privacy: "L3 Sensitive",
      agent: "Mouse + Seraph",
      skill: "Research",
      confidence: "86%",
      action: "Research with sensitive handling; do not auto-save raw legal-adjacent details.",
      compactContainer: "Immigration",
      compactAgent: "Mouse",
      compactSkill: "Research",
      tags: ["sensitive", "sanitized-only"]
    };
  }

  if (text.includes("csv") || text.includes("budget") || text.includes("data")) {
    return {
      scope: "Mixed",
      container: "Finance/Admin",
      privacy: "L3 Sensitive",
      agent: "Dozer + Seraph",
      skill: "Data Analysis",
      confidence: "82%",
      action: "Classify data source before saving or sharing.",
      compactContainer: "Finance/Admin",
      compactAgent: "Dozer",
      compactSkill: "Data",
      tags: ["sensitive", "cypher-review"]
    };
  }

  return {
    scope: "Mixed",
    container: "Personal Productivity",
    privacy: "L1 Normal",
    agent: "Oracle + Trinity",
    skill: "Knowledge Stewardship",
    confidence: input.trim() ? "74%" : "Ready",
    action: input.trim() ? "Parse brain dump into tagged knowledge, tasks, and open questions." : "Waiting for command input.",
    compactContainer: "Productivity",
    compactAgent: "Oracle",
    compactSkill: "Knowledge",
    tags: ["dashboard", "template-candidate"]
  };
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("Command");
  const [activeScope, setActiveScope] = useState<Scope>("All");
  const [input, setInput] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [latestVoicePayload, setLatestVoicePayload] = useState<ZionRoutingPayload | null>(null);
  const voicePanelRef = useRef<VoiceCommandPanelHandle | null>(null);
  const route = useMemo(() => routeInput(input), [input]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-zion-bg p-2 text-zion-text sm:p-5">
      <div className="mx-auto min-h-[calc(100vh-24px)] w-full max-w-full overflow-hidden rounded-xl border border-zion-line bg-white/88 shadow-command sm:min-h-[calc(100vh-40px)] 2xl:max-w-[1560px]">
        <header className="min-w-0 border-b border-zion-line bg-white/92 px-4 py-4 backdrop-blur lg:px-6">
          <div className="flex min-w-0 flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-lg border border-zion-line bg-zion-panel text-lg font-bold text-zion-cyan">Z</div>
              <div className="min-w-0">
                <h1 className="text-xl font-semibold tracking-normal">Zion</h1>
                <p className="text-sm text-zion-muted">Private AI command center for routing, privacy, knowledge, and daily focus.</p>
              </div>
            </div>
            <nav className="grid w-full min-w-0 grid-cols-1 gap-2 sm:flex sm:w-auto sm:flex-wrap">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.name;
                return (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-semibold transition ${
                      active ? "border-zion-cyan/60 bg-zion-cyan/12 text-zion-cyan" : "border-zion-line bg-zion-panel text-zion-muted hover:text-zion-text"
                    }`}
                  >
                    <Icon size={16} />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="mt-4 flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
              {scopes.map((scope) => (
                <button
                  key={scope}
                  onClick={() => setActiveScope(scope)}
                  className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
                    activeScope === scope ? "border-zion-gold/60 bg-zion-gold/12 text-zion-gold" : "border-zion-line bg-zion-panel2 text-zion-muted"
                  }`}
                >
                  {scope}
                </button>
              ))}
            </div>
            <div className="flex w-full items-center gap-3 rounded-lg border border-zion-line bg-zion-panel px-3 py-2 text-sm text-zion-muted lg:w-auto">
              <LockKeyhole size={16} className="text-zion-gold" />
              Vault locked
              <span className="rounded border border-zion-line px-2 py-0.5 text-xs">counts only</span>
            </div>
          </div>
        </header>

        {activeTab === "Command" && (
          <CommandView
            input={input}
            setInput={setInput}
            route={route}
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            latestVoicePayload={latestVoicePayload}
            onStartVoice={() => voicePanelRef.current?.startListening()}
            onVoicePayload={setLatestVoicePayload}
            voicePanelRef={voicePanelRef}
          />
        )}
        {activeTab === "Dashboard" && <DashboardView />}
        {activeTab === "Knowledge" && <KnowledgeView />}
        {activeTab === "Operator" && <OperatorView />}
        {activeTab === "Vault" && <VaultView />}
        {activeTab === "Settings" && <SettingsView />}
      </div>
    </main>
  );
}

function CommandView({
  input,
  setInput,
  route,
  uploadedFiles,
  setUploadedFiles,
  latestVoicePayload,
  onStartVoice,
  onVoicePayload,
  voicePanelRef
}: {
  input: string;
  setInput: (value: string) => void;
  route: ReturnType<typeof routeInput>;
  uploadedFiles: UploadedFile[];
  setUploadedFiles: (files: UploadedFile[]) => void;
  latestVoicePayload: ZionRoutingPayload | null;
  onStartVoice: () => void;
  onVoicePayload: (payload: ZionRoutingPayload) => void;
  voicePanelRef: RefObject<VoiceCommandPanelHandle | null>;
}) {
  const handleFiles = (files: FileList | null) => {
    if (!files) {
      return;
    }

    const nextFiles = Array.from(files).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      name: file.name,
      size: file.size,
      type: file.type || "unknown"
    }));

    const existingIds = new Set(uploadedFiles.map((file) => file.id));
    setUploadedFiles([...uploadedFiles, ...nextFiles.filter((file) => !existingIds.has(file.id))]);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== fileId));
  };

  return (
    <section className="grid min-w-0 gap-4 p-3 sm:p-4 lg:p-6">
      <div className="grid min-w-0 gap-4 xl:grid-cols-[2fr_1fr]">
        <section className="flex min-w-0 flex-col items-center justify-center overflow-hidden rounded-xl border border-zion-line bg-[radial-gradient(circle_at_50%_22%,rgba(11,167,160,0.12),transparent_34rem),linear-gradient(180deg,#ffffff,#f7fbfb)] p-3 shadow-command sm:min-h-[560px] sm:p-5">
          <div className="w-full min-w-0 rounded-xl border border-zion-line bg-white p-4 shadow-command sm:p-7">
            <div className="hidden flex-col items-start justify-between gap-4 sm:flex sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-semibold text-zion-cyan">Command / Oracle</p>
                <h2 className="mt-1 text-3xl font-semibold tracking-normal">Oracle is ready</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-zion-muted">Capture a messy thought. Zion will infer scope, container, privacy, agent, skill, confidence, and storage path.</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-lg border border-zion-line bg-zion-panel2 px-3 py-2 text-xs font-semibold text-zion-muted">
                <ShieldCheck size={15} className="text-zion-cyan" />
                Privacy first
              </span>
            </div>

            <div className="relative mx-auto grid h-44 w-44 place-items-center sm:mt-10 sm:h-80 sm:w-80">
              <div className="zion-orb-ring absolute h-full w-full rounded-full bg-[radial-gradient(circle,rgba(11,167,160,0.16),transparent_64%)]" />
              <div className="zion-orb-ring absolute h-[78%] w-[78%] rounded-full border border-zion-cyan/30 bg-[radial-gradient(circle,rgba(255,255,255,0.82),rgba(11,167,160,0.10)_48%,transparent_72%)] [animation-delay:0.35s]" />
              <div className="relative grid h-36 w-36 place-items-center rounded-full sm:h-64 sm:w-64">
                <Image
                  src="/assets/zion-orb.png"
                  alt="Zion command orb"
                  width={512}
                  height={512}
                  priority
                  unoptimized
                  className="h-full w-full rounded-full object-contain drop-shadow-[0_28px_90px_rgba(59,130,246,0.34)]"
                />
              </div>
            </div>

            <div className="mt-3 w-full rounded-xl border border-zion-line bg-zion-panel2 p-3 sm:mt-4">
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-1.5 sm:grid-cols-[1fr_auto_auto_auto] sm:gap-3">
                <label className="sr-only" htmlFor="command-input">
                  Command input
                </label>
                <input
                  id="command-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className="order-2 min-h-12 w-full min-w-0 rounded-lg border border-zion-line bg-white px-3 text-sm text-zion-text outline-none transition placeholder:text-zion-muted focus:border-zion-cyan sm:order-none sm:px-4"
                  placeholder="Brain dump, ask, route, draft, research, plan..."
                />
                <label className="order-1 inline-flex h-12 w-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-zion-line bg-white px-0 text-sm font-semibold text-zion-text transition hover:border-zion-cyan/60 sm:order-none sm:w-auto sm:px-4">
                  <Upload size={16} />
                  <span className="hidden sm:inline">Upload</span>
                  <input
                    className="sr-only"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt,.md,.csv,.xlsx,.xls,.png,.jpg,.jpeg,.webp,application/pdf,text/*,image/*"
                    onChange={(event) => {
                      handleFiles(event.target.files);
                      event.target.value = "";
                    }}
                  />
                </label>
                <VoiceButton onClick={onStartVoice} />
                <button className="hidden h-12 w-12 place-items-center rounded-lg bg-zion-cyan text-zion-bg shadow-sm sm:grid">
                  <Send size={16} />
                </button>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="mt-3 grid gap-2">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center gap-3 rounded-lg border border-zion-line bg-white px-3 py-2 text-sm">
                      <FileText className="shrink-0 text-zion-cyan" size={17} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-zion-text">{file.name}</p>
                        <p className="text-xs text-zion-muted">{formatFileSize(file.size)} / queued for summarize, edit, or knowledge intake</p>
                      </div>
                      <button
                        aria-label={`Remove ${file.name}`}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-zion-line text-zion-muted hover:text-zion-text"
                        onClick={() => removeFile(file.id)}
                      >
                        <X size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-5">
              <RouteTile label="Scope" value={latestVoicePayload?.scope ?? route.scope} />
              <RouteTile label="Container" value={latestVoicePayload?.container ?? route.compactContainer} />
              <RouteTile label="Privacy" value={latestVoicePayload?.privacyLevel ?? route.privacy} />
              <RouteTile label="Agent" value={latestVoicePayload?.agent ?? route.compactAgent} />
              <RouteTile label="Skill" value={uploadedFiles.length ? "File Intake" : latestVoicePayload?.skill ?? route.compactSkill} />
            </div>
          </div>
        </section>

        <VoiceCommandPanel ref={voicePanelRef} payload={latestVoicePayload} onPayload={onVoicePayload} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel title="Scope Containers" action="Seeded">
          <ContainerGroup title="Work" items={containers.Work.slice(0, 5)} />
          <ContainerGroup title="Personal" items={containers.Personal.slice(0, 5)} />
          <ContainerGroup title="Mixed / Bridge" items={containers.Mixed.slice(0, 4)} />
        </Panel>
        <Panel title="Routing Payload" action={route.confidence}>
          <p className="text-sm leading-6 text-zion-muted">
            {latestVoicePayload
              ? latestVoicePayload.responseText
              : uploadedFiles.length
              ? `${uploadedFiles.length} file${uploadedFiles.length === 1 ? "" : "s"} queued. Oracle should classify privacy, summarize or edit, and store the output in Knowledge.`
              : route.action}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(latestVoicePayload
              ? [
                  latestVoicePayload.scope,
                  latestVoicePayload.container,
                  latestVoicePayload.agent,
                  latestVoicePayload.skill,
                  `${Math.round(latestVoicePayload.confidence * 100)}%`
                ]
              : route.tags
            ).map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </Panel>
        <Panel title="Agent Context" action="Quiet">
          <div className="flex flex-wrap gap-2">
            {agents.slice(0, 8).map((agent) => (
              <span key={agent.name} className="rounded-lg border border-zion-line bg-zion-panel2 px-3 py-2 text-xs text-zion-muted">
                {agent.name}
              </span>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function DashboardView() {
  const [intelligenceTab, setIntelligenceTab] = useState<IntelligenceTab>("Preferences");

  return (
    <section className="p-3 sm:p-4 lg:p-6">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">AI-curated dashboard</h2>
          <p className="mt-1 text-sm text-zion-muted">Shows what matters now, including preference memory, passive watches, and usage trend learning.</p>
        </div>
        <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-zion-line bg-zion-panel px-3 text-sm font-semibold text-zion-text">
          <MessageSquareText size={16} />
          Open in Command
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.title} className="rounded-xl border border-zion-line bg-zion-panel p-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-zion-cyan/10 text-zion-cyan">
                  <Icon size={19} />
                </div>
                <span className="rounded-md border border-zion-line bg-zion-panel2 px-2 py-1 text-xs text-zion-muted">{card.status}</span>
              </div>
              <h3 className="mt-5 text-base font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zion-muted">{card.detail}</p>
            </article>
          );
        })}
      </div>
      <section className="mt-5 rounded-xl border border-zion-line bg-zion-panel p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-zion-cyan">Dashboard / Intelligence</p>
            <h3 className="mt-1 text-xl font-semibold">Global Preference Intelligence</h3>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-zion-muted">
              Shared intelligence for Oracle and agents. Memories, passive watches, and trend recommendations stay container-bound and permission-gated.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
            {(["Preferences", "Watchlist", "Usage Trends"] as IntelligenceTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setIntelligenceTab(tab)}
                className={`h-10 rounded-lg border px-3 text-sm font-semibold ${
                  intelligenceTab === tab ? "border-zion-cyan/60 bg-zion-cyan/12 text-zion-cyan" : "border-zion-line bg-white text-zion-muted"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          {intelligenceTab === "Preferences" && <PreferencesIntelligence />}
          {intelligenceTab === "Watchlist" && <WatchlistIntelligence />}
          {intelligenceTab === "Usage Trends" && <UsageTrendsIntelligence />}
        </div>
      </section>
    </section>
  );
}

function PreferencesIntelligence() {
  return (
    <div className="grid gap-3">
      {preferenceMemories.map((memory) => (
        <article key={`${memory.container}-${memory.summary}`} className="rounded-lg border border-zion-line bg-white p-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h4 className="text-sm font-semibold">{memory.summary}</h4>
              <p className="mt-2 text-xs leading-5 text-zion-muted">
                {memory.container} / {memory.scope} / {memory.domain} / {memory.category}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusPill>{memory.type}</StatusPill>
              <StatusPill>{memory.strength}</StatusPill>
              <StatusPill>{memory.confidence}</StatusPill>
              <StatusPill>{memory.proactive ? "proactive on" : "proactive off"}</StatusPill>
            </div>
          </div>
          <div className="mt-4 grid gap-2 text-xs text-zion-muted sm:grid-cols-3">
            <span>Last used: {memory.lastUsed}</span>
            <span>Use count: {memory.useCount}</span>
            <span>Created: {memory.created}</span>
          </div>
          <ActionRow actions={["Edit", "Archive", memory.proactive ? "Disable proactive" : "Enable proactive", "Move container"]} />
        </article>
      ))}
    </div>
  );
}

function WatchlistIntelligence() {
  const groups = [
    { title: "Active Watches", items: watchItems.filter((item) => item.state === "active_explicit") },
    { title: "Passive Watches", items: watchItems.filter((item) => item.state === "active_passive") },
    { title: "Candidates", items: watchItems.filter((item) => item.state === "candidate") }
  ];

  return (
    <div className="grid gap-4">
      {groups.map((group) => (
        <div key={group.title}>
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-sm font-semibold">{group.title}</h4>
            <span className="text-xs font-semibold text-zion-cyan">{group.items.length}</span>
          </div>
          <div className="grid gap-3">
            {group.items.map((item) => (
              <article key={item.item} className="rounded-lg border border-zion-line bg-white p-4">
                <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                  <div>
                    <h5 className="text-sm font-semibold">{item.item}</h5>
                    <p className="mt-2 text-xs leading-5 text-zion-muted">
                      {item.container} / {item.domain} / {item.category}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <StatusPill>{item.importance}</StatusPill>
                    <StatusPill>{item.state}</StatusPill>
                    <StatusPill>{item.priority}</StatusPill>
                    <StatusPill>score {item.score}</StatusPill>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                  <InfoBlock label="Watching for" value={item.watchFor.join(", ")} />
                  <InfoBlock label="Why this is watched" value={item.why} />
                  <InfoBlock label="Signals" value={item.signals} />
                  <InfoBlock label="Notification state" value={`${item.proactive ? "Proactive enabled" : "Proactive disabled"} / checked ${item.lastChecked} / notified ${item.lastNotified}`} />
                </div>
                <ActionRow actions={["Confirm", "Dismiss", "Promote to Active", "Pause", "Edit triggers", "Disable proactive alerts", "Archive", "Check now"]} />
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function UsageTrendsIntelligence() {
  return (
    <div className="grid gap-3">
      {usageTrends.map((trend) => (
        <article key={trend.trend} className="rounded-lg border border-zion-line bg-white p-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <h4 className="text-sm font-semibold">{trend.trend}</h4>
              <p className="mt-2 text-xs leading-5 text-zion-muted">
                {trend.container} / {trend.domain} / frequency {trend.frequency} / last detected {trend.lastDetected}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusPill>{trend.confidence}</StatusPill>
              <StatusPill>{trend.status}</StatusPill>
            </div>
          </div>
          <InfoBlock label="Recommendation" value={trend.recommendation} />
          <ActionRow actions={["Accept recommendation", "Dismiss", "Archive", "Create rule", "Create skill", "Create automation", "Create bucket"]} />
        </article>
      ))}
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zion-line bg-zion-panel2 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zion-muted">{label}</p>
      <p className="mt-1 text-sm leading-6 text-zion-text">{value}</p>
    </div>
  );
}

function ActionRow({ actions }: { actions: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {actions.map((action) => (
        <button key={action} className="rounded-md border border-zion-line bg-zion-panel2 px-2 py-1 text-xs font-semibold text-zion-muted hover:border-zion-cyan/60 hover:text-zion-text">
          {action}
        </button>
      ))}
    </div>
  );
}

function StatusPill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md border border-zion-line bg-zion-panel2 px-2 py-1 text-xs font-semibold text-zion-muted">{children}</span>;
}

function KnowledgeView() {
  return (
    <section className="grid gap-4 p-3 sm:p-4 xl:grid-cols-[1fr_0.58fr] lg:p-6">
      <Panel title="Knowledge Inbox" action="Classify">
        <div className="space-y-3">
          {knowledgeItems.map((item) => (
            <div key={item.title} className="rounded-lg border border-zion-line bg-zion-panel2 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 text-xs text-zion-muted">
                    {item.scope} / {item.type} / {item.privacy}
                  </p>
                </div>
                <button className="rounded-md border border-zion-line px-2 py-1 text-xs text-zion-cyan">Save as</button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Tags & Containers" action="Protected">
        <div className="flex flex-wrap gap-2">
          {protectedTags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <div className="mt-5 grid gap-3">
          <MiniStat label="Stored items" value="24" />
          <MiniStat label="Open decisions" value="3" />
          <MiniStat label="Needs review" value="5" />
        </div>
      </Panel>
    </section>
  );
}

function OperatorView() {
  return (
    <section className="grid gap-4 p-3 sm:p-4 xl:grid-cols-[0.72fr_1.28fr] lg:p-6">
      <Panel title="Operator Build Queue" action="GitHub/Codex gated">
        <div className="space-y-3">
          {developmentRequests.map((request) => (
            <article key={request.title} className="rounded-lg border border-zion-line bg-zion-panel2 p-4">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{request.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-zion-muted">{request.normalized}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusPill>{request.priority}</StatusPill>
                  <StatusPill>{request.status}</StatusPill>
                  <StatusPill>{request.source}</StatusPill>
                </div>
              </div>
              <div className="mt-4 grid gap-3 lg:grid-cols-2">
                <InfoBlock label="Target area" value={request.target} />
                <InfoBlock label="GitHub issue" value={request.github} />
                <InfoBlock label="Codex prompt" value={request.codex} />
                <InfoBlock label="PR / Preview" value={`${request.pr} / approval ${request.approval}`} />
                <InfoBlock label="Sentinel" value={request.sentinel} />
                <InfoBlock label="Original request" value={request.original} />
              </div>
              <ActionRow
                actions={[
                  "View request",
                  "Edit normalized request",
                  "Generate Codex prompt",
                  "Copy Codex prompt",
                  "Create GitHub issue",
                  "Mark ready for Codex",
                  "Mark in progress",
                  "Add PR URL",
                  "Add preview URL",
                  "Request Sentinel review",
                  "Approve",
                  "Reject",
                  "Complete"
                ]}
              />
            </article>
          ))}
        </div>
      </Panel>
      <div className="grid content-start gap-4">
        <Panel title="Self-Improvement Policy" action="Level 5 gate">
          <div className="space-y-3 text-sm leading-6 text-zion-muted">
            <p>Voice and text requests can create development requests, GitHub issues, Codex prompts, branches, pull requests, and preview builds.</p>
            <p>They cannot merge to main, deploy to production, modify production data, delete files, alter authentication, change billing, or change security rules without explicit approval.</p>
          </div>
          <div className="mt-4 grid gap-2">
            <MiniStat label="Auto-merge" value="Disabled" />
            <MiniStat label="Production deploy" value="Disabled" />
            <MiniStat label="Sentinel review" value="Required" />
          </div>
        </Panel>
        <Panel title="Codex Prompt Rules" action="Always included">
          <div className="grid gap-2">
            {[
              "Do not rebuild the app.",
              "Preserve existing functionality.",
              "Create a branch and PR or provide patch instructions.",
              "Do not modify production data.",
              "Do not change auth, permissions, billing, or security rules without approval.",
              "Return files changed and manual QA steps."
            ].map((rule) => (
              <div key={rule} className="flex gap-2 rounded-lg border border-zion-line bg-zion-panel2 p-3 text-sm text-zion-muted">
                <ShieldCheck className="mt-0.5 shrink-0 text-zion-cyan" size={16} />
                {rule}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </section>
  );
}

function VaultView() {
  return (
    <section className="grid gap-4 p-3 sm:p-4 xl:grid-cols-[0.72fr_1.28fr] lg:p-6">
      <Panel title="Vault Status" action="Locked">
        <div className="grid place-items-center rounded-xl border border-zion-line bg-zion-panel2 p-6 text-center sm:p-10">
          <div className="grid h-20 w-20 place-items-center rounded-full border border-zion-gold/50 bg-zion-gold/10 text-zion-gold">
            <LockKeyhole size={34} />
          </div>
          <h2 className="mt-5 text-xl font-semibold">Private Vault is locked</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-zion-muted">Counts and status are visible. Raw relationship, mental health, health, finance, immigration, and legacy/proxy details require explicit unlock.</p>
          <button className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-zion-gold px-4 text-sm font-semibold text-zion-bg">
            <Fingerprint size={17} />
            Request unlock
          </button>
        </div>
      </Panel>
      <Panel title="Access Rules" action="Most restrictive tag wins">
        <div className="grid gap-3 md:grid-cols-2">
          {[
            "Self-only",
            "Explicit unlock required",
            "Excluded from Work contexts",
            "Excluded from Proxy/Legacy",
            "Excluded from cross-container use",
            "Access logged"
          ].map((rule) => (
            <div key={rule} className="flex items-center gap-3 rounded-lg border border-zion-line bg-zion-panel2 p-3 text-sm">
              <ShieldCheck size={17} className="text-zion-cyan" />
              {rule}
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function SettingsView() {
  return (
    <section className="grid gap-4 p-3 sm:p-4 xl:grid-cols-2 lg:p-6">
      <Panel title="Agents" action="14 seeded">
        <div className="grid gap-3 sm:grid-cols-2">
          {agents.map((agent) => (
            <div key={agent.name} className="rounded-lg border border-zion-line bg-zion-panel2 p-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold">{agent.name}</h3>
                <span className="text-xs text-zion-cyan">{agent.type}</span>
              </div>
              <p className="mt-1 text-xs text-zion-muted">{agent.role}</p>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Skills & Integrations" action="Phase 1A first">
        <div className="mb-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
        <div className="space-y-2">
          {integrations.map((integration) => (
            <div key={integration.name} className="flex items-center justify-between rounded-lg border border-zion-line bg-zion-panel2 px-3 py-2 text-sm">
              <span>{integration.name}</span>
              <span className="text-xs text-zion-muted">
                {integration.phase} / {integration.status}
              </span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="AI Provider Settings" action="Cost-aware routing">
        <div className="space-y-3">
          {aiProviders.map((provider) => (
            <div key={provider.name} className="rounded-lg border border-zion-line bg-zion-panel2 p-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{provider.name}</h3>
                  <p className="mt-1 text-xs leading-5 text-zion-muted">{provider.role}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <StatusPill>{provider.status}</StatusPill>
                  <StatusPill>{provider.tier}</StatusPill>
                </div>
              </div>
              <div className="mt-3 grid gap-2 text-xs text-zion-muted sm:grid-cols-3">
                <span>{provider.provider}</span>
                <span>Model: {provider.model}</span>
                <span>Fallback: {provider.fallback}</span>
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Model Routing Rules" action="Oracle">
        <div className="space-y-2">
          {routingPolicies.map((policy) => (
            <div key={policy.intent} className="grid gap-2 rounded-lg border border-zion-line bg-zion-panel2 p-3 text-sm lg:grid-cols-[1fr_auto]">
              <div>
                <p className="font-semibold">{policy.intent}</p>
                <p className="mt-1 text-xs text-zion-muted">
                  {policy.agent} / {policy.provider} / {policy.mode}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <StatusPill>{policy.risk}</StatusPill>
                <StatusPill>{policy.approval}</StatusPill>
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="AI Cost Controls" action="Budget guard">
        <div className="grid gap-2">
          {aiCostSettings.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-3 rounded-lg border border-zion-line bg-zion-panel2 px-3 py-2">
              <span className="inline-flex items-center gap-2 text-sm text-zion-muted">
                <DollarSign size={15} className="text-zion-cyan" />
                {label}
              </span>
              <span className="text-sm font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="GitHub & Safety Settings" action="Approval first">
        <div className="grid gap-2">
          {aiSafetySettings.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-3 rounded-lg border border-zion-line bg-zion-panel2 px-3 py-2">
              <span className="inline-flex items-center gap-2 text-sm text-zion-muted">
                <GitPullRequest size={15} className="text-zion-cyan" />
                {label}
              </span>
              <span className="text-right text-sm font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </Panel>
    </section>
  );
}

function Panel({ title, action, children }: { title: string; action: string; children: React.ReactNode }) {
  return (
    <article className="rounded-xl border border-zion-line bg-zion-panel p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">{title}</h2>
        <span className="text-xs font-semibold text-zion-cyan">{action}</span>
      </div>
      {children}
    </article>
  );
}

function ContainerGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-4 last:mb-0">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-zion-muted">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-md border border-zion-line bg-zion-panel2 px-2 py-1 text-xs text-zion-muted">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function RouteTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-zion-line bg-zion-panel2 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zion-muted">{label}</p>
      <p className="mt-1 text-xs font-semibold leading-5 sm:text-sm">{value}</p>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md border border-zion-line bg-white px-2 py-1 text-xs text-zion-muted">{children}</span>;
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-zion-line bg-zion-panel2 px-3 py-2">
      <span className="text-sm text-zion-muted">{label}</span>
      <span className="text-sm font-semibold text-zion-text">{value}</span>
    </div>
  );
}
