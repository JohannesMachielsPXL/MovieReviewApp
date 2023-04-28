<script setup>
import MovieItem from './MovieItem.vue'
import MovieDetailsIcon from './icons/IconMovieDetails.vue'
import MovieRatingIcon from './icons/IconMovieRating.vue'
import MovieReviewsIcon from './icons/IconMovieReviews.vue'
</script>

<template>
  <MovieItem>
    <template #icon>
      <MovieDetailsIcon />
    </template>
    <template #movieTitle>Insert Titel </template>
    <template #movieRating>Insert movie rating stars</template>
    <template #movieReviews>Insert movie Reviews List</template>
  </MovieItem>

  <MovieItem>
    <template #icon>
      <MovieDetailsIcon />
    </template>
    <template #movieTitle>Insert Titel </template>
    <template #movieRating>Insert movie rating stars</template>
    <template #movieReviews>Insert movie Reviews List</template>
  </MovieItem>

  <MovieItem>
    <template #icon>
      <MovieDetailsIcon />
    </template>
    <template #movieTitle>Insert Titel </template>
    <template #movieRating>Insert movie rating stars</template>
    <template #movieReviews>Insert movie Reviews List</template>
  </MovieItem>


</template>

<style scoped>

</style>