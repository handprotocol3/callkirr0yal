export class TonePlayer {
  private audioContext: AudioContext | null = null;
  private frequencies: { [key: string]: number } = {
    '1': 697,
    '2': 697,
    '3': 697,
    '4': 770,
    '5': 770,
    '6': 770,
    '7': 852,
    '8': 852,
    '9': 852,
    '*': 941,
    '0': 941,
    '#': 941,
  };

  private init() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
  }

  playTone(key: string, duration: number = 150) {
    this.init();
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.value = this.frequencies[key] || 800;

    gainNode.gain.value = 0.1;
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration / 1000);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  playRingtone() {
    this.init();
    if (!this.audioContext) return;

    const notes = [
      { freq: 1318.51, duration: 150 },
      { freq: 1567.98, duration: 150 },
      { freq: 2093.00, duration: 150 },
      { freq: 2637.02, duration: 450 }
    ];

    notes.forEach((note, index) => {
      setTimeout(() => {
        const oscillator = this.audioContext!.createOscillator();
        const gainNode = this.audioContext!.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext!.destination);

        oscillator.type = 'sine';
        oscillator.frequency.value = note.freq;

        gainNode.gain.value = 0.1;
        gainNode.gain.setValueAtTime(0, this.audioContext!.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext!.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, this.audioContext!.currentTime + note.duration / 1000);

        oscillator.start();
        oscillator.stop(this.audioContext!.currentTime + note.duration / 1000);
      }, index * 200);
    });
  }
}