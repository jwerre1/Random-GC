<template>
  <transition name="modal">
    <div class="modal__mask">
      <div class="modal__wrapper">
        <div class="modal__container">
          <div class="modal__text">
            <div>
              Talks will be selected that match at least one of a given criteria
              for each category (Conferences, Speakers, or Topics). Categories
              with no criteria will not be considered when selecting talks.
            </div>
            <div>
              For example, to search all talks given by Russell M. Nelson given
              during <span class="italics">either</span> the April 2018 or
              October 2018 General Conference, select...
              <ul>
                <li>Conferences: "April 2018", "October 2018"</li>
                <li>Speakers: "Russell M. Nelson"</li>
              </ul>
            </div>
            <div>
              To select a random sampling of all available talks, simply omit
              all criteria from each category.
            </div>
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
@use "@/scss/_variables.scss" as *;
@use "@/scss/_mixins.scss" as *;

* {
  --modal-width: 50rem;

  @media only screen and (max-width: $bp-small) {
    --modal-width: 100%;
  }
}

.italics {
  font-style: italic;
}

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
    width: var(--modal-width);
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

    & > div:not(:last-of-type) {
      margin-bottom: 2rem;
    }

    & ul {
      margin: 0.5rem 0;
    }

    & li {
      list-style: none;
    }
  }

  &__close-button {
    @include default-btn;
  }
}
</style>
