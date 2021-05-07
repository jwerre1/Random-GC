<template>
  <span v-for="(item, index) in list" :key="item">
    <span v-if="index > 0"> &nbsp;&nbsp;&bull;&nbsp;&nbsp; </span>
    <span @click="remove(item)" class="item">{{ item.search }}</span>
  </span>
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
* {
  line-height: var(--fontsize-title);
}

span {
  text-transform: capitalize;
  font-size: var(--fontsize-conference);
  display: inline-block;
}

.item {
  cursor: pointer;
}
</style>