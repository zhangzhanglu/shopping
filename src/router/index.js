import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../pages/Layout.vue'
import ContentCategory from "../pages/ContentCategory"
import Params from "../pages/Params"
import ProductSelect from "../pages/ProductSelect"
import Login from "../pages/Login"

import store from "../store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children:[
      {
        path:"/",
        name:"ProductSelect",
        component:ProductSelect,
        meta:{
          isLogin:true
        }
      },
      {
        path:"params",
        name:"Params",
        component:Params,
        meta:{
          isLogin:true
        }
      },
      {
        path:"/content",
        name:"ContentCategory",
        component:ContentCategory,
        meta:{
          isLogin:true
        }
      }
    ]
  },
  {
    path:"/login",
    name:"Login",
    component:Login
  }
]

const router = new VueRouter({
  mode: 'history',
  linkActiveClass:"active",
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,next) =>{
  /**
   * 那些页面必须登陆之后才能查看
   */
  if(to.meta.isLogin){
    // 需要登陆
    const token = store.state.loginModule.token;
    /**
     * 登陆成功和失败的判断
     */
    if(token){
      next();
    }else{
      next({
        path:"/login"
      })
    }
  }else{
    next();
  }
})

export default router
