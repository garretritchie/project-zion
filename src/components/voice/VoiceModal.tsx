"use client";

import { useEffect, useRef, useState } from "react";
import { Command, Mic2, RefreshCcw, Square, X } from "lucide-react";
import { useSpeechRecognition } from "@/src/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@/src/hooks/useSpeechSynthesis";
import { mockOracleRouter } from "@/src/lib/oracle/mockOracleRouter";
import type { ZionRoutingPayload } from "@/src/lib/oracle/routingTypes";

type VoiceState = "idle" | "listening" | "processing" | "speaking" | "complete" | "error";

export function VoiceModal({
  open,
  onClose,
  onPayload
}: {
  open: boolean;
  onClose: () => void;
  onPayload: (payload: ZionRoutingPayload) => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const processedTranscriptRef = useRef("");
  const recognition = useSpeechRecognition();
  const synthesis = useSpeechSynthesis();
  const [payload, setPayload] = useState<ZionRoutingPayload | null>(null);
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  useEffect(() => {
    if (!open) {
      recognition.stopListening();
      synthesis.stop();
      setVoiceState("idle");
      processedTranscriptRef.current = "";
    }
  }, [open, recognition, synthesis]);

  useEffect(() => {
    if (!open || !recognition.transcript) return;
    if (processedTranscriptRef.current === recognition.transcript) return;
    processedTranscriptRef.current = recognition.transcript;
    setVoiceState("processing");
    const nextPayload = mockOracleRouter({ rawInput: recognition.transcript, inputMode: "voice" });
    setPayload(nextPayload);
    onPayload(nextPayload);

    window.setTimeout(() => {
      if (synthesis.isSupported) {
        setVoiceState("speaking");
        synthesis.speak(nextPayload.responseText);
      } else {
        setVoiceState("complete");
      }
    }, 250);
  }, [onPayload, open, recognition.transcript, synthesis]);

  useEffect(() => {
    if (voiceState === "speaking" && !synthesis.isSpeaking && payload) {
      setVoiceState("complete");
    }
  }, [payload, synthesis.isSpeaking, voiceState]);

  if (!open) return null;

  const visibleTranscript = recognition.transcript || recognition.interimTranscript;
  const unsupported = !recognition.isSupported;
  const primaryLabel = getPrimaryLabel(voiceState, recognition.isListening);

  const start = () => {
    if (unsupported) {
      setVoiceState("error");
      return;
    }
    setPayload(null);
    setVoiceState("listening");
    recognition.resetTranscript();
    recognition.startListening();
  };

  const stop = () => {
    recognition.stopListening();
    setVoiceState("processing");
  };

  const tryAgain = () => {
    synthesis.stop();
    recognition.resetTranscript();
    processedTranscriptRef.current = "";
    setPayload(null);
    setVoiceState("idle");
  };

  const close = () => {
    recognition.stopListening();
    synthesis.stop();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-zion-text/28 p-3 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="voice-modal-title" onMouseDown={close}>
      <section className="w-full max-w-2xl rounded-xl border border-zion-line bg-white p-4 shadow-command sm:p-6" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-zion-cyan/30 bg-zion-cyan/10 text-zion-cyan">
              <Command size={20} />
            </div>
            <div>
              <h2 id="voice-modal-title" className="text-xl font-semibold">Speak to Zion</h2>
              <p className="mt-1 text-sm text-zion-muted">Oracle will listen, classify, and respond.</p>
            </div>
          </div>
          <button ref={closeButtonRef} onClick={close} className="grid h-9 w-9 place-items-center rounded-lg border border-zion-line text-zion-muted hover:text-zion-text" aria-label="Close voice modal">
            <X size={17} />
          </button>
        </div>

        <div className="mt-5 rounded-xl border border-zion-line bg-[radial-gradient(circle_at_50%_0%,rgba(11,167,160,0.14),transparent_18rem),#f7fbfb] p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-zion-cyan">{statusText(voiceState, recognition.isListening, unsupported)}</p>
              <p className="mt-1 text-sm text-zion-muted">
                {unsupported ? "Voice input is not supported in this browser. Try Chrome or Edge." : "Say hello or give Zion a short command."}
              </p>
            </div>
            <button
              onClick={recognition.isListening ? stop : start}
              disabled={voiceState === "processing" || voiceState === "speaking"}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-zion-cyan px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {recognition.isListening ? <Square size={16} /> : <Mic2 size={16} />}
              {primaryLabel}
            </button>
          </div>

          <div className="mt-4 rounded-lg border border-zion-line bg-white p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zion-muted">Transcript</p>
            <p className="mt-2 min-h-6 text-sm leading-6 text-zion-text">{visibleTranscript ? `You said: ${visibleTranscript}` : "Waiting for voice input."}</p>
          </div>

          {payload && (
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <VoicePayloadTile label="Scope" value={payload.scope} />
              <VoicePayloadTile label="Container" value={payload.container} />
              <VoicePayloadTile label="Privacy" value={payload.privacyLevel} />
              <VoicePayloadTile label="Agent" value={payload.agent} />
              <VoicePayloadTile label="Skill" value={payload.skill} />
              <VoicePayloadTile label="Confidence" value={`${Math.round(payload.confidence * 100)}%`} />
            </div>
          )}

          {payload && (
            <div className="mt-3 rounded-lg border border-zion-line bg-white p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zion-muted">Zion response</p>
              <p className="mt-2 text-sm leading-6 text-zion-text">{payload.responseText}</p>
              {!synthesis.isSupported && <p className="mt-2 text-xs text-zion-muted">Speech output is not supported in this browser.</p>}
            </div>
          )}

          {recognition.error && <p className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{recognition.error}</p>}
        </div>

        <div className="mt-4 flex flex-wrap justify-end gap-2">
          {payload && (
            <button onClick={tryAgain} className="inline-flex h-10 items-center gap-2 rounded-lg border border-zion-line bg-zion-panel px-3 text-sm font-semibold text-zion-text">
              <RefreshCcw size={16} />
              Try again
            </button>
          )}
          <button onClick={close} className="h-10 rounded-lg border border-zion-line bg-white px-3 text-sm font-semibold text-zion-muted hover:text-zion-text">
            Close
          </button>
        </div>
      </section>
    </div>
  );
}

function VoicePayloadTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zion-line bg-white p-3">
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

function getPrimaryLabel(state: VoiceState, isListening: boolean) {
  if (isListening) return "Stop listening";
  if (state === "processing") return "Processing...";
  if (state === "speaking") return "Speaking...";
  return "Start listening";
}
