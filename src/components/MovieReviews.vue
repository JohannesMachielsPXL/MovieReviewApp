
<template>
  <div id="reviews" >
    <table class="border filler">
      <tbody>
        <tr v-if="!this.edit" v-for="(review) in  this.$store.getters.getReviews" v-bind:key=review.id>
          <td>{{review.score}}/5</td><td>{{review.comment}}</td>
          <td  @click="editReview(review)">Edit Review</td>
        </tr>
        <span v-if="this.edit">
          <td ><input id="scoreEdit" v-model="this.score" ></td>
          <td><input id="commentEdit" v-model="this.comment" aria-placeholder="new comment"></td>
          <td @click="commitChange()"> commit</td>
          </span>
      </tbody>
    </table>
  </div>
</template>

<script>
import ReviewService from "../Services/ReviewService";
export default {
  data() {
    return {edit: false,
      selectedReview: Object,
    score : 0,
    comment: String,}
  },
  methods: {
    editReview(review){
      this.edit = true;
      this.selectedReview = review;
      this.score = review.score;
      this.comment = review.comment;
    },
    commitChange(){
      this.selectedReview.score = this.score;
      this.selectedReview.comment = this.comment;
      let data  = {
        'id' : this.selectedReview.id,
        'movieId' : this.selectedReview.movieId,
        'comment' : this.comment,
        'score' : this.score,
      }
      ReviewService.updateReview(this.selectedReview.id,data)
      this.edit = false;
    }
  },
}
</script>

<style scoped>
div {
}
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
table{
  border-collapse: collapse;
}
tr{
  border:1px solid green;
}
td {
  margin:2px;
  padding:2px;
  padding-left:10px;
  padding-right:3px;
  border-left:0.2px solid lightgreen;
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
  margin-left:90px;
}

.changeMovieProperties {

}
</style>