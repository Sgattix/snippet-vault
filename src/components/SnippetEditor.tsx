"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useSnippetsContext } from "@/context/SnippetsContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  Trash2,
  Star,
  Copy,
  Code2,
  Check,
  X,
  Edit3Icon,
  EditIcon,
  BoltIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SnippetEditorProps {
  snippetId: string | null;
  onEdit: () => void;
}

export default function SnippetEditor({
  snippetId,
  onEdit,
}: SnippetEditorProps) {
  const { getSnippetById, deleteSnippet, updateSnippet } = useSnippetsContext();
  const [isEditingInPlace, setIsEditingInPlace] = useState(false);
  const [editedCode, setEditedCode] = useState("");

  const snippet = snippetId ? getSnippetById(snippetId) : null;

  if (!snippet) {
    return (
      <Card className="h-[calc(100vh-280px)] border-dashed animate-in fade-in duration-500">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <Code2 className="w-16 h-16 mx-auto mb-4 opacity-30 animate-pulse" />
            <p className="text-lg font-medium mb-2">Select a snippet to view</p>
            <p className="text-sm mt-2">
              or{" "}
              <span
                className="underline cursor-pointer hover:text-primary transition-colors"
                onClick={onEdit}
              >
                create a new one
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleDelete = () => {
    if (confirm(`Delete "${snippet.title}"?`)) {
      deleteSnippet(snippet.id);
    }
  };

  const handleToggleFavorite = () => {
    updateSnippet(snippet.id, { isFavorite: !snippet.isFavorite });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleStartEdit = () => {
    setEditedCode(snippet.code);
    setIsEditingInPlace(true);
  };

  const handleSaveEdit = () => {
    if (!editedCode.trim()) {
      toast.error("Code cannot be empty");
      return;
    }
    updateSnippet(snippet.id, { code: editedCode.trim() });
    setIsEditingInPlace(false);
    toast.success("Snippet updated!");
  };

  const handleCancelEdit = () => {
    setIsEditingInPlace(false);
  };

  return (
    <Card className="h-[calc(100vh-280px)] flex flex-col animate-in fade-in slide-in-from-right-4 duration-300 border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="truncate">{snippet.title}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:scale-110 transition-transform"
                onClick={handleToggleFavorite}
              >
                <Star
                  className={cn(
                    "w-4 h-4 transition-all",
                    snippet.isFavorite &&
                      "fill-yellow-400 text-yellow-400 scale-110"
                  )}
                />
              </Button>
            </div>
            <CardDescription className="line-clamp-2">
              {snippet.description}
            </CardDescription>
            <div className="flex gap-2 mt-3 flex-wrap">
              <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500">
                {snippet.language}
              </Badge>
              <Badge variant="outline">{snippet.category}</Badge>
              {snippet.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              className="hover:bg-green-50 dark:hover:bg-green-950 hover:text-green-600 transition-colors"
              title="Copy code"
            >
              <Copy className="w-4 h-4" />
            </Button>
            {!isEditingInPlace && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleStartEdit}
                  title="Edit code directly"
                  className="hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 transition-colors"
                >
                  <EditIcon className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onEdit}
                  title="Edit all details"
                  className="hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 transition-colors"
                >
                  <BoltIcon className="w-4 h-4" />
                </Button>
              </>
            )}
            {isEditingInPlace && (
              <>
                <Button
                  size="icon"
                  onClick={handleSaveEdit}
                  className="bg-green-600 hover:bg-green-700 hover:scale-110 transition-transform"
                  title="Save changes"
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleCancelEdit}
                  title="Cancel edit"
                  className="hover:scale-110 transition-transform"
                >
                  <X className="w-4 h-4" />
                </Button>
              </>
            )}
            {!isEditingInPlace && (
              <Button
                variant="destructive"
                size="icon"
                onClick={handleDelete}
                className="hover:scale-110 transition-transform"
                title="Delete snippet"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <Editor
          height="100%"
          language={snippet.language}
          value={isEditingInPlace ? editedCode : snippet.code}
          onChange={(value) => {
            if (isEditingInPlace) {
              setEditedCode(value || "");
            }
          }}
          theme="vs-dark"
          options={{
            readOnly: !isEditingInPlace,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            formatOnPaste: isEditingInPlace,
            automaticLayout: true,
          }}
        />
      </CardContent>
    </Card>
  );
}
