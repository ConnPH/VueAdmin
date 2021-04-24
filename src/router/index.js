import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Index from "../views/Index";
import User from "../views/sys/User";
import Role from "../views/sys/Role";
import Menu from "../views/sys/Menu";
import UserCenter from "../views/UserCenter";
import store from "../store"
import axios from "axios";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/user/userCenter',
        name: 'UserCenter',
        component: () => import(/* webpackChunkName: "about" */ '../views/UserCenter.vue')
      },
      {
        path: '/index',
        name: 'Index',
        component: Index
      },
      // {
      //   path: '/sys/users',
      //   name: 'SysUser',
      //   component: User
      // },
      // {
      //   path: '/sys/roles',
      //   name: 'SysRole',
      //   component: Role
      // },
      // {
      //   path: '/sys/menus',
      //   name: 'SysMenu',
      //   component: Menu
      // },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {

  let hasRoute = false

  axios.get('/sys/menu/nav',{

    headers:{
      Authorization: localStorage.getItem("token")
    }
  }).then(res=>{

    console.log(res.data.data);
    //拿到menuList
    store.commit("setMenuList",res.data.data.nav)


    store.commit("setUserList",res.data.data.authoritys)


    // 用户权限
    console.log(store.state.menu.menuList)


    // 动态绑定路由
    let newRoutes = router.options.routes

    res.data.data.nav.forEach(menu =>{
      if (menu.children){
        menu.children.forEach(e =>{
          // 转换路由
          let route = menuToRoute(e)
          // 把路由添加到路由管理中
          console.log(route)


          if (route){
            newRoutes[0].children.push(route)
          }


        })
      }
    })

    console.log(newRoutes)
    router.addRoutes(newRoutes)

  })


  next()
})

const  menuToRoute = (menu) =>{
  if (!menu.component){
    return null;
  }

  let route = {
    name: menu.name,
    path: menu.path,
    meta: {
      icon: menu.icon,
      title: menu.title
    }
  }

  route.component = ()=> import('../views/'+menu.component+'.vue')

  return route
}
export default router
