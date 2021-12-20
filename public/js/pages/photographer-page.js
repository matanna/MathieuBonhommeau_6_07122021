// This is the principal js file for manage photographer page
import { Data } from '../datas/Data.js'
import { Photographer } from '../models/Photographer.js'
import { totalLikes } from '../decorators/totalLikes.js'
import { PhotographerPageDOM } from '../template/PhotographerPageDOM.js'
import { MediaFactory } from '../factories/MediaFactory.js'
import { MediaDOMFactory } from '../factories/MediaDOMFactory.js'
import { addLike } from '../listeners/addLike.js'
import { displayModal } from '../listeners/displayModal.js'

class PhotographerPage {
  constructor () {
    this._datas = new Data('./data/datas.json')
    // Retrieve the photographer id which is send with url in get parameter when a user has clicked on a photographer card
    const url = new URL(window.location.href)
    this._photographerId = new URLSearchParams(url.search).get('id')
  }

  async displayData () {
    try {
      const photographerData = await this._datas.getPhotographer(this._photographerId)
      const mediasData = await this._datas.getMedia(this._photographerId)

      // Create a new Photographer and use a decorator for add total of likes in the object
      const photographer = totalLikes(new Photographer(photographerData[0]), mediasData)

      // Create the banner on photographer page with photographer data
      const photographerPageDOM = new PhotographerPageDOM(photographer)
      photographerPageDOM.buildPhotographerPageDOM()

      // Create the list of medias on photographer page with media data
      mediasData.forEach((element) => {
        const media = new MediaFactory(element)
        const mediaCardDOM = new MediaDOMFactory(media, photographer)
        mediaCardDOM.buildMediaCardDOM()

        // Event listener for display lightbox when the user click on the media image or video
        const mediaDisplayed = document.querySelector(`.media-thumbnail[data-id="${media.id}"]`)
        mediaDisplayed.addEventListener('click', displayModal)
      })

      // Event listener increment likes for each media and for sum of likes when the user click on the heart icon
      const likeBtn = document.getElementsByClassName('media-details__likes')
      for (let i = 0; i < likeBtn.length; i++) {
        likeBtn[i].addEventListener('click', addLike)
      }
    } catch (error) {
      console.log('Un problème est survenu : ', error)
    }
  }
}

const app = new PhotographerPage()
app.displayData()
