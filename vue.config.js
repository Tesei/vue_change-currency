const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {  
  // Подключение общих стилей для всех компонентов:
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/index.scss";`
      }
    }
  }
}