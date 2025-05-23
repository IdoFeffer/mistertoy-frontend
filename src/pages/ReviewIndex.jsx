import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  loadReviews,
//   removeReview,
//   getActionAddReview,
//   getActionRemoveReview,
} from "../store/actions/review.actions"
import { loadUsers } from "../store/actions/user.actions"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
// import {
//   socketService,
//   SOCKET_EVENT_REVIEW_ADDED,
//   SOCKET_EVENT_REVIEW_REMOVED,
// } from "../services/socket.service.js"
import { ReviewList } from "../cmps/ReviewList"
import { ReviewEdit } from "../cmps/ReviewEdit"

export function ReviewIndex() {
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const reviews = useSelector((storeState) => storeState.reviewModule.reviews)

  const dispatch = useDispatch()

  useEffect(() => {
	onLoadReviews()
    // loadReviews()
    // loadUsers()

    // socketService.on(SOCKET_EVENT_REVIEW_ADDED, review => {
    // 	console.log('GOT from socket', review)
    // 	dispatch(getActionAddReview(review))
    // })

    // socketService.on(SOCKET_EVENT_REVIEW_REMOVED, reviewId => {
    // 	console.log('GOT from socket', reviewId)
    // 	dispatch(getActionRemoveReview(reviewId))
    // })

    // return () => {
    //     socketService.off(SOCKET_EVENT_REVIEW_ADDED)
    //     socketService.off(SOCKET_EVENT_REVIEW_REMOVED)
    // }
  }, [])

  async function onLoadReviews() {
    try {
      await loadReviews()
      showSuccessMsg("Review loaded")
    } catch (err) {
      showErrorMsg("Cannot load")
    }
  }

  async function onRemoveReview(reviewId) {
    try {
      await removeReview(reviewId)
      showSuccessMsg("Review removed")
    } catch (err) {
      showErrorMsg("Cannot remove")
    }
  }
// console.log('reviews from index',reviews);

  return (
    <div className="review-index">
      <h2>Reviews and Gossip</h2>
      {/* {loggedInUser && <ReviewEdit />} */}
      { reviews.length && <ReviewList reviews={reviews} onRemoveReview={onRemoveReview} />}
    </div>
  )
}
