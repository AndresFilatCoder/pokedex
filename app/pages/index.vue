<script setup lang="ts">
import FallbackDisplay from '~/components/common/FallbackDisplay.vue'
import Loader from '~/components/common/Loader.vue'
import PokemonCardsContainer from '~/components/PokemonCardsContainer.vue'
import type { PokemonList } from '~/services/interfaces/pokemon'
import { usePokemon } from '~/services/usePokemon'

const { getPokemonList } = usePokemon()

const loading = ref(true)
const pokemonList = ref<PokemonList | null>(null)

const setPokemonList = async () => {
  loading.value = true
  try {
    pokemonList.value = await getPokemonList()
  } catch (error) {
    console.error(error)
    return
  } finally {
    loading.value = false
  }
}

onBeforeMount(() => setPokemonList())
</script>

<template>
  <div
    v-if="loading"
    class="flex items-center justify-center"
    style="min-height: calc(100vh - 100px)"
  >
    <Loader text="Liberando Pokémones..." />
  </div>
  <PokemonCardsContainer v-else-if="pokemonList?.results?.length" :pokemons="pokemonList.results" />
  <FallbackDisplay
    v-else
    title="Sin resultados"
    subtitle="No se han encontrado resultados de acuerdo a los filtros aplicados."
  />
</template>
