<template>
  <div class="bg-gradient-to-r from-yellow-500 to-amber-600">
    <nav class="px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
      <div class="flex items-center justify-between">
        <router-link @click="showMenu = false" to="/" class="text-2xl font-bold text-white italic md:text-2xl"><img
            src="/src/assets/mealIcon.png" class="w-12 h-12 inline-block" />
          {{ iconTitle }}
        </router-link>
        <!-- Mobile menu button -->
        <div @click="toggleNav" class="flex md:hidden">
          <button type="button" class="text-gray-100 hover:text-gray-400 focus:outline-none focus:text-gray-400">
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
              </path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <ul :class="showMenu ? 'flex' : 'hidden'"
        class="flex-col mt-3 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0">
        <li class="text-gray-100 text-lg" v-for="(navItem, i) in navMenu" :key="navItem">
          <router-link :to="{ name: navMenu[i].name }" class="block p-3">
            {{ navMenu[i].title }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  data() {
    return {
      iconTitle: 'Meals Web',
      navMenu: [
        {
          name: 'byName',
          title: 'Search Meals'
        },
        {
          name: 'byLetter',
          title: 'Meals By Letter'
        },
        {
          name: 'byIngredient',
          title: 'Meals By Ingredients'
        }
      ]
    }
  },
  watch: {
    $route() {
      this.showMenu = false

    }
  },
  mounted() {
    this.screenTitleType()
    window.onresize = () => {
      this.screenTitleType()
    }
  },
  methods: {
    screenTitleType() {
      if (window.innerWidth <= 768) {
        this.iconTitle = 'Meals App'
      } else {
        this.iconTitle = 'Meals Web'
      }
    }
  },
  setup() {
    let showMenu = ref(false)
    const toggleNav = () => (showMenu.value = !showMenu.value)
    return { showMenu, toggleNav }
  }
}
</script>
