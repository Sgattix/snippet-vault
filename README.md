# 🔐 SnippetVault Challenge

> A professional code snippet manager built with Next.js, TypeScript, Monaco Editor, and shadcn/ui

---

## 🎯 Challenge Overview

Welcome to **SnippetVault** - your mission is to complete a fully-functional code snippet manager that developers can use to save, organize, and retrieve reusable code snippets.

**What's Already Done:**

- ✅ Complete Next.js 14 setup with App Router
- ✅ shadcn/ui components integrated
- ✅ TypeScript type definitions
- ✅ Monaco Editor installed
- ✅ Responsive layout and UI structure
- ✅ SearchBar component (fully functional)

**What's TO DO:**

- ❌ localStorage utilities (persistence)
- ❌ `useSnippets` custom hook (state management)
- ❌ SnippetList component (filtering & rendering)
- ❌ SnippetEditor component (Monaco integration & actions)
- ❌ SnippetForm component (create/edit form logic)

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Implementation Checklist

### Phase 1: Data Persistence (Easy)

**File:** `src/lib/localStorage.ts`

Implement three functions:

- [ ] `saveSnippets()` - Save array to localStorage
- [ ] `loadSnippets()` - Load and parse from localStorage
- [ ] `clearSnippets()` - Clear all data (optional)

**Tips:**

- Use `JSON.stringify()` and `JSON.parse()`
- Handle errors gracefully with try-catch
- Return empty array on errors

---

### Phase 2: State Management (Medium)

**File:** `src/hooks/useSnippets.ts`

Complete the custom hook with:

- [ ] Load snippets from localStorage on mount
- [ ] Save to localStorage when snippets change
- [ ] `createSnippet()` - Generate ID, add timestamps
- [ ] `updateSnippet()` - Merge updates, update timestamp
- [ ] `deleteSnippet()` - Remove from state
- [ ] `getSnippetById()` - Find and return snippet

**Tips:**

- Use `crypto.randomUUID()` or `Date.now()` for IDs
- Use `useEffect` for localStorage sync
- Use `useCallback` for memoized functions
- Handle hydration (localStorage is client-side only)

---

### Phase 3: Snippet List (Medium)

**File:** `src/components/SnippetList.tsx`

Complete the list component:

- [ ] Use `useSnippets()` hook
- [ ] Implement filtering based on `searchQuery`
  - Search in: title, description, tags, language
  - Case-insensitive
- [ ] Render filtered snippets
- [ ] Handle loading state
- [ ] Handle empty state
- [ ] Visual feedback for selected snippet

**Tips:**

- Use `.filter()` and `.toLowerCase()`
- Consider sorting by `updatedAt` (newest first)
- Check multiple fields with OR logic

---

### Phase 4: Monaco Editor Integration (Medium)

**File:** `src/components/SnippetEditor.tsx`

Integrate Monaco and implement actions:

- [ ] Fetch snippet using `getSnippetById()`
- [ ] Configure Monaco Editor:
  - Pass `snippet.code` as value
  - Pass `snippet.language` as language
  - Set theme to "vs-dark"
  - Make it read-only
- [ ] Implement actions:
  - [ ] Delete snippet (with confirmation)
  - [ ] Toggle favorite
  - [ ] Copy to clipboard
  - [ ] Edit button (opens form)
- [ ] Handle empty state (no snippet selected)

**Tips:**

- Use `navigator.clipboard.writeText()` for copy
- Use `window.confirm()` for delete confirmation
- Update snippet with partial data for toggle favorite

---

### Phase 5: Form Logic (Hard)

**File:** `src/components/SnippetForm.tsx`

Complete the create/edit form:

- [ ] Manage form state (title, description, code, etc.)
- [ ] Detect EDIT vs CREATE mode
  - If `snippetId` exists and snippet found → EDIT
  - Otherwise → CREATE
- [ ] Load snippet data in EDIT mode
- [ ] Implement tag operations:
  - [ ] Add tag
  - [ ] Remove tag
  - [ ] Prevent duplicates
- [ ] Form validation:
  - Title required
  - Code required
  - Language required
- [ ] Submit handler:
  - Call `createSnippet()` in CREATE mode
  - Call `updateSnippet()` in EDIT mode
- [ ] Reset form on close

**Tips:**

- Use `useEffect` to load data when `snippetId` changes
- Validate before submission
- Trim inputs before saving
- Reset form after successful submission

---

## ✅ How to Know You're Done

Your SnippetVault is complete when:

