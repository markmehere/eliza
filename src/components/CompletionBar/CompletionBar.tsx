import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { Dialogue, dialogueTranslation } from '../../constants/Dialogue';
import { useChat } from '../../hooks/useChat';
import styles from './CompletionBar.module.css';
import { SaneStamp } from '../SaneStamp/SaneStamp';

interface CompletionBarProps {
  className?: string;
  forceDialogue: (which: Dialogue) => void;
}

export function CompletionBar({ className, forceDialogue }: CompletionBarProps) {
  const { covered, threshold } = useChat();
  const progress = covered.size;
  const total = Math.min(Dialogue.LAST, threshold);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const previousProgress = useRef(undefined as number | undefined);
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showCompletionsModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    if (previousProgress.current === undefined) {
      previousProgress.current = progress;
      return;
    }

    if (previousProgress.current !== progress) {
      setIsHighlighting(true);

      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }

      highlightTimeoutRef.current = setTimeout(() => {
        setIsHighlighting(false);
      }, 2500);

      previousProgress.current = progress;
    }

    return () => {
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, [progress]);

  return (
    <>
      <Modal
        isOpen={showCompletionsModal}
        onRequestClose={() => setShowCompletionModal(false)}
        contentLabel="Dialogue Completions"
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <div className={styles.modalHeader}>
          <h2>Residual Therepeutic Touchstones</h2>
          <button className={styles.closeButton} onClick={() => setShowCompletionModal(false)} aria-label="Close">
            ✕
          </button>
        </div>
        <div className={styles.modalBody}>
          {Array.from({ length: Dialogue.LAST }, (_, key) => key).map((key) => {
            const onClick = !covered.has(key)
              ? () => {
                  forceDialogue(key);
                  setShowCompletionModal(false);
                }
              : undefined;

            return (
              <div
                key={key}
                className={`${styles.dialogueItem} ${covered.has(key) ? styles.completed : styles.incomplete}`}
                role="button"
                tabIndex={covered.has(key) ? -1 : 0}
                onClick={onClick}
                onKeyDown={(event) => {
                  if (onClick && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault();
                    onClick();
                  }
                }}
              >
                <div className={styles.dialogueStatus}>
                  <div className={styles.statusIndicator} />
                </div>
                <div className={styles.dialogueText}>
                  {dialogueTranslation[key as keyof typeof dialogueTranslation]}
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
      <div className={`${className} ${styles.bar}`} onClick={() => setShowCompletionModal(true)}>
        {(progress >= total) && <SaneStamp />}
        <div className={styles.container}>
          <div className={styles.trackBackground}>
            {/* Animated Fill */}
            <motion.div
              className={`${styles.fill} ${progress >= total ? styles.foreverGold : isHighlighting ? styles.goldGlow : ''}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress / total, 1) * 100.0}%` }}
              transition={{ type: 'spring', stiffness: 90, damping: 15 }}
            >
              {/* Glossy Top Highlight */}
              <div className={styles.highlight} />

              {/* Subtle moving shine pulse */}
              <motion.div
                className={styles.shine}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
