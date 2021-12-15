export function totalLikes (photographer, mediaData) {
  let totalLikes = 0
  mediaData.forEach((element) => {
    totalLikes += element.likes
  })
  photographer.totalLikes = totalLikes
  console.log(photographer)
  return photographer
}
