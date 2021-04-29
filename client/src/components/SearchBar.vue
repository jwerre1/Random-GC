<template>
  <div class="searchBar">
    <input v-model="input" :placeholder="title" />
    <ul v-if="filtered.length > 0" class="searchBar__list">
      <li
        v-for="param in filtered"
        :key="param._id"
        class="searchBar__list--item"
      >
        {{ param.search }}
      </li>
    </ul>
  </div>
</template>

<script>
import { debounce } from "@/services/tools.js";
export default {
  props: ["title", "list"],
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
        return regex.test(el.search.toLowerCase());
      });
    },
  },
  watch: {
    input: debounce(function (val) {
      this.dbInput = val;
    }, 500),
  },
};
</script>

<style lang="scss" scoped>
.searchBar {
  &__list--item {
    text-transform: capitalize;
  }
}
</style>