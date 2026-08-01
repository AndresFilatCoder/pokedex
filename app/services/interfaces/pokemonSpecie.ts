export interface PokemonSpecie {
  base_happiness: number
  capture_rate: number
  color: NamedAPIResource
  egg_groups: NamedAPIResource[]
  evolution_chain: APIResource
  evolves_from_species: NamedAPIResource | null
  flavor_text_entries: FlavorTextEntry[]
  form_descriptions: FormDescription[]
  forms_switchable: boolean
  gender_rate: number
  genera: Genus[]
  generation: NamedAPIResource
  growth_rate: NamedAPIResource
  habitat: NamedAPIResource | null
  has_gender_differences: boolean
  hatch_counter: number
  id: number
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  name: string
  names: Name[]
  order: number
  pal_park_encounters: PalParkEncounter[]
  pokedex_numbers: PokedexNumber[]
  shape: NamedAPIResource | null
  varieties: Variety[]
}

export interface APIResource {
  url: string
}

export interface NamedAPIResource {
  name: string
  url: string
}

export interface FlavorTextEntry {
  flavor_text: string
  language: NamedAPIResource
  version: NamedAPIResource
}

export interface FormDescription {
  description?: string
  language?: NamedAPIResource
}

export interface Genus {
  genus: string
  language: NamedAPIResource
}

export interface Name {
  language: NamedAPIResource
  name: string
}

export interface PalParkEncounter {
  area: NamedAPIResource
  base_score: number
  rate: number
}

export interface PokedexNumber {
  entry_number: number
  pokedex: NamedAPIResource
}

export interface Variety {
  is_default: boolean
  pokemon: NamedAPIResource
}
