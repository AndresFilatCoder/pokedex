<script setup lang="ts">
import { useCustomToast } from '~/composables/common/toast/useCustomToast'

const toast = useCustomToast()

const visible = ref(false)

onMounted(() => {
  visible.value = true

  setTimeout(() => {
    visible.value = false
    toast.data.value = null
  }, 2000)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transform transition duration-300 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transform transition duration-300 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="visible"
        class="fixed top-5 right-5 z-300 flex w-115 items-start gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-xl"
      >
        <div class="flex items-center justify-center mt-3">
          <UIcon
            :name="toast.data.value?.icon || 'i-heroicons-exclamation-circle-20-solid'"
            class="size-8"
            :class="toast.data.value?.iconColor || 'text-orange-500'"
          />
        </div>

        <div class="flex-1">
          <h3 class="text-xl font-semibold">
            {{ toast.data.value?.title || 'Success' }}
          </h3>

          <p class="mt-1 text-lg text-slate-400">
            {{ toast.data.value?.message || 'Operation successful' }}
          </p>
        </div>

        <UButton
          color="neutral"
          variant="link"
          icon="i-lucide-x"
          class="px-0 py-0 absolute right-4 cursor-pointer"
          size="lg"
          @click="visible = false"
        />
      </div>
    </Transition>
  </Teleport>
</template>
