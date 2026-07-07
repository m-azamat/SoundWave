"use client"

import { useEffect } from "react"
import Text from "../Text/Text"
import ButtonPlayer from "../ButtonPlayer"
import Image from "next/image"
import { useAudio } from "@/app/context/AudioContext"

export default function Player(){

  const {currentTrack, isPlaying, audioRef, togglePlay} = useAudio();

  useEffect(() => {
    if(!currentTrack || !audioRef.current) return
    if(audioRef.current.src !== currentTrack.preview) {
      audioRef.current.src = currentTrack.preview
      audioRef.current.load()
    }

    if(isPlaying) {
      audioRef.current.play()
    }
  }, [currentTrack, audioRef, isPlaying])

  useEffect(() => {
    if(!audioRef.current) return

    if(isPlaying) {
      audioRef.current.play()
    }else {
      audioRef.current.pause()
    }
  }, [isPlaying, audioRef])

  return (
    currentTrack && 
    <div className={
      "fixed left-0 bottom-0 bg-gray-900 w-full flex items-center justify-between p-6"
    }>
      <div>
          <div className="flex flex-1 min-w-0 items-center gap-2">
            <Image 
              src={currentTrack?.album.cover_medium} 
              alt={currentTrack?.artist.name} 
              width={60}
              height={60}
              className="rounded-xl flex-none"
            />
            <div className="">
              <Text className="text-sm text-gray-400">
                {currentTrack?.title}
              </Text>
              <Text className="text-sm text-gray-400">
                {currentTrack?.artist.name}
              </Text>
            </div>
          </div>
      </div>
      <div>
        <ButtonPlayer
          isPlaying={isPlaying}
          isActive={isPlaying}
          onPlay={() => togglePlay()}
        />
        <audio ref={audioRef}></audio>
      </div>
    </div>
  )
}
