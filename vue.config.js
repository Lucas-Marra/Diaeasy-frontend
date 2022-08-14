// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  pages: {
    'index': {
      entry: './src/pages/Index/main.js',
      template: 'public/index.html',
      title: 'Home',
      chunks: ['chunks-vendors', 'chunk-common', 'index']
    },
    'login': {
      entry: './src/pages/Login/main.js',
      template: 'public/index.html',
      title: 'Login',
      chunks: ['chunks-vendors', 'chunk-common', 'login']
    }
  }
}