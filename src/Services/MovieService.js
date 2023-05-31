import axios from "axios";

const MOVIE_API_BASE_URL = 'http://localhost:3000/movies/'

class MovieService{
    getMovies(){
        return axios.get(MOVIE_API_BASE_URL);
    }

    getMovieNameById(id) {
        return axios.get(MOVIE_API_BASE_URL + id);
    }
}

export default new MovieService();