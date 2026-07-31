import useCustomFetch from '~/common/composables/useCustomFetch'
import type { PokemonList } from './interfaces/pokemon'
import type { PokemonDetails } from './interfaces/pokemonDetails'

export const usePokemon = () => {
  const $api = useCustomFetch()

  const getPokemonList = async (searchText?: string) => {
    const { data, error } = await $api.get<PokemonList>('pokemon')

    if (error.value) throw error.value

    data.value?.results.forEach(async pokemon => {
      pokemon.details = await getPokemonDetails(pokemon.name)
    })

    if (searchText && data.value?.results) {
      data.value.results = data.value?.results.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
      )
    }

    return data.value || null
  }

  const getPokemonDetails = async (name: string) => {
    const { data, error } = await $api.get<PokemonDetails>(`/pokemon/${name.toLowerCase()}`)
    console.log(data.value)

    if (error.value) throw error.value
    return data.value || null
  }

  return { getPokemonList, getPokemonDetails }
}
