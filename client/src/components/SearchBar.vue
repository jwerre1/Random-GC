<template>
  <form action="#" class="searchbar">
    <input v-model="input" :placeholder="title" class="searchbar__input" />
    <button @click.prevent="clearSearch" class="searchbar__button">
      <svg :class="[{ hidden: !input }, 'searchbar__clear']">
        <use xlink:href="@/assets/img/bootstrap-icons.svg#x" />
      </svg>
    </button>
  </form>
  <div class="list-container">
    <ul v-if="filtered.length > 0" class="list">
      <li
        v-for="param in filtered"
        :key="param._id"
        class="list__item"
        @click="selected(param)"
      >
        {{ param.search }}
      </li>
    </ul>
  </div>
</template>

<script>
import { debounce } from "@/services/tools.js";
export default {
  inject: ["GStore"],
  props: {
    title: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      required: true,
    },
    collection: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      input: "",
      dbInput: "",
    };
  },
  computed: {
    filtered() {
      if (this.dbInput === "") return [];
      const regex = new RegExp("^.*" + this.dbInput.toLowerCase() + ".*$");
      return this.list.filter((el) => {
        if (
          this.GStore[this.collection]
            .map((val) => val.search)
            .indexOf(el.search) > -1
        )
          return false;
        return regex.test(el.search.toLowerCase());
      });
    },
  },
  watch: {
    input: debounce(function (val) {
      this.dbInput = val;
    }, 500),
  },
  methods: {
    selected(param) {
      this.GStore[this.collection].push(param);
    },
    clearSearch() {
      this.input = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/scss/_mixins.scss";

* {
  @include google-font;
}

.searchbar {
  display: flex;
  justify-content: center;
  align-items: center;

  &__input {
    font-family: inherit;
    font-size: var(--fontsize-speaker);
    color: inherit;
    text-transform: capitalize;
    width: 80%;
    padding: 0.7rem 2rem;
    margin: 1rem -3.5rem 1rem 1rem;
    transition: all 0.2s;

    &:focus {
      border: 0;
      outline: 2px solid var(--color-blue-light-1);
      width: 82%;
    }
  }

  &__button {
    border: none;
    background-color: var(--color-white);

    & > .hidden {
      color: var(--color-white);
    }
  }

  &__clear {
    height: 2rem;
    width: 2rem;
    fill: var(--color-grey-2);
  }
}

.list-container {
  display: flex;
  justify-content: center;
  margin-top: -0.5rem;
}

.list {
  max-height: 20rem;
  overflow-y: auto;
  background-color: var(--color-grey-4);
  width: 70%;
  margin-right: -3.5rem;
  border: 1px solid var(--color-grey-1);
  &__item {
    text-transform: capitalize;
    list-style: none;
    cursor: pointer;
    font-size: var(--fontsize-conference);

    &:hover {
      background-color: var(--color-blue-light-2);
      color: var(--color-white);
    }
  }
}
</style>