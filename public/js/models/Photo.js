/**
 * Class for create a Photo object with all informations retrived in the data.json
 */
export class Photo {
  constructor ({ id, photographerId, title, image, likes, date, price, altText }) {
    this._id = id
    this._photographerId = photographerId
    this._title = title
    this._image = image
    this._likes = likes
    this._date = date
    this._price = price
    this._altText = altText
  }

  get id () {
    return this._id
  }

  set id (id) {
    this._id = id
  }

  get photographerId () {
    return this._photographerId
  }

  set photographerId (photographerId) {
    this._photographerId = photographerId
  }

  get title () {
    return this._title
  }

  set title (title) {
    this._title = title
  }

  get image () {
    return this._image
  }

  set image (image) {
    this._image = image
  }

  get likes () {
    return this._likes
  }

  set likes (likes) {
    this._likes = likes
  }

  get date () {
    return this._date
  }

  set date (date) {
    this._date = date
  }

  get price () {
    return this._price
  }

  set price (price) {
    this._price = price
  }

  get altText () {
    return this._altText
  }

  set altText (altText) {
    this._altText = altText
  }
}
