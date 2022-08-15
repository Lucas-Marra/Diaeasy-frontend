// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  pages: {
    'login': {
      entry: './src/pages/Login/main.js',
      template: 'public/index.html',
      title: 'Login',
      chunks: ['chunks-vendors', 'chunk-common', 'login']
    },
    'home': {
      entry: './src/pages/Home/main.js',
      template: 'public/index.html',
      title: 'Home',
      chunks: ['chunks-vendors', 'chunk-common', 'home']
    }
  }
}