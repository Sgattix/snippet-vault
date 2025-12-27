# SnippetVault - Challenge Summary

## 🎯 Your Mission

Complete a professional code snippet manager with localStorage persistence and Monaco Editor integration.

## 📂 Files to Complete (in order)

### 1️⃣ `src/lib/localStorage.ts` (EASY)

- Implement `saveSnippets()`, `loadSnippets()`, `clearSnippets()`
- Handle JSON serialization and errors

### 2️⃣ `src/hooks/useSnippets.ts` (MEDIUM)

- Load/save snippets with localStorage
- Implement CRUD operations: create, update, delete, getById
- Use React hooks properly (useState, useEffect, useCallback)

### 3️⃣ `src/components/SnippetList.tsx` (MEDIUM)

- Use the `useSnippets` hook
- Filter snippets based on search query
- Render list with proper styling

### 4️⃣ `src/components/SnippetEditor.tsx` (MEDIUM)

- Display snippet in Monaco Editor
- Implement actions: delete, favorite, copy, edit
- Handle empty state

### 5️⃣ `src/components/SnippetForm.tsx` (HARD)

- Create/Edit form logic
- Detect mode (CREATE vs EDIT)
- Manage tags, validation, submission

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## ✅ Success Criteria

- Create, edit, delete snippets
- Search works correctly
- Data persists after refresh
- No TypeScript errors
- Monaco Editor displays code

## 📖 Full Instructions

See [README.md](README.md) for detailed step-by-step guide.

---

**Remember:** Focus on learning, not perfection. Test frequently!
