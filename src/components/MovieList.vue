<template>
  <div class="greetings">
    <h1 class="green">Welcome</h1>
    <h3>
      Select a movie to get started
    </h3>
    <div id="MovieList">
      <table >
        <tbody>
        <tr>
<!--          insert rating-->
          <td class="movieRatingForTable">x x x x x</td>
<!--          insert title-->
          <td class="movieTitleForTable"> Movie 1 </td>
        </tr>
        <tr>
          <td  class="movieRatingForTable">x x x</td>
          <td  class="movieTitleForTable">Movie 2</td>
        </tr>
        <tr>
          <td  class="movieRatingForTable">x x x x </td>
          <td  class="movieTitleForTable">Movie 3</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}
.movieRatingForTable{
  text-align: right;
}
.movieTitleForTable{
  text-align: left;
  color: var(--color-heading);
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