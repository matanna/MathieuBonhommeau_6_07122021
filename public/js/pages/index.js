// This is the principal js file for manage the homepage.
import { Data } from '../datas/Data.js'
import { Photographer } from '../models/Photographer.js'
import { PhotographerCard } from '../template/PhotographerCard.js'
// import { photoInPromote } from '../decorators/photoInPromote.js'

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
  async displayData () {
    // Get the html section for add datas inside
    const photographersSection = document.querySelector('.photographer_section')

    try {
      const photographersDatas = await this._datas.getPhotographers()

      photographersDatas.forEach(async (photographerData) => {
        // Each photographer card is added in the list and display on the page
        const photographer = new Photographer(photographerData)
        const photographerCardDOM = new PhotographerCard(photographer).buildPhotographerCardDOM()
        photographersSection.appendChild(photographerCardDOM)

        // The photographer id is saved in local storage when the user click on a card
        const photographerLink = document.getElementById(`photographer-${photographer._id}`)
        photographerLink.addEventListener('click', () => localStorage.setItem('photographerId', photographer._id))
      })
    } catch (error) {
      console.log('Un problème est survenu : ', error)
    }
  }
}

const app = new Index()
app.displayData()
