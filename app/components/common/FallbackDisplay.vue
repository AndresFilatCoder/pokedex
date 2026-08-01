<script setup>
const props = defineProps({
  image: {
    type: String,
    default: '/images/magikarp.png'
  },
  title: {
    type: String,
    default: 'No se han encontrado resultados'
  },
  subtitle: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div
    class="flex min-h-[calc(100vh-150px)] flex-col items-center justify-center px-6 py-10 text-center"
  >
    <img :src="props.image" class="mb-5 h-44 w-auto opacity-20 grayscale" />

    <h2 class="max-w-90 text-3xl font-extrabold leading-tight text-gray-800">
      {{ props.title }}
    </h2>

    <p class="mt-4 max-w-90 text-lg leading-relaxed text-gray-500">
      {{ props.subtitle }}
    </p>
  </div>
</template>
