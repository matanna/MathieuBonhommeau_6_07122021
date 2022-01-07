import { PhotoCardDOM } from '../template/PhotoCardDOM.js'
import { VideoCardDOM } from '../template/VideoCardDOM.js'
/**
 * Use a factory pattern for create an object PhotoCardDOM or VideoCardDOM
 * @param {object} data
 * @return {object} VideoCardDOM or PhotoCardDOM
 */
export class MediaDOMFactory {
  constructor (media, photographer) {
    if (media.video) {
      return new VideoCardDOM(media, photographer)
    } else if (media.image) {
      return new PhotoCardDOM(media, photographer)
    } else {
      throw new Error('Le type de cet élément n\'est pas reconnu !')
    }
  }
}
