export interface Snippet {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  category: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateSnippetInput = Omit<Snippet, "id" | "createdAt" | "updatedAt">;
export type UpdateSnippetInput = Partial<CreateSnippetInput>;

export const LANGUAGES = [
  "javascript",
  "typescript",
  "python",
  "java",
  "csharp",
  "go",
  "rust",
  "php",
  "ruby",
  "html",
  "css",
  "sql",
  "bash",
  "json",
  "yaml",
  "markdown",
] as const;

export const CATEGORIES = [
  "Algorithm",
  "Component",
  "Hook",
  "Utility",
  "Config",
  "API",
  "Database",
  "Testing",
  "Other",
] as const;

export type Language = (typeof LANGUAGES)[number];
export type Category = (typeof CATEGORIES)[number];
