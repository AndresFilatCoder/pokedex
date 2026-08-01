<script setup lang="ts">
import FallbackDisplay from '~/components/common/FallbackDisplay.vue'
import Loader from '~/components/common/Loader.vue'
import PokemonCardsContainer from '~/components/PokemonCardsContainer.vue'
import type { PokemonList } from '~/services/interfaces/pokemon'
import { usePokemon } from '~/services/usePokemon'

const navbarStore = useNavbarStore()
const favoritesStore = useFavoritesStore()

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

/* const filterPokemons = (filters: Filters) => {
  if (!pokemonList.value) return

  if (filters.searchText.length) {
    pokemonList.value.results = pokemonList.value.results.filter(pokemon =>
      pokemon.name.toLowerCase().includes(filters.searchText.toLowerCase())
    )
  }

  if (filters.types.length) {
    pokemonList.value.results = pokemonList.value.results.filter(pokemon =>
      filters.types.every(type => pokemon.details?.types.some(t => t.type.name === type))
    )
  }

  navbarStore.resultsCount = pokemonList.value.results.length
} */

/* const setIsFavorite = () => {
  pokemonList.value?.results.forEach(pokemon => {
    pokemon.isFavorite = favoritesStore.favoritePokemons.some(
      favorite => favorite.name === pokemon.name
    )
  })
} */

/* watch(
  () => navbarStore.filters,
  async () => {
    await setPokemonList()
    filterPokemons(navbarStore.filters)
    setIsFavorite()
  },
  { deep: true, immediate: true }
) */

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
