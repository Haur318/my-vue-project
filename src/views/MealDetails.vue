<template>
  <div class="md:w-[800px] mx-auto p-8">
    <div class="md:grid md:justify-center">
      <h1 class="text-2xl md:text-4xl font-bold mb-5">{{ meal.strMeal }}</h1>
      <img :src="meal.strMealThumb" :alt="meal.strMeal" />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 text-lg py-2">
      <div><strong class="font-bold">Category:</strong> {{ meal.strCategory }}</div>
      <div><strong class="font-bold">Area:</strong> {{ meal.strArea }}</div>
      <div><strong class="font-bold">Tags:</strong> {{ meal.strTags }}</div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2">
      <div>
        <h2 class="text-2xl font-semibold mb-2">Ingredients</h2>
        <ul>
          <template v-for="(item, index) in new Array(20)" :key="item">
            <li v-if="meal[`strIngredient${index + 1}`]">
              {{ index + 1 }}. {{ meal[`strIngredient${index + 1}`] }}
            </li>
          </template>
        </ul>
      </div>
      <div>
        <h2 class="text-2xl font-semibold mb-2">Measures</h2>
        <ul>
          <template v-for="(item, index) in new Array(20)" :key="item">
            <li v-if="meal[`strMeasure${index + 1}`]">
              {{ index + 1 }}. {{ meal[`strMeasure${index + 1}`] }}
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axiosClient from '../axiosClient'

export default {
  data() {
    return {
      meal: []
    }
  },
  async mounted() {
    await axiosClient.get('/meals.json').then((res) => {
      let detail = res.data.meals.filter((res) => {
        return res.idMeal === this.$route.params.id
      })
      // pass object array to the array variables
      this.meal = [...detail]
      this.meal = this.meal[0]
    })
  }
}
</script>
