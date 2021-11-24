import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/Login'
import Landing from '../views/Login/Landing'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login,
  },
  {
    path: '/landing',
    name: 'Landing',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Landing,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
