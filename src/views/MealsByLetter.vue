<template>
  <div class="flex flex-col px-6 py-3">
    <div class="flex flex-wrap justify-center gap-7 mt-5 italic text-base">
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
<script>
import axiosClient from '../axiosClient.js'

export default {
  data() {
    return {
      meals: [],
      letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    }
  },
  async mounted() {
    await axiosClient.get('/meals.json').then((res) => {
      this.meals = [...res.data.meals]
    })
  }
}
</script>
