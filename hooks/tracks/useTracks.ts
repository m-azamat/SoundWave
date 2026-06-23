import { TypeTrack } from "@/types/track";
import { useCallback, useRef, useState } from "react";

export function useTracks() {
  const [tracks, setTracks] = useState<TypeTrack[]>([]);
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)
  
  const indexRef = useRef(0)
  const flagRef = useRef(false)

  const fetchTracks = useCallback(async () => {
    if(flagRef.current) return
    flagRef.current = true

    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/deezerFilter?index=${indexRef.current}`)
      if(!res.ok) throw new Error("Error server")

      const data : {data: TypeTrack[]} = await res.json()
      if(!data.data) throw new Error("Not found data")

      setTracks(prev => {
        const newTrack = data.data.filter(
          t => !prev.some(p => p.id === t.id)
        )
        return [...prev, ...newTrack]
      })

      indexRef.current += 10
    } catch{
      setError("error")
    } finally {
      flagRef.current = false
      setLoading(false)
    }
  }, [])

  return {tracks, error, fetchTracks, loading}
}