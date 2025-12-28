"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Download, Upload, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import SnippetList from "@/components/SnippetList";
import SnippetEditor from "@/components/SnippetEditor";
import SnippetForm from "@/components/SnippetForm";
import { useSnippetsContext } from "@/context/SnippetsContext";
import { cn } from "@/lib/utils";

export default function Home() {
  const { filteredSnippets, exportSnippets, importSnippets, setSearchQuery } =
    useSnippetsContext();
  const [selectedSnippetId, setSelectedSnippetId] = useState<string | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA";

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const searchInput = document.querySelector(
          'input[type="text"]'
        ) as HTMLInputElement;
        searchInput?.focus();
        searchInput?.select();
        return;
      }

      if (isInput) {
        if (e.key === "Escape") {
          (target as HTMLInputElement).blur();
        }
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        setIsFormOpen(true);
        return;
      }
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === "n"
      ) {
        e.preventDefault();
        setIsFormOpen(true);
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        setIsFormOpen(true);
        return;
      }
      if (e.key === "Escape") {
        if (isFormOpen) {
          setIsFormOpen(false);
        } else {
          setSelectedSnippetId(null);
        }
        return;
      }

      if (!isFormOpen && filteredSnippets.length > 0) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          const currentIndex = filteredSnippets.findIndex(
            (s) => s.id === selectedSnippetId
          );

          if (e.key === "ArrowDown") {
            const nextIndex =
              currentIndex < filteredSnippets.length - 1 ? currentIndex + 1 : 0;
            setSelectedSnippetId(filteredSnippets[nextIndex].id);
          } else {
            const prevIndex =
              currentIndex > 0 ? currentIndex - 1 : filteredSnippets.length - 1;
            setSelectedSnippetId(filteredSnippets[prevIndex].id);
          }
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFormOpen, filteredSnippets, selectedSnippetId]);

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importSnippets(file);
      e.target.value = ""; // Reset input
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 dark:text-white transition-all duration-500">
      <div className="container mx-auto p-4 md:p-10">
        <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-neutral-800/50 overflow-hidden">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-neutral-200 dark:border-neutral-800 bg-linear-to-r from-blue-500/10 to-indigo-500/10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  SnippetVault 🔐
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Your personal code snippet library
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleImport}
                  title="Import snippets (JSON)"
                  className="hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={exportSnippets}
                  title="Export all snippets"
                  className="hover:bg-indigo-50 dark:hover:bg-indigo-950"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Actions Bar */}
          <div className="p-4 md:p-6 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-start">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="md:hidden shrink-0"
                  title="Toggle sidebar"
                >
                  {isSidebarOpen ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Menu className="h-4 w-4" />
                  )}
                </Button>
                <div className="flex-1">
                  <SearchBar />
                </div>
                <Button
                  onClick={() => setIsFormOpen(true)}
                  className="gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shrink-0"
                  title="Ctrl+Alt+N"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">New</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Sidebar - Snippet List */}
            <div
              className={cn(
                "lg:col-span-4 xl:col-span-3 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300",
                isSidebarOpen ? "block" : "hidden lg:block"
              )}
            >
              <div className="p-4 md:p-6 max-h-[calc(100vh-350px)] lg:max-h-[calc(100vh-280px)] overflow-hidden">
                <SnippetList
                  selectedId={selectedSnippetId}
                  onSelect={(id) => {
                    setSelectedSnippetId(id);
                    // Auto-close sidebar on mobile after selection
                    if (window.innerWidth < 1024) {
                      setIsSidebarOpen(false);
                    }
                  }}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />
              </div>
            </div>

            {/* Main Area - Editor */}
            <div className="lg:col-span-8 xl:col-span-9">
              <div className="p-4 md:p-6">
                <SnippetEditor
                  snippetId={selectedSnippetId}
                  onEdit={() => setIsFormOpen(true)}
                />
              </div>
            </div>
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground justify-center">
              <span>
                <kbd className="px-2 py-1 bg-white dark:bg-neutral-800 rounded border">
                  Ctrl+K
                </kbd>
                Search
              </span>
              <span>
                <kbd className="px-2 py-1 bg-white dark:bg-neutral-800 rounded border">
                  Ctrl+Alt+N
                </kbd>{" "}
                New
              </span>
              <span>
                <kbd className="px-2 py-1 bg-white dark:bg-neutral-800 rounded border">
                  ↑↓
                </kbd>{" "}
                Navigate
              </span>
              <span>
                <kbd className="px-2 py-1 bg-white dark:bg-neutral-800 rounded border">
                  Esc
                </kbd>{" "}
                Close
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Form Dialog */}
      <SnippetForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        snippetId={selectedSnippetId}
        onSnippetSaved={(snippetId) => {
          setSelectedSnippetId(snippetId);
        }}
      />
    </main>
  );
}
