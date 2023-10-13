<template v-if="mealsByCategory">
  <div class="mb-3">
    <img class="w-full" src="/src/assets/homePage1.png" />
  </div>
  <div class="grid place-items-center p-2 mb-3">
    <h3 class="font-bold text-lg md:text-3xl">Recipes By Category</h3>
    <h1 class="italic text-center md:text-2xl md:p-3">
      Excepteur sint occaecat cupidatat non qui proident, sunt culpa qui officia deserunmollit anim
      id est laborum.
    </h1>
  </div>
  <div
    class="bg-gradient-to-r from-yellow-500 to-amber-600 pt-5"
    v-for="meals in mealsByCategory"
    :key="meals"
  >
    <h3
      class="text-xl text-white font-bold px-5 py-2"
      data-aos="fade-left"
      data-aos-duration="1000"
    >
      {{ meals[0].strCategory ? meals[0].strCategory : 'N/A' }}
    </h3>
    <div
      class="grid grid-flow-col auto-cols-max overflow-x-auto no-scrollbar"
      data-aos="zoom-in"
      data-aos-duration="1000"
    >
      <div v-for="meal in meals" :key="meal" class="p-3 m-2 text-center text-white">
        <router-link :to="{ name: 'mealDetails', params: { id: meal.idMeal } }">
          <img :src="meal.strMealThumb" :alt="meal.strMeal" class="rounded-lg w-50 h-44 md:h-72" />
          <div class="font-bold md:text-lg italic">{{ meal.strMeal }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axiosClient from '../axiosClient'
export default {
  setup() {
    return {
      lorem:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  },
  data() {
    return {
      mealsByCategory: []
    }
  },
  async mounted() {
    await axiosClient.get('/meals.json').then((res) => {
      let mealRes = res.data.meals
      let result = Object.values(
        mealRes.reduce(
          (acc, curr) => ((acc[curr.strCategory] = acc[curr.strCategory] || []).push(curr), acc),
          {}
        )
      )
      this.mealsByCategory = [...result]
    })
  }
}
</script>
