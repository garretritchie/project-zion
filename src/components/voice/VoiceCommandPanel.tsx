"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Command, Mic2, RefreshCcw, Square } from "lucide-react";
import { useSpeechRecognition } from "@/src/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@/src/hooks/useSpeechSynthesis";
import { mockOracleRouter } from "@/src/lib/oracle/mockOracleRouter";
import type { ZionRoutingPayload } from "@/src/lib/oracle/routingTypes";

export type VoiceCommandPanelHandle = {
  startListening: () => void;
};

type VoiceState = "idle" | "listening" | "processing" | "speaking" | "complete" | "error";

export const VoiceCommandPanel = forwardRef<
  VoiceCommandPanelHandle,
  {
    payload: ZionRoutingPayload | null;
    onPayload: (payload: ZionRoutingPayload) => void;
  }
>(function VoiceCommandPanel({ payload, onPayload }, ref) {
  const recognition = useSpeechRecognition();
  const synthesis = useSpeechSynthesis();
  const processedTranscriptRef = useRef("");
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");

  const startListening = () => {
    if (!recognition.isSupported) {
      setVoiceState("error");
      return;
    }
    synthesis.stop();
    recognition.resetTranscript();
    processedTranscriptRef.current = "";
    setVoiceState("listening");
    recognition.startListening();
  };

  useImperativeHandle(ref, () => ({ startListening }));

  const stopListening = () => {
    recognition.stopListening();
    setVoiceState("processing");
  };

  const tryAgain = () => {
    synthesis.stop();
    recognition.resetTranscript();
    processedTranscriptRef.current = "";
    setVoiceState("idle");
  };

  useEffect(() => {
    if (!recognition.transcript) return;
    if (processedTranscriptRef.current === recognition.transcript) return;
    processedTranscriptRef.current = recognition.transcript;
    setVoiceState("processing");

    const nextPayload = mockOracleRouter({ rawInput: recognition.transcript, inputMode: "voice" });
    onPayload(nextPayload);

    window.setTimeout(() => {
      if (synthesis.isSupported) {
        setVoiceState("speaking");
        synthesis.speak(nextPayload.responseText);
      } else {
        setVoiceState("complete");
      }
    }, 250);
  }, [onPayload, recognition.transcript, synthesis]);

  useEffect(() => {
    if (voiceState === "speaking" && !synthesis.isSpeaking && payload) {
      setVoiceState("complete");
    }
  }, [payload, synthesis.isSpeaking, voiceState]);

  const transcript = recognition.transcript || recognition.interimTranscript;
  const unsupported = !recognition.isSupported;

  return (
    <aside id="voice-command-panel" className="min-w-0 rounded-xl border border-zion-line bg-zion-panel p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zion-cyan">Speak to Zion</p>
          <h2 className="mt-1 text-xl font-semibold">Transcript & details</h2>
          <p className="mt-2 text-sm leading-6 text-zion-muted">Voice stays here. Oracle listens, classifies locally, and Zion speaks back without moving you around the page.</p>
        </div>
        <button
          onClick={recognition.isListening ? stopListening : startListening}
          disabled={voiceState === "processing" || voiceState === "speaking"}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-zion-cyan px-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {recognition.isListening ? <Square size={16} /> : <Mic2 size={16} />}
          {primaryLabel(voiceState, recognition.isListening)}
        </button>
      </div>

      <div className="mt-5 grid gap-3">
        <div className="rounded-lg border border-zion-line bg-zion-panel2 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zion-muted">Status</p>
          <p className="mt-1 text-sm font-semibold text-zion-text">{statusText(voiceState, recognition.isListening, unsupported)}</p>
          {unsupported && <p className="mt-2 text-xs leading-5 text-zion-muted">Voice input is not supported in this browser. Try Chrome or Edge.</p>}
        </div>
        <div className="rounded-lg border border-zion-line bg-zion-panel2 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zion-muted">Transcript</p>
          <p className="mt-2 min-h-6 text-sm leading-6 text-zion-text">{transcript ? `You said: ${transcript}` : "No voice command captured yet."}</p>
        </div>
        <div className="rounded-lg border border-zion-line bg-zion-panel2 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zion-muted">Response</p>
          <p className="mt-2 text-sm leading-6 text-zion-text">{payload?.responseText ?? 'Click Speak and say "Hello Zion" to test the browser voice flow.'}</p>
          {payload && !synthesis.isSupported && <p className="mt-2 text-xs text-zion-muted">Speech output is not supported in this browser.</p>}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
          <VoiceDetail label="Scope" value={payload?.scope ?? "mixed"} />
          <VoiceDetail label="Container" value={payload?.container ?? "General"} />
          <VoiceDetail label="Agent" value={payload?.agent ?? "Oracle"} />
          <VoiceDetail label="Confidence" value={payload ? `${Math.round(payload.confidence * 100)}%` : "Ready"} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={tryAgain} className="inline-flex h-10 items-center gap-2 rounded-lg border border-zion-line bg-white px-3 text-sm font-semibold text-zion-muted hover:text-zion-text">
          <RefreshCcw size={16} />
          Try again
        </button>
      </div>

      {recognition.error && <p className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{recognition.error}</p>}
    </aside>
  );
});

function VoiceDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zion-line bg-zion-panel2 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zion-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-zion-text">{value}</p>
    </div>
  );
}

function statusText(state: VoiceState, isListening: boolean, unsupported: boolean) {
  if (unsupported) return "Voice unavailable";
  if (isListening) return "Oracle is listening...";
  if (state === "processing") return "Oracle is processing...";
  if (state === "speaking") return "Zion is speaking...";
  if (state === "complete") return "Voice route complete";
  if (state === "error") return "Voice input needs attention";
  return "Oracle is ready";
}

function primaryLabel(state: VoiceState, isListening: boolean) {
  if (isListening) return "Stop listening";
  if (state === "processing") return "Processing";
  if (state === "speaking") return "Speaking";
  return "Start listening";
}
