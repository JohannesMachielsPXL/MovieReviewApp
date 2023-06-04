
<template id="movielist">

  <div class="greetings">
    <h1 class="green">Welcome</h1>
    <div class="border filler">
      <p>Add a new movie:</p>
      <p> titel: <input type="text" v-model="newMovie.name"><button @click="postMovie" id="addmoviebutton" class="clickable">+</button></p>
    </div>

    <div class="border filler">
      <h3>Search movie by name</h3>
      <input type="text" v-model="searchName">
      <button @click="findMovieByName" class="clickable">Search</button>
    </div>

    <H3>Movies</H3>
    <div id="MovieList" class="border filler">
      <table>
        <tbody>
        <tr v-for="(movie) in $store.state.movies" v-bind:key=movie.id>
          <td @click="fetchMovie(movie.id)" >
            <button >{{ movie.name }} </button>
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
import MovieReviewView from "@/components/MovieReviewView.vue";

export default {
  name: 'Movies',
  data() {
    return {
      movie: String,
      newMovie : {
        id: this.$store.state.movies.length,
        name : '',
        directorId: 0,
        reviewScore: 0,
        reviewCounter: 0
      },
      directors : this.$store.state.directors,
      searchName: ''
    }
  },
  methods: {
    findMovieByName() {

      if (this.searchName.trim().length === 0) {
        MovieService.getMovies().then((response) => {
          let data = response.data;
          this.$store.commit('setMovies', data);
        })
      } else {
        axios.get('http://localhost:3000/movies', {
          params: {
            name: this.searchName,
          }
        })
            .then((response) => { let data = response.data
              this.$store.commit('setMovies', data)
            })
        ;
      }
    },
    postMovie() {
      const newMovie = {
        ...this.newMovie
      }
      axios.post('http://localhost:3000/movies',newMovie)
          .then((response) => console.log(response))
          .catch((error) => console.log(error));

      MovieService.getMovies().then((response) => {
            let data = response.data;
            this.$store.commit('setMovies', data);
      })

      this.newMovie.name = '';
    },

    fetchMovie(id) {
      MovieService.getMovieNameById(id).then((response) => {
        let data = response.data;
        this.$store.commit('setSelectedMovie', data);
        this.movie = data;
        this.fetchDirector(data.directorId);
      });
      ReviewService.getReviewsByMovieId(id).then((response)=>this.$store.commit('setReviews', response.data));
      console.log(this.$store.getters.getReviews)


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
  },
  beforeCreate() {
    MovieService.getMovies().then((response) => {
      let data = response.data;
      let movie = data[0];
      this.movie = movie.name;
      this.$store.commit('setMovies', data);
      this.$store.commit('setSelectedMovie', movie);
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

td {
  display: block;
  background: lightgrey;
  border-radius: 10px;
}
td:hover {
  background: #00bd7e;
}

button {
  background: none;
  border: none;
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
  width: 100px;
}

.border {
  border-style: solid;
  border-color: #00bd7e;
  border-radius: 10px;
  border-width: 1px;
}

.clickable {
  background: #00bd7e;
  border-radius: 10px;
  margin: 10px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
}

.clickable:hover {
  background: #008458;
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