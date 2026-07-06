import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain, CheckCircle2, LockKeyhole, Mic2, Network, ShieldCheck } from "lucide-react";

const pillars = [
  {
    title: "Capture",
    text: "Collect thoughts, notes, tasks, decisions, files, and voice input before they disappear.",
    icon: Brain
  },
  {
    title: "Route",
    text: "Oracle assigns ownership first, then chooses the right workspace, agent, and capability.",
    icon: Network
  },
  {
    title: "Protect",
    text: "Memory, permissions, and audit logs keep private, business, and client context separated.",
    icon: ShieldCheck
  }
];

const roadmap = ["Text capture", "Mock Oracle routing", "Memory inbox", "Tasks and waiting-on", "Decision log"];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link className="flex items-center gap-3" href="/">
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-zion-line bg-zion-panel text-lg font-semibold text-zion-cyan">
            Z
          </span>
          <span>
            <span className="block text-sm font-semibold tracking-wide text-zion-text">Zion 2.0</span>
            <span className="block text-xs text-zion-muted">Private AI OS</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-zion-muted md:flex">
          <a className="transition hover:text-zion-text" href="#system">
            System
          </a>
          <a className="transition hover:text-zion-text" href="#roadmap">
            MVP
          </a>
          <a className="transition hover:text-zion-text" href="#security">
            Security
          </a>
        </nav>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-14 pt-8 lg:grid-cols-[0.94fr_1.06fr] lg:px-8">
        <div className="max-w-3xl">
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-normal text-zion-text sm:text-6xl lg:text-7xl">
            Zion 2.0
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zion-muted">
            A private command center for capturing scattered thoughts, routing work through Oracle, protecting memory boundaries, and turning ideas into execution.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-zion-cyan px-5 text-sm font-semibold text-zion-bg transition hover:bg-[#86f0e0]"
              href="#system"
            >
              View foundation
              <ArrowRight size={17} strokeWidth={2.2} />
            </a>
            <a
              className="inline-flex h-12 items-center justify-center rounded-md border border-zion-line bg-zion-panel px-5 text-sm font-semibold text-zion-text transition hover:border-zion-cyan/60"
              href="#roadmap"
            >
              MVP roadmap
            </a>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.title} className="rounded-lg border border-zion-line bg-zion-panel/70 p-4">
                  <Icon className="mb-4 text-zion-cyan" size={22} strokeWidth={1.9} />
                  <h2 className="text-sm font-semibold text-zion-text">{pillar.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-zion-muted">{pillar.text}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="rounded-xl border border-zion-line bg-zion-panel p-3 shadow-command">
            <Image
              src="/assets/zion-dashboard-inspiration.webp"
              alt="Dark command-center dashboard inspiration"
              width={1024}
              height={768}
              priority
              className="aspect-[4/3] w-full rounded-lg object-cover"
            />
          </div>
          <div className="absolute -bottom-7 left-6 right-6 rounded-lg border border-zion-line bg-[#0d1114]/95 p-4 shadow-command backdrop-blur">
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="text-sm font-semibold text-zion-text">Oracle routing preview</p>
                <p className="mt-1 text-xs text-zion-muted">Owner first. Capability second. Agent third.</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-md border border-zion-line px-3 py-2 text-xs text-zion-cyan">
                <Mic2 size={14} />
                Push-to-talk later
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="system" className="border-y border-zion-line bg-zion-bg/58 px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="text-3xl font-semibold text-zion-text">Base system shape</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-zion-muted">
              The first local build starts with the app shell, route-aware landing page, and the data model needed for workspaces, agents, memory proposals, decisions, tasks, and audit logs.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Oracle router", "Workspace graph", "Agent profiles", "Memory inbox", "Decision log", "Audit trail"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-zion-line bg-zion-panel p-4">
                <CheckCircle2 className="shrink-0 text-zion-cyan" size={19} />
                <span className="text-sm font-medium text-zion-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap" className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-2 lg:px-8">
        <div className="rounded-xl border border-zion-line bg-zion-panel p-6">
          <h2 className="text-2xl font-semibold text-zion-text">First MVP loop</h2>
          <ul className="mt-6 space-y-4">
            {roadmap.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-zion-muted">
                <span className="h-2 w-2 rounded-full bg-zion-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div id="security" className="rounded-xl border border-zion-line bg-zion-panel p-6">
          <LockKeyhole className="text-zion-cyan" size={28} />
          <h2 className="mt-5 text-2xl font-semibold text-zion-text">Permissioned by default</h2>
          <p className="mt-4 text-base leading-7 text-zion-muted">
            MVP actions stay conservative: read, summarize, draft, and queue. Zion should not send messages, delete files, modify business systems, or enable live trading without explicit future approval gates.
          </p>
        </div>
      </section>
    </main>
  );
}
