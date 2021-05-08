<template>
  <transition name="modal">
    <div class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container">
          <div class="modal__text">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed,
              temporibus atque? Vel dolorum ipsa eos repudiandae dolore. Vel
              facere sequi porro praesentium illum nesciunt, aliquid reiciendis
              perspiciatis voluptatem, numquam suscipit?
            </p>
          </div>
          <button class="modal__close-button" @click="$emit('close')">
            Close
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  emits: ["close"],
};
</script>

<style lang="scss" scoped>
@use "@/scss/_mixins.scss" as *;

.modal {
  &__mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  &__wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  &__container {
    width: 30rem;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: var(--color-white);
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }

  &__text {
    font-size: var(--fontsize-conference);
    line-height: calc(var(--fontsize-conference) * 1.4);
    margin-bottom: 3rem;
  }

  &__close-button {
    @include default-btn;
  }
}
</style>