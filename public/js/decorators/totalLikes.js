/**
 * Sum of all likes for a photographer
 * @param {Object} photographer 
 * @param {array} mediaData 
 * @returns 
 */
export function totalLikes (photographer, mediaData) {
  let totalLikes = 0
  mediaData.forEach((element) => {
    totalLikes += element.likes
  })
  photographer.totalLikes = totalLikes
  return photographer
}
