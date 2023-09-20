<template>
  <div class="bg-gradient-to-r from-teal-500 to-blue-800">
    <nav class="
        container
        px-6
        py-4
        mx-auto
        md:flex md:justify-between md:items-center
      ">
      <div class="flex items-center justify-between">
        <router-link to="/" class="
            text-xl
            font-bold
            text-gray-100
            md:text-2xl
          ">Logo
        </router-link>
        <!-- Mobile menu button -->
        <div @click="toggleNav" class="flex md:hidden">
          <button type="button" class="
              text-gray-100
              hover:text-gray-400
              focus:outline-none focus:text-gray-400
            ">
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
              </path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <ul :class="showMenu ? 'flex' : 'hidden'" class="
          flex-col
          mt-3
          space-y-4
          md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0
        ">
        <li class="text-gray-100" v-for="(navItem, i) in navMenu" :key="navItem">
          <router-link :to="{ name: navMenu[i].name }" class="block p-3">
            {{ navMenu[i].title }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
  <main>
    <router-view />
  </main>
</template>
<script>
import { ref } from 'vue';
export default {
  data() {
    return {
      navMenu: [
        {
          name: "home",
          title: "Search Meals"
        },
        {
          name: "home",
          title: "Meals By Letter"
        },
        {
          name: "home",
          title: "Meals By Ingredients"
        }
      ]
    }
  },
  setup() {
    let showMenu = ref(false);
    const toggleNav = () => (showMenu.value = !showMenu.value);
    return { showMenu, toggleNav };
  },
};
</script>