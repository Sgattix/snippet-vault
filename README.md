# 🔐 SnippetVault

> A professional code snippet manager built with Next.js, TypeScript, Monaco Editor, and shadcn/ui

# 🔐Project & Dev Guide

SnippetVault is a frontend-only code snippet manager built with Next.js + TypeScript, Monaco Editor, Tailwind, and a small shadcn-style component set.

This repository is delivered as a learning challenge: the core architecture and UI are scaffolded, and key logic (state, persistence and form handling) has TODOs to implement. The README below has been updated to reflect completed features and the current developer workflow.

---

**Current status (high level)**

- **Completed:** Next.js app scaffold, TypeScript, Tailwind, shadcn-like UI components, Monaco Editor integration, `useSnippets` hook, `localStorage` persistence, Context provider, in-place editor toggle, Sonner toasts.
- **Remaining / optional enhancements:** advanced filtering, sorting, export/import, keyboard shortcuts, and additional UI polish.

---

**Quick start**

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

Open http://localhost:3000

---

**What to test quickly**

- Create a snippet (New Snippet) — it should appear immediately and be selected.
- Click a snippet — it displays in Monaco Editor.
- Edit in-place: click the small pencil in the editor header to toggle inline editing, modify the code, then Save (check icon). The list and storage update immediately.
- Edit via form: open the form to edit other fields (title, tags, language). Saving selects and updates the snippet.
- Copy to clipboard: use the copy action and paste elsewhere.
- Delete: confirm deletion and observe immediate removal.

---

**Developer notes & file map**

- `src/hooks/useSnippets.ts` — core hook managing snippets state and syncing with `localStorage`.
- `src/lib/localStorage.ts` — small utilities to persist snippets to `localStorage`.
- `src/context/SnippetsContext.tsx` — Context provider that exposes a single shared instance of `useSnippets` to the app.
- `src/components/SnippetList.tsx` — sidebar list UI (simple rendering; filtering can be added later).
- `src/components/SnippetEditor.tsx` — main editor area with read-only view and an inline edit toggle (Monaco Editor). Save in-place updates the shared state.
- `src/components/SnippetForm.tsx` — create/edit form using Monaco as the code input; supports tags, category, language and favorite.

---

**How the pieces work together**

- The app is wrapped with `SnippetsProvider` in `src/app/layout.tsx`; components consume the shared state via `useSnippetsContext()`.
- When a snippet is created or updated, the hook updates state and persists to `localStorage`. Because all components use the same context, the UI updates immediately.

---

**Common troubleshooting**

- If Monaco doesn't render, ensure the app runs in a browser environment (Monaco requires window/document).
- If snippets don't persist: open DevTools → Application → Local Storage and inspect the `snippetvault_snippets` key.
- If UI doesn't update after creating/updating: verify components use `useSnippetsContext()` (not `useSnippets()` directly) and that `SnippetsProvider` is in `src/app/layout.tsx`.

---

**Next improvements (suggested)**

- Implement filtering and search in `src/components/SnippetList.tsx` (title, tags, language, category).
- Add export/import (JSON) to let users backup/restore snippets.
- Add sort controls (by updated date, favorites, language).
- Improve accessibility (keyboard navigation, ARIA labels) and add tests.


