// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import { sync } from 'vuex-router-sync'
import router from './router'
import vueResource from 'vue-resource'
import { sync } from 'vuex-router-sync'
import Vuetify from 'vuetify'
import store from '@/store/store'

Vue.config.productionTip = false
Vue.use(vueResource)
Vue.use(Vuetify)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
