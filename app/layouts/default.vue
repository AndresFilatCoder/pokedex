<script setup lang="ts">
import Toast from '~/components/common/Toast.vue'
import TopNavbar from '~/components/layout/TopNavbar/TopNavbar.vue'
import { useCustomToast } from '~/composables/common/toast/useCustomToast'

const toast = useCustomToast()

const visible = ref(false)

watch(
  () => toast.data.value,
  newData => (visible.value = !!newData),
  { deep: true, immediate: true }
)
</script>

<template>
  <div>
    <TopNavbar />
    <Toast v-if="visible" />
    <main class="min-h-[calc(100vh-64px)]">
      <slot />
    </main>
  </div>
</template>
