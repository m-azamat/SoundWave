'use client'

import TrackItem from "@/components/Tracks/TrackItem"
import { TypeTrack } from "@/types/track"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Title from "@/components/Text/Title"
import ErrorMessage from "@/components/ErrorMessage"
import Text from "@/components/Text/Text"
import { useAudio } from "@/app/context/AudioContext"

export default function Playlist() {
  const params = useParams()

  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = useAudio();
  const [tracks, setTracks] = useState<TypeTrack[]>([])
  const [titlePlaylist, setTitlePlaylist] = useState("")
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setError(null)
    setLoading(true)
    const fetchTracks = async() => {
      try {
        const res = await fetch(`/api/deezer?type=playlist&id=${params.id}`)
        if(!res.ok) throw new Error("Error server")

        const data = await res.json()
        if(!data) throw new Error("Not found data")

        setTracks(data.tracks.data)
        setTitlePlaylist(data.title)
        
      }catch {
        setError(!navigator.onLine ? "Not interner" : "Error server")
      }finally {
        setLoading(false)
      }
  }
  fetchTracks()
  }, [params.id])

  if(error) return <ErrorMessage message={error}/>

  return (
    <div>
      <Title className="mb-7">Playlist`s {titlePlaylist}</Title>
      <div className="">
        {tracks.map((t, i) => (
          <TrackItem
            key={t.id}
            track={t}
            index={i}
            onPlay={() => {
              if(currentTrack?.id == t?.id) {
                setIsPlaying(!isPlaying)
              }else {
                setCurrentTrack(t)
                setIsPlaying(true)
              }
            }}
            isPlaying={isPlaying && currentTrack?.id === t.id}
            isActive={currentTrack?.id === t.id}
          />
        ))}
      </div>
      {loading && (
        <Text>loading...</Text >
      )}
    </div>
  )
}