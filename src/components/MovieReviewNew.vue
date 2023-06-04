<template>
  <div class="border filler">
  <form onsubmit="return false">
    <label>Score</label>
    <br/>
    <input v-model="this.score"/>
    <br/>
    <label>Comment</label>
    <br/>
    <textarea v-model="this.comment"></textarea>
    <br/>
    <button @click="addReview()" >Post Review</button>
  </form>
  </div>
</template>

<script>
import axios from "axios";
import ReviewService from "../Services/ReviewService.js";
export default {
  emits : ['formClose'],

  name: "MovieReviewNew",
  data() {return  {
    reviewId : 0,
    movieId : 0, //this.$store.state.selectedMovie.id,
    score: 0,
    comment:"",

  }},
  methods: {
    addReview(){
      this.movieId = this.$store.state.selectedMovie.id;
      const data = {
        "id" : this.reviewId,
        "movieId" : this.movieId,
        "comment" : this.comment,
        "score" : this.score,
      }
      console.log(data)
      ReviewService.postNewReview(data);
      this.$emit('formClose')
    }
  },
  beforeCreate() {
    this.reviewId = ReviewService.getReviews().then((response)=>Object.keys(response.data).length);
  }
}
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

</style>