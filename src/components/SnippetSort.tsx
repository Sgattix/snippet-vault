"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, StarIcon, StarsIcon } from "lucide-react";
import { useSnippetsContext } from "@/context/SnippetsContext";
import { SortOption } from "@/hooks/useSnippetFilters";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "last-updated", label: "Last Updated" },
  { value: "first-updated", label: "First Updated" },
  { value: "title-asc", label: "Title (A-Z)" },
  { value: "title-desc", label: "Title (Z-A)" },
  { value: "language", label: "Language" },
];

function SnippetSort() {
  const { sortBy, setSortBy, favouritesOnly, handleFavouritesToggle } =
    useSnippetsContext();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-45 dark:border-neutral-600 dark:bg-neutral-800">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent className="dark:bg-neutral-800 dark:text-white">
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {!favouritesOnly && (
        <StarIcon
          className={
            "w-4 h-4 text-muted-foreground cursor-pointer text-muted-foreground"
          }
          onClick={handleFavouritesToggle}
        />
      )}
      {favouritesOnly && (
        <StarsIcon
          className={"w-4 h-4 text-yellow-400 cursor-pointer"}
          onClick={handleFavouritesToggle}
        />
      )}
    </div>
  );
}

export default SnippetSort;
