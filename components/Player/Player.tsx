"use client"
import { usePlayerStore } from "@/store/playerStore"

export default function Player() {
  const { currentTrack, isPlaying, togglePlay } = usePlayerStore()

  // if (!currentTrack) return null

  return (
    <div className="">
      
      <div className="ml-4">
        <p></p>
        <span className="text-sm text-gray-400"></span>
      </div>

      <button onClick={togglePlay} className="mx-auto">
        {isPlaying ? "⏸" : "▶️"}
      </button>
    </div>
  )
}
