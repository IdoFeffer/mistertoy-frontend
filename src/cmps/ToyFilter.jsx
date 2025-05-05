import { useEffect, useRef, useState } from "react"
import Select from "react-select"
import { utilService } from "../services/util.service.js"

const labelOptions = [
  { value: "Updated", label: "Updated" },
  { value: "Fun", label: "Fun" },
  { value: "Sport", label: "Sport" },
  { value: "Outdoor", label: "Outdoor" },
  { value: "Mind Game", label: "Mind Game" },
  { value: "Creative", label: "Creative" },
  { value: "Building", label: "Building" },
  { value: "Educational", label: "Educational" },
  { value: "Puzzle", label: "Puzzle" },
  { value: "On wheels", label: "On wheels" },
  { value: "Indoor", label: "Indoor" },
  { value: "Music", label: "Music" },
  { value: "Box game", label: "Box game" },
  { value: "Doll", label: "Doll" },
  { value: "Fashion", label: "Fashion" },
  { value: "Battery Powered", label: "Battery Powered" },
  { value: "Adventure", label: "Adventure" },
  { value: "Test", label: "Test" },
]

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

  function handleLabelsChange(selectedOptions) {
    const values = selectedOptions.map((opt) => opt.value)
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: values }))
  }

  return (
    <section className="toy-filter full main-layout flex">
      <fieldset className="filter-form flex">
        <legend>Toys Filter</legend>

        {/* Name */}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="txt"
          placeholder="Search by name"
          value={filterByToEdit.txt}
          onChange={handleChange}
        />

        {/* In Stock */}
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

        {/* Labels (using react-select) */}
        <label htmlFor="labels">Labels:</label>
        <Select
          id="labels"
          name="labels"
          isMulti
          options={labelOptions}
          value={labelOptions.filter((opt) =>
            filterByToEdit.labels.includes(opt.value)
          )}
          onChange={handleLabelsChange}
        />

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
