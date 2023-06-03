<template>
  <div class="greetings">
    <h1 class="green">Welcome</h1>
    <p>film toevoegen:</p>
    <p> titel: <input type="text" v-model="movieToAdd"></p>
    <p> director: <input type="text" v-model="directorToAdd"></p>
    <button @click="addMovie" id="addmoviebutton">+</button>
    <br>
    <h3>
      Select a movie to get started
    </h3>
    <div id="MovieList">
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

export default {
  name: 'Movies',
  data() {
    return {
      movie: String,
      movieToAdd: '',
      directorToAdd: '',
      director: "",
    }
  },
  methods: {
    addMovie() {
      let id = this.$store.state.movies.length;
      let name = this.movieToAdd;
      let directors = this.$store.state.directors;
      //let directorId = this.directorToAdd;
      let reviewScore = 0;
      let reviewCounter = 0;
      console.log(id);
      console.log(name);
      console.log(directors)
    },
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
            return this.director;
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
      this.$store.commit('setSelectedMovie', movie)

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

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>