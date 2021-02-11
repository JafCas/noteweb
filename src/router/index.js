import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Registro from '../components/Registro.vue'
import Feed from '../components/Feed.vue'
import Notas from '../components/Notas.vue'
import Crear from '../components/Crear.vue'
import firebase from 'firebase'
Vue.use(VueRouter)

const routes = [
  {
    path:'*',
    redirect:'/login'
  },
  {
    
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registro',
    name: 'registro',
    component: Registro
  },
  {
    path: '/feed',
    name: 'feed',
    component: Feed,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/notas',
    name: 'notas',
    component: Notas,
    meta: {
      requiresAuth: true
    }
  },
    {
        path: 'crear',
        name: 'crear',
        component: Crear,
        meta: {
          requiresAuth: true
        }
      }
    ]
  
  


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login')
  else next()
})

export default router
