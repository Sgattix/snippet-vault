"use client";

import { createContext, useContext, ReactNode } from "react";
import { useSnippets } from "@/hooks/useSnippets";
import {
  Snippet,
  CreateSnippetInput,
  UpdateSnippetInput,
} from "@/types/snippet";

interface SnippetsContextType {
  snippets: Snippet[];
  createSnippet: (input: CreateSnippetInput) => void;
  updateSnippet: (id: string, updates: UpdateSnippetInput) => void;
  deleteSnippet: (id: string) => void;
  getSnippetById: (id: string) => Snippet | undefined;
  isLoading: boolean;
}

const SnippetsContext = createContext<SnippetsContextType | undefined>(
  undefined
);

export function SnippetsProvider({ children }: { children: ReactNode }) {
  const snippets = useSnippets();

  return (
    <SnippetsContext.Provider value={snippets}>
      {children}
    </SnippetsContext.Provider>
  );
}

export function useSnippetsContext() {
  const context = useContext(SnippetsContext);
  if (!context) {
    throw new Error(
      "useSnippetsContext must be used within a SnippetsProvider"
    );
  }
  return context;
}
