// This is the principal js file for manage photographer page
import { Data } from '../datas/Data.js'
import { Photographer } from '../models/Photographer.js'
import { totalLikes } from '../decorators/totalLikes.js'
import { PhotographerPageDOM } from '../template/PhotographerPageDOM.js'
import { MediaFactory } from '../factories/MediaFactory.js'
import { MediaDOMFactory } from '../factories/MediaDOMFactory.js'
import { addLike } from '../listeners/addLike.js'
import { displayModal } from '../listeners/displayModal.js'
import { sortMedia } from '../listeners/sortMedia.js'
import { SortMediaDOM } from '../template/SortMediaDOM.js'

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
      const mediasData = await this._datas.getMedias(this._photographerId)

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

        // Event listener for display the contact modal when the user click on contact-me button
        const contactDisplayed = document.querySelector('.contact_button')
        contactDisplayed.addEventListener('click', displayModal)

        // Event listener for display lightbox when the user click on the media image or video
        const mediaDisplayed = document.querySelector(`.media-thumbnail[data-id="${media.id}"]`)
        mediaDisplayed.addEventListener('click', displayModal)
        // The user can use key Enter on the keyboard
        mediaDisplayed.addEventListener('keypress', (event) => {
          if (event.keyCode === 13) {
            mediaDisplayed.click()
          }
        })
      })

      // Sort system
      const sortBy = document.querySelector('#sort-by')
      const selectBtn = new SortMediaDOM()
      selectBtn.popularitySort()

      // Event listener for sort media when the user clik on button Sort by
      sortBy.addEventListener('click', sortMedia)
      sortBy.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          sortBy.click()
        }
      })

      // Event listener increment likes for each media and for sum of likes when the user click on the heart icon
      const likeBtn = document.getElementsByClassName('media-details__likes')
      for (let i = 0; i < likeBtn.length; i++) {
        likeBtn[i].addEventListener('click', addLike)
        // The user can use key Enter or key + on the keyboard
        likeBtn[i].addEventListener('keypress', (event) => {
          if (event.key === 'Enter' || event.key === '+') {
            likeBtn[i].click()
          }
        })
      }

      // Shortcuts for keyboard navigation
      window.addEventListener('keydown', (event) => {
        // Check if modals are display with the css propertie display block
        const contactElement = document.querySelector('#contact')
        const lightboxElement = document.querySelector('#lightbox')

        // Keyboard navigation for the lightbox
        if (lightboxElement.style.display === 'block') {
          // Block the focus in the lightbox
          if (event.key === 'Tab') {
            if (event.target === document.querySelector('.close-modal--lightbox')) {
              event.preventDefault()
              document.querySelector('.lightbox-media').focus()
            }
          }
          if (event.key === 'Tab' && event.shiftKey === true) {
            if (event.target === document.querySelector('.lightbox-media')) {
              event.preventDefault()
              document.querySelector('.close-modal--lightbox').focus()
            }
          }
          // Next media
          if (event.key === 'ArrowRight') {
            document.querySelector('.arrow--right').click()
          }
          // Previous media
          if (event.key === 'ArrowLeft') {
            document.querySelector('.arrow--left').click()
          }
          // Read video
          if (event.code === 'Space' && lightboxElement.querySelector('video')) {
            lightboxElement.querySelector('video').play()
          }
          // Close lightbox
          if (event.key === 'Escape') {
            document.querySelector('.close-modal--lightbox').click()
          }
        }

        // Keyboard navigation for the contact modal
        if (contactElement.style.display === 'block') {
          // Block the focus in the lightbox
          if (event.key === 'Tab') {
            if (event.target === document.querySelector('#submit-btn')) {
              event.preventDefault()
              document.querySelector('.close-modal--contact').focus()
            }
          }
          if (event.key === 'Tab' && event.shiftKey === true) {
            if (event.target === document.querySelector('.close-modal--contact')) {
              event.preventDefault()
              document.querySelector('#submit-btn').focus()
            }
          }
          // Close contact modal
          if (event.key === 'Escape') {
            document.querySelector('.close-modal--contact').click()
          }
        }
      })
    } catch (error) {
      console.log('Un problème est survenu : ', error)
    }
  }
}

const app = new PhotographerPage()
app.displayData()
