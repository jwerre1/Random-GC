<template>
  <div class="random" :touchstart="logTouchstart">
    <swiper navigation virtual>
      <!-- effect="flip" -->
      <swiper-slide
        v-for="(talk, index) in randomizedTalks"
        :key="index"
        :virtualIndex="index"
        >{{ talk.title }}
      </swiper-slide>
    </swiper>

    <!-- <div class="random__slide-container">
      <div class="random__slide" v-for="talk in displayTalks" :key="talk._id">
        <span :class="{ red: currentTalk._id === talk._id }">
          {{ talk.title }}
        </span>
      </div>
    </div> -->

    <button class="random__btn" @click="lastTalk">Previous</button>
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
    </template>
  </div>
</template>

<script>
import axios from "axios";
import SwiperCore, { Navigation, Virtual } from "swiper"; //EffectFlip
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/swiper.scss";
//import "swiper/components/effect-flip/effect-flip.scss";
import "swiper/components/navigation/navigation.scss";

//install swiper.js virtual module
SwiperCore.use([Navigation, Virtual]); //EffectFlip

export default {
  name: "random",
  components: {
    Swiper,
    SwiperSlide,
  },
  data: function () {
    return {
      talks: [],
      talkIndex: 0,
      initialClick: false,
      baseURL: "",
      language: "",
      sortKey: 0,
    };
  },
  computed: {
    randomizedTalks() {
      let array = this.talks,
        currentIndex = this.talks.length,
        tempValue,
        randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(this.sortKey * currentIndex);
        currentIndex--;

        tempValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = tempValue;
      }
      return array;
    },
    displayTalks() {
      const min = Math.max(this.talkIndex - 2, 0);
      const max = Math.min(this.talkIndex + 3, this.talks.length);
      return this.randomizedTalks.slice(min, max);
    },
    currentTalk() {
      return this.randomizedTalks[this.talkIndex];
    },
    fullLink() {
      return this.baseURL + this.currentTalk.url + this.language;
    },
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
    nextTalk() {
      if (this.talkIndex === this.talks.length - 1) return;
      this.talkIndex++;
    },
    lastTalk() {
      if (this.talkIndex === 0) return;
      this.talkIndex--;
    },
    shuffle() {
      this.sortKey = Math.random();
      this.talkIndex = 0;
    },
    logTouchstart() {
      console.log("touchstart");
    },
  },
  created() {
    this.getTalks();
    this.sortKey = Math.random();
  },
};
</script>

<style lang="scss" scoped>
.random {
  width: 80vw;
  background: white;
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
    background-position: center;
    background-size: cover;
    width: 30rem;
    height: 30rem;
  }
}
</style>