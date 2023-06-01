import axios from "axios";

const MOVIE_API_BASE_URL = 'http://localhost:3000/movies/'
const DIRECTOR_API_BASE_URL = 'http://localhost:3000/directors/'

class MovieService{

    getDirectors() {
        return axios.get(DIRECTOR_API_BASE_URL);
    }
    getMovies(){
        return axios.get(MOVIE_API_BASE_URL);
    }

    getMovieNameById(id) {
        return axios.get(MOVIE_API_BASE_URL + id);
    }

    updateMovieScore(id,data) {
        return axios.put(MOVIE_API_BASE_URL + id, data)
    }
}

export default new MovieService();