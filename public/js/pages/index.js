import { Data } from '../datas/Data.js'
import { Photographer } from '../models/Photographer.js'
import { PhotographerCard } from '../template/PhotographerCard.js'
import { photoInPromote } from '../decorators/photoInPromote.js'

/**
 * Class for build homepage
 */
class Index {
  constructor () {
    this._datas = new Data('./data/datas.json')
  }

  /**
   * Display photographers cards on home page
   */
  displayData () {
    // Get the html section for add datas inside
    const photographersSection = document.querySelector('.photographer_section')

    /**
     * Get a promise of datas and resolve it
     * If is OK, a new photographer and a new photographerCard objects are created
     */
    this._datas.getPhotographers().then(function (result) {
      result.forEach((photographerData) => {
        const photographer = photoInPromote(new Photographer(photographerData))
        const photographerCardDOM = new PhotographerCard(photographer).buildPhotographerCardDOM()
        photographersSection.appendChild(photographerCardDOM)
      })
    }).catch(function (error) {
      console.log('Un problème est survenu : ', error)
    })
  }
}

const app = new Index()
app.displayData()
