<template>
  <div class="slider">
    <div class="slider__container">
      <swiper
        v-if="talks.length > 0"
        effect="flip"
        navigation
        slides-per-view="3"
        @swiper="initSwiper"
      >
        <swiper-slide v-for="(talk, index) in talks" :key="index">
          <div class="slider__content">
            <a
              :href="fullUrl(talk.url)"
              target="_blank"
              class="slider__content--link"
            >
              <div class="slider__content--title">
                {{ talk.title }}
              </div>
              <div v-if="talk.speaker[0]" class="slider__content--speaker">
                {{ getSpeaker(talk) }}
              </div>
              <div
                v-if="talk.conference[0]"
                class="slider__content--conference"
              >
                {{ getConference(talk) }}
              </div>
              <div v-if="talk.topics.length" class="slider__content--topics">
                <span
                  v-for="(topic, index) in talk.topics"
                  :key="talk.url + '_' + index"
                  class="slider__content--topic-item"
                  ><span v-if="index > 0"> &bull; </span
                  >{{ topic.topicname }}</span
                >
              </div>
            </a>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
//import TalkService from "@/services/TalkService.js";
import SwiperCore, { Navigation, EffectFlip } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/swiper.scss";
import "swiper/components/effect-flip/effect-flip.scss";
import "swiper/components/navigation/navigation.scss";

//install swiper.js virtual module
SwiperCore.use([Navigation, EffectFlip]);

export default {
  inject: ["GTalks"],
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      random: null,
      swiper: null, // swiper object
    };
  },
  computed: {
    baseURL() {
      return this.GTalks.talks?.baseURL;
    },
    language() {
      return this.GTalks.talks?.language;
    },
    talks() {
      let talksArr = this.GTalks.talks?.talks;
      if (!talksArr) return [];
      let currentIndex = talksArr.length,
        tempValue,
        randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(
          (this.random ? this.random : Math.random()) * currentIndex
        );
        currentIndex -= 1;

        tempValue = talksArr[currentIndex];
        talksArr[currentIndex] = talksArr[randomIndex];
        talksArr[randomIndex] = tempValue;
      }
      return talksArr;
    },
  },
  watch: {
    talks: function() {
      this.setRandom();
      if (this.swiper) this.swiper.slideTo(0, 0); // Reset back to the first slide
    },
  },
  methods: {
    initSwiper(obj) {
      this.swiper = obj;
    },
    fullUrl(input) {
      return input ? this.baseURL + input + this.language : "#";
    },
    getSpeaker(input) {
      return input.speaker[0]?.name || "";
    },
    getConference(input) {
      return input.conference[0]
        ? (
            input.conference[0].month +
            " " +
            input.conference[0].year.toString()
          ).trim()
        : "";
    },
    setRandom() {
      this.random = Math.random();
    },
  },
  created() {
    this.setRandom();
  },
};
</script>

<style lang="scss" scoped>
@use "@/scss/_variables.scss" as *;
@use "@/scss/_mixins.scss" as *;

* {
  --slider-sqr: 50rem;
  --slider-padding: 5rem;
  --swiper-navigation-size: 4.4rem !important; // internal swiper variable for navigation arrows. default === 44px

  @media only screen and (max-width: $bp-smallest) {
    --slider-sqr: 40rem;
    --slider-padding: 5rem;
  }
}

.slider {
  flex: 0 0 50%;

  &__container {
    width: 100%;
    height: 100%;
    background: var(--color-white);

    @include google-font;
  }

  &__content {
    width: 100%;
    height: 100%;
    padding: 2.5rem;

    &--link {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      color: var(--color-font-black);
    }

    &--title {
      font-size: var(--fontsize-title);
    }

    &--speaker {
      font-size: var(--fontsize-speaker);
      padding-top: 1.6rem;
    }

    &--conference {
      font-size: var(--fontsize-conference);
      padding-top: 1.2rem;
    }

    &--topics {
      padding-top: 2.2rem;
    }

    &--topic-item {
      list-style: none;
      text-transform: capitalize;
      font-size: var(--fontsize-topic-item);
    }
  }
}

.swiper {
  &-container {
    width: var(--slider-sqr);
    height: var(--slider-sqr);
    padding: var(--slider-padding);
  }

  &-slide {
    width: var(--slider-sqr);
    height: calc(var(--slider-sqr) - (var(--slider-padding) * 2));
    box-shadow: 0.5rem 2rem 5rem rgba(0, 0, 0, 0.175);

    &-active {
      background: var(--color-grey-4);
    }
  }
}
</style>
