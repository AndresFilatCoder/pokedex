<script setup lang="ts">
import PokemonCard from '~/components/PokemonCard.vue'
import type { PokemonList } from '~/services/interfaces/pokemon'
import { usePokemon } from '~/services/usePokemon'

useSeoMeta({
  title: 'Inicio',
  ogTitle: 'Selecciona o Busca un Pokémon'
})

const navbarStore = useNavbarStore()

const { getPokemonList } = usePokemon()

const loading = ref(true)
const pokemonList = ref<PokemonList | null>(null)

const setPokemons = async (searchText?: string) => {
  loading.value = true
  try {
    pokemonList.value = await getPokemonList(searchText)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

watch(
  () => navbarStore.searchText,
  () => setPokemons(navbarStore.searchText)
)

onBeforeMount(() => setPokemons())
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 p-5">
    <PokemonCard
      v-for="(pokemon, index) in pokemonList?.results"
      :key="index"
      :index="index"
      :pokemon="pokemon"
    />
  </div>
</template>
