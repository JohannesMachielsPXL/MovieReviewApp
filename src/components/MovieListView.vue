<template>
  <div class="greetings">
    <h1 class="green">Welcome</h1>
    <h3>
      Select a movie to get started
    </h3>
    <div id="MovieList">
      List of Movies (*** insert list as MovieItems?)
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