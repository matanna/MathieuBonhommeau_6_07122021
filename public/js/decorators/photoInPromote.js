import { Data } from '../datas/Data.js'

export async function photoInPromote (photographer) {
  const datas = new Data('./data/datas.json')

  const photos = await datas.getPhotos(photographer.id)
  console.log(photos)
  const index = Math.floor(Math.random() * photos.length)
  photographer._photoInPromote = photos[index].image
  console.log(photographer, index)
  return photographer
}
