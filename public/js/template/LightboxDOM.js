// import datas from '../../../data/datas.json' assert { type: "json" }
import { Data } from '../datas/Data.js'

/**
 * Class for build the lightbox
 */
export class LightboxDOM {
  constructor (mediaId) {
    this._data = (new Data('./data/datas.json'))
    this._mediaId = mediaId
  }

  // Build the lightbox
  async build () {
    // Retrieve datas
    const datas = await this._data.get()

    this._media = (datas.media.filter((value) => value.id === parseInt(this._mediaId)))[0]
    this._photographer = (datas.photographers.filter((value) => value.id === parseInt(this._media.photographerId)))[0]
    this._medias = datas.media.filter((value) => value.photographerId === parseInt(this._photographer.id))

    // Get key of current media and retrieve previous id media and next id media. We put them in a data-id attribute for next and previeous arrow
    let nextkey = this._medias.indexOf(this._media) + 1
    if (nextkey > this._medias.length - 1) {
      nextkey = 0
    }
    this._nextMediaId = this._medias[nextkey].id

    let prevkey = this._medias.indexOf(this._media) - 1
    if (prevkey < 0) {
      prevkey = this._medias.length - 1
    }
    this._prevMediaId = this._medias[prevkey].id

    // Add data-id attribute at the open lightbox for retrieve the focus on this media when user press Escape key for close it
    document.querySelector('#lightbox').setAttribute('data-id', this._media.id)

    this._modal = document.querySelector('.lightbox-modal')
    this._modal.setAttribute('aria-labelledby', `media-title-${this._media.id}`)

    this.createModal()

    if (this._media.image) {
      this.createImage()
    } else if (this._media.video) {
      this.createVideo()
    } else {
      throw new Error('Type de média inconnu !')
    }
  }

  createModal () {
    this._modal.innerHTML = `
        <div class="close-modal close-modal--lightbox" data-name="lightbox" data-id=${this._media.id} tabindex="4" aria-label="Fermer la lightbox">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z"/>
          </svg>
        </div>
        <div class="arrow arrow--left" data-id="${this._prevMediaId}" tabindex="3" aria-label="image précédente">
            <i class="fas fa-chevron-left arrow-icon"></i>          
        </div>
        <div class="lightbox-content">
            <div class="lightbox-media" tabindex="1"></div>
            <div class="lightbox-name" id="media-title-${this._media.id}">${this._media.title}</div>
        </div>
        <div class="arrow arrow--right"  data-id="${this._nextMediaId}" tabindex="2"  aria-label="image suivante">
            <i class="fas fa-chevron-right arrow-icon"></i>          
        </div>
    `
  }

  createImage () {
    const image = this._modal.querySelector('.lightbox-media')
    image.innerHTML = `
        <img src="./public/assets/photographers/${this._photographer.name}/mediums/${this._media.image}" alt="${this._media.altText}" />
    `
  }

  createVideo () {
    const video = this._modal.querySelector('.lightbox-media')
    video.innerHTML = `
        <video controls tabindex="2" aria-labelledby="media-title">
            <source src="./public/assets/photographers/${this._photographer.name}/videos/${this._media.video}" type="video/mp4">
        </video>
    `
  }
}
