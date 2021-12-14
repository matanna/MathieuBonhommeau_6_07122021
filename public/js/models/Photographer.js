/**
 * Class for create a photographer
 * @param {array} data Array is unstructured in constructor
 */
export class Photographer {
  constructor ({ id, name, city, country, tagline, price, portrait }) {
    this._id = id
    this._name = name
    this._city = city
    this._country = country
    this._tagline = tagline
    this._price = price
    this.portrait = portrait
  }

  get id () {
    return this._id
  }

  set id (id) {
    this._id = id
  }

  get name () {
    return this._name
  }

  set name (name) {
    this._name = name
  }

  get city () {
    return this._city
  }

  set city (city) {
    this._city = city
  }

  get country () {
    return this._country
  }

  set country (country) {
    this._country = country
  }

  get tagline () {
    return this._tagline
  }

  set tagline (tagline) {
    this._tagline = tagline
  }

  get price () {
    return `${this._price}€ \\ jour`
  }

  set price (price) {
    this._price = price
  }

  get portrait () {
    return this._portrait
  }

  set portrait (portrait) {
    this._portrait = portrait
  }

  getComeFrom () {
    return `${this.city}, ${this.country}`
  }
}
