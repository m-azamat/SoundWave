import { Track } from "@/types/track";
import { NextResponse } from "next/server";

const tracks: Track[] = [
  {
    id: 1,
    title: "No name",
    artist: "dayn",
    cover: "/covers/1.jpg",
    audioUrl: "/music/1.mp3",
    duration: 245
  }
]

export async function GET() {
  return NextResponse.json(tracks)
}