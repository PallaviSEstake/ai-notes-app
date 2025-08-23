export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  summary?: string;
  relatedTopics?: string[];
  keywords?: string[];
  createdAt: string;
  updatedAt: string;
}
