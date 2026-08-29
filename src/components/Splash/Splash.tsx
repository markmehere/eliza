import { useEffect } from 'react';
import { Dialogue } from '../../constants/Dialogue';
import { setVoice } from '../../helpers/setVoice';
import { useChat } from '../../hooks/useChat';
import { Eliza } from '../Eliza/Eliza';
import styles from './Splash.module.css';

interface SplashProps {
  hide?: boolean;
  onClick?: () => void;
}

export function Splash({ hide, onClick }: SplashProps) {
  const addResponse = useChat((state) => state.addResponse);

  useEffect(() => {
    if (hide) {
      const text = 'Welcome';
      const utterance = new SpeechSynthesisUtterance(text);
      setVoice(utterance);
      speechSynthesis.speak(utterance);
      addResponse("My name is Eliza what's yours?", Dialogue.HELLO, 2000);
    }
  }, [hide, addResponse]);

  return (
    <div className={`${styles.container} ${hide ? styles.fadeOut : ''}`} onClick={onClick}>
      <div className={styles.banner}>
        <Eliza smoking />
        <div>
          <h1>ELIZA</h1>
          <h6>a therapist of sorts...</h6>
        </div>
      </div>
    </div>
  );
}
