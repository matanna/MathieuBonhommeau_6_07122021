import { LightboxDOM } from '../template/LightboxDOM.js'
import { ContactDOM } from '../template/ContactDOM.js'
import { Message } from '../models/Message.js'

/**
 * Callback function for display modals on photographer page when user click
 */
export function displayModal () {
  const body = document.querySelector('body')
  body.style.overflow = 'hidden'

  // If clicked element contains a data-id attribute -> lightbox
  if (this.dataset.id) {
    const modal = document.getElementById('lightbox')

    // Build the lightbox with an object LightboxDOM (template)
    const lightboxDOM = new LightboxDOM(this.dataset.id)
    lightboxDOM.build()
    modal.style.display = 'block'

    // Event listener for display next or previous media - We call this function in recursive
    const next = document.querySelectorAll('.arrow')
    next.forEach((element) => element.addEventListener('click', displayModal))

    // Event listener for close modals
    const close = document.querySelector('.close-modal--lightbox')
    close.addEventListener('click', closeModal)

  // Dispaly the contact modal
  } else {
    const modal = document.getElementById('contact')

    // Build the modal with an object ContactDOM (template)
    const contactDOM = new ContactDOM()
    contactDOM.build()
    modal.style.display = 'block'

    // Event listener for submit the form
    const submit = document.querySelector('#submit-btn')
    submit.addEventListener('click', submitForm, false)

    // Event listener for close modals
    const close = document.querySelector('.close-modal--contact')
    close.addEventListener('click', closeModal)
  }
}

/**
 * Callback function for close modals
 */
function closeModal () {
  const body = document.querySelector('body')
  body.style.overflow = 'visible'

  if (this.dataset.name === 'lightbox') {
    const modal = document.querySelector('#lightbox')
    modal.style.display = 'none'
  } else if (this.dataset.name === 'contact') {
    const modal = document.querySelector('#contact')
    modal.style.display = 'none'
  }
}

function submitForm (event) {
  event.preventDefault()

  const formElements = document.querySelectorAll('.formData')
  const message = new Message()
  let nbError = 0

  for (let i = 0; i < formElements.length; i++) {
    try {
      formElements[i].removeAttribute('data-error')
      const field = formElements[i].querySelector('.field')
      message[field.name] = field.value
    } catch (error) {
      nbError++
      formElements[i].setAttribute('data-error', error)
    }
  }

  if (nbError === 0) {
    // Create an event for close modal when message is succefully send
    const sendAndClose = new Event('sendAndClose')
    // Attach the events to this (represents submit button)
    this.addEventListener('sendAndClose', closeModal)
    message.send()
    // Dispatch the event sendAndClose for call the function closeModal
    this.dispatchEvent(sendAndClose)
  }
}
