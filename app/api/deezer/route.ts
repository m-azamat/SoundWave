
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);

  const type = searchParams.get("type")
  const id = searchParams.get("id")
  let url = "";
  
  switch(type) {
    case "playlists":
      url = "https://api.deezer.com/chart/0/playlists?limit=15";
      break;
    case "playlist":
      url = `https://api.deezer.com/playlist/${id}`;
      break;
    case "artists":
      url = "https://api.deezer.com/chart/0/artists?limit=15";
      break;
    case "artist":
      url = `https://api.deezer.com/artist/${id}/top?limit=50`;
      break;
    case "albums":
      url = "https://api.deezer.com/chart/0/albums?limit=15";
      break;
    case "album":
      url = `https://api.deezer.com/album/${id}`;
      break;
    case "search":
      const query = searchParams.get("q");
      if(!query) {
        return NextResponse.json({ error: "Query is required" }, { status: 400 });
      }
      url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}`;
      break;
    default: 
      return NextResponse.json({error: "Invalid type"}, {status: 400});
  }
  
  const res = await fetch(url);
  const data = await res.json();
  return NextResponse.json(data);
}