export default defineNuxtPlugin(() => {
  const navbarStore = useNavbarStore()

  const router = useRouter()

  router.afterEach(() => navbarStore.clearAllFilters())
})
