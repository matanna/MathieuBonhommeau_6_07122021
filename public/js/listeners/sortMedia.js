import datas from '../../../data/datas.json' assert { type: "json" }

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
  let mediaSorted

  const medias = document.querySelectorAll('.media-card')
  if (sortType === 'popularity') {
    mediaSorted = Array.from(medias).sort((a, b) => b.querySelector('.media-details__likes').dataset.likes -
                                                          a.querySelector('.media-details__likes').dataset.likes)
  }

  if (sortType === 'date') {
    mediaSorted = Array.from(medias).sort((a, b) => {
      const element = querySelector('.media-card')
      if (element.querySelector('img')) {
        return b.querySelector('.media-card > img').dataset.date -
               a.querySelector('.media-card > img').dataset.date
      } else if 
      
    }
  }

  const mediasSection = document.querySelector('.media-section')
  mediaSorted.forEach((element) => mediasSection.append(element))

  // const medias = datas.media.filter((element) => element.photographerId === parseInt(photographerId))



  /*if (sortType === 'popularity') {
    const mediaSorted = medias.sort((a, b) => b.likes - a.likes)
    console.log(mediaSorted)
  }

  if (sortType === 'date') {
    const mediaSorted = medias.sort((a, b) => a.date - b.date)
    console.log(mediaSorted) 
  }

  if (sortType === 'title') {
    const mediaSorted = medias.sort((a, b) => a.title < b.title ? -1 : 1)
    console.log(mediaSorted)
  }*/
}
