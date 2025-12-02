
export const playNotificationSound = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const t = ctx.currentTime;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Gentle major third chime (E5 -> G#5)
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(659.25, t); // E5
    oscillator.frequency.exponentialRampToValueAtTime(830.61, t + 0.1); // G#5

    // Soft envelope
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(0.1, t + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 1.5);

    oscillator.start(t);
    oscillator.stop(t + 1.5);
  } catch (error) {
    console.error("Failed to play sound:", error);
  }
};
