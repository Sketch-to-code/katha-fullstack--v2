import { useCallback, useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

export function useNotes(documentId) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get('/notes', { params: { documentId } });
      setNotes(data.notes);
    } catch {
      setNotes([]);
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addNote = useCallback(
    async (page, highlightedText, body) => {
      const { data } = await apiClient.post('/notes', { documentId, page, highlightedText, body });
      setNotes((prev) => [...prev, data]);
      return data;
    },
    [documentId]
  );

  const updateNote = useCallback(async (id, patch) => {
    const { data } = await apiClient.patch(`/notes/${id}`, patch);
    setNotes((prev) => prev.map((n) => (n._id === id ? data : n)));
  }, []);

  const removeNote = useCallback(async (id) => {
    await apiClient.delete(`/notes/${id}`);
    setNotes((prev) => prev.filter((n) => n._id !== id));
  }, []);

  return { notes, loading, addNote, updateNote, removeNote, refresh };
}
