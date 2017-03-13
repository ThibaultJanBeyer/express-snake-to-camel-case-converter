module.exports = function (request, response, next) {
  request.body = updateBody(request.body)
  next()
}

function updateBody (body) {
  return typeof body === 'object' ? updateObject(body) : body
}

function updateObject (object) {

  var newObject = undefined

  if(Array.isArray(object)) {
    newObject = []
    for(var i in object) {
      newObject[i] = updateBody(object[i])
    }
  } else {
    newObject = {}
    for(var i in object) {
      if(object.hasOwnProperty(i)) {
        newObject[toCamelCase(i)] = updateBody(object[i])
      }
    }
  }

  return newObject
}

function toCamelCase (text) {
  return text.replace(/_(\w)/g, upperCaseFirstLetter)
}

function upperCaseFirstLetter (match, charAfterDash) {
  return charAfterDash.toUpperCase()
}
