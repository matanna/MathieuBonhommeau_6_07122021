// This is the principal js file for manage photographer page
import { Data } from '../datas/Data.js'
import { Photographer } from '../models/Photographer.js'
import { totalLikes } from '../decorators/totalLikes.js'
import { PhotographerPageDOM } from '../template/PhotographerPageDOM.js'
import { changePropertyAltText } from '../decorators/changePropertyAltText.js'
import { MediaFactory } from '../factories/MediaFactory.js'
import { MediaDOMFactory } from '../factories/MediaDOMFactory.js'

class PhotographerPage {
  constructor () {
    this._datas = new Data('./data/datas.json')
    // Retrieve the photographer id which is saved in local storage when a user has clicked on a photographer card
    this._photographerId = localStorage.getItem('photographerId')
  }

  async displayData () {
    try {
      const photographerData = await this._datas.getPhotographer(this._photographerId)
      const mediasData = await this._datas.getMedia(this._photographerId)

      const photographer = totalLikes(new Photographer(photographerData[0]), mediasData)
      // Create the banner on photographer page with photographer data
      const photographerPageDOM = new PhotographerPageDOM(photographer)
      photographerPageDOM.buildPhotographerPageDOM()

      // Create the list of medias on photographer page with media data
      mediasData.forEach((element) => {
        const media = new MediaFactory(changePropertyAltText(element))
        const mediaCardDOM = new MediaDOMFactory(media, photographer)
        mediaCardDOM.buildMediaCardDOM()
      })
    } catch (error) {
      console.log('Un problème est survenu : ', error)
    }
  }
}

const app = new PhotographerPage()
app.displayData()
