import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ElizaBrain } from '../ai/ElizaBrain';
import type { Dialogue } from '../constants/Dialogue';
import { setVoice } from '../helpers/setVoice';

type ChatStore = {
  chat: string[];
  covered: Set<Dialogue>;
  threshold: number;
  waitingForResponse: boolean;
  announcedSanity: boolean;
  readyForInput: boolean;
  talking: boolean;
  addPrompt: (message: string) => void;
  addResponse: (message: string, which: Dialogue, delay?: number) => void;
};

const eliza = new ElizaBrain();

export const useChat = create<ChatStore>()(
  persist(
    (set, get) => ({
      chat: [],
      covered: new Set(),
      threshold: 25,
      waitingForResponse: true,
      announcedSanity: false,
      readyForInput: false,
      talking: false,
      addPrompt: (message: string) => {
        const chat = [...get().chat, message];
        const oldAnnouncedSanity = get().announcedSanity;
        const announcedSanity = get().announcedSanity ||
          get().covered.size >= get().threshold;
        set({
          chat,
          waitingForResponse: true,
          announcedSanity,
          readyForInput: false,
        });
        const newResponse = eliza.analyze(
          chat,
          announcedSanity !== oldAnnouncedSanity && chat.length > 3,
          get().covered
        );
        get().addResponse(newResponse.message, newResponse.which);
      },
      addResponse: (message: string, which: Dialogue, delay: number = 500) => {
        setTimeout(() => {
          try {
            set({
              chat: [...get().chat, message],
              covered: new Set([...get().covered, which]),
              waitingForResponse: false,
              readyForInput: false,
            });
            const utterance = new SpeechSynthesisUtterance(message);
            setVoice(utterance);
            utterance.onstart = () => {
              set({ talking: true });
            };
            utterance.onend = () => {
              set({
                talking: false,
                readyForInput: true,
              });
            };
            utterance.onerror = () => {
              set({
                talking: false,
                readyForInput: true,
              });
            };
            speechSynthesis.speak(utterance);
          } catch (_e) {
            set({
              talking: false,
              readyForInput: true,
            });
          }
        }, delay);
      },
    }),
    {
      name: 'eliza-store',
      partialize: (state: ChatStore) => ({
        covered: state.covered,
      }),
      storage: {
        getItem: (name: string) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: { ...state, covered: new Set<Dialogue>(state.covered) },
          };
        },
        setItem: (name: string, value: { state: Pick<ChatStore, 'covered'> }) => {
          localStorage.setItem(
            name,
            JSON.stringify({
              state: {
                ...value.state,
                covered: Array.from(value.state.covered),
              },
            }),
          );
        },
        removeItem: (name: string) => localStorage.removeItem(name),
      },
    },
  ),
);
