<template>
  <div class="flex flex-col px-6 py-3">
    <div class="flex flex-wrap justify-center gap-3 mt-5 italic invisible md:visible">
      <router-link
        :to="{ name: 'byLetter', params: { letter } }"
        v-for="letter of letters"
        :key="letter"
      >
        {{ letter }}
        <br />
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import store from '../store'
import { RouterLink } from 'vue-router'
import axiosClient from '../axiosClient.js'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const ingredients = ref([])

onMounted(async () => {
  // const response = await axiosClient.get('/list.php?i=list')
  const response = await axiosClient.get('/meals.json')
  console.log(response.data)
  ingredients.value = response.data
})
</script>
