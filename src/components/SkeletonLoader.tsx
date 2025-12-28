import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function SnippetListSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="pb-3">
            <div className="h-5 bg-muted rounded w-3/4 mb-2" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-2">
              <div className="h-6 bg-muted rounded w-16" />
              <div className="h-6 bg-muted rounded w-20" />
              <div className="h-6 bg-muted rounded w-14" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function SnippetEditorSkeleton() {
  return (
    <Card className="h-[calc(100vh-280px)] animate-pulse">
      <CardHeader>
        <div className="h-7 bg-muted rounded w-1/2 mb-2" />
        <div className="h-4 bg-muted rounded w-3/4 mb-3" />
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded w-16" />
          <div className="h-6 bg-muted rounded w-20" />
          <div className="h-6 bg-muted rounded w-14" />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-full bg-muted/30 rounded" />
      </CardContent>
    </Card>
  );
}
