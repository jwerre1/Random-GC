<template>
  <input
    type="checkbox"
    :checked="isChecked()"
    :value="value"
    @change="$emit('update:modelValue', $event.target.checked)"
  />
  <label v-if="label">{{ label }}</label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isChecked() {
      return this.modelValue.indexOf(this.value) >= 0;
    },
  },
};
</script>