<template>
  <li v-for="item in list" :key="item" @click="remove(item)">
    {{ item.search }}
  </li>
</template>

<script>
export default {
  inject: ["GStore"],
  props: ["list", "name"],
  methods: {
    remove(param) {
      this.GStore[this.name] = this.GStore[this.name].filter((el) => {
        return el._id !== param._id;
      });
    },
  },
};
</script>

<style scoped>
li {
  text-transform: capitalize;
}
</style>