/**
 * Class for retrieve datas in database
 * Implement a Singleton Pattern - The Data object must be instantiated only one time
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

  /**
   * This function retrieves all photographers
   * @returns {array} Array of Photographer objects
   */
  async get () {
    return fetch(this._path)
      .then(function (response) {
        if (response.ok) {
          return response.json()
        }
      })
      .then(function (value) {
        return value
      })
      .catch(function (error) {
        throw new Error('Un problème est survenu lors de la récupération des données :', error)
      })
  }

  /**
   * Retrieve all photographers
   * @returns {object} Promise
   */
  async getPhotographers () {
    const datas = await this.get()
    return datas.photographers
  }

  /**
   * This function retrieves all photos of a photographer
   * @param {integer} photographerId
   * @returns {object} Promise
   */
  async getPhotos (photographerId) {
    const datas = await this.get()
    return datas.media.filter(function (element) {
      return (element.photographerId === photographerId && !('video' in element))
    })
  }
}

