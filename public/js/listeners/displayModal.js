import { LightboxDOM } from '../template/LightboxDOM.js'
import { ContactDOM } from '../template/ContactDOM.js'
import { Message } from '../models/Message.js'

/**
 * Callback function for display modals on photographer page when user click
 */
export async function displayModal (event) {
  const body = document.querySelector('body')
  body.style.overflow = 'hidden'

  // Focus is take off on elements behind modals
  focusElement(false)

  // If clicked element contains a data-id attribute -> lightbox
  if (this.dataset.id) {
    const modal = document.getElementById('lightbox')

    // Build the lightbox with an object LightboxDOM (template)
    const lightboxDOM = new LightboxDOM(this.dataset.id)
    await lightboxDOM.build()
    modal.style.display = 'block'
    
    // Put the focus on the good element in term of the previous action
    if (this.classList.contains('arrow--right')) {
      document.querySelector('.arrow--right').focus()
    } else if (this.classList.contains('arrow--left')) {
      document.querySelector('.arrow--left').focus()
    } else {
      document.querySelector('.close-modal--lightbox').focus()
    }

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
        event.preventDefault()
        close.click()
      }
    })

    // Shortcuts for keyboard navigation
    modal.addEventListener('keydown', (event) => {
      console.log(event)
      event.stopPropagation()
      // Next media
      if (event.key === 'ArrowRight') { 
        document.querySelector('.arrow--right').click()
      }
      // Previous media
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        document.querySelector('.arrow--left').click()
      }
      // Close lightbox
      if (event.key === 'Escape') {
        event.preventDefault()
        document.querySelector('.close-modal--lightbox').click()
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

    // Shortcuts for keyboard navigation
    modal.addEventListener('keyup', (event) => {
      console.log(event)
      // Close modal contact
      if (event.key === 'Escape') {
        document.querySelector('.close-modal--contact').click()
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
    // Focus is put back on all elements which are behind the lightbox
    focusElement(true)
    // Focus is placed on the media which is just visited
    document.querySelector(`.media-thumbnail[data-id="${this.dataset.id}"]`).focus()
  }

  if (this.dataset.name === 'contact') {
    const modal = document.querySelector('#contact')
    modal.style.display = 'none'
    // Focus is put back on all elements which are behind the modal
    focusElement(true)
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

/**
 * Disable or enable focus on all elements behind the modal
 *
 *@param {bool} focus
 */
function focusElement (focus) {
  const logo = document.querySelector('.logo-link')
  const contact = document.querySelector('.contact_button')
  const sortButton = document.querySelector('.sort-media__listbox')
  const mediaCard = document.querySelectorAll('.media-thumbnail')
  const mediaLikes = document.querySelectorAll('.media-details__likes')

  // Focus is disabled
  if (focus === false) {
    logo.setAttribute('tabindex', -1)
    contact.setAttribute('tabindex', -1)
    sortButton.setAttribute('tabindex', -1)

    mediaCard.forEach((element) => {
      element.removeAttribute('tabindex')
    })
    mediaLikes.forEach((element) => {
      element.removeAttribute('tabindex')
    })
  // Focus is enabled
  } else {
    logo.removeAttribute('tabindex')
    contact.removeAttribute('tabindex')
    sortButton.setAttribute('tabindex', 0)

    mediaCard.forEach((element) => {
      element.setAttribute('tabindex', 0)
    })
    mediaLikes.forEach((element) => {
      element.setAttribute('tabindex', 0)
    })
  }
}
