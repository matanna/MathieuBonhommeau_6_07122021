export class MediaCardDOM {
  constructor (media, photographer) {
    this._media = media
    this._photographer = photographer
    this._mediaSection = document.querySelector('.media-section')
    this._mediaCard = document.createElement('div')
    this._mediaCard.classList = 'media-card'
  }

  buildMediaCardDOM () {
    this.createMediaPicture()
    this.createMediaDetails()
    this._mediaSection.append(this._mediaCard)
  }

  createMediaDetails () {
    const details = document.createElement('div')
    details.classList = 'media-details'

    const title = document.createElement('h3')
    title.textContent = this._media.title
    title.classList = 'media-details__title'

    const likes = document.createElement('p')
    likes.textContent = this._media.likes
    likes.classList = 'media-details__likes'

    details.append(title)
    details.append(likes)

    this._mediaCard.append(details)
  }
}
