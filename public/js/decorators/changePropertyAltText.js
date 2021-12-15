/**
 * Return an object without 'alt-text' property but with 'altText' property (For hydrate object, the '-' throw an error)
 * @param {object} object
 * @returns {object}
 */
export function changePropertyAltText (object) {
  if (Object.prototype.hasOwnProperty.call(object, 'alt-text')) {
    object.altText = object['alt-text']
    delete object['alt-text']
    return object
  }
}
