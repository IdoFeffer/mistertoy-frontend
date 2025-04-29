import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {
  return (
    <ul className="toy-list">
      {toys.map((toy) => (
        <li className="toy-preview" key={toy._id}>
          <ToyPreview toy={toy} />

          <div className="actions">
            <button onClick={() => onRemoveToy(toy._id)}>❌</button>
            <button onClick={() => onEditToy(toy)}>Edit</button>
          </div>

          <button className="buy" onClick={() => addToCart(toy)}>
            Add to Cart 🛒
          </button>
        </li>
      ))}
    </ul>
  )
}
