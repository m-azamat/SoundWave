'use client';
import { TypeAlbum } from "@/types/album";
import Image from "next/image";
import { useEffect, useState } from "react";
import Text from "../Text/Text";
import Button from "../Button";
import ErrorMessage from "../ErrorMessage";
import Link from "next/link";
export default function Albums() {
  const [albums, setAlbums] = useState<TypeAlbum[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchAlbums() {
      try {
        const res = await fetch(`/api/deezer?type=albums`);
        const data : {data: TypeAlbum[]} = await res.json();
        setAlbums(data.data);
      }catch {
        setError(!navigator.onLine ? "Not interner" : "Error server")
      }finally {
        setLoading(false);
      }
    } 
    fetchAlbums();
  }, [])

  if(loading) return <div>Loading...</div>
  if(error) return <ErrorMessage message={error}/>

  return (
    <div className="flex gap-5 overflow-x-auto custom-scroll">
      {albums.map(album => (
        <div key={album.id} className="group">
          <div className="relative w-50 h-50">
            {loading ? (
              <div className="w-50 h-50 bg-gray-300 rounded-lg"/>
            ) : (
              <Image src={album.cover_medium} alt={album.title} width={200} height={200}
                className="rounded-lg"
              />
            )}
            <Link href={`/album/${album.id}`}>
              <Button className="bottom-3 right-2"/>
            </Link>
          </div>
          <Text>{album.title}</Text>
          
        </div>
      ))}
    </div>
  )
}