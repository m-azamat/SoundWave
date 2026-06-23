"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import Text from "../Text/Text";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import Link from "next/link";
import { TypeArtist } from "@/types/artist";

export default function Artist() {

  const [artists, setArtists] = useState<TypeArtist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    async function fetchArtists() {
      try {
        const res = await fetch(`/api/deezer?type=artists`);
        const data : {data: TypeArtist[]} = await res.json();
        setArtists(data.data);
      } catch {
        setError(!navigator.onLine ? "Not interner" : "Error server")
      } finally {
        setLoading(false);
      }
    }
    fetchArtists();
  }, []);

  if(loading) return <div>Loading...</div>
  if(error) return <ErrorMessage message={error}/>

  return(
    <div className="flex align-center gap-5 text-center overflow-x-auto custom-scroll">
      {artists.map(artist => (
        <div key={artist.id} className="text-center">
          <div className="relative w-48 h-48 group">
            <Image 
              src={artist.picture_medium} 
              alt={artist.name} 
              width={192}
              height={192}
              className="
                object-cover
                rounded-full
                animate-[spin_4s_linear_infinite]
                [animation-play-state:paused]
                group-hover:[animation-play-state:running]
              "
            />
            <Link href={`/artist/${artist.id}`}>
              <Button className="top-1/2 -translate-x-1/2 -translate-y-1/2"/>
            </Link>
          </div>
          <Text>{artist.name}</Text>
        </div>
      ))}
    </div>
  )
}