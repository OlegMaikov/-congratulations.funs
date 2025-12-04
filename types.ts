
export type ChapterType = 'chapter' | 'prologue' | 'epilogue' | 'annotation' | 'section';

export interface Chapter {
  id: string;
  type: ChapterType;
  title: string;
  content: string; // Now stores HTML
  notes: string;
  lastUpdated: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string | null; // Base64 string
  chapters: Chapter[];
  createdAt: number;
  lastUpdated: number;
}

export type ViewState = 'dashboard' | 'editor';

export enum AIActionType {
  GENERATE_OUTLINE = 'GENERATE_OUTLINE',
  CONTINUE_WRITING = 'CONTINUE_WRITING',
  IMPROVE_STYLE = 'IMPROVE_STYLE'
}
