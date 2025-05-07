import { useEffect, useState } from "react"
// import { userService } from "../services/user.service-local.js"
import { userService } from "../services/user.service.js"
import { Link, useNavigate, useParams } from "react-router-dom"

export function UserDetails() {
  const [user, setUser] = useState(null)
  const { userId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (userId) loadUser()
  }, [userId])

  async function loadUser() {
    try {
      const getById = await userService.getById(userId)
      setUser(getById)
    } catch (err) {
      console.log("Had issues loading user details", err)
      navigate("/")
    }
  }

  if (!user) return <div>Loading user...</div>

  const loggedInUser = userService.getLoggedinUser()
  const isMyProfile = loggedInUser?._id === userId

  return (
    <section className="user-details">
      <h1>User Profile</h1>
      <h2>Fullname: {user.fullname}</h2>
      <h3>Score: {user.score.toLocaleString()}</h3>

      {isMyProfile && (
        <section className="my-profile-info">
          <h4>🛍️ My Shopping Info:</h4>
          <p>Toy to show..</p>
        </section>
      )}

      <p className="user-bio">
        Welcome to MisterToy! Where dreams come true 🎁
      </p>

      <Link to="/toy" className="btn-back">
        ← Back to Toys
      </Link>
    </section>
  )
}
