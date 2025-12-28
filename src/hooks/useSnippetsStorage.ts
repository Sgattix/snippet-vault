import { useCallback } from "react";
import {
  Snippet,
  CreateSnippetInput,
  UpdateSnippetInput,
} from "@/types/snippet";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface UseSnippetsStorageReturn {
  snippets: Snippet[];
  isLoading: boolean;
  createSnippet: (input: CreateSnippetInput) => void;
  updateSnippet: (id: string, updates: UpdateSnippetInput) => void;
  deleteSnippet: (id: string) => void;
  getSnippetById: (id: string) => Snippet | undefined;
  bulkImportSnippets: (snippetList: Snippet[]) => void;
}

export function useSnippetsStorage(): UseSnippetsStorageReturn {
  const [snippets, setSnippets, isHydrated] = useLocalStorage<Snippet[]>(
    "snippetvault_snippets",
    [],
    300
  );

  const isLoading = !isHydrated;

  const createSnippet = useCallback(
    (input: CreateSnippetInput) => {
      const newSnippet: Snippet = {
        ...input,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setSnippets((prev) => [...prev, newSnippet]);
      return newSnippet;
    },
    [setSnippets]
  );

  const updateSnippet = useCallback(
    (id: string, updates: UpdateSnippetInput) => {
      setSnippets((prev) => {
        const snippet = prev.find((s) => s.id === id);
        if (!snippet) {
          throw new Error(`Snippet with id ${id} not found`);
        }

        return prev.map((s) =>
          s.id === id
            ? {
                ...s,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : s
        );
      });
    },
    [setSnippets]
  );

  const deleteSnippet = useCallback(
    (id: string) => {
      setSnippets((prev) => prev.filter((s) => s.id !== id));
    },
    [setSnippets]
  );

  const getSnippetById = useCallback(
    (id: string) => {
      return snippets.find((s) => s.id === id);
    },
    [snippets]
  );

  const bulkImportSnippets = useCallback(
    (snippetList: Snippet[]) => {
      setSnippets((prev) => {
        const existingIds = new Set(prev.map((s) => s.id));
        const newSnippets = snippetList
          .filter((s) => !existingIds.has(s.id))
          .map((s) => ({
            ...s,
            updatedAt: new Date().toISOString(),
          }));
        return [...prev, ...newSnippets];
      });
    },
    [setSnippets]
  );

  return {
    snippets,
    isLoading,
    createSnippet,
    updateSnippet,
    deleteSnippet,
    getSnippetById,
    bulkImportSnippets,
  };
}
