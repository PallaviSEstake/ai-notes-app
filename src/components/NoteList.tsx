"use client";

import type { Note } from "@/types";
import NoteItem from "./NoteItem";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface NoteListProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function NoteList({
  notes,
  activeNoteId,
  onSelectNote,
  onDeleteNote,
  searchTerm,
  onSearchChange
}: NoteListProps) {
  return (
    <div className="flex flex-col h-full min-h-0">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9"
            />
          </div>
        </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {notes.length > 0 ? (
            notes.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                isActive={note.id === activeNoteId}
                onSelect={onSelectNote}
                onDelete={onDeleteNote}
              />
            ))
          ) : (
            <div className="text-center text-sm text-muted-foreground p-4">
              No notes found.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