1. ✅ You can create a new snippet
2. ✅ The snippet appears in the list
3. ✅ Clicking a snippet displays it in Monaco Editor
4. ✅ Search filters snippets correctly
5. ✅ You can edit a snippet
6. ✅ You can delete a snippet
7. ✅ You can toggle favorite
8. ✅ You can copy code to clipboard
9. ✅ Data persists after page refresh
10. ✅ No TypeScript errors

---

## 🧪 Testing Your Implementation

### Manual Tests:

1. **Create & Persistence**

   ```
   - Create a snippet
   - Refresh the page
   - Snippet should still be there
   ```

2. **Search**

   ```
   - Create snippets with different titles
   - Search by title, language, or tag
   - Results should filter correctly
   ```

3. **Edit**

   ```
   - Click a snippet
   - Click edit button
   - Modify fields
   - Save
   - Changes should reflect immediately
   ```

4. **Delete**

   ```
   - Click delete on a snippet
   - Confirm deletion
   - Snippet should disappear
   ```

5. **Favorite**

   ```
   - Toggle favorite on a snippet
   - Star icon should fill/unfill
   - State should persist
   ```

6. **Copy**
   ```
   - Click copy button
   - Paste in another app
   - Code should be identical
   ```

---

## 🎨 Bonus Challenges (Optional)

Want to take it further? Try these:

- [ ] Add language filtering dropdown
- [ ] Add category filtering
- [ ] Sort snippets (by date, name, favorites)
- [ ] Export/Import snippets as JSON
- [ ] Implement dark/light theme toggle
- [ ] Add keyboard shortcuts (Ctrl+N for new, etc.)
- [ ] Syntax highlighting in the form textarea
- [ ] Add "duplicate snippet" feature
- [ ] Implement snippet sharing (copy as URL)
- [ ] Add statistics (total snippets, most used language)

---

## 🆘 Need Help?

### Debugging Tips:

1. **Check Browser Console**

   - Look for errors
   - Check if functions are being called

2. **Verify localStorage**

   - Open DevTools → Application → Local Storage
   - Check if data is being saved

3. **TypeScript Errors**

   - Read the error message carefully
   - Check type definitions in `src/types/snippet.ts`

4. **Component Not Rendering**
   - Check if hook is returning data
   - Verify props are being passed correctly
   - Use `console.log()` to debug

### Common Gotchas:

- **localStorage is undefined**: Make sure you're checking for browser environment
- **Infinite re-renders**: Check useEffect dependencies
- **Data not persisting**: Verify saveSnippets is being called
- **Monaco not loading**: Check language name matches supported languages

---

## 📦 Project Structure

```
SnippetManager/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page (already done)
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # shadcn components (done)
│   │   ├── SearchBar.tsx       # ✅ Search component (done)
│   │   ├── SnippetList.tsx     # ❌ TODO: List component
│   │   ├── SnippetEditor.tsx   # ❌ TODO: Editor component
│   │   └── SnippetForm.tsx     # ❌ TODO: Form component
│   ├── hooks/
│   │   └── useSnippets.ts      # ❌ TODO: Main hook
│   ├── lib/
│   │   ├── utils.ts            # ✅ Utilities (done)
│   │   └── localStorage.ts     # ❌ TODO: Storage utils
│   └── types/
│       └── snippet.ts          # ✅ Type definitions (done)
└── package.json
```

---

## 🎓 What You'll Learn

By completing this challenge, you'll practice:

- ✅ Custom React Hooks (advanced state management)
- ✅ localStorage API (persistence & serialization)
- ✅ TypeScript (types, interfaces, generics)
- ✅ Monaco Editor integration (third-party libs)
- ✅ Component composition (props, callbacks)
- ✅ Form handling (validation, controlled inputs)
- ✅ Filtering & searching algorithms
- ✅ shadcn/ui component library
- ✅ Next.js App Router patterns

---

## 🏆 Solution Access

The solution is **not provided by default**.

To request the solution, you must:

1. Show your implementation attempt
2. Explain your reasoning and approach
3. Describe what's working and what's not

This is a **learning challenge** - the goal is growth, not just completion!

---

## 📝 Notes

- Focus on one phase at a time
- Test frequently (after each function)
- Don't worry about perfection - make it work first
- Use `console.log()` liberally for debugging
- Read the TODO comments in each file carefully

---

**Good luck, and happy coding! 🚀**

Remember: Every expert developer was once a beginner. The only way to improve is to build, fail, learn, and iterate.
