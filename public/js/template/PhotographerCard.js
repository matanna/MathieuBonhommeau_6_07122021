export class PhotographerCard {
  constructor (photographer) {
    this._photographer = photographer
    // Create a div which will use for create photographer card
    this._photographerCard = document.createElement('div')
  }

  buildPhotographerCardDOM () {
    // Create a div with class 'photographer' which will use for create photographer card

    this.createLinkElement()
    this.createComeFromeElement()
    this.createTaglineElement()
    this.createPriceElement()

    this._photographerCard.className = 'photographer'
    return this._photographerCard
  }

  /**
   * Create img element for display the image choosed by the photographer
   */
  createLinkElement () {
    // Create link for go on the photographer page
    const a = document.createElement('a')
    a.setAttribute('href', './photographer.html')
    a.setAttribute('aria-label', `Lien vers la page de ${this._photographer._name}`)
    a.className = 'photographer-link'

    // Create image choosed by the photographer (in our case, it is generate in random)
    const img = document.createElement('img')
    img.setAttribute('src', `./public/assets/photographers/Photographers_ID _Photos/littles/${this._photographer._portrait}`)
    img.setAttribute('alt', this._photographer._name)
    img.classList = 'photographer-link__img'

    // Create the title of the card - Photographer name in a h2
    const h2 = document.createElement('h2')
    h2.textContent = this._photographer.name
    h2.classList = 'photographer-link__title card'

    // Build the card link
    a.appendChild(img)
    a.appendChild(h2)
    this._photographerCard.appendChild(a)
  }

  /**
   * Where the photographer come form in a h3 title
   */
  createComeFromeElement () {
    const h3 = document.createElement('h3')
    h3.textContent = this._photographer.getComeFrom()
    h3.classList = 'photographer-origin card'
    this._photographerCard.appendChild(h3)
  }

  /**
   * The photographer catchphrase
   */
  createTaglineElement () {
    const tagline = document.createElement('p')
    tagline.textContent = this._photographer.tagline
    tagline.classList = 'photographer-tagline card'
    this._photographerCard.appendChild(tagline)
  }

  /**
   * Price per day for the photographer
   */
  createPriceElement () {
    const price = document.createElement('p')
    price.textContent = this._photographer.price
    price.classList = 'photographer-price card'
    this._photographerCard.appendChild(price)
  }
}
