'use client'

import { TypePlaylist } from "@/types/playlist";
import Image from "next/image";
import { useEffect, useState } from "react";
import Text from "../Text/Text";
import Button from "../Button";
import Link from "next/link";
import ErrorMessage from "../ErrorMessage";

export default function Playlist() {
  const [playlists, setPlaylists] = useState<TypePlaylist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTracks() {
      try{ 
        const res = await fetch(`/api/deezer?type=playlists`);
        const data : {data: TypePlaylist[]} = await res.json();
        setPlaylists(data.data);
      } catch {
        if(!navigator.onLine) setError('Нет интернета')
        else setError('Сервер не отвечает') 
      }finally {
        setLoading(false)
      }
    }
    fetchTracks()
  }, []);

  if(loading) return <div>Loading...</div>;
  if(error) return <ErrorMessage message={error}/>

  return (
    <div className="flex align-center gap-5 text-center overflow-x-auto overflow-y-hidden custom-scroll">
      {playlists.map(playlist=> (
        <div key={playlist.id} className="group">
          <div className="relative w-48 h-48">
            {loading ? (
              <div className="w-48 h-48 bg-gray-300 rounded-lg"/>
            ) : (
              <Image 
                src={playlist.picture_medium} 
                alt={playlist.title} 
                width={200}
                height={200}
                className="rounded-lg"
              />
            )}
            <Link href={`/playlist/${playlist.id}`}>
              <Button className="bottom-3 right-2"/>
            </Link>
          </div>
          <Text>{playlist.title}</Text>
        </div>
      ))}
    </div>
  )
}