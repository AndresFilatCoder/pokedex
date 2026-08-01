export default defineNuxtPlugin(nuxtApp => {
  const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

  nuxtApp.vueApp.directive('capitalize', {
    mounted(el: HTMLElement) {
      el.textContent = capitalize(el.textContent || '')
    },
    updated(el: HTMLElement) {
      el.textContent = capitalize(el.textContent || '')
    }
  })
})
