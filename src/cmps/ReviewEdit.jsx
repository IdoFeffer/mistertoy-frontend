import { useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import { addReview } from "../store/actions/review.actions.js"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"

export function ReviewEdit() {
	const { toyId } = useParams()
	const users = useSelector(storeState => storeState.userModule.users)
	const [reviewToEdit, setReviewToEdit] = useState({ txt: '', aboutToyId: toyId })

	function handleChange(ev) {
		const { name, value } = ev.target
		setReviewToEdit({ ...reviewToEdit, [name]: value })
	}

    async function onAddReview(ev) {
		ev.preventDefault()
		if (!reviewToEdit.txt ) return alert('fill your review')
            
		try {
			await addReview(reviewToEdit)
			showSuccessMsg('Review added')
			setReviewToEdit({ txt: '', aboutToyId: toyId })
		} catch (err) {
			showErrorMsg('Cannot add review')
		}
	}

   return <form className="review-edit" onSubmit={onAddReview}>
        {/* <select onChange={handleChange} value={reviewToEdit.aboutUserId} name="aboutUserId">
            <option value="">Review about...</option>
            {users.map(user =>
                <option key={user._id} value={user._id}>
                    {user.fullname}
                </option>
            )}
        </select> */}
        <textarea name="txt" onChange={handleChange} value={reviewToEdit.txt}></textarea>
        <button>Add</button>
    </form>

}