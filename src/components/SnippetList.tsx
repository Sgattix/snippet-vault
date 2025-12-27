"use client";

import { useSnippetsContext } from "@/context/SnippetsContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * TODO: Implement SnippetList Component
 *
 * This component displays the list of all snippets with filtering.
 *
 * Requirements:
 *
 * 1. USE THE HOOK
 *    - Import and use useSnippets() hook
 *    - Access snippets array and isLoading state
 *
 * 2. FILTERING
 *    - Filter snippets based on searchQuery prop
 *    - Search in: title, description, tags, language
 *    - Case-insensitive search
 *
 * 3. RENDERING
 *    - Map through filtered snippets
 *    - Display each snippet in a Card
 *    - Show: title, description, language badge, favorite icon
 *    - Highlight selected snippet (use selectedId prop)
 *    - Handle empty state (no snippets or no results)
 *
 * 4. INTERACTION
 *    - onClick: call onSelect(snippet.id)
 *    - Visual feedback for selected item
 *
 * 5. LOADING STATE
 *    - Show loading message while isLoading is true
 *
 * Tips:
 * - Use .filter() for search logic
 * - Use .toLowerCase() for case-insensitive comparison
 * - Consider checking multiple fields (title OR description OR tags)
 * - Sort by updatedAt (newest first) for better UX
 */

interface SnippetListProps {
  searchQuery: string;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export default function SnippetList({
  searchQuery,
  selectedId,
  onSelect,
}: SnippetListProps) {
  const { snippets, isLoading } = useSnippetsContext();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">
            Loading snippets...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (snippets.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 w-full h-[calc(100vh-280px)] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Code2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No snippets found</p>
            {searchQuery && (
              <p className="text-sm mt-1">Try a different search term</p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-2">
      {snippets.map((snippet) => (
        <Card
          key={snippet.id}
          className={cn(
            "cursor-pointer transition-all hover:shadow-md",
            selectedId === snippet.id && "ring-2 ring-primary"
          )}
          onClick={() => onSelect(snippet.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-base">{snippet.title}</CardTitle>
              {snippet.isFavorite && (
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              )}
            </div>
            <CardDescription className="line-clamp-2">
              {snippet.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">{snippet.language}</Badge>
              <Badge variant="outline">{snippet.category}</Badge>
              {snippet.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
