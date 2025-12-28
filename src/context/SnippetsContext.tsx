"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import { useSnippetsStorage } from "@/hooks/useSnippetsStorage";
import { useSnippetFilters, SortOption } from "@/hooks/useSnippetFilters";
import { toast } from "sonner";
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

  filteredSnippets: Snippet[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTags: string[];
  handleTagSelect: (tag: string) => void;
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
  handleLanguageSelect: (language: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  favouritesOnly: boolean;
  handleFavouritesToggle: () => void;
  clearAllFilters: () => void;
  exportSnippets: () => void;
  importSnippets: (file: File) => void;
}

const SnippetsContext = createContext<SnippetsContextType | undefined>(
  undefined
);

export function SnippetsProvider({ children }: { children: ReactNode }) {
  const storage = useSnippetsStorage();
  const filters = useSnippetFilters();

  const filteredSnippets = useMemo(
    () => filters.filterAndSortSnippets(storage.snippets),
    [storage.snippets, filters.filterAndSortSnippets]
  );

  const createSnippet = useCallback(
    (input: CreateSnippetInput) => {
      try {
        storage.createSnippet(input);
        toast.success("Snippet created successfully");
      } catch (error) {
        toast.error("Failed to create snippet");
        console.error(error);
      }
    },
    [storage]
  );

  const updateSnippet = useCallback(
    (id: string, updates: UpdateSnippetInput) => {
      try {
        storage.updateSnippet(id, updates);
        toast.success("Snippet updated successfully");
      } catch (error) {
        toast.error("Failed to update snippet");
        console.error(error);
      }
    },
    [storage]
  );

  const deleteSnippet = useCallback(
    (id: string) => {
      try {
        storage.deleteSnippet(id);
        toast.success("Snippet deleted successfully");
      } catch (error) {
        toast.error("Failed to delete snippet");
        console.error(error);
      }
    },
    [storage]
  );

  const exportSnippets = useCallback(() => {
    try {
      const dataStr = JSON.stringify(storage.snippets, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `snippetvault-export-${
        new Date().toISOString().split("T")[0]
      }.json`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Snippets exported successfully");
    } catch (error) {
      toast.error("Failed to export snippets");
      console.error(error);
    }
  }, [storage.snippets]);

  const importSnippets = useCallback(
    (file: File) => {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            const imported = JSON.parse(content) as Snippet[];

            if (!Array.isArray(imported)) {
              throw new Error("Invalid file format");
            }

            // Validate all required fields exist in imported snippets
            const validSnippets = imported.every(
              (s) =>
                s.id &&
                s.title &&
                s.code &&
                s.language &&
                s.createdAt &&
                s.updatedAt &&
                Array.isArray(s.tags)
            );

            if (!validSnippets) {
              throw new Error(
                "Invalid snippet data structure - missing required fields"
              );
            }

            // Count how many snippets will be imported (excluding duplicates by id)
            const existingIds = new Set(storage.snippets.map((s) => s.id));
            const newSnippets = imported.filter((s) => !existingIds.has(s.id));

            if (newSnippets.length === 0) {
              toast.info("No new snippets to import (all already exist)");
              return;
            }

            // Import all at once, preserving original IDs and timestamps
            storage.bulkImportSnippets(newSnippets);

            toast.success(
              `Imported ${newSnippets.length} snippet${
                newSnippets.length !== 1 ? "s" : ""
              } successfully`
            );
          } catch (error) {
            toast.error("Invalid JSON file or corrupt data");
            console.error(error);
          }
        };
        reader.readAsText(file);
      } catch (error) {
        toast.error("Failed to import snippets");
        console.error(error);
      }
    },
    [storage]
  );

  const value = useMemo(
    () => ({
      snippets: storage.snippets,
      createSnippet,
      updateSnippet,
      deleteSnippet,
      getSnippetById: storage.getSnippetById,
      isLoading: storage.isLoading,

      filteredSnippets,
      searchQuery: filters.searchQuery,
      setSearchQuery: filters.setSearchQuery,
      selectedTags: filters.selectedTags,
      handleTagSelect: filters.handleTagSelect,
      selectedLanguages: filters.selectedLanguages,
      setSelectedLanguages: filters.setSelectedLanguages,
      handleLanguageSelect: filters.handleLanguageSelect,
      sortBy: filters.sortBy,
      setSortBy: filters.setSortBy,
      favouritesOnly: filters.favouritesOnly,
      handleFavouritesToggle: filters.handleFavouritesToggle,
      clearAllFilters: filters.clearAllFilters,
      exportSnippets,
      importSnippets,
    }),
    [
      storage.snippets,
      storage.isLoading,
      storage.getSnippetById,
      filteredSnippets,
      filters.searchQuery,
      filters.setSearchQuery,
      filters.selectedTags,
      filters.handleTagSelect,
      filters.selectedLanguages,
      filters.setSelectedLanguages,
      filters.handleLanguageSelect,
      filters.sortBy,
      filters.setSortBy,
      filters.favouritesOnly,
      filters.handleFavouritesToggle,
      filters.clearAllFilters,
      createSnippet,
      updateSnippet,
      deleteSnippet,
      exportSnippets,
      importSnippets,
    ]
  );

  return (
    <SnippetsContext.Provider value={value}>
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
