<template>
  <div class="greetings">
    <h1 class="green">Welcome</h1>
    <div class="border filler">

    <p>film toevoegen:</p>
    <p> titel: <input type="text" v-model="newMovie.name"></p>
    <p> director: <input type="text" v-model="newMovie.directorId"></p>
    <button @click="postMovie" id="addmoviebutton">+</button>
    <br></div>
    <h3>
      Select a movie to get started
    </h3>
    <div id="MovieList" class="border filler">
      <table>
        <tbody>
        <tr v-for="(movie) in $store.state.movies" v-bind:key=movie.id>
          <td>
            <button @click="fetchMovie(movie.id)" >{{ movie.name }} </button>
            <span >

            </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <hr>
  </div>
</template>

<script>
import MovieService from "@/services/MovieService";
import DirectorService from "@/Services/DirectorService";
import axios from "axios";
import ReviewService from "../Services/ReviewService";

export default {
  name: 'Movies',
  data() {
    return {
      movie: String,
      newMovie : {
        id: this.$store.state.movies.length,
        name : '',
        directorId: '',
        reviewScore: 0,
        reviewCounter: 0
      }
    }
  },
  methods: {
    postMovie() {
      const newMovie = {
        ...this.newMovie,
        directorId: 1
      }

      axios.post('http://localhost:3000/movies',newMovie)
          .then((response) => console.log(response))
          .catch((error) => console.log(error));

      MovieService.getMovies().then((response) => {
            let data = response.data;
            this.$store.commit('setMovies', data);
    })},

    fetchMovie(id) {
      MovieService.getMovieNameById(id).then((response) => {
        let data = response.data;
        this.$store.commit('setSelectedMovie', data);
        this.movie = data;
        this.fetchDirector(data.directorId);
      });
    },
    fetchDirector(directorId) {
      if (directorId !== undefined) { // Check if directorId is defined
        DirectorService.getDirectorById(directorId).then((response) => {
          if (response !== undefined) { // Check if response is defined
            let data = response;
            this.$store.commit('setSelectedDirector', data);
            this.director = data;
          }
        });
      }
    },

    // getDirectorName(directorId) {
    //   const director = this.$store.state.directors.find(
    //       (director) => director.id === directorId
    //   );
    //   return director ? director.name : '';
    // }
  },
  beforeCreate() {
    MovieService.getMovies().then((response) => {
      let data = response.data;
      let movie = data[0];
      this.movie = movie.name;
      this.$store.commit('setMovies', data);

      const reviews = ReviewService.getReviews();
      data = reviews;
      this.$store.commit('setReviews', data);
      console.log(this.$store.state.reviews)
      // this.$store.commit('setSelectedMovie', movie)

    });

  }
}
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

button {
  background: none;
  border: none;
}

button:hover {
  background: #00bd7e;
  border-radius: 5px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

#addmoviebutton {
  background: #00bd7e;
  border-radius: 10px;
  margin-left: 5px;
}

td {
  text-align: left;
}

.border {
  border-style: solid;
  border-color: #00bd7e;
  border-radius: 10px;
  border-width: 1px;
}

.filler {
  margin: 5px;
  padding: 5px;
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>