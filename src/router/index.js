import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/components/Login.vue')
const Home = () => import('@/components/Home.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
})
router.beforeEach(function(to, from, next) {
  let to_path = to.path
  if (to_path === '/' || to_path === '/login') {
    return next()
  }
  //判断用户是否登录，没有登录就到登录界面，否则放行
  let str = sessionStorage.getItem('USER_LOGIN')
  let user = JSON.parse(str)
  if (!user) {
    return next({ path: '/' })
  }
  let userName = user.data.username
  if (!userName) {
    return next({ path: '/' })
  }
  next()
})

export default router
