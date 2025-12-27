"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/SearchBar";
import SnippetList from "@/components/SnippetList";
import SnippetEditor from "@/components/SnippetEditor";
import SnippetForm from "@/components/SnippetForm";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSnippetId, setSelectedSnippetId] = useState<string | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main className="min-h-screen bg-linear-to-tr from-slate-50 to-slate-100 dark:from-blue-600 dark:to-fuchsia-800 dark:text-white flex items-center">
      <div className="container mx-auto p-10 bg-amber-50 dark:bg-neutral-900 rounded-lg shadow-lg">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            SnippetVault 🔐
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Your personal code snippet library
          </p>
        </div>

        {/* Actions Bar */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="gap-2"
            variant="outline"
          >
            <Plus className="w-4 h-4" />
            New Snippet
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Snippet List */}
          <div className="lg:col-span-1">
            <SnippetList
              searchQuery={searchQuery}
              selectedId={selectedSnippetId}
              onSelect={setSelectedSnippetId}
            />
          </div>

          {/* Main Area - Editor */}
          <div className="lg:col-span-2">
            <SnippetEditor
              snippetId={selectedSnippetId}
              onEdit={() => setIsFormOpen(true)}
            />
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
      </div>
    </main>
  );
}
