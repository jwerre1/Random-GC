import { createApp } from 'vue'
import App from './App.vue'
import GStore from './store'
import GTalks from './store/talks'

createApp(App)
  .provide('GStore', GStore)
  .provide('GTalks', GTalks)
  .mount('#app')
