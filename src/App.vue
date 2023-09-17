<template>
  <div class="bg-gray-100 h-full">
    <header class="bg-white shadow h-20 flex justify-between item-center items-stretch">
      <router-link
        :to="{ name: 'home' }"
        class="inline-flex items-center px-5 h-full hover:bg-sky-400 hover:text-white italic"
        >Home</router-link
      >
      <div>
        <router-link :to="{ name: 'home' }" class="inline-flex items-center px-2 h-full italic"
          >Search Meals</router-link
        >
        <router-link :to="{ name: 'home' }" class="inline-flex items-center px-2 h-full italic"
          >Meals By Letter</router-link
        >
        <router-link :to="{ name: 'home' }" class="inline-flex items-center px-2 h-full italic"
          >Meals By Ingredients</router-link
        >
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>
