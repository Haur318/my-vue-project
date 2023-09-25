<template>
  <div class="p-8 pb-0">
    <input
      type="text"
      class="rounded-md border-2 border-gray-200 w-full p-3"
      placeholder="Search for Ingredients"
      v-model="ingredientName"
    />
  </div>
  <div class="px-9" v-if="ingredientSuggestion">
    <ul
      class="p-3 bg-slate-900 text-white"
      v-for="ingredient in filteringredients"
      :key="ingredient"
    >
      <li @click="selectedingredient(ingredient.strIngredient)">
        <a>{{ ingredient.strIngredient }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
import axiosClient from '../axiosClient'

export default {
  data() {
    return {
      ingredients: [],
      ingredientName: '',
      ingredientSuggestion: false,
      ingredientSuggestionSelected: false
    }
  },
  async mounted() {
    await axiosClient.get('/ingredients.json').then((res) => {
      this.ingredients = [...res.data.meals]
    })
  },
  computed: {
    filteringredients() {
      return this.ingredients.filter((item) => {
        return (
          !this.ingredientName ||
          item.strIngredient.toLowerCase().indexOf(this.ingredientName.toLowerCase()) > -1
        )
      })
    }
  },
  watch: {
    ingredientName(value) {
      this.ingredientSuggestion =
        !value == '' && this.ingredientSuggestionSelected == false ? true : false
      this.filterNumeric()
      this.ingredientSuggestionSelected = false
    }
  },
  methods: {
    filterNumeric() {
      // Replace non-numeric characters with an empty string
      this.ingredientName = this.ingredientName.replace(/[^A-Za-z ]/g, '')
    },
    selectedingredient(value) {
      this.ingredientSuggestion = false
      this.ingredientSuggestionSelected = true
      this.ingredientName = value
    }
  }
}
</script>
