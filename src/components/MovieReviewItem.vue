
<template>
  <div class="movieReviewItem">
    <i>
      <slot name="icon2"></slot>
    </i>
    <div class="reviewDetails">
      <h3>
        <slot name="reviewCreatorName"></slot>
      </h3>

      <p><slot name = "movieRatingFromReviewCreator"></slot></p>

      <p><slot name = "movieReviewFromCreator"></slot></p>
    </div>
  </div>
</template>

<style scoped>
.movieReviewItem {
  margin-top: 2rem;
  display: flex;
}

.reviewDetails {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 20px;
  height: 20px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .movieReviewItem {
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

  .movieReviewItem:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .movieReviewItem:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .movieReviewItem:first-of-type:before {
    display: none;
  }

  .movieReviewItem:last-of-type:after {
    display: none;
  }
}
</style>
<style scoped>

</style>