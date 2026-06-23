export interface TypeTrack {
  id: number,
  title: string,
  name: string,
  link: string,
  preview: string,
  picture: string,
  picture_medium: string,
  artist: {
    id: number,
    name: string,
    picture: string
  },
  album: {
    id: number,
    title: string,
    cover: string,
    cover_medium: string,
    cover_small: string,
  }
}