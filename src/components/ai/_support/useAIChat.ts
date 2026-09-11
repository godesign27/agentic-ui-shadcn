import { useState, useRef } from 'react';
import { PATTERNS, LOADERS, type ChatMsg, type UserMsg, type LoadingMsg, type AIMsg } from './AIResponsePatterns';

let _msgId = 0;
const nextId = () => `m-${++_msgId}-${Date.now()}`;

export function useAIChat() {
  const [inputValue,  setInputValue]  = useState('');
  const [messages,    setMessages]    = useState<ChatMsg[]>([]);
  const patternCount  = useRef(0);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;

    const idx     = patternCount.current % PATTERNS.length;
    const loader  = LOADERS[idx];
    const pattern = PATTERNS[idx];
    patternCount.current += 1;

    const userId = nextId();
    const loadId = nextId();
    const aiId   = nextId();

    setMessages(prev => [
      ...prev,
      { id: userId, kind: 'user', text } as UserMsg,
      { id: loadId, kind: 'loading', variant: loader } as LoadingMsg,
    ]);
    setInputValue('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev.filter(m => m.id !== loadId),
        { id: aiId, kind: 'ai', pattern, userText: text } as AIMsg,
      ]);
    }, 2000);
  };

  return { inputValue, setInputValue, messages, handleSend };
}
