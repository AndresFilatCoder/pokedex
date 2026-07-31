<script setup lang="ts">
const navbarStore = useNavbarStore()

interface NavigationItem {
  label: string
  icon: string
  to: string
  selected: boolean
}

const searchText = ref('')
const items = ref<NavigationItem[]>([
  {
    label: 'Pokédex',
    icon: 'mdi:pokeball',
    to: '/',
    selected: true
  },
  {
    label: 'Regiones',
    icon: 'mdi:earth',
    to: '/',
    selected: false
  },
  {
    label: 'Favoritos',
    icon: 'mdi:heart',
    to: '/favorites',
    selected: false
  },
  {
    label: 'Perfil',
    icon: 'mdi:account',
    to: '/profile',
    selected: false
  }
])

const onSelectItem = (item: NavigationItem) => {
  item.selected = true
  items.value.forEach(i => (i.selected = i === item))
}
</script>

<template>
  <div class="mt-20">
    <nav class="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div class="mx-auto flex h-20 w-full items-center justify-between px-4">
        <div class="flex items-center gap-8">
          <NuxtLink
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            class="flex w-20 flex-col items-center justify-center gap-1 transition-colors"
            @click="onSelectItem(item)"
          >
            <Icon
              :name="item.icon"
              class="text-2xl"
              :class="item.selected ? 'text-blue-600' : 'text-gray-500'"
            />

            <span
              class="text-xs font-medium"
              :class="item.selected ? 'text-blue-600' : 'text-gray-700'"
            >
              {{ item.label }}
            </span>
          </NuxtLink>
        </div>

        <div class="w-80 mr-4">
          <UInput
            v-model="searchText"
            class="w-full"
            size="xl"
            icon="i-lucide-search"
            placeholder="Busca un Pokémon..."
            @keyup.enter="navbarStore.setSearchText(searchText)"
          />
          <small class="text-muted text-xs">Presiona Enter para buscar</small>
        </div>
      </div>
    </nav>
  </div>
</template>
