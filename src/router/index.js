import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Locataires from '../views/Home.vue'
import Locations from '../views/Home.vue'
import Vehicules from '../views/Home.vue'
import Louer from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gestiondeslocataires',
    name: 'Locataires',
    component: Locataires
  },
  {
    path: '/gestiondeslocations',
    name: 'Locations',
    component: Locations
  },
  {
    path: '/gestiondesvehicules',
    name: 'Vehicules',
    component: Vehicules
  },
  {
    path: '/louerunvehicule',
    name: 'Louer',
    component: Louer
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
