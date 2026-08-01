export interface Filters {
  searchText: string
  types: string[]
}

export const useNavbarStore = defineStore('navbarStore', () => {
  const resultsCount = ref(0)
  const filters = ref<Filters>({
    searchText: '',
    types: []
  })
  const filtersApplied = ref(false)

  watch(
    () => filters.value,
    newFilters => {
      filtersApplied.value = !!newFilters.searchText || !!newFilters.types.length
    },
    { deep: true, immediate: true }
  )

  const setTypes = (value: string[]) => {
    filters.value.types = value
  }

  const setResultsCount = (value: number) => {
    resultsCount.value = value
  }

  const clearAllFilters = () => {
    filters.value = {
      searchText: '',
      types: []
    }
  }

  return {
    resultsCount,
    filters,
    filtersApplied,
    setTypes,
    clearAllFilters,
    setResultsCount
  }
})
