const mapObj = require('map-obj')

module.exports = function (request, response, next) {
  request.body = updateBody(request.body)
  next()
}

function updateBody (body) {
  return typeof body === 'object' ? updateObject(body) : body
}

function updateObject (object) {
  if (Array.isArray(object)) {
    return object.map(updateBody)
  } else if (typeof object === 'object' && object !== null) {
    return mapObj(object, (key, value) => [toCamelCase(key), updateBody(value)])
  } else {
    return object
  }
}

function toCamelCase (text) {
  return text.replace(/_(\w)/g, (_, character) => character.toUpperCase())
}
