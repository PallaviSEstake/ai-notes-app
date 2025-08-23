"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Note } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Tags, X, FileText, FileCode } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NoteEditorProps {
  note: Note;
  onUpdate: (updatedNote: Partial<Note>) => void;
}

export default function NoteEditor({ note, onUpdate }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tags, setTags] = useState<string[]>(note.tags);
  const [tagInput, setTagInput] = useState("");

  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const triggerUpdate = useCallback((updatedFields: Partial<Note>) => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    updateTimeoutRef.current = setTimeout(() => {
      onUpdate(updatedFields);
    }, 500);
  }, [onUpdate]);

  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    triggerUpdate({ title: e.target.value });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    triggerUpdate({ content: e.target.value });
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        const newTags = [...tags, newTag];
        setTags(newTags);
        onUpdate({ tags: newTags });
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    onUpdate({ tags: newTags });
  };
  
  const handleExport = (format: 'md' | 'txt') => {
    const filename = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${format}`;
    const blob = new Blob([note.content], { type: format === 'md' ? 'text/markdown' : 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date(note.updatedAt).toLocaleString()}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleExport('md')}>
              <FileCode className="mr-2 h-4 w-4" />
              Markdown (.md)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('txt')}>
              <FileText className="mr-2 h-4 w-4" />
              Text (.txt)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="p-6 flex-grow flex flex-col gap-4 overflow-y-auto">
        <Input
          value={title}
          onChange={handleTitleChange}
          placeholder="Note Title"
          className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 h-auto p-0"
        />

        <Textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Start writing your note here... You can use Markdown for formatting."
          className="flex-grow border-none shadow-none focus-visible:ring-0 p-0 text-base resize-none"
        />

        <div>
          <div className="flex items-center gap-2 mb-2 text-muted-foreground">
             <Tags className="h-4 w-4" />
             <label className="text-sm font-medium">Tags</label>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="pl-3 pr-1">
                {tag}
                <button onClick={() => handleRemoveTag(tag)} className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5">
                   <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Input
              type="text"
              value={tagInput}
              onChange={handleTagInputChange}
              onKeyDown={handleTagInputKeyDown}
              placeholder="Add a tag..."
              className="h-8 w-auto flex-1 border-none shadow-none focus-visible:ring-0 p-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
