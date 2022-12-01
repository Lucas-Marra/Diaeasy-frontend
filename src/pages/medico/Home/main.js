import { validaMedico } from '@/services/util';
import axios from 'axios';
import { createApp } from 'vue'
import App from './App.vue'

if(validaMedico()) {
    const token = JSON.parse(localStorage.getItem('dadosLogin')).token;
    axios.get(`http://localhost:8081/medico/auth/validaToken/${token}`)
        .then((response) => {
            console.log(response)
            createApp(App).mount('#app');
        })
        .catch((error) => {
            console.log(JSON.parse(JSON.stringify(error)))
            window.location.href = '/login'
        })
}else window.location.href = '/login';