import { MediaCardDOM } from '../template/MediaCardDOM.js'
/**
 * Class for build the list of photographer medias for dispay it on photographer page
 */
export class PhotoCardDOM extends MediaCardDOM {
  createMediaPicture () {
    const img = document.createElement('img')
    img.setAttribute('src', `./public/assets/photographers/${this._photographer.name}/mediums/${this._media.image}`)
    img.setAttribute('alt', this._media.altText)
    img.setAttribute('data-id', this._media.id)
    img.setAttribute('tabindex', 0)
    img.classList = 'media-thumbnail'
    this._mediaCard.append(img)
  }
}
