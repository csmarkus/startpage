/**
 * Plays a notification sound using Web Audio API
 * Gracefully fails if AudioContext is not supported
 */
export function playNotificationSound(): void {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) {
      console.warn('AudioContext not supported');
      return;
    }

    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.5);

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (e) {
    console.error('Audio play failed:', e);
  }
}
