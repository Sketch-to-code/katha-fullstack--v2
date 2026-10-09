import { useCallback, useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { useReadingEvents } from '../context/ReadingEventContext';

export function useBookmarks(documentId) {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { publish } = useReadingEvents();

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get('/bookmarks', { params: { documentId } });
      setBookmarks(data.bookmarks);
    } catch {
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addBookmark = useCallback(
    async (page, thumbnailUrl) => {
      const { data } = await apiClient.post('/bookmarks', { documentId, page, thumbnailUrl });
      setBookmarks((prev) => [...prev, data]);
      publish('bookmark:created', { documentId, page });
      return data;
    },
    [documentId, publish]
  );

  const removeBookmark = useCallback(async (id) => {
    await apiClient.delete(`/bookmarks/${id}`);
    setBookmarks((prev) => prev.filter((b) => b._id !== id));
  }, []);

  return { bookmarks, loading, addBookmark, removeBookmark, refresh };
}
