import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useChat } from '../../hooks/useChat';
import styles from './SendMessageBar.module.css';

export function SendMessageBar() {
  const { readyForInput, addPrompt } = useChat();
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoExpand = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  };

  useEffect(() => {
    autoExpand();
  }, [autoExpand]);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;
    window.addEventListener('resize', autoExpand);
    return () => window.removeEventListener('resize', autoExpand);
  }, [autoExpand]);

  const handleSend = (e: any) => {
    e.preventDefault();
    if (!readyForInput) return;
    addPrompt(input);
    setInput('');
    if (textareaRef.current) {
      const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
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
    <form onSubmit={handleSend} className={styles.messageForm}>
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className={styles.messageInput}
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
