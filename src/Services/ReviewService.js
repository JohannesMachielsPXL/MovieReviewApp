import axios from "axios";
import MovieService from "./MovieService";
const REVIEW_API_BASE_URL = 'http://localhost:3000/reviews/'

class ReviewService{

    postNewReview(data) {
        console.log(data)
        return axios.post(REVIEW_API_BASE_URL, data)
    }
    getReviews(){
        return axios.get(REVIEW_API_BASE_URL);
    }

    getReviewById(id) {
        return axios.get(REVIEW_API_BASE_URL + id);
    }

    updateReview(id,data) {
        return axios.put(REVIEW_API_BASE_URL + id, data)
    }

}

export default new ReviewService();