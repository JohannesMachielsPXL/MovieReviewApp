<template>
  <div class="movieItem">

    <div class="movieDetails">
      <h3>
        <slot name="movieTitle"></slot>
      </h3>

      <div><slot name = "movieAverageRating"></slot></div>

      <div><slot name = "movieReviews"></slot></div>

      <div class="createReviewSection"><slot name = "createReview"></slot></div>
    </div>
  </div>
</template>

<style scoped>
.movieItem {
  margin-top: 2rem;
  display: flex;
}

.movieDetails {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .movieItem {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .movieItem:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .movieItem:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .movieItem:first-of-type:before {
    display: none;
  }

  .movieItem:last-of-type:after {
    display: none;
  }
  .createReviewSection{
    background-color: #282828;
    padding: 1rem;
  }
}
</style>