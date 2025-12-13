import { Track } from "@/types/track";

async function getTracks():Promise<Track[]> {
  const res = await fetch("http://localhost:3000/api/tracks")
  return res.json()
}

export default async function Home() {
  const tracks = await getTracks()
  return (
    <div className="">
      <main>
        {tracks.map(track => (
          <div key={track.id}>
            <h2>{track.title}</h2>
            <h2>{track.artist}</h2>
          </div>
        ))}
      </main>
    </div>
  );
}
