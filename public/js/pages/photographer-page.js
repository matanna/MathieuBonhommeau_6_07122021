// This is the principal js file for manage photographer page
import { Data } from '../datas/Data.js'
import { Photographer } from '../models/Photographer.js'
import { PhotographerBanner } from '../template/PhotographerBanner.js'

class PhotographerPage {
  constructor () {
    this._datas = new Data('./data/datas.json')
  }

  async displayData () {
    // Retrieve the photographer id which is saved in local storage when a user has clicked on a photographer card
    const photographerId = localStorage.getItem('photographerId')

    const photographerData = await this._datas.getPhotographer(photographerId)
    const photographer = new Photographer(photographerData[0])
    const photographerBanner = new PhotographerBanner(photographer)
    photographerBanner.buildPhotographBanner()
    console.log(photographerBanner)
  }
}

const app = new PhotographerPage()
app.displayData()
