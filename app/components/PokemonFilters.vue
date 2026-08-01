<script setup lang="ts">
import { ref } from 'vue'
import Modal from './common/Modal.vue'

const emit = defineEmits(['apply'])

const selectedTypes = computed(() =>
  types.value.filter(type => type.checked).map(type => type.value)
)

const navbarStore = useNavbarStore()

const isModalOpen = ref(false)
const types = ref([
  { label: 'Normal', value: 'normal', checked: false },
  { label: 'Lucha', value: 'fighting', checked: false },
  { label: 'Volador', value: 'flying', checked: false },
  { label: 'Veneno', value: 'poison', checked: false },
  { label: 'Tierra', value: 'ground', checked: false },
  { label: 'Roca', value: 'rock', checked: false },
  { label: 'Bicho', value: 'bug', checked: false },
  { label: 'Fantasma', value: 'ghost', checked: false },
  { label: 'Acero', value: 'steel', checked: false },
  { label: 'Fuego', value: 'fire', checked: false },
  { label: 'Agua', value: 'water', checked: false },
  { label: 'Planta', value: 'grass', checked: false },
  { label: 'Eléctrico', value: 'electric', checked: false },
  { label: 'Psíquico', value: 'psychic', checked: false },
  { label: 'Hielo', value: 'ice', checked: false },
  { label: 'Dragón', value: 'dragon', checked: false },
  { label: 'Siniestro', value: 'dark', checked: false },
  { label: 'Hada', value: 'fairy', checked: false },
  { label: 'Unknown', value: 'unknown', checked: false },
  { label: 'Shadow', value: 'shadow', checked: false }
])

const toggleType = (index: number) => {
  const selectedType = types.value[index]
  if (!selectedType) return
  selectedType.checked = !selectedType.checked
}

const onApply = () => {
  emit('apply', selectedTypes.value)
  isModalOpen.value = false
}

watch(
  () => navbarStore.filters.types,
  newValue => {
    if (newValue.length) return
    types.value.forEach(type => (type.checked = false))
  }
)
</script>

<template>
  <div>
    <div class="relative inline-block">
      <UButton
        icon="i-heroicons-adjustments-horizontal"
        color="neutral"
        variant="ghost"
        size="md"
        label="Filtrar"
        class="cursor-pointer"
        @click="isModalOpen = true"
      />
      <div
        v-if="navbarStore.filtersApplied"
        class="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-pokemon-blue ring-2 ring-white"
      ></div>
    </div>

    <Modal v-model="isModalOpen">
      <div class="relative w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl transition-all">
        <button
          class="text-gray-500 hover:text-gray-800 transition-colors p-1 cursor-pointer"
          @click="isModalOpen = false"
        >
          <UIcon name="i-heroicons-x-mark" class="h-6 w-6" />
        </button>

        <h2 class="text-center text-lg font-bold text-gray-900 -mt-2 mb-4">
          Filtra por tus preferencias
        </h2>

        <div class="border-b border-gray-100 pb-3">
          <button class="py-2 text-left font-semibold text-gray-900">Tipo</button>

          <div class="mt-2 space-y-3.5 px-1 max-h-60 overflow-y-auto">
            <div
              v-for="(type, index) in types"
              :key="type.value"
              class="flex items-center justify-between cursor-pointer select-none py-1 hover:bg-gray-50 px-2 rounded-lg transition-colors"
              @click="toggleType(index)"
            >
              <span class="text-sm font-medium text-gray-700">
                {{ type.label }}
              </span>

              <UCheckbox v-model="type.checked" size="md" class="pointer-events-none" />
            </div>
          </div>
        </div>

        <div class="mt-6 flex flex-col gap-3">
          <button
            class="w-full rounded-2xl bg-pokemon-green py-3 text-center font-bold text-white shadow-sm transition-all cursor-pointer bg-pokemon-blue"
            @click="onApply()"
          >
            Aplicar
          </button>

          <button
            class="w-full rounded-2xl bg-[#ededed] py-3 text-center font-bold text-gray-900 hover:bg-gray-300 transition-all cursor-pointer"
            @click="isModalOpen = false"
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>
