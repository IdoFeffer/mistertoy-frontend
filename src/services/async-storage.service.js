export const storageService = {
  query,
  get,
  post,
  put,
  remove,
}

function query(entityType, delay = 500) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || []
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay))
}

async function get(entityType, entityId) {
  try {
    const entities = await query(entityType)
    const entity = entities.find((entity) => entity._id === entityId)
    if (!entity)
      throw new Error(
        `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    return entity
  } catch (err) {
    console.error("get() error:", err)
    throw err
  }
}

async function post(entityType, newEntity) {
  try {
    newEntity = { ...newEntity, _id: _makeId() }
    const entities = await query(entityType)
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
  } catch (err) {
    console.error("post() error:", err)
    throw err
  }
}

async function put(entityType, updatedEntity) {
  try {
    const entities = await query(entityType)
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
    if (idx < 0)
      throw new Error(
        `Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`
      )
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  } catch (err) {
    console.error("put() error:", err)
    throw err
  }
}

async function remove(entityType, entityId) {
  try {
    const entities = await query(entityType)
    const idx = entities.findIndex((entity) => entity._id === entityId)
    if (idx < 0)
      throw new Error(
        `Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    entities.splice(idx, 1)
    _save(entityType, entities)
  } catch (err) {
    console.error("remove() error:", err)
    throw err
  }
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
  var text = ""
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
