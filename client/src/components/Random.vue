<template>
  <div class="slider">
    <div class="slider__container">
      <div class="slider__dummy"></div>
      <swiper
        v-if="talks.length > 0"
        effect="flip"
        navigation
        :slides-per-view="3"
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
              <div class="slider__content--speaker">
                {{ getSpeaker(talk) }}
              </div>
              <div class="slider__content--conference">
                {{ getConference(talk) }}
              </div>
              <div class="slider__content--topics">
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
import TalkService from "@/services/TalkService.js";
import SwiperCore, { Navigation, EffectFlip } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/swiper.scss";
import "swiper/components/effect-flip/effect-flip.scss";
import "swiper/components/navigation/navigation.scss";

//install swiper.js virtual module
SwiperCore.use([Navigation, EffectFlip]);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      talks: [],
      baseURL: "",
      language: "",
    };
  },
  methods: {
    getTalks() {
      TalkService.getTalks()
        .then((response) => {
          const data = response.data;
          this.baseURL = data.baseURL;
          this.language = data.language;
          this.talks = data.talks;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fullUrl(input) {
      return this.baseURL + input + this.language;
    },
    getSpeaker(input) {
      return input.speaker[0]?.name || "";
    },
    getConference(input) {
      if (!input.conference[0]) return "";
      const conf =
        input.conference[0].month + " " + input.conference[0].year.toString();
      return conf.trim();
    },
  },
  created() {
    this.getTalks();
  },
};
</script>

<style lang="scss" scoped>
.slider {
  flex: 0 0 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 10rem;

  &__container {
    display: inline-block;
    position: relative;
    width: 100%;
    background: var(--color-white);

    font-family: "Libre Baskerville", serif;
    font-weight: 400;
  }

  &__dummy {
    margin-top: 100%;
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
      font-size: 2.4rem;
    }

    &--speaker {
      font-size: 1.8rem;
      padding-top: 1rem;
    }

    &--conference {
      font-size: 1.6rem;
      padding-top: 1rem;
    }

    &--topics {
      padding-top: 2.2rem;
    }

    &--topic-item {
      list-style: none;
      text-transform: capitalize;
      font-size: 1.4rem;
    }
  }
}

.swiper {
  &-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-width: var(--slider-sqr);
    height: 100%;
    max-height: var(--slider-sqr);
    padding: 5rem;
  }
  &-slide {
    width: 100%;
    max-width: var(--slider-sqr);
    height: 100%;
    max-height: var(--slider-sqr);
    box-shadow: 0.5rem 2rem 5rem rgba(0, 0, 0, 0.175);

    &-active {
      background: var(--color-grey-4);
    }
  }
}
</style>