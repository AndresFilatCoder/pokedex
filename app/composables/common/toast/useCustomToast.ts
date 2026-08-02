export interface Params {
  icon?: string
  title?: string
  message?: string
  iconColor?: string
}

const data = ref<Params | null>(null)

export const useCustomToast = () => {
  const add = (params: Params) => (data.value = params)

  return {
    add,
    data
  }
}
