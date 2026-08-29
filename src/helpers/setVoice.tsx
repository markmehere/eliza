export function setVoice(utterance?: SpeechSynthesisUtterance) {
  const voices = window.speechSynthesis.getVoices();
  const manlyVoice = voices.find(
    (v) =>
      v.name.toLowerCase().includes('male') ||
      v.name.toLowerCase().includes('david') ||
      v.name.toLowerCase().includes('daniel') ||
      v.name.toLowerCase().includes('google uk english male'),
  );

  if (manlyVoice && utterance) {
    utterance.voice = manlyVoice;
  }

  if (utterance) utterance.pitch = 0.7; // Lower pitch for a manlier tone
}
