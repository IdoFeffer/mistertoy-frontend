import { utilService } from "./util.service.js"
import { userService } from "./user.service-local.js"
import { storageService } from "./async-storage.service.js"

const STORAGE_KEY = "toyDB"

// _createToys()

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getRandomToy,
  getDefaultFilter,
}

// function query(filterBy = {}) {
//   return storageService.query(STORAGE_KEY).then((toys) => {
//     if (!filterBy.txt) filterBy.txt = ""
//     if (filterBy.inStock !== undefined) {
//       toys = toys.filter((toy) => toy.inStock === filterBy.inStock)
//     }
//     if (filterBy.labels && filterBy.labels.length) {
//       toys = toys.filter((toy) =>
//         filterBy.labels.every((label) => toy.labels.includes(label))
//       )
//     }
    
//     const regExp = new RegExp(filterBy.txt, "i")
//     return toys.filter((toy) => regExp.test(toy.name))
//   })
// }

function query(filterBy = {}) {
  return storageService.query(STORAGE_KEY).then((toys) => {
    if (!filterBy.txt) filterBy.txt = ""
    if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    if (!filterBy.minSpeed) filterBy.minSpeed = -Infinity

    const regExp = new RegExp(filterBy.txt, "i")

    let filteredToys = toys.filter((toy) => {
      return (
        regExp.test(toy.name) &&
        (filterBy.inStock === undefined || toy.inStock === filterBy.inStock) &&
        (!filterBy.label || toy.labels.includes(filterBy.label))
      )
    })

    // מיון
    if (filterBy.sortBy) {
      if (filterBy.sortBy === "name") {
        filteredToys.sort((a, b) => a.name.localeCompare(b.name))
      } else if (filterBy.sortBy === "price") {
        filteredToys.sort((a, b) => a.price - b.price)
      } else if (filterBy.sortBy === "createdAt") {
        filteredToys.sort((a, b) => a.createdAt - b.createdAt)
      }
    }

    return filteredToys
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
    name: "",
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
    name: "Toy-" + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(10, 300),
    labels: utilService.getRandomLabels(labels),
    inStock: Math.random() > 0.3,
    createdAt: Date.now(),
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

function _createToys() {
  let toys = utilService.loadFromStorage(STORAGE_KEY)
  if (toys && toys.length > 0) return

  toys = [
    {
      _id: utilService.makeId(),
      name: "Super Hero Figure",
      imgUrl:
        "https://cdn.pixabay.com/photo/2016/11/29/05/08/superhero-1868733_1280.jpg",
      price: 180,
      labels: ["Action", "Collectible"],
      createdAt: 1631000000000,
      inStock: true,
    },
    {
      _id: utilService.makeId(),
      name: "Soccer Ball",
      imgUrl:
        "https://cdn.pixabay.com/photo/2016/11/29/05/08/soccer-1867175_1280.jpg",
      price: 90,
      labels: ["Sport", "Outdoor"],
      createdAt: 1632000000000,
      inStock: true,
    },
    {
      _id: utilService.makeId(),
      name: "Magic Set",
      imgUrl:
        "https://cdn.pixabay.com/photo/2015/09/05/22/46/magic-924867_1280.jpg",
      price: 120,
      labels: ["Mind Game", "Creative"],
      createdAt: 1633000000000,
      inStock: false,
    },
    {
      _id: utilService.makeId(),
      name: "Building Blocks",
      imgUrl:
        "https://cdn.pixabay.com/photo/2017/06/26/02/47/lego-2443587_1280.jpg",
      price: 110,
      labels: ["Building", "Educational"],
      createdAt: 1634000000000,
      inStock: true,
    },
    {
      _id: utilService.makeId(),
      name: "Rubik Cube",
      imgUrl:
        "https://cdn.pixabay.com/photo/2015/01/08/18/29/rubik-s-cube-593654_1280.jpg",
      price: 60,
      labels: ["Puzzle", "Mind Game"],
      createdAt: 1635000000000,
      inStock: true,
    },
    {
      _id: utilService.makeId(),
      name: "Train Set",
      imgUrl:
        "https://cdn.pixabay.com/photo/2014/11/04/09/06/toy-train-516100_1280.jpg",
      price: 200,
      labels: ["On wheels", "Indoor"],
      createdAt: 1636000000000,
      inStock: true,
    },
    {
      _id: utilService.makeId(),
      name: "Board Game",
      imgUrl:
        "https://cdn.pixabay.com/photo/2017/05/08/13/15/chess-2295274_1280.jpg",
      price: 140,
      labels: ["Box game", "Mind Game"],
      createdAt: 1637000000000,
      inStock: false,
    },
    {
      _id: utilService.makeId(),
      name: "Drum Set",
      imgUrl:
        "https://cdn.pixabay.com/photo/2016/11/19/14/00/drum-1839387_1280.jpg",
      price: 230,
      labels: ["Music", "Creative"],
      createdAt: 1638000000000,
      inStock: true,
    },
    {
      _id: utilService.makeId(),
      name: "Action Figure",
      imgUrl:
        "https://cdn.pixabay.com/photo/2016/05/27/20/52/toy-1423928_1280.jpg",
      price: 170,
      labels: ["Action", "Collectible"],
      createdAt: 1639000000000,
      inStock: true,
    },
    {
      _id: utilService.makeId(),
      name: "Basketball Hoop",
      imgUrl:
        "https://cdn.pixabay.com/photo/2017/08/06/13/44/basketball-2593387_1280.jpg",
      price: 210,
      labels: ["Outdoor", "Sport"],
      createdAt: 1640000000000,
      inStock: true,
    },
    {
      _id: utilService.makeId(),
      name: "Water Gun",
      imgUrl:
        "https://cdn.pixabay.com/photo/2018/08/30/07/25/water-gun-3641813_1280.jpg",
      price: 85,
      labels: ["Outdoor", "Water Game"],
      createdAt: 1641000000000,
      inStock: false,
    },
    {
      _id: utilService.makeId(),
      name: "Barbie Doll",
      imgUrl:
        "https://cdn.pixabay.com/photo/2017/06/30/00/45/barbie-2451887_1280.jpg",
      price: 190,
      labels: ["Doll", "Fashion"],
      createdAt: 1642000000000,
      inStock: true,
    },
    {
      _id: utilService.makeId(),
      name: "Electric Scooter",
      imgUrl:
        "https://cdn.pixabay.com/photo/2016/11/29/02/14/scooter-1866781_1280.jpg",
      price: 500,
      labels: ["Outdoor", "Battery Powered"],
      createdAt: 1643000000000,
      inStock: true,
    },
    {
      _id: utilService.makeId(),
      name: "Musical Piano",
      imgUrl:
        "https://cdn.pixabay.com/photo/2016/05/06/12/22/keyboard-1375783_1280.jpg",
      price: 270,
      labels: ["Music", "Creative"],
      createdAt: 1644000000000,
      inStock: true,
    },
    {
      _id: utilService.makeId(),
      name: "Outdoor Tent",
      imgUrl:
        "https://cdn.pixabay.com/photo/2016/03/27/22/22/tent-1289822_1280.jpg",
      price: 320,
      labels: ["Outdoor", "Adventure"],
      createdAt: 1645000000000,
      inStock: true,
    },
  ]
  utilService.saveToStorage(STORAGE_KEY, toys)
}
