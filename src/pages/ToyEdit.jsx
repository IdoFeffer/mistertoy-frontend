import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service-local.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"
import { useOnlineStatus } from "../hooks/useOnlineStatus.js"
import { useConfirmTabClose } from "../hooks/useConfirmTabClose.js"

export function ToyEdit() {
  const navigate = useNavigate()
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const { toyId } = useParams()
  const isOnline = useOnlineStatus()
  const setHasUnsavedChanges = useConfirmTabClose()

  useEffect(() => {
    if (toyId) loadToy()
  }, [toyId])

  function loadToy() {
    toyService.getById(toyId)
      .then(toy => {
        setToyToEdit(toy)
      })
      .catch(err => {
        console.log('Had issues in toy edit', err)
        navigate('/toy')
      })
  }
  
  function handleChange({ target }) {
    let { value, type, name: field } = target
    if (type === "number") value = +value
    if (type === "checkbox") value = target.checked
    setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    setHasUnsavedChanges(true)
  }

  function onSaveToy(ev) {
    ev.preventDefault()

    if (!toyToEdit.price) toyToEdit.price = 100
    
    saveToy(toyToEdit)
      .then(() => {
        showSuccessMsg("Toy saved!")
        setHasUnsavedChanges(false)
        navigate("/toy")
      })
      .catch((err) => {
        console.log("Had issues in toy save", err)
        showErrorMsg("Could not save toy")
      })
  }

  return (
    <section className="toy-edit">
      <h2>{toyToEdit._id ? "Edit" : "Add"} Toy</h2>

      <form onSubmit={onSaveToy}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter name..."
          value={toyToEdit.name}
          onChange={handleChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Enter price"
          value={toyToEdit.price}
          onChange={handleChange}
        />

        <label htmlFor="inStock">
          <input
            type="checkbox"
            id="inStock"
            name="inStock"
            checked={toyToEdit.inStock}
            onChange={handleChange}
          />
          In Stock
        </label>

        <div className="actions">
          <button>{toyToEdit._id ? "Save" : "Add"}</button>
          <Link to="/toy">Cancel</Link>
        </div>

        <section className="online-status">
          <h4>{isOnline ? "✅ Online" : "❌ Disconnected"}</h4>
        </section>
      </form>
    </section>
  )
}
