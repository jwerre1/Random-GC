<template>
  <div class="random">
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

export default {
  name: "random",
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
    randomizedTalks: function () {
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
    currentTalk: function () {
      return this.randomizedTalks[this.talkIndex];
    },
    fullLink: function () {
      return this.baseURL + this.currentTalk.url + this.language;
    },
  },
  methods: {
    getTalks: function () {
      axios.get("http://localhost:3000/talks").then((response) => {
        const data = response.data;
        this.baseURL = data.baseURL;
        this.language = data.language;
        this.talks = data.talks;
      });
    },
    nextTalk: function () {
      if (this.talkIndex === this.talks.length - 1) return;
      this.talkIndex++;
    },
    lastTalk: function () {
      if (this.talkIndex === 0) return;
      this.talkIndex--;
    },
    shuffle: function () {
      this.sortKey = Math.random();
      this.talkIndex = 0;
    },
  },
  mounted: function () {
    this.getTalks();
    this.sortKey = Math.random();
  },
};
</script>