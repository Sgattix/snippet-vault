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
      <Card className="h-[calc(100vh-280px)]">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <Code2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Select a snippet to view</p>
            <p className="text-sm mt-2">or create a new one</p>
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
    <Card className="h-[calc(100vh-280px)] flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle>{snippet.title}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleToggleFavorite}
              >
                <Star
                  className={cn(
                    "w-4 h-4",
                    snippet.isFavorite && "fill-yellow-400 text-yellow-400"
                  )}
                />
              </Button>
            </div>
            <CardDescription>{snippet.description}</CardDescription>
            <div className="flex gap-2 mt-3">
              <Badge>{snippet.language}</Badge>
              <Badge variant="outline">{snippet.category}</Badge>
              {snippet.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleCopy}>
              <Copy className="w-4 h-4" />
            </Button>
            {!isEditingInPlace && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleStartEdit}
                  title="Edit code directly"
                >
                  <EditIcon className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={onEdit}>
                  <BoltIcon className="w-4 h-4" />
                </Button>
              </>
            )}
            {isEditingInPlace && (
              <>
                <Button
                  size="icon"
                  onClick={handleSaveEdit}
                  className="bg-green-600 hover:bg-green-700"
                  title="Save changes"
                >
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleCancelEdit}
                  title="Cancel edit"
                >
                  <X className="w-4 h-4" />
                </Button>
              </>
            )}
            {!isEditingInPlace && (
              <Button variant="destructive" size="icon" onClick={handleDelete}>
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
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
          }}
        />
      </CardContent>
    </Card>
  );
}
