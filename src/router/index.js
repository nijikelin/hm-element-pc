import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import DashBoard from '@/views/dashboard'
import Article from '@/views/article'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      children: [
        { path: '/dashboard', component: DashBoard },
        { path: '/article', component: Article }
      ]
    }
  ]
})
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if (store.state.user.token) {
    next()
    return
  }
  if (whiteList.includes(to.path)) {
    next()
  }
  next('/login')
})

export default router
