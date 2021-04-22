<template>
  <div class="header">
    <div class="header__title">
      <h1 class="header__title--main">Random GC</h1>
      <div class="header__title--subtitle">
        A Random General Conference Talk Finder
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  background-color: var(--color-grey-5);
  font-family: "Libre Baskerville", serif;
  padding: 0.5rem 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center; //center items along cross axis

  &__title {
    text-align: start;

    &--main {
      font-size: 3rem;
      font-weight: 700;
    }

    &--subtitle {
      font-size: 1.6rem;
      font-weight: 400;
    }
  }
}
</style>