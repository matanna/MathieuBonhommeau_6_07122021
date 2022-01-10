/**
 * Class for create an object MediaCardDOM for display the media on page
 */
export class MediaCardDOM {
  constructor (media, photographer) {
    this._media = media
    this._photographer = photographer
    this._mediaSection = document.querySelector('.media-section')
    this._mediaCard = document.createElement('div')
    this._mediaCard.classList = 'media-card'
    this._mediaCard.setAttribute('data-date', this._media.date)
    this._mediaCard.setAttribute('tabindex', 0)
    this._mediaCard.setAttribute('data-id', this._media.id)
    this._mediaCard.setAttribute('aria-labelledby', `card-title-${this._media.id}`)
  }

  // Build the card media html
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
    title.setAttribute('id', `card-title-${this._media.id}`)
    title.classList = 'media-details__title'
    title.setAttribute('lang', 'en')

    const likes = document.createElement('div')
    likes.textContent = this._media.likes
    likes.classList = 'media-details__likes'
    likes.setAttribute('role', 'button')
    likes.setAttribute('aria-label', 'Cliquer pour ajouter un like')
    likes.setAttribute('data-likes', this._media.likes)
    likes.setAttribute('tabindex', 0)
    likes.setAttribute('lang', 'en')

    details.append(title)
    details.append(likes)

    this._mediaCard.append(details)
  }
}
