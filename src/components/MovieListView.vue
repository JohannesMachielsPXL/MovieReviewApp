<template>
  <div class="greetings">
    <h1 class="green">Welcome</h1>
    <h3>
      Select a movie to get started
    </h3>
    <h3>gekozen film: {{selectedMovie.name}}</h3>
    <div id="MovieList">
      <table>
        <tbody>
        <tr v-for = "movie in movies" v-bind:key = movie.id>
          <td><button @click="fetchMovie(movie.id)">{{movie.name}}</button></td>
        </tr>
        </tbody>
      </table>
    </div>
    <hr>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

button  {
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

td {
  text-align: left;
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>

<script>
import MovieService from "@/services/MovieService";
export default {
  name: 'Movies',
  data(){
    return{
      movies : [],
      selectedMovie: ''
    }
  },
  methods: {
    getMovies(){
      MovieService.getMovies().then((response) => {
        this.movies = response.data;
      });
    },
    fetchMovie(id) {
      MovieService.getMovieNameById(id).then((response) => {
        this.selectedMovie = response.data;
      });
    }
  },
  created() {
    this.getMovies()
  }
}
</script>