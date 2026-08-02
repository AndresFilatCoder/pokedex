<script setup lang="ts">
import FallbackDisplay from '~/components/common/FallbackDisplay.vue'
import Loader from '~/components/common/Loader.vue'
import { usePlayAudio, useClipboard } from '~/composables/common/utils'
import type { PokemonDetails } from '~/services/interfaces/pokemonDetails'
import { usePokemon } from '~/services/usePokemon'
import { useHelper } from '~/composables/pokemon/useHelper'
import type { ProcessedPokemonDetails } from '~/composables/pokemon/interfaces/processedPokemonDetails'
import { useCustomToast } from '~/composables/common/toast/useCustomToast'

const route = useRoute()
const toast = useCustomToast()

const { getPokemonDetails } = usePokemon()
const { getProcessedPokemonDetails } = useHelper()

const pokemonName = route.params.pokemonName

const pokemonDetails = ref<PokemonDetails | null>(null)
const processedPokemonDetails = ref<ProcessedPokemonDetails | null>(null)

const copied = ref(false)

const loading = ref(true)

const setPokemonDetails = async () => {
  loading.value = true

  try {
    pokemonDetails.value = await getPokemonDetails(pokemonName as string)
  } catch {
    toast.add({
      title: 'Error',
      message: 'Failed to fetch Pokémon details'
    })
    return
  }

  if (!pokemonDetails.value) return

  processedPokemonDetails.value = await getProcessedPokemonDetails(pokemonDetails.value)

  usePlayAudio(pokemonDetails.value?.cries?.latest || '')

  loading.value = false
}

const copyInClipboard = async (processedPokemonDetails: ProcessedPokemonDetails) => {
  copied.value = true
  const text = `${processedPokemonDetails.name}:${Object.values(processedPokemonDetails).join(',')}`
  await useClipboard(text)
  setTimeout(() => (copied.value = false), 1500)
}

onBeforeMount(setPokemonDetails)
</script>

<template>
  <div class="mt-30 mb-10">
    <div v-if="loading" class="flex items-center justify-center min-h-[calc(100vh - 100px)]">
      <Loader text="Liberando Pokémon..." />
    </div>

    <div
      v-else-if="processedPokemonDetails"
      class="max-w-md mx-auto bg-white border border-gray-200 rounded-2xl shadow-md p-5 text-gray-800"
    >
      <div
        class="relative w-full h-64 rounded-2xl bg-pokemon-dark-green overflow-hidden flex items-center justify-center mb-6"
      >
        <div class="relative flex items-center justify-center h-48 w-48 rounded-full bg-white/20">
          <img
            :src="processedPokemonDetails.sprite"
            :alt="processedPokemonDetails.name"
            class="object-contain h-40 w-40 z-10"
          />
        </div>

        <button
          class="absolute top-0 right-0 flex items-center bg-pokemon-gray m-3 p-2 rounded-full cursor-pointer transition-all duration-200"
          @click="!copied && copyInClipboard(processedPokemonDetails)"
        >
          <span
            class="mr-2"
            :class="['transition-colors duration-200', copied ? 'text-green-500' : '']"
          >
            {{ copied ? '¡Copiado en el portapapeles!' : 'Compartir' }}
          </span>

          <UIcon
            :name="copied ? 'lucide:check' : 'lucide:copy'"
            :class="['h-6 w-6 transition-colors duration-200', copied ? 'text-green-500' : '']"
          />
        </button>

        <div
          class="absolute -left-10 top-1/2 h-10 w-96 -translate-y-1/2 -rotate-45 bg-white/15 pointer-events-none"
        ></div>
      </div>

      <div class="mb-4">
        <h1 class="text-3xl font-extrabold capitalize text-gray-900">
          {{ processedPokemonDetails.name }}
        </h1>
        <span class="text-sm font-semibold tracking-wide text-gray-500">
          N°{{ processedPokemonDetails.position }}
        </span>
      </div>

      <div class="flex flex-wrap gap-2">
        <div
          v-for="type in processedPokemonDetails.types"
          :key="type"
          class="inline-flex items-center gap-1.5 rounded-full bg-pokemon-lime px-3 py-1 text-xs font-semibold text-white shadow-sm"
        >
          <span class="capitalize">
            {{ type }}
          </span>
        </div>
      </div>

      <p class="mt-5 text-sm leading-relaxed text-gray-600">
        {{ processedPokemonDetails.description }}
      </p>

      <hr class="my-6 border-gray-100" />

      <div class="grid grid-cols-2 gap-3">
        <div class="rounded-2xl border border-gray-100 bg-pokemon-gray p-3 shadow-sm">
          <div
            class="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500"
          >
            <UIcon name="i-heroicons-shopping-bag" class="h-4 w-4" />
            <span>Peso</span>
          </div>
          <p class="mt-2 text-center text-lg font-extrabold text-gray-900">
            {{ processedPokemonDetails.weight }} kg
          </p>
        </div>

        <div class="rounded-2xl border border-gray-100 bg-pokemon-gray p-3 shadow-sm">
          <div
            class="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500"
          >
            <UIcon name="i-heroicons-arrows-up-down" class="h-4 w-4" />
            <span>Altura</span>
          </div>
          <p class="mt-2 text-center text-lg font-extrabold text-gray-900">
            {{ processedPokemonDetails.height }} m
          </p>
        </div>

        <div class="rounded-2xl border border-gray-100 bg-pokemon-gray p-3 shadow-sm">
          <div
            class="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500"
          >
            <UIcon name="i-heroicons-squares-2x2" class="h-4 w-4" />
            <span>Categoría</span>
          </div>
          <p class="mt-2 text-center text-base font-extrabold uppercase text-gray-900 truncate">
            {{ processedPokemonDetails.category }}
          </p>
        </div>

        <div class="rounded-2xl border border-gray-100 bg-pokemon-gray p-3 shadow-sm">
          <div
            class="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-500"
          >
            <UIcon name="i-heroicons-adjustments-horizontal" class="h-4 w-4" />
            <span>Habilidad</span>
          </div>
          <p class="mt-2 text-center text-base font-extrabold capitalize text-gray-900 truncate">
            {{ processedPokemonDetails.ability }}
          </p>
        </div>
      </div>

      <div class="mt-6">
        <p class="mb-3 text-center text-xs font-bold uppercase tracking-widest text-gray-500">
          Género
        </p>

        <div class="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div class="flex h-full">
            <div
              class="bg-pokemon-blue transition-all duration-300"
              :style="{ width: `${processedPokemonDetails.male}%` }"
            />
            <div
              class="bg-pokemon-pink transition-all duration-300"
              :style="{ width: `${processedPokemonDetails.female}%` }"
            />
          </div>
        </div>

        <div class="mt-2 flex justify-between text-xs font-semibold text-gray-600">
          <div class="flex items-center gap-1">
            <span>♂</span>
            <span>{{ processedPokemonDetails.male }}%</span>
          </div>
          <div class="flex items-center gap-1">
            <span>♀</span>
            <span>{{ processedPokemonDetails.female }}%</span>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <h2 class="mb-3 text-lg font-bold text-gray-900">Debilidades</h2>

        <div class="flex flex-wrap gap-2">
          <div
            v-for="weakness in processedPokemonDetails.weaknesses"
            :key="weakness"
            class="inline-flex items-center gap-1.5 rounded-full bg-pokemon-lime px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm"
          >
            <span class="capitalize">
              {{ weakness }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <FallbackDisplay v-else title="No se han encontrado detalles de este Pokémon" />
  </div>
</template>
