import type { PokemonDetails, PokemonType } from '~/services/interfaces/pokemonDetails'
import type { FlavorTextEntry, Genus, PokemonSpecie } from '~/services/interfaces/pokemonSpecie'
import { usePokemon } from '~/services/usePokemon'
import { useCustomToast } from '../common/toast/useCustomToast'

export const useHelper = () => {
  const toast = useCustomToast()
  const { getSpecies, getType } = usePokemon()

  let description = ''
  let category = ''
  let gender = {
    male: 0,
    female: 0
  }
  let weaknesses: string[] = []
  let flavor: FlavorTextEntry | undefined = undefined
  let genus: Genus | undefined = undefined

  const setSpecies = async (pokemonId: number) => {
    let species: PokemonSpecie | null = null
    try {
      species = await getSpecies(pokemonId)
    } catch {
      toast.add({
        title: 'Error',
        message: 'Failed to fetch Pokémon species'
      })
      return
    }

    if (!species) return
    loadSpecies(species)
  }

  const setWaknesses = async (types: string[]) => {
    let pokemonTypes: PokemonType[] | null = []
    pokemonTypes = (await Promise.all(
      types.map(type => {
        try {
          return getType(type)
        } catch {
          toast.add({
            title: 'Error',
            message: 'Failed to fetch Pokémon type'
          })
        }
      })
    )) as PokemonType[]
    loadWeaknesses(pokemonTypes)
  }

  const loadSpecies = (species: PokemonSpecie) => {
    flavor =
      species.flavor_text_entries.find(entry => entry.language.name === 'es') ??
      species.flavor_text_entries.find(entry => entry.language.name === 'en')

    description = flavor?.flavor_text.replace(/\f/g, ' ') ?? ''

    genus =
      species.genera.find(entry => entry.language.name === 'es') ??
      species.genera.find(entry => entry.language.name === 'en')

    category = genus?.genus ?? ''

    gender = {
      female: species.gender_rate === -1 ? 0 : species.gender_rate * 12.5,
      male: species.gender_rate === -1 ? 0 : 100 - species.gender_rate * 12.5
    }
  }

  const loadWeaknesses = (pokemonTypes: PokemonType[]) => {
    if (!pokemonTypes) return

    const damage: Record<string, number> = {}

    pokemonTypes.forEach(type => {
      type.damage_relations.double_damage_from.forEach(item => {
        damage[item.name] = (damage[item.name] ?? 0) + 1
      })

      type.damage_relations.half_damage_from.forEach(item => {
        damage[item.name] = (damage[item.name] ?? 0) - 1
      })

      type.damage_relations.no_damage_from.forEach(item => {
        damage[item.name] = -999
      })
    })

    weaknesses = Object.entries(damage)
      .filter(([_, value]) => value > 0)
      .map(([key]) => key)
  }

  const getProcessedPokemonDetails = async (pokemonDetails: PokemonDetails) => {
    await setSpecies(pokemonDetails.id)
    await setWaknesses(pokemonDetails.types.map(type => type.type.name))

    return {
      sprite: pokemonDetails.sprites.front_default,
      name: pokemonDetails.name,
      types: pokemonDetails.types.map(type => type.type.name),
      description: description,
      weight: `${(pokemonDetails.weight / 10).toFixed(1)}`,
      height: `${(pokemonDetails.height / 10).toFixed(1)}`,
      category: category,
      ability: pokemonDetails.abilities[0]?.ability.name ?? '',
      male: gender.male,
      female: gender.female,
      weaknesses: weaknesses,
      position: String(pokemonDetails.id).padStart(3, '0')
    }
  }

  return { getProcessedPokemonDetails }
}
