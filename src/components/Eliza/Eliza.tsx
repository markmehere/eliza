import { useEffect, useState } from 'react';
import ElizaSvg from '../../assets/eliza.svg?react';
import { useChat } from '../../hooks/useChat';
import styles from './Eliza.module.css';

interface ElizaProps {
  className?: string;
  smoking?: boolean;
  initialRun?: number;
  prebake?: number;
}

export function Eliza(props: ElizaProps) {
  const talking = useChat((state) => state.talking);
  const [prebakeTalking, setPrebakeTalking] = useState(!!props.prebake);

  useEffect(() => {
    if (props.prebake) {
      setTimeout(() => {
        setPrebakeTalking(false);
      }, props.prebake);
    }
  }, [props.prebake]);

  return (
    <ElizaSvg
      className={`${props.className || ''} ${props.smoking ? styles.pipe : ''} ${talking || prebakeTalking ? styles.talking : styles.idle}`}
    />
  );
}
