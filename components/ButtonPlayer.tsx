'use client'

import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa6";

interface PlayType {
  isPlaying: boolean,
  isActive: boolean,
  onPlay: () => void,
  className?: string
}

export default function ButtonPlayer({
    isPlaying,
    isActive,
    onPlay,
    className
  }: PlayType) {

  return (
    <button onClick={onPlay} 
      className={`
         ${className ?? ''}bg-[#033c81] p-3 rounded-full
        `}>
      {isActive && isPlaying ? <FaPause/> : <FaPlay/>}
    </button>
  );
}