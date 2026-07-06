import {
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  Command,
  FileText,
  Fingerprint,
  Home as HomeIcon,
  Inbox,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Mic2,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  TimerReset,
  UserRoundCog,
  Zap
} from "lucide-react";

const navItems = [
  { label: "Home", icon: HomeIcon, active: true },
  { label: "Capture", icon: Inbox },
  { label: "Workspaces", icon: Layers3 },
  { label: "Brief", icon: CalendarDays },
  { label: "Files", icon: FileText },
  { label: "Security", icon: LockKeyhole }
];

const agents = [
  {
    name: "Oracle",
    role: "Router",
    description: "Classifies the request, finds the owner, and chooses the right teammate.",
    avatar: { bg: "#dffcf8", skin: "#b77955", hair: "#25333a", shirt: "#0ba7a0" },
    accent: "border-teal-500"
  },
  {
    name: "Trinity",
    role: "LifeOS",
    description: "Keeps personal plans, reminders, family, travel, and life admin organized.",
    avatar: { bg: "#fff0d8", skin: "#d6a071", hair: "#3e2418", shirt: "#d7923b" },
    accent: "border-amber-500"
  },
  {
    name: "Link",
    role: "Redstone Ops",
    description: "Handles MSP operations, Redstone clients, service flows, and follow-up.",
    avatar: { bg: "#eaf1ff", skin: "#c98b61", hair: "#33251f", shirt: "#5d7ec9" },
    accent: "border-blue-500"
  },
  {
    name: "Tank",
    role: "Infrastructure",
    description: "Builds runbooks, scripts, deployments, tests, and technical execution paths.",
    avatar: { bg: "#eef2f3", skin: "#8f583f", hair: "#151b1f", shirt: "#65757c" },
    accent: "border-slate-500"
  },
  {
    name: "Sparks",
    role: "Creative",
    description: "Shapes websites, campaigns, brand systems, visuals, and marketing copy.",
    avatar: { bg: "#ffeaf6", skin: "#d59a77", hair: "#4b2439", shirt: "#d95b9f" },
    accent: "border-pink-500"
  },
  {
    name: "Architect",
    role: "Product Systems",
    description: "Designs app architecture, schemas, workflows, and implementation plans.",
    avatar: { bg: "#f0efff", skin: "#e0ad82", hair: "#5d4639", shirt: "#7965d8" },
    accent: "border-violet-500"
  },
  {
    name: "Morpheus",
    role: "Strategy",
    description: "Challenges assumptions, ranks priorities, and protects focus from noise.",
    avatar: { bg: "#f7f3e8", skin: "#b7724f", hair: "#2e2117", shirt: "#a47b37" },
    accent: "border-yellow-700"
  },
  {
    name: "Seraph",
    role: "Security",
    description: "Reviews privacy, risk, permissions, sensitive data, and kill-switch rules.",
    avatar: { bg: "#e9f9ff", skin: "#d8a27a", hair: "#6a4a3e", shirt: "#40a6c4" },
    accent: "border-cyan-500"
  },
  {
    name: "Keymaker",
    role: "Integrations",
    description: "Connects tools, scopes access, maps OAuth, and keeps permissions clean.",
    avatar: { bg: "#e7ffef", skin: "#b8755a", hair: "#18251d", shirt: "#3aa86b" },
    accent: "border-emerald-500"
  }
];

const focusItems = [
  { label: "Best next action", value: "Draft REDSTONE MSP schema review", icon: Zap },
  { label: "Waiting on", value: "Synergy course outline", icon: TimerReset },
  { label: "Decision needed", value: "Auth provider for Zion beta", icon: CircleDot }
];

