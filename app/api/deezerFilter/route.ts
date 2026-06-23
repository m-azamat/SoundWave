import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
   const {searchParams} = new URL(request.url)
   const limit = 10
   const index = Number(searchParams.get("index") || 0)
   const res = await fetch(`
      https://api.deezer.com/chart/0/tracks?limit=${limit}&index=${index}
    `)
    const data = await res.json()
    return NextResponse.json(data)
  } catch(err) {
    return NextResponse.json(
      {
        error: err
      }
    )
  }
}