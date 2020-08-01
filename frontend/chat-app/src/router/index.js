import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from '../store'

import LoginCard from '../views/Login/Index.vue'
import Feed from '../views/Chat/Index.vue'

import guest from './middleware/guest'
import auth from './middleware/auth'
import middlewarePipeline from './middlewarePipeline'

Vue.use(VueRouter, axios, VueAxios)

const routes = [
  {
    path: '/feed',
    name: 'Feed',
    component: Feed,
    // meta: {
    //   middleware: [
    //     auth
    //   ]
    // }
  },
  {
    path: '/',
    name: 'Login',
    component: LoginCard,
    //gọi đến 1 component mỗi khi gọi đến một cái route nào đó
    // meta: {
    //   middleware: [
    //     guest
    //   ]
    // }
  }
]



const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }


  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })

})


export default router
