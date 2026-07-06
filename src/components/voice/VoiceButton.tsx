"use client";

import { Mic2 } from "lucide-react";

export function VoiceButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="order-3 inline-flex h-12 w-9 items-center justify-center gap-2 rounded-lg border border-zion-line bg-zion-panel px-0 text-sm font-semibold text-zion-text sm:order-none sm:w-auto sm:px-4"
      aria-label="Speak"
    >
      <Mic2 size={17} />
      <span className="hidden sm:inline">Speak</span>
    </button>
  );
}
