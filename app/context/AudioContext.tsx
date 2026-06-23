"use client";
import { TypeTrack } from "@/types/track";
import React, { createContext, useContext, useRef, useState, ReactNode } from "react";

interface AudioContextType {
  currentTrack: TypeTrack | null;
  setCurrentTrack: (track: TypeTrack | null) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  togglePlay: () => void;
}

export const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<TypeTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  return (
    <AudioContext.Provider value={{ currentTrack, setCurrentTrack, isPlaying, setIsPlaying, audioRef, togglePlay }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};