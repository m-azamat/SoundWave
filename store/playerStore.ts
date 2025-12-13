import { Track } from "@/types/track";
import { create } from "zustand";

interface PlayerState {
  currentTrack: Track | null
  isPlaying: boolean
  setTrack: (track: Track) => void
  togglePlay: () => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentTrack: null,
  isPlaying: false,
  setTrack: (track) => set({currentTrack: track, isPlaying: true}),
  togglePlay: () => set((s) => ({isPlaying: !s.isPlaying}))
}))