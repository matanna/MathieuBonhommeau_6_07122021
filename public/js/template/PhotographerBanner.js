// Class for buil the banner on each photographer page
export class PhotographerBanner {
  constructor (photographer) {
    this._photographer = photographer
    // this._medias = medias
    this._photographerBanner = document.getElementsByClassName('photograph-header')[0]
  }

  buildPhotographBanner () {
    this.createTitleBlockElement()
    this.createPortraitElement ()
    console.log(this._photographerBanner)
    return this._photographerBanner
  }

  createTitleBlockElement () {
    // Create titleBlock element
    const titleBlock = document.createElement('div')
    titleBlock.classList = 'photographer-title-block'

    // Create title element
    const h1 = document.createElement('h1')
    h1.textContent = this._photographer._name
    h1.classList = 'photographer-title'

    // Create city element
    const city = document.createElement('h2')
    city.textContent = this._photographer._city
    city.classList = 'photographer-origin'

    // Create tagline element
    const tagline = document.createElement('p')
    tagline.textContent = this._photographer._tagline
    tagline.classList = 'photographer-tagline'

    // Build titleBlock element
    titleBlock.append(h1)
    titleBlock.append(city)
    titleBlock.append(tagline)

    this._photographerBanner.prepend(titleBlock)
  }

  createPortraitElement () {
    const portrait = document.createElement('img')
    portrait.setAttribute('src', `./public/assets/photographers/Photographers_ID _Photos/littles/${this._photographer._portrait}`)
    portrait.setAttribute('alt', this._photographer._name)
    portrait.classList = 'photographer-img'

    this._photographerBanner.append(portrait)
  }

}