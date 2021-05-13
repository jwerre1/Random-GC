<template>
  <header class="footer">
    <div class="footer__text">
      <p>
        This website is NOT an official website of The Church of Jesus Christ of
        Latter-day Saints.
      </p>
      <p>
        &#169; 2021 Jordan Werre.
      </p>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "@/scss/_variables.scss" as *;
@use "@/scss/_mixins.scss" as *;

.footer {
  @include google-font;
  background-color: var(--color-grey-4);
  padding: 0.5rem 1rem;
  margin-top: 1rem;

  @media only screen and (max-width: $bp-medium) {
    margin-top: 2rem;
  }

  &__text {
    text-align: center;
    font-size: 1.2rem;

    & p:not(:last-of-type) {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
