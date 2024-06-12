/**
 * Global Mixin used to add two methods to all Option API based components.
 * These two methods are accessible via 'this' in components created using the options API.
 * For components relying on the composition API, the mixin can be manually loaded.
 * Note - This applies to accessing the methods during setup of Option API based
 * components as well.
 */

import html2canvas from 'html2canvas'

export const routePreviewMixin = (() => {
  return {
    methods: {
      async checkAndCapturePreview(previewName) {
          const imageDataURL = await this.captureComponentAsImage(this.$refs.componentRef)
          localStorage.setItem(previewName, imageDataURL)
      },
      async captureComponentAsImage(componentRef) {
        const canvas = await html2canvas(componentRef)
        const imageDataURL = canvas.toDataURL('image/png')
        return imageDataURL
      }
    }
  }
})()
