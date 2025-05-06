import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from "./LoginSignup.jsx"
import { userService } from "../services/user.service.js"
// import { userService } from '../services/user.service-local.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { logout } from "../store/actions/user.actions.js"
import { TOGGLE_CART_IS_SHOWN } from "../store/reducers/toy.reducer.js"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

export function AppHeader() {
  // console.log('props.children', props.children)
  const dispatch = useDispatch()
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
  // console.log('user:', user)

  async function onLogout() {
    try {
      const res = await logout()
      showSuccessMsg("logout successfully")
    } catch (err) {
      showErrorMsg("OOPs try again", err)
    }
  }


  function onToggleCart(ev) {
    ev.preventDefault()
    dispatch({ type: TOGGLE_CART_IS_SHOWN })
  }

  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>React Toy App</h1>
        {/* {props.children} */}
        <nav className="app-nav flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/Dashboard">Dashboard</NavLink>
          <NavLink to="/toy">Toys</NavLink>
          <a onClick={onToggleCart} href="#">
            🛒 Cart
          </a>
        </nav>
      </section>
      {user ? (
        <section>
          <span to={`/user/${user._id}`}>
            Hello {user.fullname} <span>${user.score.toLocaleString()}</span>
          </span>
          <button onClick={onLogout}>Logout</button>
        </section>
      ) : (
        <section>
          <LoginSignup />
        </section>
      )}
      <UserMsg />
    </header>
  )
}
