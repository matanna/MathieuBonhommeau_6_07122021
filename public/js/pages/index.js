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
        tagDOM.setAttribute('data-place', 'banner')
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
        tagDOM.addEventListener('focus', (event) => {
          tagsDOM.setAttribute('aria-activedescendant', element)
          // Update tabindex attribute so that the focus stay in the filter
          if (event.target.getAttribute('tabindex') === tags.length.toString()) {
            document.querySelectorAll('.tag[data-place="banner"]').forEach((element) => {
              element.setAttribute('tabindex', parseInt(element.getAttribute('tabindex')) + 1)
              if (parseInt(element.getAttribute('tabindex')) === tags.length + 1) {
                element.setAttribute('tabindex', 1)
              }
            })
          }
        })
      })
      // Enable the focus in the filter area
      tagsDOM.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          let i = 1
          document.querySelector('.tag[data-place="banner"]').focus()
          document.querySelectorAll('.tag[data-place="banner"]').forEach((element) => element.setAttribute('tabindex', i++))
        }
      })

      photographersDatas.forEach(async (photographerData) => {
        // Each photographer card is added in the list and display on the page
        const photographer = new Photographer(photographerData)
        const photographerCardDOM = new PhotographerCardDOM(photographer).buildPhotographerCardDOM()
        photographersSection.appendChild(photographerCardDOM)

        const tags = photographerCardDOM.querySelectorAll('.tag[data-place="card"]')
        tags.forEach((element) => {
          element.addEventListener('click', filterPhotographer)
          element.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
              element.click()
            }
          })
        })
      })

      // Create a fixed button on the top of page for delete all filter when click on
      const deleteFilter = document.createElement('button')
      deleteFilter.setAttribute('type', 'button')
      deleteFilter.setAttribute('class', 'delete-filter')
      deleteFilter.setAttribute('aria-label', 'Supprimer les filtres')
      deleteFilter.setAttribute('tabindex', 0)
      deleteFilter.innerHTML = 'Annuler les filtres'
      document.querySelector('body').append(deleteFilter)
    } catch (error) {
      console.log('Un problème est survenu : ', error)
    }
  }
}

const app = new Index()
app.displayData()
