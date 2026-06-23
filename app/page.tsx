
import Playlist from "@/components/Tracks/Playlist";
import Artist from "@/components/Tracks/Artist";
import Albums from "@/components/Tracks/Albums";
import Track from "@/components/Tracks/TrackList";
import Title from "@/components/Text/Title";
import Filter from "@/components/Filter";
// import { useSession } from "next-auth/react";

export default function Home() {

  // const session = useSession();

  return (
    <main>
      <div className="flex flex-col gap-10">
        
        
          <div>
            <Filter/>
          </div>
          <div>
            <Title className="mb-4">Playlists</Title>
            <Playlist />
          </div>
          <div>
            <Title className="mb-4">Artists</Title>
            <Artist/>
          </div>
          <div>
            <Title className="mb-4">Albums</Title>
            <Albums/>
          </div>
          <div>
            <Title className="mb-4">Tracks</Title>
            <Track/>
          </div>
        
      
      </div>
    </main>
  );
}
