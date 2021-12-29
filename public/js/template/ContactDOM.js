import datas from '../../../data/datas.json' assert { type: "json" }

export class ContactDOM {
  constructor () {
    const contactBtn = document.querySelector('.contact_button')

    try {
      this._photographer = datas.photographers.filter((value) => value.id === parseInt(contactBtn.dataset.photographerid))[0]
    } catch (error) {
      throw new Error('Problème de connexion !')
    }

    this._modal = document.querySelector('.contact-modal')
  }

  build () {
    this.createModal()
  }

  createModal () {
    this._modal.innerHTML = `
        <h2 class="photographer-title photographer-title--modal">
            Contactez-moi<br> 
            ${this._photographer.name}
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" class="close-modal close-modal--contact" data-name="contact">
                <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z"/>
            </svg>
        </h2>
        <form action="#" method="post">
          <div class="formData">
            <label for="firstname">Prénom</label>
            <input type="text" id="firstname" name="firstname" class="field">
          </div>
          <div class="formData">
            <label for="firstname">Nom</label>
            <input type="text" id="lastname" name="lastname" class="field">
          </div>
          <div class="formData">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" class="field">
          </div>
          <div class="formData">
            <label for="content">Votre message</label>
            <textarea id="content" name="content" rows="6" class="field"></textarea>
          </div>
            <button type="submit" class="button" id="submit-btn" data-name="contact">Envoyer</button>
        </form>
    `
  }
}
