import { SortMediaDOM } from '../template/SortMediaDOM.js'

export function sortMedia (event) {
  const options = document.querySelectorAll('.option')
  options.forEach((element) => {
    element.classList.remove('selected')
    element.classList.add('visible')
    element.style.pointerEvents = 'auto'
    element.addEventListener('click', chooseSort)
  })
}

function chooseSort (event) {
  event.stopPropagation()
  const sortType = this.dataset.value
  let mediaSorted
  const selectBtn = new SortMediaDOM()

  const medias = document.querySelectorAll('.media-card')
  if (sortType === 'popularity') {
    mediaSorted = Array.from(medias).sort((a, b) => b.querySelector('.media-details__likes').dataset.likes -
                                                          a.querySelector('.media-details__likes').dataset.likes)
    selectBtn.popularitySort()
  }

  if (sortType === 'date') {
    mediaSorted = Array.from(medias).sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date))
    selectBtn.dateSort()
  }

  if (sortType === 'title') {
    mediaSorted = Array.from(medias).sort((a, b) => {
      return a.querySelector('.media-details__title').innerHTML < b.querySelector('.media-details__title').innerHTML ? -1 : 1
    })
    selectBtn.titleSort()
  }

  const mediasSection = document.querySelector('.media-section')
  mediaSorted.forEach((element) => mediasSection.append(element))

  const options = document.querySelectorAll('.option')
  options.forEach((element) => {
    element.classList.remove('visible')
    element.style.pointerEvents = 'none'
    element.addEventListener('click', chooseSort)
  })
}
