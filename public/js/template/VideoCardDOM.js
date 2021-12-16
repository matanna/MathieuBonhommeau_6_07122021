import { MediaCardDOM } from '../template/MediaCardDOM.js'
/**
 * Class for build the list of photographer medias for dispay it on photographer page
 */
export class VideoCardDOM extends MediaCardDOM {
  createMediaPicture () {
    const video = document.createElement('video')
    video.classList = 'media-thumbnail'

    const source = document.createElement('source')
    source.setAttribute('src', `./public/assets/photographers/${this._photographer.name}/videos/${this._media.video}`)
    source.setAttribute('type', 'video/mp4')

    video.append(source)
    this._mediaCard.append(video)
    console.log(this._media)
  }
}
