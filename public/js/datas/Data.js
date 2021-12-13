/**
 * Class for retrieve datas in database
 * @param {string} path url/path of the database
 * @module Data
 */
export class Data {
  constructor (path) {
    this._path = path
  }

  async getDatas () {
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
}
