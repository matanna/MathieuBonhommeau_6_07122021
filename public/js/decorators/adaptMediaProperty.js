/**
 * Return an object without 'alt-text' property but with 'altText' property (For hydrate object, the '-' throw an error)
 * When the object is a video, return the same object with a property title in addition
 * @param {object} object
 * @returns {object}
 */
export function adaptMediaProperty (object) {
  // Change property name 'alt-text' by 'altText'
  if (Object.prototype.hasOwnProperty.call(object, 'alt-text')) {
    object.altText = object['alt-text']
    delete object['alt-text']
  }

  // Add title property when the object is a video
  if (object.video) {
    const title = object.video.split('_')
    const last = title[title.length - 1].replace('.mp4', '')
    title[title.length - 1] = last
    const newtitle = title.join(' ')
    object.title = newtitle
  }
  return object
}
