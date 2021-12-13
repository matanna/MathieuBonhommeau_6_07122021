/**
 * Class for retrieve datas in database
 * @param {string} path url/path of the database
 * @module Data
 */
export class Data {
  constructor (path) {
    if (Data.exists) {
      return Data.instance
    }

    this._path = path

    Data.exists = true
    Data.instance = this
  }

  getData () {
    return {
      path: this._path
    }
  }

  async getPhotographers () {
    try {
      const response = await fetch(this._path)
      if (response.ok) {
        const json = await response.json()
        return json.photographers
      }
    } catch (error) {
      throw new Error('Un problème est survenu lors de la récupération des données :', error)
    }
  }

  async getPhotos (photographerId) {
    try {
      const response = await fetch(this._path)
      if (response.ok) {
        const json = await response.json()
        const photos = json.media.filter(function (photographerId) {
          json.media.photographerId = photographerId
        })
        console.log(photos)
      }
    } catch (error) {
      throw new Error('Un problème est survenu lors de la récupération des données :', error)
    }
  }
}
