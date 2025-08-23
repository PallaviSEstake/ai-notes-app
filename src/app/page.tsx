"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Note } from "@/types";
import { sampleNotes } from "@/lib/sample-data";
import NoteList from "@/components/NoteList";
import NoteEditor from "@/components/NoteEditor";
import AiPanel from "@/components/AiPanel";
import Welcome from "@/components/Welcome";
import { useToast } from "@/hooks/use-toast";
import { summarizeNote } from "@/ai/flows/summarize-note";
import { suggestRelatedTopics } from "@/ai/flows/suggest-related-topics";
import { NoteWiseLogo } from "@/components/NoteWiseLogo";
import { Button } from "@/components/ui/button";
import { FilePlus2 } from "lucide-react";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you'd fetch notes from a DB
    const loadedNotes = sampleNotes.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    setNotes(loadedNotes);
    if (loadedNotes.length > 0) {
      setActiveNoteId(loadedNotes[0].id);
    }
  }, []);

  const handleNewNote = useCallback(() => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "Untitled Note",
      content: "",
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setActiveNoteId(newNote.id);
  }, []);

  const handleDeleteNote = useCallback((id: string) => {
    setNotes((prevNotes) => {
      const newNotes = prevNotes.filter((note) => note.id !== id);
      if (activeNoteId === id) {
        setActiveNoteId(newNotes.length > 0 ? newNotes[0].id : null);
      }
      return newNotes;
    });
  }, [activeNoteId]);

  const handleUpdateNote = useCallback((updatedNote: Partial<Note>) => {
    if (!activeNoteId) return;

    const noteToUpdate = { ...updatedNote, id: activeNoteId, updatedAt: new Date().toISOString() };

    setNotes((prevNotes) =>
      prevNotes
        .map((note) =>
          note.id === activeNoteId ? { ...note, ...noteToUpdate } : note
        )
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
    );
  }, [activeNoteId]);

  const handleSummarize = useCallback(async (noteContent: string) => {
    try {
      const { summary } = await summarizeNote({ noteContent });
      handleUpdateNote({ summary });
      toast({
        title: "Summary Generated",
        description: "The AI summary has been added to the note.",
      });
    } catch (error) {
      console.error("Failed to summarize note:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate summary.",
      });
    }
  }, [handleUpdateNote, toast]);

  const handleGetSuggestions = useCallback(async (noteContent: string) => {
    try {
      const { relatedTopics, keywords } = await suggestRelatedTopics({
        noteContent,
      });
      handleUpdateNote({ relatedTopics, keywords });
      toast({
        title: "Suggestions Found",
        description:
          "Related topics and keywords have been added to the note.",
      });
    } catch (error) {
      console.error("Failed to get suggestions:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not get suggestions.",
      });
    }
  }, [handleUpdateNote, toast]);

  const filteredNotes = useMemo(() => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [notes, searchTerm]);

  const activeNote = useMemo(
    () => notes.find((note) => note.id === activeNoteId),
    [notes, activeNoteId]
  );

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <aside className="w-[300px] flex flex-col bg-card border-r shrink-0">
        <div className="p-4 border-b">
          <NoteWiseLogo />
        </div>
        <div className="p-4 flex items-center gap-2">
            <Button onClick={handleNewNote} className="w-full">
                <FilePlus2 className="mr-2 h-4 w-4" /> New Note
            </Button>
        </div>
        <NoteList
          notes={filteredNotes}
          activeNoteId={activeNoteId}
          onSelectNote={setActiveNoteId}
          onDeleteNote={handleDeleteNote}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </aside>

      <main className="flex-1 flex min-w-0">
        {activeNote ? (
          <div className="flex flex-1 min-w-0">
            <div className="flex-1 flex flex-col min-w-0">
              <NoteEditor
                key={activeNote.id}
                note={activeNote}
                onUpdate={handleUpdateNote}
              />
            </div>
            <aside className="w-[350px] bg-card border-l flex flex-col shrink-0">
              <AiPanel
                note={activeNote}
                onSummarize={handleSummarize}
                onGetSuggestions={handleGetSuggestions}
              />
            </aside>
          </div>
        ) : (
          <Welcome onNewNote={handleNewNote} />
        )}
      </main>
    </div>
  );
}
