export interface TypeAlbum {
  id: number,
  artist: {
    id: number,
    name: string,
    picture_medium: string
    tracklist: string
  },
  cover_medium: string,
  title: string,
  link: string
}