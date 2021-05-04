<template>
  <div class="search">
    <SelectedParams />
    <button @click="submitSearch">Get Talks</button>
    <div v-if="searchParams">
      <SearchBar
        title="Conferences"
        :list="searchParams.conferences"
        :collection="'conferences'"
      />
      <SearchBar
        title="Speakers"
        :list="searchParams.speakers"
        :collection="'speakers'"
      />
      <SearchBar
        title="Topics"
        :list="searchParams.topics"
        :collection="'topics'"
      />
    </div>
  </div>
</template>

<script>
import SelectedParams from "@/components/selected/Layout.vue";
import SearchBar from "@/components/SearchBar.vue";
import TalkService from "@/services/TalkService.js";

export default {
  inject: ["GTalks"],
  components: {
    SelectedParams,
    SearchBar,
  },
  data() {
    return {
      searchParams: null,
    };
  },
  methods: {
    submitSearch() {
      TalkService.submitSearch()
        .then((response) => {
          this.GTalks.talks = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
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