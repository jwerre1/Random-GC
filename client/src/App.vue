<template>
  <Main />
</template>

<script>
import Main from "@/views/Main.vue";

export default {
  name: "App",
  components: {
    Main,
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
  box-sizing: border-box; /* force elements to inherit box-sizing property set in html */
}

:root {
  --slider-sqr: 50rem;
  --slider-sqr-small: 75vw;
  --color-font-black: rgb(0, 0, 0);
  --color-white: hsl(0, 0%, 100%);
  --color-grey-1: hsl(180, 4%, 70%);
  --color-grey-2: hsl(180, 4%, 80%);
  --color-grey-3: hsl(180, 4%, 90%);
  --color-grey-4: hsl(180, 4%, 95%);
  --color-blue-light: hsl(196, 75%, 40%);
  --color-blue-dark: hsl(196, 100%, 24%);
}

html {
  /* 62.5% of default font size (16px) = 10px = 1rem
      Used to calculate rem values */
  font-size: 62.5%;
  /* box-sizing: border-box; */
}

body {
  background-color: var(--color-blue-dark);
  background-image: linear-gradient(
    to right bottom,
    var(--color-blue-light),
    var(--color-blue-dark)
  );
  background-size: cover;
  background-repeat: no-repeat; //prevents background from repeating beyond body element
}
</style>
