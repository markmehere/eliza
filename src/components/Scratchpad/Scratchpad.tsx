import { useEffect, useRef, useState } from 'react';
import { useChat } from '../../hooks/useChat';
import { MessageNeeded } from '../MessageNeeded/MessageNeeded';
import styles from './Scratchpad.module.css';

interface ScratchpadProps {
  className?: string;
  forcedDialogue: number;
  clearForcedDialogue: () => void;
}

export function Scratchpad({ className, forcedDialogue, clearForcedDialogue }: ScratchpadProps) {
  const chat = useChat((state) => state.chat);
  const [revealed, setRevealed] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const maxChatLen = useRef(chat.length);
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    const revealInterval = setInterval(() => {
      setRevealed((rev) => rev + 1);
    }, 30);
    return () => clearInterval(revealInterval);
  }, []);

  useEffect(() => {
    setRevealed(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    maxChatLen.current = chat.length;
  }, [chat.length]);

  return (
    <div className={styles.parent}>
      <div ref={scrollRef} className={`${className || ''} ${styles.scratchpad}`}>
        {chat.map((conv, i) => {
          const lines = conv.replace(/\r\n?/g, '\n').split('\n\n');
          if (lines.length === 1) {
            if (i % 2) {
              return <p key={i}>{lines[0]}</p>;
            } else if (i >= maxChatLen.current) {
              return (
                <p key={i} className="font-bold">
                  &nbsp;
                </p>
              );
            } else if (i < chat.length - 1) {
              return (
                <p key={i} className="font-bold">
                  {lines[0]}
                </p>
              );
            } else {
              return (
                <p key={i} className="font-bold">
                  {lines[0].substring(0, revealed)}
                </p>
              );
            }
          } else {
            return lines.map((line, c) => (
              <p key={`${i}-${c}`} className={styles.multi}>
                {line}
              </p>
            ));
          }
        })}
      </div>
      {!isTouchDevice && <MessageNeeded forcedDialogue={forcedDialogue} clearForcedDialogue={clearForcedDialogue} />}
    </div>
  );
}
