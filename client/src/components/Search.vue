<template>
  <div class="search">
    <span>Search Here!</span>
    <SearchBar title="Conferences" :list="searchParams.conferences" />
    <SearchBar title="Speakers" :list="searchParams.speakers" />
    <SearchBar title="Topics" :list="searchParams.topics" />
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import TalkService from "@/services/TalkService.js";

export default {
  components: {
    SearchBar,
  },
  data() {
    return {
      searchParams: [],
    };
  },
  created() {
    TalkService.getSearchParams()
      .then((response) => {
        this.searchParams = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.search {
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>