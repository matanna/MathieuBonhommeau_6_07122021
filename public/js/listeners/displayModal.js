import { LightboxDOM } from '../template/LightboxDOM.js'
import { ContactDOM } from '../template/ContactDOM.js'
import { Message } from '../models/Message.js'

/**
 * Callback function for display modals on photographer page when user click
 */
export async function displayModal (event) {
  const body = document.querySelector('body')
  body.style.overflow = 'hidden'

  // If clicked element contains a data-id attribute -> lightbox
  if (this.dataset.id) {
    const modal = document.getElementById('lightbox')

    // Build the lightbox with an object LightboxDOM (template)
    const lightboxDOM = new LightboxDOM(this.dataset.id)
    await lightboxDOM.build()
    modal.style.display = 'block'

    document.querySelector('.lightbox-media').focus()

    // Event listeners for display next or previous media - We call this function in recursive
    const next = document.querySelectorAll('.arrow')
    next.forEach((element) => {
      element.addEventListener('click', displayModal)
      // The user can use the key Enter on the keyboard
      element.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
          event.preventDefault()
          element.click()
        }
      })
    })

    // Event listeners for close modals
    const close = document.querySelector('.close-modal--lightbox')
    close.addEventListener('click', closeModal)
    // The user can use the key Enter on the keyboard
    close.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        event.stopPropagation()
        close.click()
      }
    })

  // Display the contact modal
  } else {
    const modal = document.getElementById('contact')

    // Build the modal with an object ContactDOM (template)
    const contactDOM = new ContactDOM()
    await contactDOM.build()
    modal.style.display = 'block'
    document.querySelector('.close-modal--contact').focus()

    // Event listener for submit the form
    const submit = document.querySelector('#submit-btn')
    submit.addEventListener('click', submitForm, false)

    // Event listener for close modals
    const close = document.querySelector('.close-modal--contact')
    close.addEventListener('click', closeModal)
    // The user can use the key Enter on the keyboard
    close.addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        close.click()
      }
    })
  }
}

/**
 * Callback function for close modals
 */
function closeModal (event) {
  const body = document.querySelector('body')
  body.style.overflow = 'visible'

  if (this.dataset.name === 'lightbox') {
    const modal = document.querySelector('#lightbox')
    modal.style.display = 'none'

    // Focus is placed on the media which is just visited
    document.querySelector(`.media-thumbnail[data-id="${this.dataset.id}"]`).focus()
  }

  if (this.dataset.name === 'contact') {
    const modal = document.querySelector('#contact')
    modal.style.display = 'none'

    // Focus is placed on the contact button
    document.querySelector('.contact_button').focus()
  }
}

/**
 * Callback function for manage datas which are send with the contact modal
 * @param {*} event
 */
function submitForm (event) {
  event.preventDefault()

  // Get all inputs of the the form
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
  } else {
    // If error, put the focus on the first error element
    document.querySelector('.formData[data-error] input').focus()
  }
}
