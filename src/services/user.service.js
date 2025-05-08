import { storageService } from "./async-storage.service.js"
import { httpService } from "./http.service.js"

const BASE_URL = "auth/"
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
  getUsers

}

function getUsers() {
	return httpService.get(`user`)
}

async function login({ username, password }) {
  try {
    const user = await httpService.post(BASE_URL + "login", {
      username,
      password,
    })
    console.log("user FETCH:", user)
    if (!user) throw new Error("Invalid login")
    return _setLoggedinUser(user)
  } catch (err) {
    console.error("Login failed:", err)
    throw err
  }
}

async function signup({ username, password, fullname }) {
  try {
    const user = await httpService.post(BASE_URL + "signup", {
      username,
      password,
      fullname,
      score: 10000,
    })
    if (!user) throw new Error("Invalid signup")
    return _setLoggedinUser(user)
  } catch (err) {
    console.error("Signup failed:", err)
    throw err
  }
}

async function logout() {
  try {
    await httpService.post(BASE_URL + "logout")
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
  } catch (err) {
    console.error("Logout failed:", err)
    throw err
  }
}

async function updateScore(diff) {
  try {
    if (getLoggedinUser().score + diff < 0) throw new Error("No credit")

    const user = await httpService.put("user/", { diff })
    console.log("updateScore user:", user)
    _setLoggedinUser(user)
    return user.score
  } catch (err) {
    console.error("Score update failed:", err)
    throw err
  }
}

function getById(userId) {
  return httpService.get("user/" + userId)
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
