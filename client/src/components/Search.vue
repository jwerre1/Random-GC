<template>
  <div class="search">
    <SelectedParams />
    <div class="search__btn-row">
      <button class="search__btn" @click="submitSearch">Retrieve Talks</button>
      <button class="search__btn" :disabled="!foundParams" @click="clearParams">
        Clear Selection<span v-show="foundParams > 1">s</span>
      </button>
    </div>
    <div v-if="searchParams" class="searchBars">
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
@import "@/scss/_mixins.scss";

.search {
  @include google-font;
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__btn-row {
    display: flex;
    justify-content: center;
  }

  &__btn {
    @include google-font;
    font-size: var(--fontsize-topic-item);
    background-image: linear-gradient(
      to right,
      var(--color-grey-3),
      var(--color-grey-2)
    );
    color: var(--color-font-black);
    padding: 0.7rem;

    &:enabled {
      cursor: pointer;
      background-image: linear-gradient(
        to right,
        var(--color-btn1),
        var(--color-btn2)
      );
      color: #fff;
    }

    &:not(:last-of-type) {
      margin-right: 3rem;
    }
  }
}

.searchBars {
  width: 90%;
}
</style>