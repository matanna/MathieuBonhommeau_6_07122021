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
    video.setAttribute('aria-desribedby', `transcript-${this._media.altText}`)

    const track = document.createElement('track')
    track.setAttribute('kind', 'descriptions')
    track.setAttribute('src', `./public/assets/photographers/${this._photographer.name.replace(' ', '_')}/videos/video.vtt`)
    track.setAttribute('srclang', 'fr')

    const source = document.createElement('source')
    source.setAttribute('src', `./public/assets/photographers/${this._photographer.name.replace(' ', '_')}/videos/${this._media.video}`)
    source.setAttribute('type', 'video/mp4')

    const transcript = document.createElement('div')
    transcript.setAttribute('id', `transcript-${this._media.altText}`)
    transcript.classList.add('transcript')

    video.append(source)
    video.append(track)
    this._mediaCard.append(video)
  }
}
