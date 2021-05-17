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
@use "@/scss/_variables.scss" as *;
@import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap");

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* force elements to inherit box-sizing property set in html */
}

:root {
  --color-font-black: rgb(0, 0, 0);
  --color-white: rgb(255, 255, 255);
  --color-grey-1: hsl(180, 4%, 70%);
  --color-grey-2: hsl(180, 4%, 80%);
  --color-grey-3: hsl(180, 4%, 90%);
  --color-grey-4: hsl(180, 4%, 95%);
  --color-blue-light-1: hsl(196, 75%, 55%);
  --color-blue-light-2: hsl(196, 75%, 40%);
  --color-blue-medium: hsl(196, 75%, 32%);
  --color-blue-dark: hsl(196, 100%, 24%);
  --color-red: hsl(5, 87%, 33%);

  --color-btn1: hsl(188, 99%, 41%);
  --color-btn2: hsl(194, 74%, 35%);

  --fontsize-title: 2.4rem;
  --fontsize-speaker: 1.8rem;
  --fontsize-conference: 1.6rem;
  --fontsize-topic-item: 1.4rem;
  --fontsize-button: 1.6rem;
}

html {
  /* 62.5% of default font size (16px) = 10px = 1rem
      Used to calculate rem values */
  font-size: 62.5%;
  @media only screen and (max-width: $bp-large) {
    font-size: 50%;
  }
  min-height: 100vh;
}

body {
  background-color: var(--color-blue-medium);
  background-image: linear-gradient(
    to right bottom,
    var(--color-blue-light-2),
    var(--color-blue-dark)
  );
  background-size: cover;
  background-repeat: no-repeat; //prevents background from repeating beyond body element
}

.inline-block {
  display: inline-block;
}
</style>
