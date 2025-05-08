import { httpService } from '../http.service'

export const reviewService = {
	add,
	query,
	remove,
}

function query(filterBy) {
	// console.log(filterBy);
	var queryStr = !filterBy ? '' : `?aboutToyId=${filterBy.aboutToyId}`
	return httpService.get(`review${queryStr}`)	
}

async function remove(reviewId) {
	await httpService.delete(`review/${reviewId}`)
}

async function add({ txt, aboutToyId }) {
	return await httpService.post(`review`, { txt, aboutToyId })
}