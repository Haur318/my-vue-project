import { createRouter, createWebHashHistory } from 'vue-router'
import DefaultLayout from '../components/DefaultLayout.vue'
import GuestLayout from '../components/GuestLayout.vue'
import Home from '../views/Home.vue'
import MealsByName from '../views/MealsByName.vue'
import MealDetails from '../views/MealDetails.vue'
import About from '../views/About.vue'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/by-name/:name?',
          name: 'byName',
          component: MealsByName
        },
        {
          path: '/meal/:id',
          name: 'mealDetails',
          component: MealDetails
        },
        {
          path: '/about',
          name: 'about',
          component: About
        }
      ]
    },
    {
      path: '/guest',
      component: GuestLayout,
      children: []
    }
  ]
})

export default router
