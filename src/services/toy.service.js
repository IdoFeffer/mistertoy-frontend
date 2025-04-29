// import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'toys'

export const toyService = {
  query,
  getById,
  save,
  remove,
  getDefaultFilter,
  _setNextPrevToyId,
  getEmptyToy
}

function query(filterBy = {}) {
  return storageService.query(STORAGE_KEY).then((toys) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      toys = toys.filter((toy) => regex.test(toy.name))
    }
    return toys
  })
}

function getById(toyId) {
  return storageService.get(STORAGE_KEY, toyId).then(_setNextPrevToyId)
}

function remove(toyId) {
  return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(STORAGE_KEY, toy)
  } else {
    toy._id = utilService.makeId()
    toy.createdAt = Date.now()
    return storageService.post(STORAGE_KEY, toy)
  }
}

function getDefaultFilter() {
  return {
    txt: '',
    inStock: undefined,
    labels: [],
    sortBy: 'name',
    sortDir: 1,
  }
}

function _setNextPrevToyId(toy) {
  return storageService.query(STORAGE_KEY).then((toys) => {
    const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
    const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
    const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
    toy.nextToyId = nextToy._id
    toy.prevToyId = prevToy._id
    return toy
  })
}

function getEmptyToy() {
  return {
      name: '',
      price: '',
      labels: [],
      inStock: true,
      createdAt: Date.now(),
  }
}
