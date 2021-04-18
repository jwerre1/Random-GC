<template>
  <div class="slider__container">
    <swiper effect="flip" navigation :slides-per-view="3">
      <!-- virtual -->
      <swiper-slide v-for="(talk, index) in talks" :key="index"
        ><a :href="fullUrl(talk.url)" target="_blank">{{ talk.title }}</a>
        <!-- :virtualIndex="index" -->
      </swiper-slide>
    </swiper>

    <!-- <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(talk, index) in virtualData.talks"
          :key="index"
          :style="slideStyles"
        >
          {{ talk.title }}
        </div>
      </div>
    </div> -->

    <!-- <div class="random__slide-container">
      <div class="random__slide" v-for="talk in displayTalks" :key="talk._id">
        <span :class="{ red: currentTalk._id === talk._id }">
          {{ talk.title }}
        </span>
      </div>
    </div> -->

    <!-- <button class="random__btn" @click="lastTalk">Previous</button>
    <button class="random__btn" @click="nextTalk">Next</button>
    <button class="random__btn" @click="shuffle">Shuffle Again</button>
    <template v-if="currentTalk">
      <div class="random__title">
        <a :href="fullLink" target="_blank">{{ currentTalk.title }}</a>
      </div>
      <div class="random__speaker">
        {{ currentTalk.speaker.name }}
      </div>
      <div class="random__conference">
        {{ currentTalk.conference.month }} {{ currentTalk.conference.year }}
      </div>
      <div v-if="currentTalk.topics.length > 0" class="random__topics">
        <ul class="random__topics--list">
          <li
            class="random__topics--item"
            v-for="(item, index) in currentTalk.topics"
            :key="item + index"
          >
            {{ item.topicname }}
          </li>
        </ul>
      </div>
    </template> -->
  </div>
</template>

<script>
import axios from "axios";
//import Swiper from "swiper/bundle";
import SwiperCore, { Navigation, EffectFlip } from "swiper"; //Virtual
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/swiper.scss";
import "swiper/components/effect-flip/effect-flip.scss";
import "swiper/components/navigation/navigation.scss";

//install swiper.js virtual module
SwiperCore.use([Navigation, EffectFlip]); //Virtual

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
      // virtualData: {
      //   talks: [],
      // },
    };
  },
  computed: {
    // slideStyles() {
    //   return `left: ${this.virtualData.offset / 10}rem`;
    // },
  },
  methods: {
    getTalks() {
      axios
        .get("http://localhost:3000/talks")
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
  },
  created() {
    this.getTalks();
  },
  // mounted() {
  //   const self = this;
  //   new Swiper(".swiper-container", {
  //     virtual: {
  //       talks: self.talks,
  //       renderExternal(data) {
  //         self.virtualData = data;
  //       },
  //     },
  //   });
  // },
};
</script>

<style lang="scss" scoped>
.slider {
  max-width: 80vw;
  background: white;

  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper {
  &-container {
    width: 30rem;
    height: 30rem;
    padding: 5rem;
  }
  &-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30rem;
    height: 30rem;

    &-active {
      background: lightgray;
    }
  }
}
</style>