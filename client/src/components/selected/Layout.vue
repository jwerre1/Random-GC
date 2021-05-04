<template>
  <div class="selected-params">
    <ul class="selected-params__list">
      <ListItems
        v-for="(prop, name) in GStore"
        :key="name"
        :list="prop"
        :name="name"
      />
    </ul>
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