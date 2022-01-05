// import datas from '../../../data/datas.json' assert { type: "json" }
import { Data } from '../datas/Data.js'

export class ContactDOM {
  constructor () {
    this._data = (new Data('./data/datas.json'))

    this._contactBtn = document.querySelector('.contact_button')
    this._modal = document.querySelector('.contact-modal')
  }

  async build () {
    // Retrieve datas
    const datas = await this._data.get()

    this._photographer = datas.photographers.filter((value) => value.id === parseInt(this._contactBtn.dataset.photographerid))[0]
    this.createModal()
  }

  createModal () {
    this._modal.innerHTML = `
        <h1 class="photographer-title photographer-title--modal" id="contact-title">
            Contactez-moi<br> 
            ${this._photographer.name}
            <span role="button" aria-label="Fermer la modale de contact" class="close-modal close-modal--contact" data-name="contact"  tabindex="1">
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z"/>
              </svg>
          </span>
        </h1>
        <form action="#" method="post">
          <div class="formData" id="firstname-input">
            <label for="firstname">Prénom</label>
            <input type="text" id="firstname" name="firstname" class="field" aria-labelledby="firstname-input">
          </div>
          <div class="formData" id="lastname-input">
            <label for="lastname">Nom</label>
            <input type="text" id="lastname" name="lastname" class="field" aria-labelledby="lastname-input">
          </div>
          <div class="formData" id="email-input">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" class="field" aria-labelledby="email-input">
          </div>
          <div class="formData" id="content-area">
            <label for="content">Votre message</label>
            <textarea id="content" name="content" rows="6" class="field" aria-labelledby="content-area"></textarea>
          </div>
            <button type="submit" class="button" id="submit-btn" aria-label="Envoyer le message" data-name="contact">Envoyer</button>
        </form>
    `
  }
}
