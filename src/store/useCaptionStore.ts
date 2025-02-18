// useCaptionStore.ts
import { create } from "zustand";

interface Caption {
  start: number;
  end: number;
  text: string;
}

interface CaptionState {
  captions: Caption[];
  setCaptions: (captions: Caption[]) => void;
  updateCaption: (index: number, text: string) => void;
}

export const useCaptionStore = create<CaptionState>((set) => ({
  captions: [],
  setCaptions: (captions) => set({ captions }),
  updateCaption: (index, text) =>
    set((state) => {
      const newCaptions = [...state.captions];
      newCaptions[index] = { ...newCaptions[index], text };
      return { captions: newCaptions };
    }),
}));
