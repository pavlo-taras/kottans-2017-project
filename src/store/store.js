import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: null,
    itemsLanguage: [
      { text: 'All', value: 'All' },
      { text: 'HTML', value: 'HTML' },
      { text: 'CSS', value: 'CSS' },
      { text: 'Javascript', value: 'Javascript' }
    ],
    itemsType: [
      { text: 'All', value: 'All' },
      { text: 'Forks', value: 'Forks' },
      { text: 'Sources', value: 'Sources' }
    ]
  },
  mutations: {
    setName (state, name) {
      console.log('Name = ', name)
      state.name = name
    },
    setLanguage (state, language) {
      console.log('Language = ', language)
      state.itemsLanguage.push({ text: language, value: language })
    }
  },
  actions: {
    setName ({commit}, name) {
      commit('setName', name)
    },
    setLanguage ({commit}, language) {
      commit('setLanguage', language)
    }
  }
})
