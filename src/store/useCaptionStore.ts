import { create } from "zustand";

interface Caption {
  start: number;
  end: number;
  text: string;
  position?: { x: number; y: number };
}

interface CaptionState {
  captions: Caption[];
  setCaptions: (captions: Caption[]) => void;
  updateCaption: (index: number, text: string) => void;
  updateCaptionPosition: (index: number, x: number, y: number) => void;
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
  updateCaptionPosition: (index, x, y) =>
    set((state) => {
      const newCaptions = [...state.captions];
      newCaptions[index] = { ...newCaptions[index], position: { x, y } };
      return { captions: newCaptions };
    }),
}));
