<template>
  <div class="p-8 pb-0">
    <input
      type="text"
      class="rounded-md border-2 border-gray-200 w-full p-3"
      placeholder="Search for Meals"
      v-model="mealName"
    />
  </div>
  <div class="px-9" v-if="mealSuggestion">
    <ul class="p-3 bg-slate-900 text-white" v-for="meal in filterMeals" :key="meal">
      <li>
        <a @click="selectedMeal(meal.strIngredient)">{{ meal.strIngredient }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import axiosClient from '../axiosClient'

export default {
  data() {
    return {
      meals: [],
      mealName: '',
      mealSuggestion: false,
      mealSuggestionSelected: false
    }
  },
  async mounted() {
    await axiosClient.get('/meals.json').then((res) => {
      this.meals = [...res.data.meals]
    })
  },
  computed: {
    filterMeals() {
      return this.meals.filter((item) => {
        return (
          !this.mealName ||
          item.strIngredient.toLowerCase().indexOf(this.mealName.toLowerCase()) > -1
        )
      })
    }
  },
  watch: {
    mealName(value) {
      this.mealSuggestion = !value == '' && this.mealSuggestionSelected == false ? true : false
      this.filterNumeric()
      this.mealSuggestionSelected = false
    }
  },
  methods: {
    filterNumeric() {
      // Replace non-numeric characters with an empty string
      this.mealName = this.mealName.replace(/[^A-Za-z]/g, '')
    },
    selectedMeal(value) {
      this.mealSuggestion = false
      this.mealSuggestionSelected = true
      this.mealName = value
    }
  }
}
</script>
