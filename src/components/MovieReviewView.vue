<script setup>
import MovieItem from './MovieItem.vue'
import MovieRatingIcon from './icons/IconMovieRating.vue'
import MovieReviewItem from "@/components/MovieReviewItem.vue";

</script>

<template>
  <MovieItem>
    <template #movieTitle>
      <p id="MovieTitle"> {{ this.$store.state.selectedMovie.name }}</p>
      <p>Director: {{ this.$store.state.selectedDirector.name }}</p>
      <p v-bind="director" > {{director}}</p>
    </template>
    <template #movieAverageRating>
      <p id="MovieScore">score: {{ getMovieAverageScore() }}</p>
      new score: <input v-model="scoreToAdd">
      <button @click="addScore">+</button>
    </template>
    <template #movieReviews>
      *** Insert list of movie reviews (as movieReviewItems)
      <br>
      movie reviewItem example:
      <MovieReviewItem>
        <template #icon2>
          <MovieRatingIcon/>
        </template>
        <template #reviewCreatorName>
          Franske Ferdinand
        </template>
        <template #movieRatingFromReviewCreator>
          x x x x x
        </template>
        <template #movieReviewFromCreator>
          Franske Ferdinand vind dees ne ferme film
        </template>
      </MovieReviewItem>
      <hr>
    </template>
    <template #createReview>Insert create review options (creates a movieReviewItem)</template>
  </MovieItem>
</template>
<script>
import DirectorService from "../Services/DirectorService";
import MovieService from "@/Services/MovieService";

export default {
  data() {
    return {
      movieTitle: String,
      scoreToAdd: 0,
      director: ''
    }
  },
  methods: {
    getMovieAverageScore() {
      if (this.$store.state.selectedMovie.reviewCounter === 0) {
        return "no score";
      } else {
        return this.$store.state.selectedMovie.reviewScore / this.$store.state.selectedMovie.reviewCounter + "/5";
      }
    },
    addScore() {
      console.log(this.scoreToAdd)
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
    },
    async mounted() {
      let directorId = this.$store.state.selectedMovie.directorId;
      if (directorId) {
        this.directorName = DirectorService.getDirectorNameById(directorId);
        console.log(this.directorName)
      }
    }
  }
};
</script>
<style scoped>

button {
  border-radius: 20px;
  background: #00bd7e;
  border: none;
  margin-left: 5px;
}

button:hover {
  background: #008458;
}

input {
  border-radius: 10px;
  width: 50px;
  text-align: center;
  border-width: 1px;

}

</style>