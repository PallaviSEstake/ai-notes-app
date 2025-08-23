"use client";
import { Button } from "./ui/button";
import { FilePlus2, MousePointerSquareDashed } from "lucide-react";

interface WelcomeProps {
    onNewNote: () => void;
}

export default function Welcome({ onNewNote }: WelcomeProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center bg-background p-8">
            <div className="max-w-md">
                <div className="mb-4 flex justify-center">
                    <div className="bg-primary/20 p-4 rounded-full">
                        <MousePointerSquareDashed className="h-10 w-10 text-primary" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome to NoteWise</h2>
                <p className="text-muted-foreground mb-6">
                    Select a note from the list on the left to start editing, or create a new note to begin your journey.
                </p>
                <Button onClick={onNewNote}>
                    <FilePlus2 className="mr-2 h-4 w-4" /> Create Your First Note
                </Button>
            </div>
        </div>
    );
}
