import { Data } from '../datas/Data.js'
import { Photographer } from '../models/Photographer.js'
import { PhotographerCard } from '../template/PhotographerCard.js'

class Index {
  constructor () {
    this._datas = new Data('./data/datas.json')
  }

  async getPhotographers () {
    return await this._datas.getDatas()
  }

  async displayData (photographers) {
    const photographersSection = document.querySelector('.photographer_section')

    photographers.forEach((photographerData) => {
      const photographer = new Photographer(photographerData)
      const photographerCard = new PhotographerCard(photographer)
      const photographerCardDOM = photographerCard.getPhotographerCardDOM()
      photographersSection.appendChild(photographerCardDOM)
    })

  }
}
  
  
  // Penser à remplacer par les données récupérées dans le json
  /*
    const photographers = [
    {
      name: 'Ma data test',
      id: 1,
      city: 'Paris',
      country: 'France',
      tagline: 'Ceci est ma data test',
      price: 400,
      portrait: '../..  /public/assets/photographers/account.png'
    },
    {
      name: 'Autre data test',
      id: 2,
      city: 'Londres',
      country: 'UK',
      tagline: 'Ceci est ma data test 2',
      price: 500,
      portrait: '../../public/assets/photographers/account.png'
    }
  ]
  // et bien retourner le tableau photographers seulement une fois
  return ({ photographers: [...photographers, ...photographers, ...photographers] })
  */

/*async function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
};*/

/*async function init () {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
};*/

const app = new Index()
app.displayData(await app.getPhotographers())

