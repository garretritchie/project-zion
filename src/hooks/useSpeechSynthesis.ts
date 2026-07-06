"use client";

import { useCallback, useEffect, useState } from "react";

type SpeechOptions = {
  pitch?: number;
  rate?: number;
  voiceHint?: string;
};

export function useSpeechSynthesis() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    setIsSupported(typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window);
  }, []);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
  }, []);

  const stop = useCallback(() => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string, options?: SpeechOptions) => {
      if (!text || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
        setIsSupported(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const voiceHint = options?.voiceHint?.toLowerCase();
      utterance.voice = voiceHint ? voices.find((voice) => voice.name.toLowerCase().includes(voiceHint)) ?? null : null;
      utterance.rate = options?.rate ?? 0.98;
      utterance.pitch = options?.pitch ?? 1;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    },
    [voices]
  );

  useEffect(() => stop, [stop]);

  return {
    isSupported,
    isSpeaking,
    speak,
    stop
  };
}
