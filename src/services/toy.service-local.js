import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service-local.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            if (filterBy.inStock !== undefined) {
                toys = toys.filter(toy => toy.inStock === filterBy.inStock)
            }
            if (filterBy.labels && filterBy.labels.length) {
                toys = toys.filter(toy =>
                    filterBy.labels.every(label => toy.labels.includes(label))
                )
            }
            const regExp = new RegExp(filterBy.txt, 'i')
            return toys.filter(toy => regExp.test(toy.name))
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
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

function getRandomToy() {
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
    return {
        name: 'Toy-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(10, 300),
        labels: utilService.getRandomLabels(labels),
        inStock: Math.random() > 0.3,
        createdAt: Date.now(),
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
