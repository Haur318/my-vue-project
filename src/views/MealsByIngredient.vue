<template>
  <div class="p-8 pb-0">
    <div class="flex">
      <input
        type="text"
        class="rounded-l-lg border-2 border-gray-300 w-full p-3"
        placeholder="Search for Ingredients"
        v-model="ingredientName"
        v-on:keyup.enter="selectedMeal(ingredientName)"
      />
      <button
        @click="selectedMeal(ingredientName)"
        class="flex items-center gap-3 w-[8rem] rounded-r-lg px-7 bg-gradient-to-r from-blue-800 to-teal-500 text-white font-bold border border-gray-300 text-[14px]"
      >
        Search
        <img class="w-5" src="/src/assets/searchIcon.png" />
      </button>
    </div>
    <div class="absolute left-0 right-0 px-8 opacity-95" v-if="ingredientSuggestion">
      <ul
        class="p-3 bg-slate-900 text-white"
        v-for="ingredient in ingredientSelection"
        :key="ingredient"
      >
        <li @click="selectedMeal(ingredient.strIngredient)">
          <a>{{ ingredient.strIngredient }}</a>
        </li>
      </ul>
    </div>
    <div v-for="filteredIngredient in filteredIngredients" :key="filteredIngredient">
      {{ filteredIngredient.strIngredient }}
    </div>
  </div>
</template>
<script>
import axiosClient from '../axiosClient'

export default {
  data() {
    return {
      ingredients: [],
      ingredientName: '',
      filteredIngredients: [],
      ingredientSuggestion: false,
      ingredientSuggestionSelected: false
    }
  },
  async mounted() {
    await axiosClient.get('/ingredients.json').then((res) => {
      // remove duplicates
      let unique = res.data.meals.filter((obj, index) => {
        return (
          index ===
          res.data.meals.findIndex((o) => obj.id === o.id && obj.strIngredient === o.strIngredient)
        )
      })
      // pass object array to the array variables
      this.ingredients = [...unique]
      this.filteredIngredients = this.ingredients
    })
  },
  computed: {
    ingredientSelection() {
      // browse selection filtering based on input value
      return this.ingredients.filter((item) => {
        return (
          !this.ingredientName ||
          item.strIngredient.toLowerCase().indexOf(this.ingredientName.toLowerCase()) > -1
        )
      })
    }
  },
  watch: {
    ingredientName(value, oldValue) {
      // input cannot contains numeric data, it willl be replaced by ''
      this.filterNumeric()

      // browse suggestion show when search input is not empty and the selection has not been selected
      this.ingredientSuggestion =
        !value == '' && this.ingredientSuggestionSelected == false ? true : false

      // if backspace has been detected in search bar, reset the display of filter meals
      if (value.length < oldValue.length) {
        this.filteredIngredients = this.ingredients
      }

      // reset the selected meal
      this.ingredientSuggestionSelected = false
    }
  },
  methods: {
    filterNumeric() {
      // Replace non-numeric characters with an empty string
      this.ingredientName = this.ingredientName.replace(/[^A-Za-z ]/g, '')
    },
    selectedMeal(value) {
      // close the browse suggestion
      this.ingredientSuggestion = false
      this.ingredientSuggestionSelected = true

      // auto fill in the searh bar when ingredientName selected
      this.ingredientName = value

      // filter the list of meals to display
      this.filteredIngredients = this.ingredients.filter((item) => {
        return item.strIngredient.toLowerCase().indexOf(this.ingredientName.toLowerCase()) > -1
      })
    }
  }
}
</script>
