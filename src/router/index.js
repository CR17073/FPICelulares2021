import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/nuevo_anuncio',
    name: 'NuevoAnuncio',
    component: ()=> import ('../views/nuevo_anuncio.vue')
  },
  {
    path: '/estadisticas',
    name: 'Estadisticas',
    component: () => import('../views/estadisticas.vue')
  },
  {
    path: '/anuncio/:id',
    name: 'Anuncio',
    component: () => import('../views/Anuncio.vue')
  },
  {
  path: '/Carrito',
  name: 'Carrito',
  component: () => import('../views/Carrito.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
