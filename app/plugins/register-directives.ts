import vCapitalize from './v-capitalize'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('capitalize', vCapitalize)
})
