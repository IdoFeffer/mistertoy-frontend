import { storageService } from "./async-storage.service.js"

const STORAGE_KEY = "userDB"
const STORAGE_KEY_LOGGEDIN = "loggedinUser"

export const userService = {
  login,
  logout,
  signup,
  getById,
  getLoggedinUser,
  updateScore,
  getEmptyCredentials,
}

function getById(userId) {
  return storageService.get(STORAGE_KEY, userId)
}

async function login({ username, password }) {
  try {
    const users = await storageService.query(STORAGE_KEY)
    const user = users.find((user) => user.username === username)
    if (!user || user.password !== password) throw new Error("Invalid login")
    return _setLoggedinUser(user)
  } catch (err) {
    console.error("Login failed:", err)
    throw err
  }
}

async function signup({ username, password, fullname }) {
  try {
    const user = { username, password, fullname, score: 10000 }
    const savedUser = await storageService.post(STORAGE_KEY, user)
    return _setLoggedinUser(savedUser)
  } catch (err) {
    console.error("Signup failed:", err)
    throw err
  }
}

async function updateScore(diff) {
  try {
    const loggedInUserId = getLoggedinUser()?._id
    const user = await userService.getById(loggedInUserId)

    if (user.score + diff < 0) throw new Error("No credit")

    user.score += diff
    const updatedUser = await storageService.put(STORAGE_KEY, user)
    _setLoggedinUser(updatedUser)
    return updatedUser.score
  } catch (err) {
    console.error("Score update failed:", err)
    throw err
  }
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
  return Promise.resolve()
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    score: user.score,
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
  return userToSave
}

function getEmptyCredentials() {
  return {
    username: "",
    password: "",
    fullname: "",
  }
}

// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})
