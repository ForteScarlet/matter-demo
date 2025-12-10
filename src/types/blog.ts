export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
  category: string;
  featured: boolean;
  coverImage?: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export type Theme = 'day' | 'night' | 'punk';