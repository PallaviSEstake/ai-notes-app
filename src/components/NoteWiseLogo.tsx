import { NotebookText } from 'lucide-react';

export function NoteWiseLogo() {
  return (
    <div className="flex items-center gap-2 text-foreground">
      <NotebookText className="h-7 w-7 text-primary" />
      <h1 className="text-xl font-bold tracking-tight">NoteWise</h1>
    </div>
  );
}
