import { writable } from "svelte/store";

export const highlightYear = writable(2011);
export const activeSection = writable("intro");
export const readingListVisible = writable(false);
export const readingList = writable([]);
export const stepData = writable([]);
export const sliderVisible = writable(false);
export const sliderStore = writable(0);