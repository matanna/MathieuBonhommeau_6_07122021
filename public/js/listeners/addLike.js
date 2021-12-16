/**
 * This function is a callback for an eventListener which increment number of likes under each media and on the total of likes
 */
export function addLike () {
  // Increment likes on each media
  let nbLikes = this.dataset.likes
  nbLikes++
  this.innerText = nbLikes
  this.setAttribute('data-likes', nbLikes)

  // Increment likes on total
  const totalElement = document.getElementsByClassName('fix__total-likes')[0]
  let totalLikes = totalElement.dataset.total
  totalLikes++
  totalElement.innerText = totalLikes
  totalElement.setAttribute('data-total', totalLikes)
}
