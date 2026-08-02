<script setup lang="ts">
import Loader from '~/components/common/Loader.vue'
import PokemonCardsContainer from '~/components/PokemonCardsContainer.vue'
import { useCustomToast } from '~/composables/common/toast/useCustomToast'
import type { PokemonList } from '~/services/interfaces/pokemon'
import { usePokemon } from '~/services/usePokemon'

const toast = useCustomToast()
const { getPokemonList } = usePokemon()

const loading = ref(true)
const pokemonList = ref<PokemonList | null>(null)

const setPokemonList = async () => {
  loading.value = true

  try {
    pokemonList.value = await getPokemonList()
  } catch {
    toast.add({
      title: 'Error',
      message: 'Failed to fetch Pokémon list'
    })
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
  <PokemonCardsContainer v-else :pokemons="pokemonList?.results || []" />
</template>
