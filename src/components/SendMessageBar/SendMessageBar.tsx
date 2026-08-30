import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useChat } from '../../hooks/useChat';
import styles from './SendMessageBar.module.css';

interface SendMessageBarProps {
  setSimplified: (value: boolean) => void,
  simplified?: boolean
  combination: [string, Dispatch<SetStateAction<string>>]
}

export function SendMessageBar({
  setSimplified,
  simplified,
  combination
}: SendMessageBarProps) {
  const { readyForInput, addPrompt } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  const [input, setInput] = combination;

  const autoExpand = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  };

  useEffect(() => {
    autoExpand();
  }, [input.length]);

  useEffect(() => {
    if (isTouchDevice && simplified && textareaRef.current) textareaRef.current.focus();
    if (isTouchDevice) return;
    window.addEventListener('resize', autoExpand);
    return () => window.removeEventListener('resize', autoExpand);
  }, []);

  const handleSend = (e: any) => {
    e.preventDefault();
    if (!readyForInput) return;
    if (!input.trim()) return;
    addPrompt(input);
    setInput('');
    if (textareaRef.current) {
      if (isTouchDevice) {
        textareaRef.current.blur();
      }
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <form onSubmit={handleSend} className={`${styles.messageForm} ${simplified ? '' : 'flex-none'}`}>
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className={styles.messageInput}
        onFocus={() => isTouchDevice ? setSimplified(true) : undefined}
        onBlur={() => setTimeout(() => setSimplified(false), 200)}
      />

      <motion.button
        type="submit"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={styles.sendButton}
      >
        <span className={styles.sendButtonText}>→</span>
        <div className={styles.hoverEffect} />
      </motion.button>
    </form>
  );
}
