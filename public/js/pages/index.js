// This is the principal js file for manage the homepage.
import { Data } from '../datas/Data.js'
import { Photographer } from '../models/Photographer.js'
import { PhotographerCardDOM } from '../template/PhotographerCardDOM.js'
import { filterPhotographer } from '../listeners/filterPhotographer.js'

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
      const header = document.querySelector('header')
      header.focus()

      // Retrieve photographer tags
      const tags = []
      photographersDatas.forEach((element) => {
        element.tags.forEach((tag) => {
          // Save tag only if this one is not already saved
          if (!tags.includes(tag)) {
            tags.push(tag)
          }
        })
      })

      // Create filter area
      const tagsDOM = document.querySelector('.tags')
      tagsDOM.setAttribute('tabindex', 0)
      tagsDOM.setAttribute('role', 'list')
      tagsDOM.setAttribute('aria-label', 'Filtrer les photographes par tag')

      tags.forEach((element) => {
        const tagDOM = document.createElement('span')
        tagDOM.classList.add('tag')
        tagDOM.innerHTML = element
        tagDOM.setAttribute('data-value', element)
        tagDOM.setAttribute('role', 'listitem')
        tagDOM.setAttribute('lang', 'en')
        tagDOM.setAttribute('aria-label', 'tag')
        // Disable the focus on each tag for ease the keyboard navigation
        tagDOM.setAttribute('tabindex', -1)
        tagsDOM.append(tagDOM)
        // Select a filter
        tagDOM.addEventListener('click', filterPhotographer)
        tagDOM.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            tagDOM.click()
          }
        })
        // Exit to the filter area with escape key
        tagDOM.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
            tagsDOM.focus()
          }
        })
        tagDOM.addEventListener('focus', () => {
          tagsDOM.setAttribute('aria-activedescendant', element)
        })
      })
      // Enable the focus in the filter area
      tagsDOM.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          document.querySelector('.tag').focus()
          document.querySelectorAll('.tag').forEach((element) => element.setAttribute('tabindex', 1))
        }
      })

      photographersDatas.forEach(async (photographerData) => {
        // Each photographer card is added in the list and display on the page
        const photographer = new Photographer(photographerData)
        const photographerCardDOM = new PhotographerCardDOM(photographer).buildPhotographerCardDOM()
        photographersSection.appendChild(photographerCardDOM)

        const tags = photographerCardDOM.querySelectorAll('.tag')
        tags.forEach((element) => element.addEventListener('click', filterPhotographer))
      })

      const deleteFilter = document.createElement('button')
      deleteFilter.setAttribute('type', 'button')
      deleteFilter.setAttribute('class', 'delete-filter')
      deleteFilter.setAttribute('aria-label', 'Supprimer les filtres')
      deleteFilter.innerHTML = 'Annuler les filtres'
      document.querySelector('body').append(deleteFilter)
    } catch (error) {
      console.log('Un problème est survenu : ', error)
    }
  }
}

const app = new Index()
app.displayData()
