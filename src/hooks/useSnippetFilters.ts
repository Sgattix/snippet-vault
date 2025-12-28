import { useState, useCallback, useMemo } from "react";
import { Snippet } from "@/types/snippet";

export type SortOption =
  | "newest"
  | "oldest"
  | "last-updated"
  | "first-updated"
  | "title-asc"
  | "title-desc"
  | "language";

interface UseSnippetFiltersReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTags: string[];
  handleTagSelect: (tag: string) => void;
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
  handleLanguageSelect: (language: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  filterAndSortSnippets: (snippets: Snippet[]) => Snippet[];
  handleFavouritesToggle: () => void;
  favouritesOnly: boolean;
  clearAllFilters: () => void;
}

export function useSnippetFilters(): UseSnippetFiltersReturn {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [favouritesOnly, setFavouritesOnly] = useState(false);

  const handleTagSelect = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const handleLanguageSelect = useCallback((language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((l) => l !== language)
        : [...prev, language]
    );
  }, []);

  const handleFavouritesToggle = useCallback(() => {
    setFavouritesOnly((prev) => !prev);
  }, []);

  const clearAllFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedLanguages([]);
    setFavouritesOnly(false);
  }, []);

  const filterAndSortSnippets = useCallback(
    (snippets: Snippet[]) => {
      const filtered = snippets.filter((snippet) => {
        if (favouritesOnly && !snippet.isFavorite) {
          return false;
        }
        const query = searchQuery.trim().toLowerCase();

        const matchesText =
          query === "" ||
          snippet.title.toLowerCase().includes(query) ||
          snippet.description.toLowerCase().includes(query) ||
          snippet.language.toLowerCase().includes(query) ||
          snippet.tags.some((tag) => tag.toLowerCase().includes(query));

        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            snippet.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
          );

        const matchesLanguages =
          selectedLanguages.length === 0 ||
          selectedLanguages.some(
            (lang) => snippet.language.toLowerCase() === lang.toLowerCase()
          );

        return matchesText && matchesTags && matchesLanguages;
      });

      const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          case "oldest":
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          case "last-updated":
            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
          case "first-updated":
            return (
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
            );
          case "title-asc":
            return a.title.localeCompare(b.title);
          case "title-desc":
            return b.title.localeCompare(a.title);
          case "language":
            return a.language.localeCompare(b.language);
          default:
            return 0;
        }
      });

      return sorted;
    },
    [searchQuery, selectedTags, selectedLanguages, sortBy, favouritesOnly]
  );

  return {
    searchQuery,
    setSearchQuery,
    selectedTags,
    handleTagSelect,
    selectedLanguages,
    setSelectedLanguages,
    handleLanguageSelect,
    sortBy,
    setSortBy,
    filterAndSortSnippets,
    favouritesOnly,
    handleFavouritesToggle,
    clearAllFilters,
  };
}
