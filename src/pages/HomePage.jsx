import { useDispatch, useSelector } from "react-redux"
import { CHANGE_BY } from "../store/reducers/user.reducer.js"

import logoImg from "../assets/img/logo.png"

export function HomePage() {
  const dispatch = useDispatch()
  const count = useSelector((storeState) => storeState.userModule.count)

  function changeCount(diff) {
    dispatch({ type: CHANGE_BY, diff })
  }

  return (
    <section className="home-page main-layout">
      <h1>Welcome to MisterToy 🎁</h1>

      <section className="count-section">
        <h2>Count: {count}</h2>
        <div className="btns">
          <button onClick={() => changeCount(1)}>+1</button>
          <button onClick={() => changeCount(10)}>+10</button>
        </div>
      </section>

      <img src={logoImg} alt="MisterToy Logo" className="logo" />
    </section>
  )
}
