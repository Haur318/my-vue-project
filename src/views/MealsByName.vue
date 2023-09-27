<template>
  <div class="p-8 pb-0">
    <div class="flex">
      <input
        type="text"
        class="rounded-l-lg border-2 border-gray-300 w-full p-3"
        placeholder="Search for Meals"
        v-model="mealName"
      />
      <button
        @click="selectedMeal(mealName)"
        class="flex items-center gap-3 w-[8rem] rounded-r-lg px-7 bg-gradient-to-r from-blue-800 to-teal-500 text-white font-bold border border-gray-300 text-[14px]"
      >
        Search
        <img class="w-5" src="/src/assets/searchIcon.png" />
      </button>
    </div>
    <div class="absolute left-0 right-0 px-8 opacity-95" v-if="mealSuggestion">
      <ul class="p-3 bg-slate-900 text-white" v-for="meal in mealsSelection" :key="meal">
        <li @click="selectedMeal(meal.strMeal)">
          <a>{{ meal.strMeal }}</a>
        </li>
      </ul>
    </div>
    <div v-for="filteredMeal in filteredMeals" :key="filteredMeal">
      {{ filteredMeal.strMeal }}
    </div>
  </div>
</template>
<script>
import axiosClient from '../axiosClient'

export default {
  data() {
    return {
      meals: [],
      mealName: '',
      filteredMeals: [],
      mealSuggestion: false,
      mealSuggestionSelected: false
    }
  },
  async mounted() {
    await axiosClient.get('/meals.json').then((res) => {
      // remove duplicates
      let unique = res.data.meals.filter((obj, index) => {
        return (
          index === res.data.meals.findIndex((o) => obj.id === o.id && obj.strMeal === o.strMeal)
        )
      })
      // pass object array to the array variables
      this.meals = [...unique]
      this.filteredMeals = this.meals
    })
  },
  computed: {
    mealsSelection() {
      // browse selection filtering based on input value
      return this.meals.filter((item) => {
        return (
          !this.mealName || item.strMeal.toLowerCase().indexOf(this.mealName.toLowerCase()) > -1
        )
      })
    }
  },
  watch: {
    mealName(value, oldValue) {
      // input cannot contains numeric data, it willl be replaced by ''
      this.filterNumeric()

      // browse suggestion show when search input is not empty and the selection has not been selected
      this.mealSuggestion = !value == '' && this.mealSuggestionSelected == false ? true : false

      // if backspace has been detected in search bar, reset the display of filter meals
      if (value.length < oldValue.length) {
        this.filteredMeals = this.meals
      }

      // reset the selected meal
      this.mealSuggestionSelected = false
    }
  },
  methods: {
    filterNumeric() {
      // Replace non-numeric characters with an empty string
      this.mealName = this.mealName.replace(/[^A-Za-z ]/g, '')
    },
    selectedMeal(value) {
      console.log(value)
      // close the browse suggestion
      this.mealSuggestion = false
      this.mealSuggestionSelected = true

      // auto fill in the searh bar when mealName selected
      this.mealName = value

      // filter the list of meals to display
      this.filteredMeals = this.meals.filter((item) => {
        return item.strMeal.toLowerCase().indexOf(this.mealName.toLowerCase()) > -1
      })
    }
  }
}
</script>
