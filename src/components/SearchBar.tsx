"use client";

import { Search, XIcon, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "./ui/badge";
import { Button } from "@/components/ui/button";
import { useSnippetsContext } from "@/context/SnippetsContext";

export default function SearchBar() {
  const {
    snippets,
    filteredSnippets,
    selectedTags,
    selectedLanguages,
    handleTagSelect,
    handleLanguageSelect,
    isLoading,
    setSearchQuery,
    searchQuery,
    clearAllFilters,
  } = useSnippetsContext();

  const uniqueTags = Array.from(new Set(snippets.flatMap((sn) => sn.tags)));
  const uniqueLanguages = Array.from(
    new Set(snippets.map((sn) => sn.language))
  );

  const hasActiveFilters =
    searchQuery.length > 0 ||
    selectedTags.length > 0 ||
    selectedLanguages.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search snippets by title or description..."
            className="pl-10 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white border-neutral-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="gap-2 whitespace-nowrap"
          >
            <X className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {!isLoading && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>
              {filteredSnippets.length} of {snippets.length} snippet
              {snippets.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      )}

      {!isLoading && uniqueTags.length > 0 && (
        <div className="flex flex-wrap mt-4 gap-2 items-center">
          <span className="text-sm dark:text-neutral-400">Filter by tags:</span>
          {uniqueTags.map((tag) => (
            <Badge
              key={tag}
              onClick={() => handleTagSelect(tag)}
              variant={`${selectedTags.includes(tag) ? "default" : "outline"}`}
              className={`cursor-pointer flex gap-2 items-center ${
                selectedTags.includes(tag)
                  ? "dark:bg-white dark:text-black bg-black text-white"
                  : ""
              }`}
            >
              {tag}
              {selectedTags.includes(tag) && <XIcon size={10} />}
            </Badge>
          ))}
        </div>
      )}

      {!isLoading && uniqueLanguages.length > 0 && (
        <div className="flex flex-wrap mt-4 gap-2 items-center">
          <span className="text-sm dark:text-neutral-400">
            Filter by language:
          </span>
          {uniqueLanguages.map((language) => (
            <Badge
              key={language}
              onClick={() => handleLanguageSelect(language)}
              variant={`${
                selectedLanguages.includes(language) ? "default" : "outline"
              }`}
              className={`cursor-pointer flex gap-2 items-center ${
                selectedLanguages.includes(language)
                  ? "dark:bg-white dark:text-black bg-black text-white"
                  : ""
              }`}
            >
              {language}
              {selectedLanguages.includes(language) && <XIcon size={10} />}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
