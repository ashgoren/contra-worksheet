import { createContext, useContext, useState } from 'react';
import { generateSessionId } from 'utils';
import type { ReactNode } from 'react';

interface SessionIdContextValue {
  sessionId: string;
  regenerateSessionId: () => string;
  setSessionId: (sessionId: string) => void;
}

const SessionIdContext = createContext<SessionIdContextValue | null>(null);

const getInitialSessionId = () => localStorage.getItem('worksheetSessionId') || generateSessionId();

export const SessionIdProvider = ({ children }: { children: ReactNode }) => {
  const [sessionId, setSessionIdState] = useState(getInitialSessionId);

  const regenerateSessionId = () => {
    const newSessionId = generateSessionId();
    localStorage.setItem('worksheetSessionId', newSessionId);
    setSessionIdState(newSessionId);
    return newSessionId;
  };

  const setSessionId = (newSessionId: string) => {
    localStorage.setItem('worksheetSessionId', newSessionId);
    setSessionIdState(newSessionId);
  };

  return (
    <SessionIdContext.Provider value={{ sessionId, regenerateSessionId, setSessionId }}>
      {children}
    </SessionIdContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSessionId = () => {
  const context = useContext(SessionIdContext);
  if (!context) {
    throw new Error('useSessionId must be used within a SessionIdProvider');
  }
  return context;
};
