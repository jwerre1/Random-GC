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
import TalkService from "@/services/TalkService.js";
import Header from "@/components/Header.vue";
import Random from "@/components/Random.vue";
import Search from "@/components/Search.vue";

export default {
  name: "App",
  inject: ["GTalks"],
  components: {
    Header,
    Random,
    Search,
  },
  created() {
    TalkService.getTalks()
      .then((response) => {
        this.GTalks.talks = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss">
.container {
  width: 100%;
  max-width: 120rem;
  margin: 8rem auto;
  background-color: var(--color-white);
}

.content {
  display: flex;
  padding-top: 2rem;
  padding-bottom: 2rem;
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
