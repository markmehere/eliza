import { useEffect, useRef, useState } from 'react';
import { Dialogue, dialogueTranslation } from '../../constants/Dialogue';
import { useChat } from '../../hooks/useChat';
import styles from './MessageNeeded.module.css';

interface MessageNeededProps {
  forcedDialogue: number;
  clearForcedDialogue: () => void;
}

export function MessageNeeded({ forcedDialogue, clearForcedDialogue }: MessageNeededProps) {
  const chat = useChat();
  const dt = dialogueTranslation as Record<number, string>;
  const missingMessages = Array.from({ length: Dialogue.LAST }, (_, i) => i)
    .map((i) => (chat.covered.has(i) ? '' : (dt[i] ?? '')))
    .filter((c) => c);
  const [appear, setAppear] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const whichRef = useRef(-1);
  const onClick = () => {
    whichRef.current = Math.floor(missingMessages.length * Math.random());
    setAppear(true);
  };
  const missingMessage = useRef('');

  useEffect(() => {
    if (chat.chat.length >= 3) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setAppear(false);
      if (chat.covered.size < chat.threshold) {
        timerRef.current = setTimeout(() => {
          setAppear(true);
          missingMessage.current = missingMessages[Math.floor(missingMessages.length * Math.random())];
        }, 12000);
      }
    }
  }, [missingMessages.length, chat.chat.length]);

  useEffect(() => {
    if (forcedDialogue > -1) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setAppear(true);
      clearForcedDialogue();
      missingMessage.current = dt[forcedDialogue];
    }
  }, [forcedDialogue]);

  if (!missingMessage.current) return <div className={`${styles.placeholder}`}></div>;

  return (
    <div className={`${styles.placeholder}`} onClick={onClick}>
      <div className={`${styles.container} ${appear ? styles.appear : ''}`}>
        Try getting Eliza to say:&nbsp;
        <b>{missingMessage.current}</b>
      </div>
    </div>
  );
}
