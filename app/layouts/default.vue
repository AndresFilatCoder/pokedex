<script setup lang="ts">
import TopNavbar from '~/components/layout/TopNavbar/TopNavbar.vue'
</script>

<template>
  <div>
    <TopNavbar />
    <main class="min-h-[calc(100vh-64px)]">
      <slot />
    </main>
  </div>
</template>
