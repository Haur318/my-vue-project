<template v-if="mealsByCategory">
  <div v-for="meals in mealsByCategory" :key="meals">
    <h3 class="text-xl font-bold px-5 py-2" data-aos="fade-left" data-aos-duration="1000">
      {{ meals[0].strCategory ? meals[0].strCategory : 'N/A' }}
    </h3>
    <div class="flex flex-nowrap overflow-x-auto no-scrollbar" data-aos="zoom-in" data-aos-duration="1000">
      <div v-for="meal in meals" :key="meal" class="p-3 m-2 flex-shrink-0">
        <router-link to="/">
          <img :src="meal.strMealThumb" :alt="meal.strMeal" class="rounded-lg w-50 h-32 md:h-72" />
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
      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
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
        mealRes.reduce((acc, curr) => (
          (acc[curr.strCategory] = acc[curr.strCategory] || []).push(curr), acc
        ), {})
      )
      this.mealsByCategory = [...result]
    })
  }
}
</script>
