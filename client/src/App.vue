<template>
  <div class="container">
    <div class="slider">
      <Random />
    </div>
  </div>
</template>

<script>
import Random from "./components/Random.vue";

export default {
  name: "App",
  components: {
    Random,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap");

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /*& force elements to inherit box-sizing property set in html &*/
}

:root {
  --slider-sqr: 50rem;
  --slider-sqr-small: 75vw;
  --color-font-black: rgb(0, 0, 0);
  --color-background-white: rgb(255, 255, 255);
}

html {
  /* 62.5% of default font size (16px) = 10px = 1rem
      Used to calculate rem values */
  font-size: 62.5%;
  /* box-sizing: border-box; */
}

.container {
  width: 100%;
  max-width: calc(var(--slider-sqr) + 10rem);
  margin: 8rem auto;
}

.slider {
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 6rem auto;
}
</style>
