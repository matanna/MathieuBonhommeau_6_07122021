/*
 * Class for build the banner on each photographer page
 */
export class PhotographerPageDOM {
  constructor (photographer) {
    this._photographer = photographer
    this._photographerBanner = document.getElementsByClassName('photograph-header')[0]
  }

  /**
   * Build the banner which is display on each photographer page
   * @returns {object} PhotographerBanner
   */
  buildPhotographerPageDOM () {
    this.createTitleBlockElement()
    this.updateContactMe()
    this.createPortraitElement()
    this.createFixBottomElement()
    return this._photographerBanner
  }

  /**
   * Create the block title with h1, city and tagline
   */
  createTitleBlockElement () {
    const header = document.querySelector('header')
    header.setAttribute('aria-label', `Page du photographe ${this._photographer.name}`)
    header.focus()
    // Create titleBlock element
    const titleBlock = document.createElement('div')
    titleBlock.classList = 'photographer-title-block'

    // Create title element
    const h1 = document.createElement('h1')
    h1.textContent = this._photographer.name
    h1.classList = 'photographer-title'

    // Create city element
    const city = document.createElement('h2')
    city.textContent = this._photographer.city
    city.classList = 'photographer-origin'
    city.setAttribute('lang', 'en')

    // Create tagline element
    const tagline = document.createElement('p')
    tagline.textContent = this._photographer.tagline
    tagline.classList = 'photographer-tagline'

    // Create tags elements
    const tagsDOM = document.createElement('div')
    tagsDOM.classList.add('tags-static')
    this._photographer.tags.forEach((element) => {
      const tag = document.createElement('span')
      tag.classList.add('tag-static')
      tag.innerHTML = element
      tag.setAttribute('data-value', element)
      tag.setAttribute('lang', 'en')
      tagsDOM.append(tag)
    })

    // Build titleBlock element
    titleBlock.append(h1)
    titleBlock.append(city)
    titleBlock.append(tagline)
    titleBlock.append(tagsDOM)

    this._photographerBanner.prepend(titleBlock)
  }

  updateContactMe () {
    const contactBtn = document.querySelector('.contact_button')
    contactBtn.setAttribute('data-photographerId', this._photographer.id)
  }

  /**
   * Create image for display photographer portrait
   */
  createPortraitElement () {
    const portrait = document.createElement('img')
    portrait.setAttribute('src', `./public/assets/photographers/Photographers_ID_Photos/littles/${this._photographer.portrait}`)
    portrait.setAttribute('alt', this._photographer.name)
    portrait.classList = 'photographer-img'

    this._photographerBanner.append(portrait)
  }

  createFixBottomElement () {
    const fix = document.createElement('div')
    fix.classList = 'fix'

    const likes = document.createElement('div')
    likes.textContent = this._photographer.totalLikes
    likes.classList = 'fix__total-likes'
    likes.setAttribute('data-total', this._photographer.totalLikes)
    likes.setAttribute('lang', 'en')

    const price = document.createElement('div')
    price.textContent = this._photographer.price
    price.classList = 'fix__price'

    fix.append(likes)
    fix.append(price)

    const body = document.querySelector('body')
    body.append(fix)
  }
}
