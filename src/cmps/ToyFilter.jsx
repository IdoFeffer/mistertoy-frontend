import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))

  useEffect(() => {
    debouncedOnSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type } = target
    if (type === "number") value = +value
    if (type === "checkbox") value = target.checked
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  return (
    <section className="toy-filter full main-layout">
      <h2>Toys Filter</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="txt"
          placeholder="Search by name"
          value={filterByToEdit.txt}
          onChange={handleChange}
        />

        <label htmlFor="inStock">In Stock:</label>
        <input
          type="checkbox"
          id="inStock"
          name="inStock"
          checked={filterByToEdit.inStock || false}
          onChange={handleChange}
        />
      </form>
    </section>
  )
}
