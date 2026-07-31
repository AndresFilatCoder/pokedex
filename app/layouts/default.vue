<script setup lang="ts">
import TopNavbar from '~/components/layout/TopNavbar.vue'
</script>

<template>
  <div>
    <TopNavbar />
    <main>
      <slot />
    </main>
  </div>
</template>
