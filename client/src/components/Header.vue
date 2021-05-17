<template>
  <header class="header">
    <div class="header__title">
      <h1>
        <span class="title-line title-random">Random</span>
        <span class="title-line">
          <span class="title-word">General</span>
          <span class="title-word">Conference</span>
        </span>
      </h1>
    </div>
    <div class="header__subtitle">
      <h2>
        <span>Find random talks from the the general conferences of </span
        ><span>The Church of Jesus Christ of Latter-day Saints.</span>
      </h2>
      <h3 class="tagline">Find old favorites. Discover new gems.</h3>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@use "@/scss/_variables.scss" as *;
@use "@/scss/_mixins.scss" as *;

.header {
  --fontsize-sub: 2rem;
  @include google-font;
  background-color: var(--color-grey-4);
  padding: 0.5rem 1rem;

  display: flex;
  //justify-content: space-between;
  align-items: center; //center items along cross axis

  @media only screen and (max-width: $bp-medium) {
    flex-direction: column;
  }

  &__title {
    text-align: start;
    @media only screen and (max-width: $bp-medium) {
      text-align: center;
    }

    & h1 {
      & .title-random {
        font-weight: 700;
        font-size: 4.5rem;
        margin-right: 1rem;
      }

      & .title-word {
        font-style: italic;
        &::first-letter {
          font-weight: 700;
          font-size: 4.5rem;
          font-style: normal;
        }
        &:not(:last-of-type) {
          margin-right: 1ch;
        }
      }

      & span {
        display: inline-block;
        font-size: var(--fontsize-sub);
        font-weight: 400;
      }
    }
  }
  &__subtitle {
    text-align: right;

    @media only screen and (max-width: $bp-medium) {
      text-align: center;
    }
    & > * {
      font-size: var(--fontsize-sub);
      line-height: 1.3;
    }
    & h2 {
      font-weight: 700;
      margin-bottom: 4px;
      letter-spacing: 0.1rem;
      & span {
        display: inline-block;
        @media only screen and (max-width: $bp-header) {
          display: inline;
        }
      }
    }
    & h3 {
      font-weight: 400;
      font-style: italic;
    }
  }
}
</style>
