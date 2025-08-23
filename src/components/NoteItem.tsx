"use client";

import type { Note } from "@/types";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface NoteItemProps {
  note: Note;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NoteItem({ note, isActive, onSelect, onDelete }: NoteItemProps) {
    const timeAgo = formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true });

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete(note.id);
    };

    return (
        <div
            onClick={() => onSelect(note.id)}
            className={cn(
                "group relative cursor-pointer p-3 rounded-lg transition-colors",
                isActive ? "bg-primary/20" : "hover:bg-muted"
            )}
        >
            <h3 className="font-semibold truncate text-primary-foreground">{note.title}</h3>
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your note titled "{note.title}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
