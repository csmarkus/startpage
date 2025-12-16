import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Note } from '../types/note';

/**
 * Migrates legacy note data to new multi-note format
 * Handles both old object format and plain string format
 */
function migrateLegacyData(): Note[] {
  const legacy = localStorage.getItem('notes');
  if (!legacy) return [{ id: Date.now(), title: 'General', content: '', isExpanded: true }];

  try {
    const parsed = JSON.parse(legacy);

    // Already new format (array with isExpanded)
    if (Array.isArray(parsed)) {
      // Check if using old isOpen property and migrate it
      return parsed.map(note => ({
        ...note,
        isExpanded: note.isExpanded !== undefined ? note.isExpanded : (note as any).isOpen,
      }));
    }

    // Legacy object format
    if (parsed && typeof parsed === 'object') {
      return [{
        id: Date.now(),
        title: 'General',
        content: parsed.content || parsed,
        isExpanded: true,
      }];
    }

    // Plain string
    return [{ id: Date.now(), title: 'General', content: parsed, isExpanded: true }];
  } catch {
    // It was a plain string
    return [{ id: Date.now(), title: 'General', content: legacy, isExpanded: true }];
  }
}

/**
 * Custom hook for managing notes with localStorage persistence
 * Includes migration logic for legacy data formats
 * @returns Notes state and CRUD operations
 */
export function useNotes() {
  const [migrated, setMigrated] = useState(false);
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);

  // One-time migration on mount
  useEffect(() => {
    if (!migrated) {
      const migratedNotes = migrateLegacyData();
      if (migratedNotes.length > 0) {
        setNotes(migratedNotes);
      }
      setMigrated(true);
    }
  }, [migrated, setNotes]);

  const addNote = () => {
    const newNote: Note = {
      id: Date.now(),
      title: '',
      content: '',
      isExpanded: true,
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: number, field: 'title' | 'content', value: string) => {
    setNotes(
      notes.map(note =>
        note.id === id ? { ...note, [field]: value } : note
      )
    );
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const toggleNote = (id: number) => {
    setNotes(
      notes.map(note =>
        note.id === id ? { ...note, isExpanded: !note.isExpanded } : note
      )
    );
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    toggleNote,
  };
}
