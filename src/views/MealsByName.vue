<template>
  <div class="p-8 pb-0">
    <div class="flex" data-aos="zoom-in" data-aos-duration="1000">
      <input id="input" type="text" class="rounded-l-lg border-2 border-gray-300 w-full p-3"
        placeholder="Search for Meals" v-model="mealName" v-on:keyup.enter="selectedMeal(mealName)" />
      <button @click="selectedMeal(mealName)"
        class="flex items-center gap-3 w-[8rem] rounded-r-lg pl-3 pr-7 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold border border-gray-300 text-[14px]">
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

    <div :class="filteredMeals.length == 0 ? 'md:grid md:place-items-center' : ''">
      <div v-if="filteredMeals.length > 0" class="mt-3 grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
        <div v-for="filteredMeal in filteredMeals" :key="filteredMeal" class="shadow rounded-xl">
          <router-link to="/">
            <img :src="filteredMeal.strMealThumb" :alt="filteredMeal.strMeal"
              class="rounded-t-xl w-full h-64 md:h-72 object-cover" />
          </router-link>
          <div class="px-4 pt-3 pb-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-b-lg">
            <h3 class="font-bold text-xl md:text-2xl truncate pb-3">
              {{ filteredMeal.strMeal }}
            </h3>
            <p class="mb-2 text-base md:text-xl">
              <strong>Category : </strong>
              {{ filteredMeal.strCategory ? filteredMeal.strCategory : 'N/A' }}
              <br />
              <strong>Area : </strong>
              {{ filteredMeal.strArea ? filteredMeal.strArea : 'N/A' }}
              <br />
              <strong>Type : </strong>
              {{ filteredMeal.strTags ? filteredMeal.strTags : 'N/A' }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class="grid place-items-center bg-white md:w-2/4 mt-8 rounded-lg" data-aos="fade-down">
        <img class="md:w-1/2 rounded-lg" src="/src/assets/noResultImg.jpg" />
        <div
          class="w-full md:pl-5 md:pr-5 md:pt-5 md:pb-1 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-b-lg text-center">
          <h3 class="font-bold text-lg md:text-4xl">Result Not found</h3>
          <h1 class="text-2 p-4 md:text-2xl italic text-white">
            Whoops ... this information is not available for a moment
          </h1>
        </div>
      </div>
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
      // close the browse suggestion
      this.mealSuggestion = false
      this.mealSuggestionSelected = true

      // auto fill in the searh bar when mealName selected
      this.mealName = value

      // filter the list of meals to display
      this.filteredMeals = this.meals.filter((item) => {
        return item.strMeal.toLowerCase().indexOf(this.mealName.toLowerCase()) > -1
      })

      // search input become blur
      window.document.getElementById('input').blur()
    }
  }
}
</script>
