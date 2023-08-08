import { writable } from "svelte/store";

export const highlightYear = writable(2011);
export const activeSection = writable(null);
export const readingListVisible = writable(false);
export const readingList = writable([]);