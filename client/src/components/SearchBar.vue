<template>
  <div class="searchBar">
    <!-- <input v-model="input" :placeholder="title" />
    <div v-if="filtered.length > 0" class="searchBar__list">
      <BaseCheckbox
        v-for="param in filtered"
        :key="param._id"
        :modelValue="modelValue"
        :label="param.search"
        :value="param.search"
        @update:modelValue="$emit('update:modelValue', $event)"
        class="searchBar__list--item"
      />
    </div> -->
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
//import BaseCheckbox from "@/components/base/BaseCheckbox.vue";
import { debounce } from "@/services/tools.js";
export default {
  // components: {
  //   BaseCheckbox,
  // },
  props: {
    // modelValue: {
    //   type: Array,
    //   required: true,
    // },
    title: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
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