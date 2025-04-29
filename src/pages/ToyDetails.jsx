import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service-local.js"
import { Link, useParams, useNavigate } from "react-router-dom"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
            <h1>Toy Name: {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <p>🧸</p>
            <p>In Stock: {toy.inStock ? 'Yes' : 'No'}</p>
            <p>Labels: {toy.labels?.join(', ') || 'No labels'}</p>
            <p>Created At: {new Date(toy.createdAt).toLocaleDateString()}</p>

            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to="/toy">Back</Link>

        </section>
    )
}
