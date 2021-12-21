import { LightboxDOM } from '../template/LightboxDOM.js'

/**
 * Callback function for display modals on photographer page when user click
 */
export function displayModal () {
  const body = document.querySelector('body')
  body.style.overflow = 'hidden'
  console.log(this)
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
  }

  // Event listener for close modals
  const close = document.querySelector('.close-modal')
  close.addEventListener('click', closeModal)
}

/**
 * Callback function for close modals
 */
function closeModal () {
  const body = document.querySelector('body')
  body.style.overflow = 'visible'

  const modal = document.getElementById('lightbox')
  modal.style.display = 'none'
}
