import {
  Activity,
  Archive,
  Bell,
  Brain,
  Check,
  ChevronDown,
  CircleDot,
  Command,
  FileText,
  Fingerprint,
  GitBranch,
  Home as HomeIcon,
  Inbox,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Mic2,
  Search,
  ShieldCheck,
  Sparkles,
  TimerReset
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: HomeIcon, active: true },
  { label: "Capture", icon: Inbox },
  { label: "Workspaces", icon: Layers3 },
  { label: "Tasks", icon: Check },
  { label: "Decisions", icon: FileText },
  { label: "Security", icon: LockKeyhole }
];

const agents = ["Oracle", "Trinity", "Link", "Tank", "Sparks", "Architect", "Morpheus", "Seraph", "Keymaker"];

const workspaceNodes = [
  { name: "Redstone", type: "Owned Business", accent: "bg-zion-cyan" },
  { name: "Synergy Bahamas", type: "Owned Business", accent: "bg-zion-gold" },
  { name: "NYCHIA", type: "Owned Business", accent: "bg-[#9cc9ff]" },
  { name: "AI DayTrader", type: "Product Lab", accent: "bg-[#ff8a8a]" }
];

const memories = [
  { title: "AI DayTrader is paper-only by default", scope: "Product Lab / Trading Systems", level: "Restricted" },
  { title: "Creative work saves under owning entity", scope: "Routing Rule", level: "Confirmed" },
  { title: "PEB belongs under Redstone Clients", scope: "Client / External Work", level: "Confirmed" }
];

const tasks = [
  { title: "Review REDSTONE MSP data model", owner: "Architect", state: "Next" },
  { title: "Waiting on Synergy course outline", owner: "Trinity", state: "Waiting" },
  { title: "Draft NYCHIA homepage direction", owner: "Sparks", state: "In Progress" }
];

