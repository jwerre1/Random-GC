<template>
  <div class="search">
    <div class="search__descr">
      Search category criteria to specialize your random
      <span class="inline-block"
        >talks.
        <span class="search__modal-click" @click="showModal = true">
          <svg class="search__descr--info">
            <use xlink:href="@/assets/img/bootstrap-icons.svg#info-circle" />
          </svg>
        </span>
      </span>
    </div>
    <InstructionModal v-if="showModal" @click="showModal = false" />
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
import InstructionModal from "@/components/InstructionModal.vue";
import TalkService from "@/services/TalkService.js";

export default {
  inject: ["GStore", "GTalks"],
  components: {
    SelectedParams,
    SearchBar,
    InstructionModal,
  },
  data() {
    return {
      searchParams: null,
      showModal: false,
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
@use "@/scss/_mixins.scss" as *;

.search {
  @include google-font;
  flex: 0 0 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__descr {
    font-size: var(--fontsize-speaker);
    line-height: calc(var(--fontsize-speaker) * 1.5);
    margin: 0 0.5rem 2rem 0.5rem;

    &--info {
      height: 1em; //parent === search__descr
      width: 1em;
      fill: var(--color-btn2);

      &:hover {
        fill: red;
      }
    }
  }

  &__modal-click {
    cursor: pointer;
  }

  &__btn-row {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }

  &__btn {
    @include default-btn;

    &:not(:last-of-type) {
      margin-right: 3rem;
    }
  }
}

.searchBars {
  width: 90%;
}
</style>