const captures = [
  "Route creative work to the owner, not the workbench.",
  "AI DayTrader stays paper-only unless risk review is approved.",
  "Promote repeated ideas into their own project workspace."
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-zion-bg p-3 text-zion-text sm:p-5">
      <div className="mx-auto grid min-h-[calc(100vh-40px)] max-w-[1540px] grid-cols-1 overflow-hidden rounded-xl border border-zion-line bg-white/86 shadow-command backdrop-blur lg:grid-cols-[82px_1fr]">
        <aside className="hidden border-r border-zion-line bg-white/92 lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-5">
          <div className="flex flex-col items-center gap-6">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-zion-line bg-zion-panel text-lg font-bold text-zion-cyan shadow-sm">
              Z
            </div>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    aria-label={item.label}
                    className={`grid h-11 w-11 place-items-center rounded-lg border transition ${
                      item.active
                        ? "border-teal-200 bg-teal-50 text-zion-cyan shadow-sm"
                        : "border-transparent text-zion-muted hover:border-zion-line hover:bg-zion-panel hover:text-zion-text"
                    }`}
                  >
                    <Icon size={19} strokeWidth={1.9} />
                  </button>
                );
              })}
            </nav>
          </div>
          <button aria-label="Identity vault" className="grid h-11 w-11 place-items-center rounded-lg border border-zion-line bg-white text-zion-muted">
            <Fingerprint size={19} />
          </button>
        </aside>

        <section className="flex min-w-0 flex-col">
          <header className="flex flex-col gap-4 border-b border-zion-line bg-white/86 px-4 py-4 backdrop-blur md:flex-row md:items-center md:justify-between lg:px-6">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold tracking-normal text-zion-text">Zion 2.0</h1>
                <span className="rounded-md border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-medium text-zion-cyan">Light Mode</span>
              </div>
              <p className="mt-1 text-sm text-zion-muted">Your private AI operating system, ready to capture, route, remember, and follow up.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-zion-line bg-white px-3 text-sm text-zion-muted shadow-sm sm:w-[360px]">
                <Search size={16} />
                <span className="truncate">Search people, workspaces, decisions...</span>
                <kbd className="ml-auto rounded border border-zion-line bg-zion-panel2 px-1.5 py-0.5 text-[10px] text-zion-muted">Ctrl K</kbd>
              </div>
              <button className="grid h-10 w-10 place-items-center rounded-lg border border-zion-line bg-white text-zion-muted shadow-sm">
                <Bell size={17} />
              </button>
              <button className="flex h-10 items-center gap-2 rounded-lg border border-zion-line bg-white px-3 text-sm font-medium text-zion-text shadow-sm">
                Personal Command
                <ChevronDown size={15} />
              </button>
            </div>
          </header>

          <div className="grid flex-1 gap-5 p-4 xl:grid-cols-[0.72fr_1.28fr_0.8fr] lg:p-6">
            <aside className="grid content-start gap-5">
              <Panel title="Focus Brief" action="Today">
                <div className="space-y-3">
                  {focusItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex gap-3 rounded-lg border border-zion-line bg-zion-panel2 p-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-zion-cyan shadow-sm">
                          <Icon size={17} />
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.12em] text-zion-muted">{item.label}</p>
                          <p className="mt-1 text-sm font-semibold leading-5 text-zion-text">{item.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Panel>

              <Panel title="Workspace Context" action="Switch">
                <div className="space-y-2">
                  {["LifeOS", "Redstone", "Synergy Bahamas", "Product Lab"].map((workspace, index) => (
                    <button
                      key={workspace}
                      className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm ${
                        index === 0 ? "border-teal-200 bg-teal-50 text-zion-cyan" : "border-zion-line bg-white text-zion-text"
                      }`}
                    >
                      <span>{workspace}</span>
                      {index === 0 ? <CheckCircle2 size={16} /> : <ChevronDown size={15} />}
                    </button>
                  ))}
                </div>
              </Panel>
            </aside>

            <section className="flex min-h-[620px] flex-col items-center justify-center rounded-xl border border-zion-line bg-[linear-gradient(180deg,#ffffff_0%,#f7fbfb_100%)] p-5 shadow-command">
              <div className="w-full max-w-2xl rounded-xl border border-zion-line bg-white p-5 shadow-command sm:p-7">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-semibold text-zion-cyan">Oracle Interaction</p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-normal text-zion-text sm:text-3xl">Oracle is ready</h2>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-zion-line bg-zion-panel2 px-3 py-2 text-xs font-medium text-zion-muted">
                    <ShieldCheck size={15} className="text-zion-cyan" />
                    Private session
                  </div>
                </div>

                <div className="relative mx-auto mt-9 grid h-72 w-72 place-items-center sm:h-80 sm:w-80">
                  <div className="zion-orb-ring absolute h-full w-full rounded-full bg-[radial-gradient(circle,rgba(11,167,160,0.18),transparent_64%)]" />
                  <div className="zion-orb-ring absolute h-[78%] w-[78%] rounded-full border border-teal-200 bg-[radial-gradient(circle,rgba(255,255,255,0.8),rgba(11,167,160,0.10)_48%,transparent_72%)] [animation-delay:0.35s]" />
                  <div className="zion-orb-core relative grid h-44 w-44 place-items-center overflow-hidden rounded-full border border-white bg-[radial-gradient(circle_at_35%_28%,#ffffff_0%,#d8fff9_26%,#0ba7a0_58%,#066a68_100%)] shadow-[0_28px_70px_rgba(11,167,160,0.28)] before:absolute before:inset-[-32%] before:bg-[conic-gradient(from_90deg,transparent,#ffffff99,transparent,#b8842d66,transparent)]">
                    <Command className="relative z-10 text-white drop-shadow" size={44} strokeWidth={1.7} />
                  </div>
                </div>

                <div className="mt-2 flex h-14 items-center justify-center gap-1.5">
                  {Array.from({ length: 19 }).map((_, index) => (
                    <span
                      key={index}
                      className="zion-wave-bar w-1.5 rounded-full bg-zion-cyan/55"
                      style={{ animationDelay: `${index * 0.055}s` }}
                    />
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-zion-line bg-zion-panel2 p-3">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <label className="sr-only" htmlFor="capture">
                      Capture input
                    </label>
                    <input
                      id="capture"
                      className="min-h-12 flex-1 rounded-lg border border-zion-line bg-white px-4 text-sm text-zion-text outline-none transition placeholder:text-zion-muted focus:border-zion-cyan"
                      placeholder="Tell Zion what to capture, route, draft, or remember..."
                    />
                    <button className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-zion-cyan px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#088c86]">
                      <Mic2 size={17} />
                      Speak
                    </button>
                    <button className="grid h-12 w-12 place-items-center rounded-lg border border-zion-line bg-white text-zion-cyan shadow-sm">
                      <Send size={17} />
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  <RouteTile label="Owner" value="LifeOS" />
                  <RouteTile label="Agent" value="Oracle + Trinity" />
                  <RouteTile label="Action" value="Clarify" />
                </div>
              </div>
            </section>

            <aside className="grid content-start gap-5">
              <Panel title="Memory Inbox" action="Review">
                <div className="space-y-3">
                  {captures.map((capture) => (
                    <div key={capture} className="rounded-lg border border-zion-line bg-white p-3">
                      <p className="text-sm font-medium leading-5 text-zion-text">{capture}</p>
                      <p className="mt-2 text-xs text-zion-muted">Awaiting approval</p>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="System Guardrails" action="Audit">
                <div className="space-y-3 text-sm">
                  <Guardrail icon={ShieldCheck} text="No autonomous destructive actions" />
                  <Guardrail icon={LockKeyhole} text="Workspace memory stays isolated" />
                  <Guardrail icon={BriefcaseBusiness} text="Business/client context is permissioned" />
                </div>
              </Panel>
            </aside>
          </div>

          <section className="border-t border-zion-line bg-white/72 px-4 py-5 lg:px-6">
            <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-zion-text">Your Zion Team</h2>
                <p className="text-sm text-zion-muted">Personified agent profiles with clear responsibility and handoff boundaries.</p>
              </div>
              <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-zion-line bg-white px-3 text-sm font-semibold text-zion-text shadow-sm">
                <UserRoundCog size={17} />
                Manage agents
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-9">
              {agents.map((agent) => (
                <article key={agent.name} className={`rounded-xl border border-zion-line bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-command ${agent.accent}`}>
                  <div className="flex items-center gap-2 xl:flex-col xl:items-start">
                    <AgentAvatar avatar={agent.avatar} name={agent.name} />
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-zion-text">{agent.name}</h3>
                      <p className="truncate text-xs font-medium text-zion-cyan">{agent.role}</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-zion-muted">{agent.description}</p>
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

function Panel({ title, action, children }: { title: string; action: string; children: React.ReactNode }) {
  return (
    <article className="rounded-xl border border-zion-line bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-zion-text">{title}</h2>
        <button className="text-xs font-semibold text-zion-cyan">{action}</button>
      </div>
      {children}
    </article>
  );
}

function RouteTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zion-line bg-white p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zion-muted">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-zion-text">{value}</p>
    </div>
  );
}

function Guardrail({ icon: Icon, text }: { icon: typeof ShieldCheck; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-zion-line bg-zion-panel2 p-3 text-zion-text">
      <Icon className="shrink-0 text-zion-cyan" size={17} />
      <span>{text}</span>
    </div>
  );
}

function AgentAvatar({
  avatar,
  name
}: {
  avatar: { bg: string; skin: string; hair: string; shirt: string };
  name: string;
}) {
  return (
    <div
      aria-label={`${name} profile icon`}
      className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-sm"
      style={{ background: `linear-gradient(135deg, ${avatar.bg}, #ffffff)` }}
    >
      <div className="absolute left-1/2 top-[8px] h-8 w-8 -translate-x-1/2 rounded-full" style={{ backgroundColor: avatar.hair }} />
      <div className="absolute left-1/2 top-[13px] h-7 w-7 -translate-x-1/2 rounded-full" style={{ backgroundColor: avatar.skin }} />
      <div className="absolute left-[18px] top-[25px] h-1.5 w-1.5 rounded-full bg-zion-text/80" />
      <div className="absolute right-[18px] top-[25px] h-1.5 w-1.5 rounded-full bg-zion-text/80" />
      <div className="absolute left-1/2 top-[33px] h-1 w-4 -translate-x-1/2 rounded-full bg-white/70" />
      <div className="absolute bottom-[-9px] left-1/2 h-7 w-10 -translate-x-1/2 rounded-t-full" style={{ backgroundColor: avatar.shirt }} />
      <div className="absolute left-1/2 top-[6px] h-3 w-7 -translate-x-1/2 rounded-t-full" style={{ backgroundColor: avatar.hair }} />
    </div>
  );
}
