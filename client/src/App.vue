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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  max-width: 120rem;
  margin: 8rem auto;
}

.slider {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
