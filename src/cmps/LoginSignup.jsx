import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

// import { userService } from '../services/user.service-local.js'

import { login, signup } from '../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'

export function LoginSignup() {
  const [isSignup, setIsSignUp] = useState(false)

  function onLogin(credentials) {
    isSignup ? _signup(credentials) : _login(credentials)
  }

  function _login(credentials) {
    login(credentials)
      .then(() => showSuccessMsg('Logged in successfully'))
      .catch(() => showErrorMsg('Oops! Login failed.'))
  }

  function _signup(credentials) {
    signup(credentials)
      .then(() => showSuccessMsg('Signup successful'))
      .catch(() => showErrorMsg('Oops! Signup failed.'))
  }

  return (
    <section className="login-signup">
      <LoginForm
        onLogin={onLogin}
        isSignup={isSignup}
      />
      <div className="btns">
        <a href="#" onClick={() => setIsSignUp(prev => !prev)}>
          {isSignup
            ? 'Already a member? Login'
            : 'New user? Signup here'}
        </a>
      </div>
    </section>
  )
}
