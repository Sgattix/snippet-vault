# SnippetVault — Production README

SnippetVault is a lightweight, frontend-only code snippet manager built with Next.js, TypeScript, Tailwind and Monaco Editor. It’s intended for personal use: snippets are stored in the browser via `localStorage`, and the UI focuses on quick capture and retrieval.

Features
- Create / edit / delete snippets (title, description, language, tags, category)
- Monaco Editor for viewing and editing code (inline edit + form)
- Favorites, copy-to-clipboard, import/export JSON
- Persistent state via a single `SnippetsProvider` (Context) and `localStorage`
- UX polish: toasts (sonner) and keyboard shortcuts

Quick start (dev)
```bash
npm install
npm run dev
```
Open http://localhost:3000

Build & production
```bash
npm run build
npm run start
```
Deploy on Vercel for best Next.js support. If you export (`next export`) be aware Monaco needs client-side runtime.

Recommended CI
- Run `npm ci`, `npm run build` and `npm run lint` on PRs. Add tests later (Jest/Playwright).

Troubleshooting
- Monaco blank: ensure client-side rendering (Monaco needs `window`).
- No persistence: DevTools → Application → Local Storage → `snippetvault_snippets`.
- UI not updating: ensure `SnippetsProvider` is used in `src/app/layout.tsx` and components consume `useSnippetsContext()`.

Developer notes (where to look)
- `src/hooks/useSnippets.ts` — state management + persistence
- `src/lib/localStorage.ts` — read/write helpers
- `src/context/SnippetsContext.tsx` — app-wide provider
- `src/components/SnippetList.tsx` — list UI (filtering can be extended)
- `src/components/SnippetEditor.tsx` — Monaco viewer + inline editor
- `src/components/SnippetForm.tsx` — create/edit form with Monaco

Contributing
- Open an issue for feature requests. Keep PRs small and focused; run linters and typechecks before submitting.

License
- MIT

Want me to add a ready-made GitHub Actions workflow and a Vercel deployment guide? I can add both next.

