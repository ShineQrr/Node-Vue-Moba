import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

// 解决el-UI导航栏中vue-router在3.0版本以上重复点菜单报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/categories/create',
        name: 'CategoryEdit',
        component: CategoryEdit
      },
      {
        path: '/categories/edit/:id',
        name: 'CategoryEdit',
        component: CategoryEdit,
        props: true
      },
      {
        path: '/categories/list',
        name: 'CategoryList',
        component: CategoryList
      },
      {
        path: '/items/create',
        name: 'ItemEdit',
        component: ItemEdit
      },
      {
        path: '/items/edit/:id',
        name: 'ItemEdit',
        component: ItemEdit,
        props: true
      },
      {
        path: '/items/list',
        name: 'ItemList',
        component: ItemList
      },
    ]
  },


  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
