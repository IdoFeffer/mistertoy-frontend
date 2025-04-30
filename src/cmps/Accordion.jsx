import { useState } from "react"

export function Accordion() {
  const [isListOpen, setIsListOpen] = useState(false)
  const [openUserId, setOpenUserId] = useState(null)

  const users = [
    {
      id: 1,
      name: "Leanne Graham",
      email: "leanne@example.com",
      phone: "123-456-7890",
      website: "leanne.org",
    },
    {
      id: 2,
      name: "Ervin Howell",
      email: "Shanna@melissa.tv",
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      email: "clementine@example.com",
      phone: "999-000-1111",
      website: "clementine.net",
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      email: "patricia@example.com",
      phone: "222-333-4444",
      website: "patricia.org",
    },
    {
      id: 5,
      name: "Chelsey Dietrich",
      email: "chelsey@example.com",
      phone: "555-666-7777",
      website: "chelsey.com",
    },
    {
      id: 6,
      name: "Mrs. Dennis Schulist",
      email: "dennis@example.com",
      phone: "888-999-0000",
      website: "dennis.io",
    },
  ]

  return (
    <section className="accordion-wrapper">
      <button onClick={() => setIsListOpen((prev) => !prev)}>
        {isListOpen ? "Hide Users" : "See Users"}
      </button>

      {isListOpen && (
        <section className="user-list">
          {users.map((user) => (
            <div key={user.id} className="user-preview">
              <h4
                className="user-name"
                onClick={() =>
                  setOpenUserId((prevId) =>
                    prevId === user.id ? null : user.id
                  )
                }
              >
                {user.name}
              </h4>

              {openUserId === user.id && (
                <div className="user-details">
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  <p>
                    <strong>Website:</strong> {user.website}
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>
      )}
    </section>
  )
}
