<template>
    <div>
        <HeaderNavigation tipo="medico"/>
        <div id="grid">
            <SideBarNavigation class="position-sticky" tipo="medico"/>
            <div id="content">
                <h2 class="d-flex justify-content-center mt-5 mb-5"><strong>Pacientes</strong></h2>

                <div class="d-flex justify-content-around h-50 ">
                    <div v-if="exibeTabela" id="card-tabela" class="px-5 w-75">
                        <table class="table table-striped table-hover border">
                            <thead>
                                <tr>
                                    <th scope="col" class="text-center">#</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Data nascimento</th>
                                    <th scope="col">Sexo</th>
                                    <th scope="col" class="text-center">Glicemias</th>
                                    <th scope="col" class="text-center">Detalhe</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                <tr v-for="(paciente, index) in pacientes" :key="paciente.id" >
                                    <th scope="row" class="text-center">{{ index + 1 }}</th>
                                    <td >{{ paciente.nome }}</td>
                                    <td >{{ paciente.email }}</td>
                                    <td >{{ formataData(paciente.dataNascimento) }}</td>
                                    <td >{{ paciente.sexo }}</td>
                                    <td class="text-center"><strong class="link" @click="glicemias(paciente)">ver glicemias</strong></td>
                                    <td class="text-center"><strong class="link" @click="detalhe(paciente)">detalhar/alterar paciente</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="col-sm-6 mt-2 ">
                        <h4 class="text-center">Nenhum paciente encontrado</h4>
                        <div class="d-flex justify-content-center mt-3">
                            <button class="btn btn-secondary" @click="registrarNovo()">Registrar novo paciente</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import HeaderNavigation from "@/components/HeaderNavigation.vue";
import SideBarNavigation from "@/components/SideBarNavigation.vue";
import axios from "axios";

export default {
    name: 'App',
    components: {
        HeaderNavigation,
        SideBarNavigation,
        
    },
    data() {
        return {
            nome: null,
            exibeTabela: false,
            pacientes: []
        }
    },
    beforeMount() {
        this.nome = JSON.parse(localStorage.getItem('dadosLogin')).nome;
        this.buscarPacientes();
    },
    methods: {
        buscarPacientes() {
            const dadosLogin = JSON.parse(localStorage.getItem('dadosLogin'));
            const config = {
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('dadosLogin')).token}` }
            };
            axios.get(`http://localhost:8081/medico/pacientes/${dadosLogin.id}`, config)
                .then(response => {
                    this.pacientes = response.data;
                    this.exibeTabela = (this.pacientes.length > 0)
                })
                .catch(error => console.error(error))
        },
        registrarNovo() {
            window.location.href = '/medico/cadastrar-paciente';
        },
        formataData(data) {
            return data.substring(8, 10) + "/"
                + data.substring(5, 7) + "/"
                + data.substring(0, 4);
        },
        detalhe(paciente) {
            localStorage.setItem('paciente', JSON.stringify(paciente));
            window.location.href = '/medico/detalhar-paciente';
        }
    }
}
</script>

<style scoped>
#grid {
    display: grid;
    grid-template-columns: 50px auto;
}

.link {
    cursor: pointer;
    color: rgb(0, 0, 120);
    text-decoration: underline;
}
.icons {
    width: 25px;
}
</style>