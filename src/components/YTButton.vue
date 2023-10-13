<template>
  <a
    :href="href"
    target="_blank"
    class="px-6 py-2.5 font-bold rounded-lg border bg-gradient-to-r from-red-500 to-red-700 text-white transition-colors text-lg md:text-2xl text-center"
    >Youtube</a
  >
</template>
<script setup>
const props = defineProps({
  href: String
})
</script>
