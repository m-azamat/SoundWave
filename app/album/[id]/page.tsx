"use client"

import { useAudio } from "@/app/context/AudioContext"
import ErrorMessage from "@/components/ErrorMessage"
import Text from "@/components/Text/Text"
import Title from "@/components/Text/Title"
import TrackItem from "@/components/Tracks/TrackItem"
import { TypeTrack } from "@/types/track"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
export default function Album() {
  const params = useParams()

  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = useAudio();
  const [tracks, setTracks] = useState<TypeTrack[]>([])
  const [titleAlbum, setTitleAlbum] = useState("")
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(null)
    const fetchTrack = async() => {
      try{
        const res = await fetch(`/api/deezer?type=album&id=${params.id}`)
        if(!res.ok) throw new Error("Error")

        const data = await res.json()
        if(!data) throw new Error("Not found data")

        setTracks(data.tracks.data)
        setTitleAlbum(data.title)        
      }catch {
        setError(!navigator.onLine ? "Not interner" : "Error server")
      }finally {
        setLoading(false)
      } 
    }
    fetchTrack() 
  }, [params.id])

  if(loading) return <Text>Loading...</Text>
  if(error) return <ErrorMessage message={error}/>
  return (
    <div>
      <Title className="mb-7">Album {titleAlbum}</Title>
      {tracks.map((t,i) => (
        <TrackItem
          key={t.id}
          track={t}
          index={i}
          isPlaying={isPlaying && currentTrack?.id === t.id}
          onPlay={() => {
            if(currentTrack?.id === t.id) {
              setIsPlaying(!isPlaying)
            }else {
              setCurrentTrack(t)
              setIsPlaying(true)
            }
          }}
          isActive={currentTrack?.id === t.id}
        />
      ))}
    </div>
  )
}