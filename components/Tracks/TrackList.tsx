'use client';

import { useEffect, useRef } from "react";
import ErrorMessage from "../ErrorMessage";
import TrackItem from "./TrackItem";
import { useTracks } from "@/hooks/tracks/useTracks";
import { useAudio } from "@/app/context/AudioContext";

export default function TrackList() {  
  const {tracks, error, fetchTracks, loading} = useTracks()
  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = useAudio();

  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    fetchTracks()
  }, [fetchTracks])

  useEffect(() => {
    const observer = new IntersectionObserver(([en]) => {
      if(en.isIntersecting && !loading) {
        fetchTracks()
      }
    })

    if(ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [fetchTracks, loading])

  if(loading && tracks.length === 0) return <div>Loading...</div>
  if(error) return <ErrorMessage message={error}/>

  return (
    <div>
      {tracks.map((track, i) => (
        <TrackItem
          key={track.id}
          track={track}
          index={i}
          isActive={currentTrack?.id === track.id}
          isPlaying={isPlaying}
          onPlay={() => {
            if(currentTrack?.id === track.id) {
              setIsPlaying(isPlaying)
            } else {
              setCurrentTrack(track)
              setIsPlaying(true)
            }
          }}
        />
      ))}

      <div ref={ref} className="h-10"></div>
      {loading && tracks.length > 0 && (
        <h2 className="text-center my-12">loading more...</h2>
      )}
    </div>
  )
}