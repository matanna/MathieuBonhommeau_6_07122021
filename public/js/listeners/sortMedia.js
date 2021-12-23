export function sortMedia () {
  const options = document.querySelectorAll('.option')
  options.forEach((element) => {
    element.classList.remove('selected')
    element.classList.add('visible')
    element.addEventListener('click', chooseSort)
  })
}

function chooseSort () {
  const sortType = this.dataset.value
  const medias = document.querySelectorAll('.media-card')

  const mediasTitle = Array.from(medias).map((element) => element.querySelector('.media-details__title').innerHTML).sort()
  const mediasSorted = Array.from(medias).map((element) => {
    mediasTitle.forEach((e) => {
      if (e === element.querySelector('.media-details__title').innerHTML) {
        return element
      }
    })
  })
  console.log(mediasSorted)
}
