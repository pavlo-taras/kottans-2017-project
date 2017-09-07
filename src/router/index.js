import Vue from 'vue'
import Router from 'vue-router'
import User from '@/components/User'
import Repository from '@/components/Repository'

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
      name: 'Repository',
      component: Repository
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
