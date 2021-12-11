/**
 *
 * @param {string} path
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
        return await json.photographers
      }
    } catch (error) {
      console.log(error)
    }
  }
}
