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

    if (field === 'labels' && value.includes('')) {
      value = []
    }
    

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  return (
    <section className="toy-filter full main-layout flex">

      <fieldset className="filter-form flex">
      <legend>Toys Filter</legend>
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
          name="labels"
          multiple
          value={filterByToEdit.labels}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="Updated">Updated</option>
          <option value="Fun">Fun</option>
          <option value="Sport">Sport</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Mind Game">Mind Game</option>
          <option value="Creative">Creative</option>
          <option value="Building">Building</option>
          <option value="Educational">Educational</option>
          <option value="Puzzle">Puzzle</option>
          <option value="On wheels">On wheels</option>
          <option value="Indoor">Indoor</option>
          <option value="Music">Music</option>
          <option value="Box game">Box game</option>
          <option value="Doll">Doll</option>
          <option value="Fashion">Fashion</option>
          <option value="Battery Powered">Battery Powered</option>
          <option value="Adventure">Adventure</option>
          <option value="Test">Test</option>
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
      </fieldset>
    </section>
  )
}
