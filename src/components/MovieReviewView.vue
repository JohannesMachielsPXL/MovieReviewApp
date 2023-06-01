<script setup>
import MovieItem from './MovieItem.vue'
import MovieRatingIcon from './icons/IconMovieRating.vue'
import MovieReviewItem from "@/components/MovieReviewItem.vue";

</script>
<template>
  <MovieItem>
    <template #movieTitle>
      <p>Title:</p>
      <p id="MovieTitle"> {{ this.$store.state.selectedMovie.name }}</p>
      <p>Director id:</p>
      <p> {{ this.$store.state.selectedMovie.directorId }}</p>
      <p>Director name:  </p>
      <p>{{ directorName }}</p>
    </template>
    <template #movieAverageRating>*** Insert average rating stars
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
export default {
  data() {
    return {
      movieTitle: String,
      directorName: '',
    };
  },
  async mounted() {

    const directorId = this.$store.state.selectedMovie.directorId;
    if (directorId) {
      this.directorName = await DirectorService.getDirectorNameById(directorId);
    }
  },
};
</script>
<style scoped>
</style>