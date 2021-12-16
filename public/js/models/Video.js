export class Video {
  constructor ({ id, photographerId, video, likes, date, price, altText, title }) {
    this._id = id
    this._photographerId = photographerId
    this._video = video
    this._likes = likes
    this._date = date
    this._price = price
    this._altText = altText
    this._title = title
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

  get video () {
    return this._video
  }

  set video (video) {
    this._video = video
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

  get title () {
    return this._title
  }

  set title (title) {
    this._title = title
  }
}
