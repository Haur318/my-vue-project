import { createRouter, createWebHashHistory } from 'vue-router'
import DefaultLayout from '../components/DefaultLayout.vue'
import GuestLayout from '../components/GuestLayout.vue'
import Home from '../views/Home.vue'
import MealsByIngredient from '../views/MealsByIngredient.vue'
import MealsByLetter from '../views/MealsByLetter.vue'
import MealsByName from '../views/MealsByName.vue'
import MealDetails from '../views/MealDetails.vue'

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
          path: '/by-letter/:letter?',
          name: 'byLetter',
          component: MealsByLetter
        },
        {
          path: '/by-ingredient/:ingredient?',
          name: 'byIngredient',
          component: MealsByIngredient
        },
        {
          path: '/meal/:id',
          name: 'mealDetails',
          component: MealDetails
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
