import { useCallback, useState } from 'react';
import apiClient from '../api/apiClient';

export function useAIAssistant() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const assist = useCallback(async (text, mode) => {
    setPending(true);
    setError(null);
    setResponse(null);
    try {
      const { data } = await apiClient.post('/ai/assist', { text, mode });
      setResponse(data);
      return data;
    } catch (err) {
      const message = err.response?.data?.error || 'The AI assistant could not respond just now.';
      setError(message);
      throw err;
    } finally {
      setPending(false);
    }
  }, []);

  return { assist, pending, error, response, clear: () => setResponse(null) };
}