const decisions = [
  "Zion 2.0 is the product name",
  "Oracle is internal routing intelligence",
  "MVP blocks live trading actions"
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zion-bg p-3 text-zion-text sm:p-5">
      <div className="mx-auto grid min-h-[calc(100vh-40px)] max-w-[1500px] grid-cols-1 overflow-hidden rounded-xl border border-zion-line bg-[#0b0e11] shadow-command lg:grid-cols-[76px_1fr]">
        <aside className="hidden border-r border-zion-line bg-[#080a0c] lg:flex lg:flex-col lg:items-center lg:justify-between lg:py-5">
          <div className="flex flex-col items-center gap-6">
            <div className="grid h-11 w-11 place-items-center rounded-lg border border-zion-line bg-zion-panel text-lg font-semibold text-zion-cyan">
              Z
            </div>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    aria-label={item.label}
                    className={`grid h-11 w-11 place-items-center rounded-lg border text-zion-muted transition ${
                      item.active
                        ? "border-zion-cyan/60 bg-zion-cyan/12 text-zion-cyan"
                        : "border-transparent hover:border-zion-line hover:bg-zion-panel hover:text-zion-text"
                    }`}
                  >
                    <Icon size={19} strokeWidth={1.9} />
                  </button>
                );
              })}
            </nav>
          </div>
          <button aria-label="Identity vault" className="grid h-11 w-11 place-items-center rounded-lg border border-zion-line text-zion-muted">
            <Fingerprint size={19} />
          </button>
        </aside>

        <section className="flex min-w-0 flex-col">
          <header className="flex flex-col gap-4 border-b border-zion-line bg-[#0d1114]/95 px-4 py-4 backdrop-blur md:flex-row md:items-center md:justify-between lg:px-6">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold tracking-normal text-zion-text">Zion Command Center</h1>
                <span className="rounded-md border border-zion-line px-2.5 py-1 text-xs font-medium text-zion-cyan">Private Beta</span>
              </div>
              <p className="mt-1 text-sm text-zion-muted">Oracle is listening for captures, routing corrections, and next actions.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-10 min-w-0 items-center gap-2 rounded-lg border border-zion-line bg-zion-panel px-3 text-sm text-zion-muted sm:w-[340px]">
                <Search size={16} />
                <span className="truncate">Search agents, tasks, memories, workspaces...</span>
                <kbd className="ml-auto rounded border border-zion-line px-1.5 py-0.5 text-[10px] text-zion-muted">⌘K</kbd>
              </div>
              <button className="grid h-10 w-10 place-items-center rounded-lg border border-zion-line bg-zion-panel text-zion-muted">
                <Bell size={17} />
              </button>
              <button className="flex h-10 items-center gap-2 rounded-lg border border-zion-line bg-zion-panel px-3 text-sm text-zion-text">
                LifeOS
                <ChevronDown size={15} />
              </button>
            </div>
          </header>

          <div className="grid flex-1 gap-4 p-4 xl:grid-cols-[1.22fr_0.78fr] lg:p-6">
            <div className="grid gap-4">
              <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <article className="rounded-xl border border-zion-line bg-zion-panel p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-zion-cyan">Oracle Routing</p>
                      <h2 className="mt-2 text-2xl font-semibold text-zion-text">Capture, clarify, route, remember.</h2>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zion-cyan/12 text-zion-cyan">
                      <Command size={21} />
                    </span>
                  </div>
                  <div className="mt-5 rounded-lg border border-zion-line bg-[#0a0d10] p-4">
                    <p className="text-sm leading-6 text-zion-muted">
                      “Review the AI DayTrader kill switches and tell me if the paper-only safeguards are still intact.”
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <RoutePill label="Owner" value="AI DayTrader" />
                      <RoutePill label="Workspace" value="Product Lab" />
                      <RoutePill label="Agents" value="Seraph + Tank" />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-zion-cyan px-4 text-sm font-semibold text-zion-bg">
                      <Mic2 size={17} />
                      Push to talk
                    </button>
                    <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-zion-line px-4 text-sm font-semibold text-zion-text">
                      <MessageSquareText size={17} />
                      Type capture
                    </button>
                  </div>
                </article>

                <article className="rounded-xl border border-zion-line bg-zion-panel p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-zion-text">Focus Brief</h2>
                    <span className="text-xs text-zion-muted">Today</span>
                  </div>
                  <div className="mt-5 grid grid-cols-[112px_1fr] gap-5">
                    <div className="grid aspect-square place-items-center rounded-full border border-zion-cyan/35 bg-zion-cyan/8">
                      <div className="text-center">
                        <p className="text-4xl font-semibold text-zion-cyan">82</p>
                        <p className="text-xs text-zion-muted">Focus</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <FocusRow label="High-impact action" value="REDSTONE MSP schema" />
                      <FocusRow label="Park for later" value="New micro-app idea" />
                      <FocusRow label="Needs decision" value="Synergy LMS auth path" />
                    </div>
                  </div>
                </article>
              </section>

              <section className="grid gap-4 xl:grid-cols-2">
                <Panel title="Workspace Graph" action="Browse">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {workspaceNodes.map((node) => (
                      <div key={node.name} className="rounded-lg border border-zion-line bg-[#0a0d10] p-4">
                        <div className="flex items-center gap-3">
                          <span className={`h-2.5 w-2.5 rounded-full ${node.accent}`} />
                          <h3 className="text-sm font-semibold text-zion-text">{node.name}</h3>
                        </div>
                        <p className="mt-2 text-xs text-zion-muted">{node.type}</p>
                      </div>
                    ))}
                  </div>
                </Panel>

                <Panel title="Agent Roster" action="Profiles">
                  <div className="flex flex-wrap gap-2">
                    {agents.map((agent, index) => (
                      <span
                        key={agent}
                        className={`rounded-md border px-3 py-2 text-sm ${
                          index === 0
                            ? "border-zion-cyan/50 bg-zion-cyan/10 text-zion-cyan"
                            : "border-zion-line bg-[#0a0d10] text-zion-muted"
                        }`}
                      >
                        {agent}
                      </span>
                    ))}
                  </div>
                </Panel>
              </section>

              <section className="grid gap-4 xl:grid-cols-3">
                <MetricCard icon={Activity} label="Active Workspaces" value="15" detail="4 need review" />
                <MetricCard icon={TimerReset} label="Waiting On" value="7" detail="2 aging items" />
                <MetricCard icon={ShieldCheck} label="Risk Gates" value="3" detail="all enforced" />
              </section>
            </div>

            <aside className="grid content-start gap-4">
              <Panel title="Memory Inbox" action="Review">
                <div className="space-y-3">
                  {memories.map((memory) => (
                    <div key={memory.title} className="rounded-lg border border-zion-line bg-[#0a0d10] p-3">
                      <div className="flex items-start gap-3">
                        <Brain className="mt-0.5 shrink-0 text-zion-cyan" size={17} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium leading-5 text-zion-text">{memory.title}</p>
                          <p className="mt-1 text-xs text-zion-muted">{memory.scope}</p>
                        </div>
                        <span className="ml-auto rounded border border-zion-line px-2 py-1 text-[11px] text-zion-muted">{memory.level}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="Tasks / Waiting On" action="Open">
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.title} className="flex items-center gap-3 rounded-lg border border-zion-line bg-[#0a0d10] p-3">
                      <CircleDot className="shrink-0 text-zion-gold" size={16} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-zion-text">{task.title}</p>
                        <p className="mt-1 text-xs text-zion-muted">{task.owner}</p>
                      </div>
                      <span className="ml-auto rounded border border-zion-line px-2 py-1 text-[11px] text-zion-muted">{task.state}</span>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="Decision Log" action="Add">
                <div className="space-y-3">
                  {decisions.map((decision) => (
                    <div key={decision} className="flex items-start gap-3 text-sm text-zion-muted">
                      <Archive className="mt-0.5 shrink-0 text-zion-cyan" size={15} />
                      <span>{decision}</span>
                    </div>
                  ))}
                </div>
              </Panel>

              <div className="rounded-xl border border-zion-line bg-[#101417] p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-zion-gold/12 text-zion-gold">
                    <GitBranch size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zion-text">Audit Trail</p>
                    <p className="mt-1 text-xs text-zion-muted">Last route logged 42 seconds ago</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

function RoutePill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zion-line bg-zion-panel2 p-3">
      <p className="text-[11px] uppercase tracking-[0.14em] text-zion-muted">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-zion-text">{value}</p>
    </div>
  );
}

function FocusRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.14em] text-zion-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-zion-text">{value}</p>
    </div>
  );
}

function Panel({ title, action, children }: { title: string; action: string; children: React.ReactNode }) {
  return (
    <article className="rounded-xl border border-zion-line bg-zion-panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-zion-text">{title}</h2>
        <button className="text-xs font-medium text-zion-cyan">{action}</button>
      </div>
      {children}
    </article>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <article className="rounded-xl border border-zion-line bg-zion-panel p-5">
      <div className="flex items-center justify-between">
        <Icon className="text-zion-cyan" size={20} />
        <Sparkles className="text-zion-muted" size={16} />
      </div>
      <p className="mt-5 text-sm text-zion-muted">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <p className="text-3xl font-semibold text-zion-text">{value}</p>
        <p className="pb-1 text-xs text-zion-muted">{detail}</p>
      </div>
    </article>
  );
}
