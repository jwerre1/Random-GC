<template>
  <div v-for="(prop, name) in GStore" :key="name" class="list-group">
    <ListItems :list="prop" :name="name" />
  </div>
</template>

<script>
import ListItems from "@/components/selected/ListItems.vue";
export default {
  inject: ["GStore"],
  components: {
    ListItems,
  },
};
</script>

<style lang="scss" scoped>
* {
  width: 85%;
}

.list-group:not(:last-of-type) {
  margin-bottom: 1rem;
}
</style>