import { Snippet } from "@/types/snippet";

const STORAGE_KEY = "snippetvault_snippets";

export function saveSnippets(snippets: Snippet[]): void {
  try {
    const json = JSON.stringify(snippets);
    localStorage.setItem(STORAGE_KEY, json);
  } catch (err) {
    throw new Error(`Corrupted snippets data found (${snippets.toString()}): ${err}`)
  }
}

export function loadSnippets(): Snippet[] {
  try {
    const snippets = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "");
    return snippets;
  } catch(err) {
    console.log(`Corrupted snippets data found in local storage: ${err}`)
    return [];
  }
}

export function clearSnippets(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch(err) {
    throw new Error(`An unexpected error occurred while trying to clear snippets data in local storage: ${err}`);
  }
}
