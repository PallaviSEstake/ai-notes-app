"use client";

import { useState } from "react";
import type { Note } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Wand2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface AiPanelProps {
  note: Note;
  onSummarize: (content: string) => Promise<void>;
  onGetSuggestions: (content: string) => Promise<void>;
}

export default function AiPanel({ note, onSummarize, onGetSuggestions }: AiPanelProps) {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleSummarizeClick = async () => {
    if (!note.content) return;
    setIsSummarizing(true);
    await onSummarize(note.content);
    setIsSummarizing(false);
  };

  const handleSuggestionsClick = async () => {
    if (!note.content) return;
    setIsSuggesting(true);
    await onGetSuggestions(note.content);
    setIsSuggesting(false);
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Wand2 className="mr-2 h-5 w-5 text-accent" />
              Smart Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSummarizing ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : note.summary ? (
              <p className="text-sm text-muted-foreground">{note.summary}</p>
            ) : (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Generate a concise summary of your note.
                </p>
                <Button onClick={handleSummarizeClick} disabled={!note.content || isSummarizing}>
                  {isSummarizing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Generate Summary
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Wand2 className="mr-2 h-5 w-5 text-accent" />
              Contextual Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isSuggesting ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                 <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                 </div>
                <Skeleton className="h-4 w-1/2 mt-4" />
                 <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-28 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                 </div>
              </div>
            ) : (
              <>
                {(note.relatedTopics && note.relatedTopics.length > 0) || (note.keywords && note.keywords.length > 0) ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Related Topics</h4>
                      <div className="flex flex-wrap gap-2">
                        {note.relatedTopics?.map((topic, index) => (
                          <Badge key={index} variant="secondary">{topic}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {note.keywords?.map((keyword, index) => (
                          <Badge key={index} variant="outline">{keyword}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Discover related topics and keywords.
                    </p>
                    <Button onClick={handleSuggestionsClick} disabled={!note.content || isSuggesting}>
                      {isSuggesting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Get Suggestions
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
