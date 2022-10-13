import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Locataires from '../views/Locataires.vue'
import Locations from '../views/Locations.vue'
import Vehicules from '../views/Vehicules.vue'
import Louer from '../views/Louer.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/locataires',
    name: 'Locataires',
    component: Locataires
  },
  {
    path: '/locations',
    name: 'Locations',
    component: Locations
  },
  {
    path: '/vehicules',
    name: 'Vehicules',
    component: Vehicules
  },
  {
    path: '/louer',
    name: 'Louer',
    component: Louer
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
