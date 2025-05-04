import { useDispatch, useSelector } from "react-redux"
import { ToyFilter } from "../cmps/ToyFilter.jsx"
import { ToyList } from "../cmps/ToyList.jsx"
import { toyService } from "../services/toy.service.js"
import { Accordion } from "../cmps/Accordion.jsx"

import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import {
  loadToys,
  removeToyOptimistic,
  saveToy,
  setFilterBy,
} from "../store/actions/toy.actions.js"
import { ADD_TOY_TO_CART } from "../store/reducers/toy.reducer.js"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export function ToyIndex() {
  const dispatch = useDispatch()
  const toys = useSelector((storeState) => storeState.toyModule.toys)
  const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
  const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

  useEffect(() => {
    loadToys().catch((err) => {
      showErrorMsg("Cannot load toys!", err)
    })
  }, [filterBy])

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function onRemoveToy(toyId) {
    removeToyOptimistic(toyId)
      .then(() => {
        showSuccessMsg("Toy removed")
      })
      .catch((err) => {
        showErrorMsg("Cannot remove toy", err)
      })
  }

  function onAddToy() {
    const toyToSave = toyService.getEmptyToy()
    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy added (id: ${savedToy._id})`)
      })
      .catch((err) => {
        showErrorMsg("Cannot add toy", err)
      })
  }

  function onEditToy(toy) {
    const price = +prompt("New price?", toy.price)
    if (!price) return
    const toyToSave = { ...toy, price }

    saveToy(toyToSave)
      .then((savedToy) => {
        showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
      })
      .catch((err) => {
        showErrorMsg("Cannot update toy", err)
      })
  }

  function addToCart(toy) {
    console.log(`Adding ${toy.name} to Cart`)
    dispatch({ type: ADD_TOY_TO_CART, toy })
    showSuccessMsg("Added to Cart")
  }

  return (
    <div className="toy-index">
      <Accordion />
      <section className="main-upper-section">
        <h2>MisterToy - Toy List</h2>

        <section className="toy-actions flex">
          <Link to="/toy/edit">Add Toy</Link>
          <button className="add-btn" onClick={onAddToy}>
            Add Random Toy 🧸
          </button>
        </section>
      </section>
      <main className="toy-index-upper">
        <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
        {!isLoading ? (
          <ToyList
            toys={toys}
            onRemoveToy={onRemoveToy}
            onEditToy={onEditToy}
            addToCart={addToCart}
          />
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </div>
  )
}
