<template>
  <div class="container">
    <Header />
    <div class="content">
      <Random />
      <Search />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Random from "@/components/Random.vue";
import Search from "@/components/Search.vue";

export default {
  name: "App",
  components: {
    Header,
    Random,
    Search,
  },
};
</script>

<style lang="scss">
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
  --color-white: rgb(255, 255, 255);
  --color-grey-1: rgb(208, 211, 211);
  --color-grey-2: rgb(220, 222, 222);
  --color-grey-3: rgb(231, 233, 233);
  --color-grey-4: rgb(243, 244, 244);
  --color-grey-5: rgb(252, 252, 252);
  --color-blue: rgb(21, 116, 147);
}

html {
  /* 62.5% of default font size (16px) = 10px = 1rem
      Used to calculate rem values */
  font-size: 62.5%;
  /* box-sizing: border-box; */
}

body {
  background-color: var(--color-grey-4);
}

.container {
  width: 100%;
  max-width: 120rem;
  margin: 8rem auto;
  background-color: var(--color-white);
}

.content {
  display: flex;
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
