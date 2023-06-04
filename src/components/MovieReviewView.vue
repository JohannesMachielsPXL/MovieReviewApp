<script setup>
import MovieItem from './MovieItem.vue'
import MovieRatingIcon from './icons/IconMovieRating.vue'
import MovieReviewItem from "@/components/MovieReviewItem.vue";
import MovieReviewNew from "./MovieReviewNew.vue";

</script>

<template>
  <MovieItem>
    <template #movieTitle>
      <div v-if="this.$store.state.selectedMovie.name">
        <div id="ifMovieSelectedView" class="border filler">
          <p>Title: {{ this.$store.state.selectedMovie.name }}</p>
          <p>Director: {{ this.$store.state.selectedDirector.name }}</p>
          <p>Review score: {{ this.$store.state.selectedMovie.reviewScore }}</p>
          <p>Review counter: {{ this.$store.state.selectedMovie.reviewCounter }}</p>
          <button @click="showForm()">Change movie properties</button>
          <button @click="addReview()">Add Review</button>
        </div>
        <div id="changeMovieProperties" class="hidden changeMovieProperties border filler">
          <form>
            <p>Change title to: </p>
            <p>
              <input v-model="updatedMovieName.name"/>
              <button @click="saveNewTitle">Save title</button>
            </p>
            <p>Change director to: </p>
            <p>
              <input v-model="updatedDirectorName.name"/>
              <button @click="saveNewDirector">Save director</button>
            </p>
            <p>Change Review score to: </p>
            <p>
              <input v-model="updatedMovieReviewScore.reviewScore"/>
              <button @click="saveNewReviewScore">Save review score</button>
            </p>
            <p>Change review counter to: </p>
            <p>
              <input v-model="updatedMovieReviewCounter.reviewCounter"/>
              <button @click="saveNewReviewCounter">Save review counter</button>
            </p>
          </form>
        </div>
      </div>
      <div v-else>
        <h2>Please select a movie from the list</h2>
      </div>
    </template>


    <template #movieAverageRating>
      <div class="border filler">
        <p id="MovieScore">score: {{ getMovieAverageScore() }}</p>
        new score: <input v-model="scoreToAdd">
        <button @click="addScore">+</button>
        <p id="scoreError"></p>
      </div>
    </template>

    <!--
    <template #movieReviews>
      <MovieReviewNew id="newReview" v-if="this.active" v-on:formClose="this.active = false">
      </MovieReviewNew>

    </template>
    <template #createReview>Insert create review options (creates a movieReviewItem)</template>
    -->
  </MovieItem>
  <div id="reviews">
    <ul>
      <li v-for="(review) in this.reviews" v-bind:key=review.id>test {{review.id}}</li>
    </ul>
  </div>

</template>

<script>
import MovieService from "@/Services/MovieService";
import axios from "axios";
import ReviewService from "../Services/ReviewService";
export default {
  mounted () {
    // after the sidebar is populated
    this.reviews = this.$store.getters.getReviews;
    },
  data() {
    return {
      movieTitle: String,
      reviews : [],
      active: false,
      scoreToAdd: null,
      updatedMovieName: {
        id: this.$store.state.selectedMovie.id,
        name: '',
      },
      updatedMovieReviewScore: {
        id: this.$store.state.selectedMovie.id,
        reviewScore: null,
      },
      updatedMovieReviewCounter: {
        id: this.$store.state.selectedMovie.id,
        reviewCounter: null,
      },
      updatedMovieDirectorId: {
        id: this.$store.state.selectedMovie.id,
        directorId: null,
      },
      updatedDirectorName: {
        id: this.$store.state.selectedDirector.id,
        name: '',
      },
      newDirector:{
        id:this.$store.state.directors.length,
        name:''
      },
      selectedDirector: {
        id: this.$store.state.selectedDirector.id,
        name: '',
      },
    }
  },
  methods: {
    showForm() {
  const element = document.getElementById("changeMovieProperties");
  element.classList.add("visible");
},
    addReview(){
      this.active = true;
    },
    getMovieReviews(){
      return ReviewService.getReviews(this.$store.selectedMovie.id)
    },
    saveNewTitle() {
      const id = this.$store.state.selectedMovie.id;
      const updatedMovie = { ...this.updatedMovieName, name: this.updatedMovieName.name };
      console.log(updatedMovie)
          axios.patch('http://localhost:3000/movies/' + id, updatedMovie)
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
    },
    saveNewDirector() {
      const id = this.$store.state.selectedDirector.id;
      const updatedDirectorName = { ...this.selectedDirector, name: this.updatedDirectorName.name };
      axios.patch('http://localhost:3000/directors/' + id, updatedDirectorName)
          .then((response) => console.log('Director name updated successfully', response.data))
          .catch((error) => console.error('Error updating director name', error));
    },
    saveNewReviewScore(){
      const id = this.$store.state.selectedMovie.id;
      const reviewScore = Number(this.updatedMovieReviewScore.reviewScore)
      const updatedMovie = { ...this.updatedMovieReviewScore, reviewScore: reviewScore };
      console.log(updatedMovie)
      axios.patch('http://localhost:3000/movies/' + id, updatedMovie)
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
    },
    saveNewReviewCounter(){
      const id = this.$store.state.selectedMovie.id;
      const reviewCounter = Number(this.updatedMovieReviewCounter.reviewCounter)
      const updatedMovie = { ...this.updatedMovieReviewCounter, reviewCounter: reviewCounter };
      console.log(updatedMovie)
      axios.patch('http://localhost:3000/movies/' + id, updatedMovie)
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
    },
    getMovieAverageScore() {
      if (this.$store.state.selectedMovie.reviewCounter === 0) {
        return "no score";
      } else {
        return (this.$store.state.selectedMovie.reviewScore / this.$store.state.selectedMovie.reviewCounter).toFixed(1) + "/5";
      }
    },
    hideForm() {
      const element = document.getElementById("changeMovieProperties");
      element.classList.add("hidden");
    },
    addScore() {
      console.log(this.scoreToAdd)
      if (this.scoreToAdd > 5 || this.scoreToAdd < 0) {
        document.getElementById("scoreError").textContent = "Score moet tussen 0 en 5 zijn."
        this.scoreToAdd = null;
      } else {
        document.getElementById("scoreError").textContent = ""
        const {id, reviewScore, reviewCounter} = this.$store.state.selectedMovie;
        const newScore = reviewScore + +this.scoreToAdd;
        const newScoreCounter = reviewCounter + 1;

        const updatedMovie = {
          ...this.$store.state.selectedMovie,
          reviewScore: newScore,
          reviewCounter: newScoreCounter
        }
        MovieService.updateMovieScore(id, updatedMovie)
        this.$store.commit('setSelectedMovie', updatedMovie)
      }
    },
  }
};
</script>
<style scoped>

button {
  border-radius: 20px;
  background: #00bd7e;
  border: none;
  margin-left: 5px;
  padding: 5px;
}

button:hover {
  background: #008458;
}

input {
  padding: 5px;
  border-radius: 10px;
  text-align: center;
  border-width: 1px;
  width: auto;
}

.hidden {
  display: none;
}

.visible {
  display: block;
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

.changeMovieProperties {

}
</style>