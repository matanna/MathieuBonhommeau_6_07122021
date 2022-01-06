import { MediaCardDOM } from '../template/MediaCardDOM.js'
/**
 * Class for build the list of photographer medias for dispay it on photographer page
 */
export class VideoCardDOM extends MediaCardDOM {
  createMediaPicture () {
    const video = document.createElement('video')
    video.classList = 'media-thumbnail'
    video.setAttribute('data-id', this._media.id)
    video.setAttribute('tabindex', 0)
    video.setAttribute('aria-label', 'Ouvrir le media en grand dans une lightbox')

    const source = document.createElement('source')
    source.setAttribute('src', `./public/assets/photographers/${this._photographer.name.replace(' ', '_')}/videos/${this._media.video}`)
    source.setAttribute('type', 'video/mp4')

    video.append(source)
    this._mediaCard.append(video)
  }
}
