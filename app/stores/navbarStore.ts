export const useNavbarStore = defineStore('navbarStore', () => {
  const searchText = ref('')

  const setSearchText = (value: string) => {
    searchText.value = value
  }

  return { searchText, setSearchText }
})
