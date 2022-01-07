/**
 * Class for create message object when the user click on the submit button in the contact modal
 */
export class Message {
  constructor (firstname, lastname, email, content) {
    this._firstname = firstname
    this._lastname = lastname
    this._email = email
    this._content = content
  }

  get firstname () {
    return this._firstname
  }

  set firstname (firstname) {
    if (firstname.length < 3) {
      throw new Error('Saisir au moins 3 caractères')
    } else {
      this._firstname = firstname
    }
  }

  get lastname () {
    return this._lastname
  }

  set lastname (lastname) {
    if (lastname.length < 3) {
      throw new Error('Saisir au moins 3 caractères')
    } else {
      this._lastname = lastname
    }
  }

  get email () {
    return this._email
  }

  set email (email) {
    const emailReg = /^([a-zA-Z0-9-.]{2,})@([a-zA-Z]+)\.[a-z]{2,4}/

    if (!(emailReg.test(email))) {
      throw new Error('Cette adresse n\'est pas valide.')
    } else {
      this._email = email
    }
  }

  get content () {
    return this._content
  }

  set content (content) {
    if (content === '') {
      throw new Error('Le message est vide !')
    } else if (content.length > 600) {
      throw new Error('Le message doit contenir moins de 00 caractères !')
    }
    this._content = content
  }

  send () {
    console.log('Le message a bien été envoyé :')
    console.log(`Message de : ${this._firstname} ${this._lastname}`)
    console.log(`Email: ${this._email}`)
    console.log(`Contenu du message: ${this._content}`)
  }
}
