"use client";

import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useSnippetsContext } from "@/context/SnippetsContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LANGUAGES, CATEGORIES } from "@/types/snippet";
import { X } from "lucide-react";

/**
 * TODO: Implement SnippetForm Component
 *
 * This is the form for creating and editing snippets.
 *
 * Requirements:
 *
 * 1. FORM STATE
 *    - Create state for all form fields:
 *      * title, description, code, language, category, tags, isFavorite
 *    - Initialize with empty values for CREATE mode
 *    - Initialize with snippet data for EDIT mode
 *
 * 2. EDIT MODE DETECTION
 *    - If snippetId is provided and exists, it's EDIT mode
 *    - Load snippet data with getSnippetById(snippetId)
 *    - Populate form fields with snippet data
 *
 * 3. FORM HANDLERS
 *    - Handle input changes for each field
 *    - Tags: implement add/remove tag functionality
 *      * Input field + button to add tag
 *      * X button on each tag to remove
 *
 * 4. SUBMIT LOGIC
 *    - Validate: title, code, language are required
 *    - CREATE mode: call createSnippet()
 *    - EDIT mode: call updateSnippet()
 *    - Close dialog after success
 *    - Reset form
 *
 * 5. RESET ON CLOSE
 *    - Clear form when dialog closes
 *    - Reset to empty state or snippet data based on mode
 *
 * Tips:
 * - Use useEffect to load snippet data when snippetId changes
 * - Validate before submit (show error messages)
 * - Consider default values (e.g., language: "javascript")
 */

interface SnippetFormProps {
  isOpen: boolean;
  onClose: () => void;
  snippetId: string | null;
  onSnippetSaved?: (snippetId: string) => void;
}

export default function SnippetForm({
  isOpen,
  onClose,
  snippetId,
  onSnippetSaved,
}: SnippetFormProps) {
  const { createSnippet, updateSnippet, getSnippetById } = useSnippetsContext();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [category, setCategory] = useState("Other");
  const [tags, setTags] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const isEditMode = !!snippetId;
  const snippet = isEditMode ? getSnippetById(snippetId) : null;

  useEffect(() => {
    if (isEditMode && snippet) {
      setTitle(snippet.title);
      setDescription(snippet.description);
      setCode(snippet.code);
      setLanguage(snippet.language);
      setCategory(snippet.category);
      setTags(snippet.tags);
      setIsFavorite(snippet.isFavorite);
    } else {
      resetForm();
    }
  }, [snippetId, isEditMode, snippet]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCode("");
    setLanguage("javascript");
    setCategory("Other");
    setTags([]);
    setIsFavorite(false);
    setTagInput("");
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    if (!code.trim()) {
      alert("Code is required");
      return;
    }

    // Create snippet object
    const snippetData = {
      title: title.trim(),
      description: description.trim(),
      code: code.trim(),
      language,
      category,
      tags,
      isFavorite,
    };

    // Call create or update based on mode
    if (isEditMode && snippetId) {
      updateSnippet(snippetId, snippetData);
      onSnippetSaved?.(snippetId);
    } else {
      // For create, generate the ID (same as in hook)
      const newId = Date.now().toString();
      createSnippet(snippetData);
      onSnippetSaved?.(newId);
    }

    // Close dialog and reset
    onClose();
    resetForm();
  };

  // Handle dialog close
  const handleClose = () => {
    onClose();
    if (!isEditMode) {
      resetForm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto dark:text-white bg-neutral-900">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Snippet" : "Create New Snippet"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update your code snippet"
              : "Add a new snippet to your collection"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium">Title *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Debounce Hook"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of what this snippet does..."
              rows={2}
            />
          </div>

          {/* Language and Category */}
          <div className="grid grid-cols-2 gap-4 text-white">
            <div>
              <label className="text-sm font-medium">Language *</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium">Tags</label>
            <div className="flex gap-2 mb-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Code */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Code *</label>
            <div className="border rounded-md overflow-hidden h-72">
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  formatOnPaste: true,
                }}
              />
            </div>
          </div>

          {/* Favorite */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="favorite"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
              className="w-4 h-4"
            />
            <label
              htmlFor="favorite"
              className="text-sm font-medium cursor-pointer"
            >
              Mark as favorite
            </label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Update" : "Create"} Snippet
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
