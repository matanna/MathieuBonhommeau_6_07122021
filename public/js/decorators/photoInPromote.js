// Not use in the project -- This file use a decarotor pattern for add a photoInPromote porperty in a photographer object
import { Data } from '../datas/Data.js'

/**
 * Add a photo in a photographer - it is choosed in random
 * @param {object} Photographer 
 * @returns {object} Photographer
 */
export async function photoInPromote (photographer) {
  const datas = new Data('./data/datas.json')

  const photos = await datas.getPhotos(photographer.id)
  const index = Math.floor(Math.random() * photos.length)
  photographer._photoInPromote = photos[index].image
  return photographer
}
