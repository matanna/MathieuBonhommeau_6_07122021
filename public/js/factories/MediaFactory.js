import { Photo } from '../models/Photo.js'
import { Video } from '../models/Video.js'
/**
 * Factory for choose between Video or Photo object in terms of data
 * @param {object} data
 * @return {object} Video or Photo
 */
export class MediaFactory {
  constructor (data) {
    if (data.video) {
      return new Video(data)
    } else if (data.image) {
      return new Photo(data)
    } else {
      throw new Error('Le type de cet élément n\'est pas reconnu !')
    }
  }
}
