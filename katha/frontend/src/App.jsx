import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/Layout/AppShell';
import LibraryGrid from './components/Library/LibraryGrid';
import BookViewer from './components/Reader/BookViewer';
import BookmarksPanel from './components/Bookmarks/BookmarksPanel';
import NotesPanel from './components/Notes/NotesPanel';
import SettingsPanel from './components/Settings/SettingsPanel';
import { ThemeProvider } from './context/ThemeContext';
import { ReadingEventProvider } from './context/ReadingEventContext';

export default function App() {
  return (
    <ThemeProvider>
      <ReadingEventProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppShell />}>
              <Route path="/" element={<LibraryGrid />} />
              <Route path="/read/:id" element={<BookViewer />} />
              <Route path="/bookmarks" element={<BookmarksPanel />} />
              <Route path="/notes" element={<NotesPanel />} />
              <Route path="/settings" element={<SettingsPanel />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ReadingEventProvider>
    </ThemeProvider>
  );
}
