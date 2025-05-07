import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useParams, useNavigate } from "react-router-dom"
import { NicePopup } from "../cmps/NicePopup.jsx"
import { Chat } from "../cmps/Chat.jsx"
import { userService } from "../services/user.service.js"

export function ToyDetails() {
  const [toy, setToy] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { toyId } = useParams()
  const navigate = useNavigate()

  const [msgTxt, setMsgTxt] = useState("")
  const loggedInUser = userService.getLoggedinUser()

  useEffect(() => {
    if (toyId) loadToy()
  }, [toyId])

  async function loadToy() {
    try {
      const toyToSave = await toyService.getById(toyId)
      setToy(toyToSave)
    } catch (err) {
      console.log("Had issues in toy details", err)
      navigate("/toy")
    }
  }

  function handleSendMsg(ev) {
    ev.preventDefault()
    if (!msgTxt) return
  
    toyService.addMsg(toy._id, { txt: msgTxt })
      .then((newMsg) => {
        setToy(prevToy => ({
          ...prevToy,
          msgs: [...prevToy.msgs, newMsg]
        }))
        setMsgTxt("")
      })
      .catch((err) => {
        console.error("Failed to send msg", err)
      })
  }

  if (!toy) return <div>Loading...</div>

  return (
    <section className="toy-details">
      <h1>{toy.toyName}</h1>
      <h5 className="price">Price: ${toy.price}</h5>
      <p>🧸</p>
      <p>In Stock: {toy.inStock ? "Yes" : "No"}</p>
      <p>Labels: {toy.labels?.join(", ") || "No labels"}</p>
      <p>Created At: {new Date(toy.createdAt).toLocaleDateString()}</p>
      {toy.msgs && toy.msgs.length > 0 && (
        <section className="toy-msgs">
          <h4>Messages</h4>
          <ul>
            {toy.msgs.map((msg, idx) => (
              <li key={idx}>
                <strong>{msg.by.fullname}:</strong> {msg.txt}
              </li>
            ))}
          </ul>
        </section>
      )}

      {loggedInUser && (
        <form onSubmit={handleSendMsg} className="send-msg-form">
          <input
            type="text"
            placeholder="Write a message..."
            value={msgTxt}
            onChange={(ev) => setMsgTxt(ev.target.value)}
          />
          <button>Send</button>
        </form>
      )}
      
      <button onClick={() => setIsChatOpen(true)}>💬 Chat</button>
      {isChatOpen && (
        <NicePopup
          heading="Live Support"
          footing="We’re here to help"
          onClose={() => setIsChatOpen(false)}
        >
          <Chat />
        </NicePopup>
      )}
      <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
      <Link to="/toy">Back</Link>
    </section>
  )
}
