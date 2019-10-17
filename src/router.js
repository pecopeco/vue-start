import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/views/home').default
    },
    {
      path: '/about',
      name: 'about',
      component: require('@/views/about').default
    },
    {
      path: '/my',
      name: 'my',
      component: require('@/views/my').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
