<script setup lang="ts">
const props = defineProps({
  width: {
    type: Number,
    default: 120
  },
  text: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="display-inline-block text-center">
    <img
      class="d-block mx-auto"
      src="/gifs/pokeball.gif"
      alt="Pokeball Rotating"
      :width="props.width"
    />
    <b>{{ props.text || 'Cargando...' }}</b>
  </div>
</template>
