export class PhotographerCard {
  constructor (photographer) {
    this._photographer = photographer
  }

  getPhotographerCardDOM () {
    const article = document.createElement('article')
    const img = document.createElement('img')
    img.setAttribute('src', this._photographer.portrait)
    const h2 = document.createElement('h2')
    h2.textContent = this._photographer.name
    article.appendChild(img)
    article.appendChild(h2)
    return (article)
  }
}
