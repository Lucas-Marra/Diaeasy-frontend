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
        },
        'paciente/marcar-glicemia': {
            entry: './src/pages/paciente/Marcar-glicemia/main.js',
            template: 'public/index.html',
            title: 'Marcar Glicemia',
            chunks: ['chunks-vendors', 'chunk-common', 'paciente/marcar-glicemia']
        },
        'paciente/consultar-glicemia': {
            entry: './src/pages/paciente/Consultar-glicemia/main.js',
            template: 'public/index.html',
            title: 'Consultar Glicemias',
            chunks: ['chunks-vendors', 'chunk-common', 'paciente/consultar-glicemia']
        },
        'paciente/detalhar-glicemia': {
            entry: './src/pages/paciente/Detalhar-glicemia/main.js',
            template: 'public/index.html',
            title: 'Detalhar Glicemia',
            chunks: ['chunks-vendors', 'chunk-common', 'paciente/detalhar-glicemia']
        }
    }
}