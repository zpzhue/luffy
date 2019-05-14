import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
// import Login from '@/components/Login'
// import Register from '@/components/Register'
// import Courses from '@/components/Courses'
// import Cart from '@/components/Cart'
// import Buy from '@/components/Buy'
// import Success from '@/components/Success'

const page = name => () => import('@/components/' + name);

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // 路由列表
    // {
    //   name:"Home",
    //   path: "/home",
    //   component:Home,
    // },
    {name:"Home", path: "/", component: page('Home'),},
    {name:"Login", path: "/login", component: page('Login'),},
    {name:"Register", path: "/register", component: page('Register'),},
    {name:"Courses", path: "/courses", component: page('Courses'),},
    {name:"Cart", path: "/cart", component: page('Cart'),},
    {name:"Buy", path: "/buy", component: page('Buy'),},
    {name:"Success", path: "/success", component: page('Success'),},
    {name:"CourseDetail", path: "/detail", component: page('CourseDetail'),},
  ]
})
