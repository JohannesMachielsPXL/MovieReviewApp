<script setup>
import MovieItem from './MovieItem.vue'
import MovieRatingIcon from './icons/IconMovieRating.vue'
import MovieReviewItem from "@/components/MovieReviewItem.vue";

function showForm() {
  const element = document.getElementById("changeMovieProperties");
  element.classList.add("visible");
}


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
        </div>
        <div id="changeMovieProperties" class="hidden changeMovieProperties border filler">
          <form>
            <p>Change title to: <input v-model="this.$store.state.selectedMovie.name"/></p>
            <p>Change director to: <input v-model="this.$store.state.selectedDirector.name"/></p>
            <p>Change Review score to: <input v-model="this.$store.state.selectedMovie.reviewScore"/></p>
            <p>Change review counter to: <input v-model="this.$store.state.selectedMovie.reviewCounter"/></p>
            <button @click="saveChanges()">Save changes</button>
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
      </div>
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
import MovieService from "@/Services/MovieService";

export default {
  data() {
    return {
      movieTitle: String,
      scoreToAdd: 0,
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
    hideForm() {
      const element = document.getElementById("changeMovieProperties");
      element.classList.add("hidden");
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
    saveChanges() {
      const updatedMovie = {
        name: this.$store.state.selectedMovie.name,
        director: this.$store.state.selectedDirector.name,
        reviewScore: this.$store.state.selectedMovie.reviewScore,
        reviewCounter: this.$store.state.selectedMovie.reviewCounter,
      };

      this.$store.dispatch('updateMovie', {
        index: this.$store.state.selectedMovie.id,
        movie: updatedMovie,
      })
          .then(() => {
            this.$store.commit('setSelectedMovie', updatedMovie);
            this.hideForm();
          })
          .catch((error) => {
            console.error('Error updating movie:', error);
          });
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