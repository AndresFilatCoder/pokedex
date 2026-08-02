<script setup lang="ts">
import { useDelay } from '~/composables/common/utils.ts'

const props = withDefaults(
  defineProps<{
    debounce?: number
    showClearButton?: boolean
    inputAttributes?: Record<string, any>
    noIcon?: boolean
    icon?: string
    minCharsToFilter?: number
    onlyNumber?: boolean
  }>(),
  {
    debounce: 0,
    inputAttributes: () => ({}),
    noIcon: false,
    icon: 'i-icon-search',
    minCharsToFilter: 0
  }
)

const emit = defineEmits(['search'])

const searchText = defineModel<string>({ default: '' })

const inputValue = ref('')

watch(searchText, newSearchText => {
  if (!newSearchText) {
    inputValue.value = ''
  }
  emit('search', newSearchText)
})

const onSearch = (text: string) => {
  if (text.length && text.length < props.minCharsToFilter) return
  useDelay(() => {
    searchText.value = text
  }, props.debounce)
}

const onClear = () => {
  searchText.value = ''
  inputValue.value = ''
}
</script>

<template>
  <div>
    <UInput
      v-if="props.onlyNumber"
      v-model="inputValue"
      v-only-number
      class="w-full relative"
      :icon="props.noIcon ? '' : props.icon"
      v-bind="props.inputAttributes"
      @input="onSearch($event.target.value)"
    >
      <UButton
        v-if="searchText && props.showClearButton"
        color="neutral"
        variant="link"
        icon="i-lucide-x"
        class="px-0! absolute right-2"
        @click="onClear()"
      />
    </UInput>

    <UInput
      v-else
      v-model="inputValue"
      class="w-full relative"
      :icon="props.noIcon ? '' : props.icon"
      v-bind="props.inputAttributes"
      @input="onSearch($event.target.value)"
    >
      <UButton
        v-if="searchText && props.showClearButton"
        class="cursor-pointer px-0! absolute right-2"
        color="neutral"
        variant="link"
        icon="i-lucide-x"
        @click="onClear()"
      />
    </UInput>
  </div>
</template>
