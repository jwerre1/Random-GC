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
@use "@/scss/_variables.scss" as *;

.container {
  width: 100%;
  max-width: 120rem;
  margin: 8rem auto;
  background-color: var(--color-white);

  @media only screen and (max-width: $bp-largest) {
    margin: 0;
    max-width: 100%;
  }
}

.content {
  display: flex;
  padding-top: 2rem;
  padding-bottom: 2rem;

  @media only screen and (max-width: $bp-largest) {
    padding: 0;
  }

  // @media only screen and (max-width: $bp-medium) {
  //   flex-direction: column;
  // }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 6rem auto;

  @media only screen and (max-width: $bp-largest) {
    margin: 0;
  }
}
</style>
