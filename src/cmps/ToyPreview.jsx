import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {
  return (
    <article className="toy-preview">
      <h4>{toy.name}</h4>
      <h1>🧸</h1>
      <p>
        Price: <span>${toy.price.toLocaleString()}</span>
      </p>
      {toy.labels && (
        <p>
          Labels: <span>{toy.labels.join(", ")}</span>
        </p>
      )}
      <p>
        In Stock: <span>{toy.inStock ? "Yes" : "No"}</span>
      </p>
      <hr />
      <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
      <Link to={`/toy/${toy._id}`}>Details</Link>
    </article>
  )
}
