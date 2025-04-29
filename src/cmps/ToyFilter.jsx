import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"

export function ToyFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))

  useEffect(() => {
    debouncedOnSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

  function handleChange({ target }) {
    let { value, name: field, type, selectedOptions } = target

    if (type === "number") value = +value
    if (type === "select-multiple") {
      value = Array.from(selectedOptions, (option) => option.value)
    }
    if (field === "inStock") {
      if (value === "all") value = undefined
      else value = value === "true"
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  return (
    <section className="toy-filter full main-layout">
      <h2>Toys Filter</h2>

      <form>
        {/* By name */}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="txt"
          placeholder="Search by name"
          value={filterByToEdit.txt}
          onChange={handleChange}
        />

        {/* In stock */}
        <label htmlFor="inStock">In Stock:</label>
        <select
          id="inStock"
          name="inStock"
          value={
            filterByToEdit.inStock === undefined
              ? "all"
              : String(filterByToEdit.inStock)
          }
          onChange={handleChange}
        >
          <option value="all">All</option>
          <option value="true">In stock</option>
          <option value="false">Out of stock</option>
        </select>

        {/* Labels multiselect */}
        <label htmlFor="labels">Label:</label>
        <select
          id="labels"
          name="label"
          value={filterByToEdit.label || "all"}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="On-wheels">On wheels</option>
          <option value="Box game">Box game</option>
          <option value="Fashion">Fashion</option>
          <option value="Art">Art</option>
          <option value="Baby">Baby</option>
          <option value="Doll">Doll</option>
          <option value="Battery Powered">Battery Powered</option>
        </select>

        {/* Sort By */}
        <label htmlFor="sortBy">Sort by:</label>
        <select
          id="sortBy"
          name="sortBy"
          value={filterByToEdit.sortBy || "name"}
          onChange={handleChange}
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="createdAt">Created At</option>
        </select>
      </form>
    </section>
  )
}
