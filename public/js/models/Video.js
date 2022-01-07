/**
 * Class for create a Video object with all informations retrived in the data.json
 */
export class Video {
  constructor ({ id, photographerId, video, title, likes, date, price, altText }) {
    this._id = id
    this._photographerId = photographerId
    this._title = title
    this._video = video
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
}
