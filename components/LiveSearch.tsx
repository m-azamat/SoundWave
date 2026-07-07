'use client'

import { TypeTrack } from "@/types/track"
import { useEffect, useState } from "react"
import Text from "./Text/Text"
import { IoIosSearch } from "react-icons/io"

export default function LiveSearch() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<TypeTrack[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(query.length < 3) {
      setResult([])
      return
    }
    
    const handler = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/deezer?type=search&q=${query}`)
        const data = await res.json()
        setResult(data.data || [])
      }catch {
        console.log("error");
      }finally {
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(handler)
  }, [query])

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <IoIosSearch 
          size={20}
          className="
            absolute 
            left-3 
            text-gray-400
        "/>
        <input 
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search track..."
          className="
            flex border-2 border-gray-800 rounded-xl 
            p-3 pl-10 w-full outline-none"
        />
      </div>
      {loading && <div className="absolute mt-2">loading...</div>}
      {result.length > 0 && (
        <div className="
          absolute 
          z-20 
          mt-2 
          bg-[#0b173f] 
          w-full 
          space-y-4 
          mb-10 
          p-4 
          rounded-xl 
          overflow-y-auto 
          max-h-80
          custom-scroll
        ">
          {result.map(r => (
            <div key={r.id}>
              <Text>
                {r.artist.name} - {r.title} 
              </Text>
            </div>
          ))}
        </div>
      )} 
    </div>
  )
}