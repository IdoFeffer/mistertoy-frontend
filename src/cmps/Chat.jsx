import { useState } from "react"

export function Chat() {
  const [msgs, setMsgs] = useState([])
  const [txt, setTxt] = useState("")

  function handleChange(ev) {
    setTxt(ev.target.value)
  }
  function onSubmit(ev) {
    ev.preventDefault()
    if (!txt) return
    setMsgs([...msgs, { from: "Ya", txt }])
    setTimeout(() => {
      setMsgs((prevMsgs) => [
        ...prevMsgs,
        { from: "Support", txt: "Sure thing honey" },
      ])
    }, 500)

    setTxt("")
  }

  return (
    <section>
      <form onSubmit={onSubmit}>
        <input type="text" value={txt} onChange={handleChange} />
      </form>
      <ul>
        {msgs.map((msg, idx) => (
          <li key={idx}>
            <strong>{msg.from}:</strong> {msg.txt}
          </li>
        ))}
      </ul>
    </section>
  )
}
