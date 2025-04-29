// components/NicePopup.jsx
import { useEffect } from "react"

export function NicePopup({ heading, footing, onClose, children }) {
  useEffect(() => {
    function handleEsc(event) {
      if (event.key === "Escape") onClose()
    }
    document.body.addEventListener("keydown", handleEsc)
    return () => document.body.removeEventListener("keydown", handleEsc)
  }, [onClose])

  return (
    <section className="nice-popup">
      <header className="popup-header">
        <h3>{heading}</h3>
        <button onClick={onClose}>X</button>
      </header>
      <main className="popup-main">{children}</main>
      <footer className="popup-footer">{footing}</footer>
    </section>
  )
}
