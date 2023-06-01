import axios from "axios";

const MOVIE_API_BASE_URL = 'http://localhost:3000/directors/'

class DirectorService{
    getDirectors(){
        return axios.get(MOVIE_API_BASE_URL);
    }

    async getDirectorById(id) {
        try {
            const response = await axios.get(MOVIE_API_BASE_URL + id);
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch director');
        }
    }

    async getDirectorNameById(id) {
        try {
            const director = await this.getDirectorById(id);
            return director.name;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch director name');
        }
    }
}

export default new DirectorService();