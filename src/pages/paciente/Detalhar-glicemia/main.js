import { validaPaciente } from '@/services/util';
import axios from 'axios';
import { createApp } from 'vue'
import App from './App.vue'

if(validaPaciente()) {
    const token = JSON.parse(localStorage.getItem('dadosLogin')).token;
    axios.get(`http://localhost:8081/paciente/auth/validaToken/${token}`)
        .then(() => {
            createApp(App).mount('#app');
        })
        .catch((error) => {
            console.log(JSON.parse(JSON.stringify(error)))
            window.location.href = '/login'
        })
} else window.location.href = '/login';