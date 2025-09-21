import { useState, useEffect, useCallback } from 'react';

export const useTextToSpeech = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [auraVoice, setAuraVoice] = useState<SpeechSynthesisVoice | null>(null);

  const populateVoices = useCallback(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    if (availableVoices.length > 0) {
      setVoices(availableVoices);
    }
  }, []);

  useEffect(() => {
    // The 'voiceschanged' event is fired when the list of voices is ready.
    window.speechSynthesis.addEventListener('voiceschanged', populateVoices);
    // Also call it directly in case the voices are already loaded.
    populateVoices(); 

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', populateVoices);
    };
  }, [populateVoices]);

  useEffect(() => {
    // Select the best voice for Aura once voices are loaded.
    if (voices.length > 0 && !auraVoice) {
      // Prioritize high-quality, natural-sounding voices.
      // The exact names can vary wildly between browsers and OS.
      const preferredVoices = [
        // High-quality cloud voices (often contain "Google")
        (v: SpeechSynthesisVoice) => v.name.includes('Google') && v.name.includes('Female') && v.lang.startsWith('en'),
        // Standard high-quality voices on Apple devices
        (v: SpeechSynthesisVoice) => v.name === 'Samantha' && v.lang.startsWith('en'),
        // Microsoft's newer voices
        (v: SpeechSynthesisVoice) => v.name.includes('Zira') && v.lang.startsWith('en'),
        (v: SpeechSynthesisVoice) => v.name.includes('Aria') && v.lang.startsWith('en'),
        // Generic fallbacks
        (v: SpeechSynthesisVoice) => v.name.includes('Female') && v.lang.startsWith('en'),
        (v: SpeechSynthesisVoice) => v.lang.startsWith('en-IN'), // Indian English voice as a good option
        (v: SpeechSynthesisVoice) => v.lang.startsWith('en-GB'),
        (v: SpeechSynthesisVoice) => v.lang.startsWith('en-US'),
      ];
      
      let selectedVoice: SpeechSynthesisVoice | undefined;
      for (const condition of preferredVoices) {
        selectedVoice = voices.find(condition);
        if (selectedVoice) break;
      }
      
      setAuraVoice(selectedVoice || voices.find(v => v.lang.startsWith('en')) || voices[0]);
    }
  }, [voices, auraVoice]);

  const speak = useCallback((text: string) => {
    if (!auraVoice || !window.speechSynthesis) return;

    // Cancel any previous utterance to avoid overlap.
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = auraVoice;
    utterance.pitch = 1; // Default
    utterance.rate = 1;  // Default
    window.speechSynthesis.speak(utterance);
  }, [auraVoice]);

  const cancel = useCallback(() => {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
  }, []);

  return { speak, cancel };
};
