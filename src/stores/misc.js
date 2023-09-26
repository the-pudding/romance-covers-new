import { writable } from "svelte/store";

export const highlightYear = writable(2011);
export const activeSection = writable("intro");
export const readingListVisible = writable(false);
export const readingList = writable([]);
export const stepData = writable([]);
export const sliderVisible = writable(false);
export const sliderStoreRaunch = writable(0);
export const sliderStoreIllo = writable(0);
export const sliderStoreRace = writable(0);
export const xShiftRaunch = writable(0);
export const xShiftIllo = writable(0);
export const xShiftRace = writable(0);
export const maxWidthRaunch = writable(0);
export const maxWidthIllo = writable(0);
export const maxWidthRace = writable(0);