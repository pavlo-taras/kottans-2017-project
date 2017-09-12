import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User'
import Repositories from '@/components/Repositories'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'user',
      component: User
    },
    {
      path: '/:name',
      name: 'Repositories',
      component: Repositories
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
