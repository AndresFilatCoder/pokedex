import useCustomFetch from '~/composables/common/fetching/useCustomFetch'
import type { PokemonList } from './interfaces/pokemon'
import type { PokemonDetails, PokemonType } from './interfaces/pokemonDetails'

export const usePokemon = () => {
  const $api = useCustomFetch()

  const getPokemonDetails = async (name: string) => {
    const { data, error } = await $api.get<PokemonDetails>(`/pokemon/${name.toLowerCase()}`)

    if (error.value) throw error.value
    return data.value || null
  }

  const getSpecies = async (id: number) => {
    const { data, error } = await $api.get<any>(`/pokemon-species/${id}`)

    if (error.value) throw error.value
    return data.value || null
  }

  const getPokemonList = async () => {
    const { data, error } = await $api.get<PokemonList>('pokemon')

    if (error.value) throw error.value
    if (!data.value) return null

    data.value.results = await Promise.all(
      data.value.results.map(async pokemon => ({
        ...pokemon,
        details: await getPokemonDetails(pokemon.name)
      }))
    )

    return data.value
  }

  const getWeaknesses = async (types: string[]) =>
    await Promise.all(types.map(type => $api.get<any>(`/type/${type}`)))

  const getType = async (name: string) => {
    const { data, error } = await $api.get<PokemonType>(`/type/${name}`)

    if (error.value) throw error.value
    return data.value || null
  }

  return { getPokemonList, getPokemonDetails, getSpecies, getWeaknesses, getType }
}
