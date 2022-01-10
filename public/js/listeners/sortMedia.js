import { SortMediaDOM } from '../template/SortMediaDOM.js'

/**
 * Callback function for display all options for sort medias
 * @param {*} event
 */
export function sortMedia (event) {
  // Change aria-expanded attribute for true - the listbox is open
  this.setAttribute('aria-expanded', true)
  const listbox = document.querySelector('#listbox-options')

  // Retrieve all listbox options
  const options = document.querySelectorAll('.option')

  // Get the value of the selected option for aria-activedescendant attribute
  listbox.setAttribute('aria-activedescendant', options[0].dataset.value)

  options[0].focus()
  let i = 1

  options.forEach((element) => {
    element.setAttribute('tabindex', `${i++}`)
    element.classList.remove('selected')
    element.classList.add('visible')
    element.style.pointerEvents = 'auto'

    // Change the value of aria-activedescendant attribute in term of option
    element.addEventListener('focus', (event) => {
      listbox.setAttribute('aria-activedescendant', element.dataset.value)
      // Change tabindes value for keep the focus in the listbox when it is opened
      if (event.target.getAttribute('tabindex') === '3') {
        event.preventDefault()
        document.querySelector('.option[tabindex="2"]').setAttribute('tabindex', 3)
        document.querySelector('.option[tabindex="1"]').setAttribute('tabindex', 2)
        event.target.setAttribute('tabindex', '1')
      }
    })
    element.addEventListener('click', chooseSort)
    element.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.stopPropagation()
        element.click()
      }
    })
  })
}

/**
 * Callback function for sort media in termes of choosed option
 * @param {*} event
 */
function chooseSort (event) {
  event.stopPropagation()
  const sortType = this.dataset.value
  let mediaSorted
  // Use SortMediaDOM template for adapt order of options
  const selectBtn = new SortMediaDOM()

  const medias = document.querySelectorAll('.media-card')

  // Sort media in term of choosed option
  if (sortType === 'popularity') {
    mediaSorted = Array.from(medias).sort((a, b) => b.querySelector('.media-details__likes').dataset.likes -
                                                          a.querySelector('.media-details__likes').dataset.likes)
    selectBtn.popularitySort()
    document.querySelector('.option[data-value="popularity"]').ariaSelected = true
  }

  if (sortType === 'date') {
    mediaSorted = Array.from(medias).sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date))
    selectBtn.dateSort()
    document.querySelector('.option[data-value="date"]').ariaSelected = true
  }

  if (sortType === 'title') {
    mediaSorted = Array.from(medias).sort((a, b) => {
      return a.querySelector('.media-details__title').innerHTML < b.querySelector('.media-details__title').innerHTML ? -1 : 1
    })
    selectBtn.titleSort()
    document.querySelector('.option[data-value="title"]').ariaSelected = true
  }

  const mediasSection = document.querySelector('.media-section')
  mediaSorted.forEach((element) => mediasSection.append(element))

  /**
   * Close the listbox and show the active sort on the sort button
   */
  const button = document.querySelector('.sort-media__listbox')
  // Change aria-expanded attribute for false - the listbox is close
  button.setAttribute('aria-expanded', false)
  button.focus()
}
