import { useState } from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

// import { userService } from '../services/user.service-local.js'
import { userService } from "../services/user.service.js"

import { login, signup } from "../store/actions/user.actions.js"
import { LoginForm } from "./LoginForm.jsx"

export function LoginSignup() {
  const [isSignup, setIsSignUp] = useState(false)

  function onLogin(credentials) {
    isSignup ? _signup(credentials) : _login(credentials)
  }

  async function _login(credentials) {
    try {
      const res = await login(credentials)
      showSuccessMsg("Logged in successfully")
    } catch (err) {
      showErrorMsg("Oops! Login failed.", err)
    }
  }

  async function _signup(credentials) {
    try {
      signup(credentials)
      showSuccessMsg("Signup successful")
    } catch (err) {
      showErrorMsg("Oops! Signup failed.")
    }
  }

  return (
    <section className="login-signup">
      <LoginForm onLogin={onLogin} isSignup={isSignup} />
      <div className="btns">
        <a href="#" onClick={() => setIsSignUp((prev) => !prev)}>
          {isSignup ? "Already a member? Login" : "New user? Signup here"}
        </a>
      </div>
    </section>
  )
}
