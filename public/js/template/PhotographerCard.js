export class PhotographerCard {
  constructor (photographer) {
    this._photographer = photographer
    // Create a div which will use for create photographer card
    this._photographerCard = document.createElement('div')
  }

  buildPhotographerCardDOM () {
    // Create a div with class 'photographer' which will use for create photographer card

    this.createImageElement()
    this.createNameElement()
    this.createComeFromeElement()
    this.createTaglineElement()
    this.createPriceElement()

    this._photographerCard.className = 'photographer'
    return this._photographerCard
  }

  /**
   * Create img element for display the image choosed by the photographer
   */
  createImageElement () {
    const img = document.createElement('img')
    img.setAttribute('src', `./public/assets/photographers/${this._photographer._name}/littles/${this._photographer._photoInPromote}`)
    this._photographerCard.appendChild(img)
  }

  /**
   * Name of the photographer in a h2 title
   */
  createNameElement () {
    const h2 = document.createElement('h2')
    h2.textContent = this._photographer.name
    this._photographerCard.appendChild(h2)
  }

  /**
   * Where the photographer come form in a h3 title
   */
  createComeFromeElement () {
    const h3 = document.createElement('h3')
    h3.textContent = this._photographer.getComeFrom()
    this._photographerCard.appendChild(h3)
  }

  /**
   * The photographer catchphrase
   */
  createTaglineElement () {
    const tagline = document.createElement('p')
    tagline.textContent = this._photographer.tagline
    this._photographerCard.appendChild(tagline)
  }

  /**
   * Price per day for the photographer
   */
  createPriceElement () {
    const price = document.createElement('p')
    price.textContent = this._photographer.price
    this._photographerCard.appendChild(price)
  }
}
