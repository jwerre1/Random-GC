<template>
  <div class="search">
    <SelectedParams />
    <button @click="submitSearch">Get Talks</button>
    <button v-show="foundParams" @click="clearParams">
      Clear Selection<span v-show="foundParams > 1">s</span>
    </button>
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
  inject: ["GStore", "GTalks"],
  components: {
    SelectedParams,
    SearchBar,
  },
  data() {
    return {
      searchParams: null,
    };
  },
  computed: {
    foundParams() {
      let count = 0;
      for (const prop in this.GStore) {
        count += this.GStore[prop].length;
      }
      return count;
    },
  },
  methods: {
    submitSearch() {
      TalkService.submitSearch()
        .then((response) => {
          console.log(response.data);
          this.GTalks.talks = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearParams() {
      for (const prop in this.GStore) {
        this.GStore[prop] = [];
      }
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