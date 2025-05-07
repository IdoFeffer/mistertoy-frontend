import { httpService } from "./http.service.js"
// import { utilService } from "./util.service.js"

const BASE_URL = "toy/"

export const toyService = {
  query,
  getById,
  save,
  remove,
  getDefaultFilter,
  _setNextPrevToyId,
  getEmptyToy,
  getRandomToy,
  addMsg
}

function query(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy)
}

async function getById(toyId) {
  try {
    const toy = await httpService.get(BASE_URL + toyId)
    return _setNextPrevToyId(toy)
  } catch (err) {
    console.log("Didnt get toy", err)
  }
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(BASE_URL + toy._id, toy)
  } else {
    return httpService.post(BASE_URL, toy)
  }
}

function getDefaultFilter() {
  return {
    txt: "",
    inStock: undefined,
    labels: [],
    sortBy: "name",
    sortDir: 1,
  }
}

async function _setNextPrevToyId(toy) {
  try {
    const toys = await httpService.get(BASE_URL)
    const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
    const nextToy = toys[toyIdx + 1] || toys[0]
    const prevToy = toys[toyIdx - 1] || toys[toys.length - 1]

    toy.nextToyId = nextToy._id
    toy.prevToyId = prevToy._id

    return toy
  } catch (err) {
    console.error("Failed to set next/prev toy ID", err)
    throw err
  }
}

function getEmptyToy() {
  return {
    toyName: "",
    price: "",
    labels: [],
    inStock: true,
    createdAt: Date.now(),
  }
}

function getRandomToy() {
  const labels = [
    "On wheels",
    "Box game",
    "Art",
    "Baby",
    "Doll",
    "Puzzle",
    "Outdoor",
    "Battery Powered",
  ]
  return {
    toyName: "Toy-" + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(10, 300),
    imgUrl: "https://robohash.org/" + utilService.makeId(),
    labels: utilService.getRandomLabels(labels),
    inStock: Math.random() > 0.3,
    createdAt: Date.now(),
  }
}

function addMsg(toyId, msg) {
  return httpService.post(`toy/${toyId}/msg`, msg)
}
