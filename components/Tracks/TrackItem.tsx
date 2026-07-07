import { TypeTrack } from "@/types/track"
import Image from "next/image"
import Text from "../Text/Text"
import ButtonPlayer from "../ButtonPlayer"

type Props = {
  track: TypeTrack,
  index: number,
  isActive: boolean,
  isPlaying: boolean,
  onPlay: () => void
}

export default function TrackItem({
  track,
  index,
  isActive,
  isPlaying,
  onPlay
}: Props) {
  return (
  <div className="grid grid-cols-[auto_80px_1fr_auto] items-center gap-4 my-6">
    <p className="text-gray-400">{index + 1}</p>
    {track.album.cover ? (
      <Image 
        src={track.album.cover} 
        alt={track.title || "track"} 
        width={70} 
        height={70} 
        className="rounded-full"
      />
    ) : (
      <div className="bg-gray-400 rounded-full w-17.5 h-17.5"></div>
    )}
    <Text className="font-light">
      {track.artist.name} - {track.title}
    </Text>

    <ButtonPlayer
      isActive={isActive}
      isPlaying={isPlaying}
      onPlay={onPlay}
    />
  </div>
  )
}