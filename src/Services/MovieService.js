import axios from "axios";

const MOVIE_API_BASE_URL = 'http://localhost:3000/movies/'
const DIRECTOR_API_BASE_URL = 'http://localhost:3000/directors/'

class MovieService{

    getMovies(){
        return axios.get(MOVIE_API_BASE_URL);
    }

    getMovieNameById(id) {
        return axios.get(MOVIE_API_BASE_URL + id);
    }
    updateMovieScore(id,data) {
        return axios.put(MOVIE_API_BASE_URL + id, data)
    }
    updateMovieTitle(id, data) {
        return axios.put(MOVIE_API_BASE_URL + id, data)
    }
    updateDirectorName(id, data) {
        return axios.patch(DIRECTOR_API_BASE_URL + id, data)
    }
    addNewMovie(id, data){
        return axios.post(MOVIE_API_BASE_URL + id, data)
    }
    addNewDirector(id, data){
        return axios.post(DIRECTOR_API_BASE_URL + id, data)
    }

}

export default new MovieService();