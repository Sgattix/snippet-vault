import { useState, useEffect, useCallback } from "react";
import { Snippet, CreateSnippetInput, UpdateSnippetInput } from "@/types/snippet";
import { saveSnippets, loadSnippets } from "@/lib/localStorage";
import { toast } from "sonner";

/**
 * TODO: Implement useSnippets custom hook
 * 
 * This is the CORE of your application - the state management layer.
 * 
 * Requirements:
 * 
 * 1. STATE MANAGEMENT
 *    - Manage array of snippets in state
 *    - Load snippets from localStorage on mount
 *    - Save to localStorage whenever snippets change
 * 
 * 2. CRUD OPERATIONS
 *    - createSnippet(input: CreateSnippetInput): void
 *      * Generate unique ID (use crypto.randomUUID() or Date.now())
 *      * Add createdAt and updatedAt timestamps
 *      * Add to state
 * 
 *    - updateSnippet(id: string, updates: UpdateSnippetInput): void
 *      * Find snippet by ID
 *      * Merge updates
 *      * Update updatedAt timestamp
 * 
 *    - deleteSnippet(id: string): void
 *      * Remove snippet from state
 * 
 *    - getSnippetById(id: string): Snippet | undefined
 *      * Find and return snippet by ID
 * 
 * 3. FILTERING (optional but recommended)
 *    - Filter by search query (title, description, tags)
 *    - Filter by language
 *    - Filter by category
 *    - Filter favorites
 * 
 * Tips:
 * - Use useEffect to sync with localStorage
 * - Use useCallback for memoized functions
 * - Consider debouncing localStorage saves for performance
 * - Think about the hydration issue (localStorage is client-side only)
 */

interface UseSnippetsReturn {
  snippets: Snippet[];
  createSnippet: (input: CreateSnippetInput) => void;
  updateSnippet: (id: string, updates: UpdateSnippetInput) => void;
  deleteSnippet: (id: string) => void;
  getSnippetById: (id: string) => Snippet | undefined;
  isLoading: boolean;
}

export function useSnippets(): UseSnippetsReturn {  
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSnippets(loadSnippets());
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if(isLoading) return;
    saveSnippets(snippets);
  }, [snippets]);

  const createSnippet = useCallback((input: CreateSnippetInput) => {
    const { title, description, code, language, tags, category, isFavorite } = input;
    setSnippets((prevSnippets) => [...prevSnippets, {
      id: Date.now().toString(),
      title,
      description,
      code,
      language,
      tags,
      category,
      isFavorite,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString()
    }])
    toast.success("Snippet created successfully.");
  }, []);

  const updateSnippet = useCallback((id: string, updates: UpdateSnippetInput) => {
    const snippet = snippets.find((s) => s.id === id);
    if(!snippet) {
      toast.error(`No snippet found with id: ${id}`);
      return console.error("No snippet found with id: ", id);
    }
    
    const newSnippet: Snippet = { ...snippet, ...updates, updatedAt: new Date().toString() };
    setSnippets((sn) => [...sn.filter((s) => s.id !== id), newSnippet]);
    toast.success("Snippet updated successfully.");
  }, [snippets]);

  const deleteSnippet = useCallback((id: string) => {
    setSnippets((sn) => sn.filter((s) => s.id !== id));
    toast.success("Snippet removed successfully.")
  }, []);

  const getSnippetById = useCallback((id: string) => {
    return snippets.find((s) => s.id === id);
  }, [snippets]);

  return {
    snippets,
    createSnippet,
    updateSnippet,
    deleteSnippet,
    getSnippetById,
    isLoading,
  };
}
