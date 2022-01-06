import { Data } from '../datas/Data.js'
import { Photographer } from '../models/Photographer.js'
import { PhotographerCardDOM } from '../template/PhotographerCardDOM.js'

/**
 * Callback function for filter photographer by tag on the homepage
 * @param {event} event
 */
export async function filterPhotographer (event) {
  const datas = new Data('./data/datas.json')
  const photographers = await datas.getPhotographers()
  const photographerSection = document.querySelector('.photographer_section')
  const tagElements = document.querySelectorAll('.tag')
  const filterBox = document.querySelector('.tags')
  let photographerFiltered = ''
  const deleteFilterBtn = document.querySelector('.delete-filter')

  // Delete all styles which would be applied on tag elements
  tagElements.forEach((element) => element.classList.remove('tag--selected'))

  if (this.classList.contains('tag')) {
    const filter = this.dataset.value
    // Color the tag which is selected
    const tagElement = document.querySelectorAll(`.tag[data-value="${filter}"]`)
    tagElement.forEach((element) => {
      element.classList.add('tag--selected')
      filterBox.setAttribute('aria-selected', element.dataset.value)
    })
    // Filter photographers by tags
    photographerFiltered = photographers.filter((element) => element.tags.includes(filter))
    deleteFilterBtn.style.display = 'block'
  } else {
    photographerFiltered = photographers
    deleteFilterBtn.style.display = 'none'
  }

  // Empty the photographer section on the homepage
  photographerSection.innerHTML = ''

  // Recreate the photographer section with only photographer filtered
  photographerFiltered.forEach((element) => {
    const photographer = new Photographer(element)
    const photographerCard = (new PhotographerCardDOM(photographer)).buildPhotographerCardDOM()
    photographerSection.append(photographerCard)

    const tags = photographerCard.querySelectorAll('.tag')
    tags.forEach((element) => element.addEventListener('click', filterPhotographer))
  })

  // Delete filter when the user click on the bouton 'Cancel the filter'
  deleteFilterBtn.addEventListener('click', filterPhotographer)
}
