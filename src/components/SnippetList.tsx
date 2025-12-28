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
import { Star, Code2, Grid3x3, List } from "lucide-react";
import { cn } from "@/lib/utils";
import SnippetSort from "./SnippetSort";
import { SnippetListSkeleton } from "./SkeletonLoader";
import { Button } from "@/components/ui/button";

interface SnippetListProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
}

export default function SnippetList({
  selectedId,
  onSelect,
  viewMode,
  onViewModeChange,
}: SnippetListProps) {
  const { isLoading, filteredSnippets, searchQuery } = useSnippetsContext();

  if (isLoading) {
    return (
      <div>
        <div className="mb-3 flex items-center justify-between">
          <SnippetSort />
          <div className="flex gap-1">
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onViewModeChange("list")}
              title="List view"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onViewModeChange("grid")}
              title="Grid view"
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <SnippetListSkeleton />
      </div>
    );
  }

  if (filteredSnippets?.length === 0) {
    return (
      <>
        <div className="mb-3 flex items-center justify-between">
          <SnippetSort />
          <div className="flex gap-1">
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onViewModeChange("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => onViewModeChange("grid")}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Card className="mt-3 border-dashed">
          <CardContent className="p-12 w-full h-[calc(100vh-335px)] flex items-center justify-center">
            <div className="text-center text-muted-foreground animate-in fade-in duration-500">
              <Code2 className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium mb-2">No snippets found</p>
              {searchQuery && (
                <p className="text-sm">Try adjusting your search or filters</p>
              )}
              {!searchQuery && (
                <p className="text-sm">
                  Create your first snippet to get started
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <SnippetSort />
        <div className="flex gap-1">
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => onViewModeChange("list")}
            title="List view"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => onViewModeChange("grid")}
            title="Grid view"
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "max-h-[calc(100vh-280px)] overflow-y-auto pr-2",
          viewMode === "grid" ? "grid grid-cols-1 gap-3" : "space-y-3"
        )}
      >
        {filteredSnippets?.map((snippet) => (
          <Card
            key={snippet.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-2",
              selectedId === snippet.id &&
                "ring-2 ring-primary shadow-lg shadow-primary/20"
            )}
            onClick={() => onSelect(snippet.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base line-clamp-1">
                  {snippet.title}
                </CardTitle>
                {snippet.isFavorite && (
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
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
    </div>
  );
}
