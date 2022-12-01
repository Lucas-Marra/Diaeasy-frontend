<template>
    <div>
        <HeaderNavigation tipo="medico"/>
        <div id="grid">
            <SideBarNavigation class="position-sticky" tipo="medico"/>
            <div id="content">
                <h2 class="ms-4 mt-5 mb-5"><strong>Paciente observado: </strong>{{ paciente.nome }}</h2>
                <div>
                    <h2 class="d-flex justify-content-center mt-5 mb-5"><strong>Marcações Glicemias</strong></h2>

                    <div class="d-flex justify-content-around flex-wrap h-50 ">
                        <div v-if="exibeTabela" id="card-tabela" class="px-5">
                            <table class="table table-striped table-hover border">
                                <thead>
                                    <tr>
                                        <th scope="col" class="text-center">#</th>
                                        <th scope="col">Glicemia</th>
                                        <th scope="col">Data</th>
                                        <th scope="col">Horário</th>
                                        <th scope="col">Tempo de jejum</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider">
                                    <tr v-for="(glicemia, index) in glicemias" :key="glicemia.id" class="cursor-pointer"
                                        @click="detalharGlicemia(glicemia)">
                                        <th scope="row" class="text-center" >{{ index + 1 }}</th>
                                        <td >{{ glicemia.valor }} mg/dL</td>
                                        <td >{{ formataData(glicemia.data) }}</td>
                                        <td >{{ glicemia.horario }}</td>
                                        <td >{{ diferencaHoras(glicemia.data, glicemia.horario,
                                        glicemia.dataRefeicao, glicemia.horarioRefeicao, glicemia) }}</td>
                                        <td >
                                            <strong v-if="glicemia.status == 'normal'" class="text-success">{{
                                            glicemia.status
                                            }}</strong>
                                            <strong v-else-if="glicemia.status == 'hiperglicemia'" class="text-purple">{{
                                            glicemia.status }}</strong>
                                            <strong v-else class="text-danger">{{ glicemia.status }}</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-else class="col-sm-6 mt-2 ">
                            <h4 class="text-center">Nenhum registro encontrado</h4>
                        </div>
                        <div id="medidas-padrao">
                            <p class="h5 text-center"><strong>Valores Referência</strong></p>
                            <p class="h6 text-start"><strong>Jejum</strong></p>
                            <ul>
                                <li>Abaixo de 70mg/dL - <strong class="text-danger">hipoglicemia</strong></li>
                                <li>Entre 70 e 100mg/dL - <strong class="text-success">normal</strong></li>
                                <li>Acima de 100mg/dL - <strong class="text-purple">hiperglicemia</strong></li>
                            </ul>
                            <p class="h6 text-start"><strong>Até 2 horas após refeição</strong></p>
                            <ul>
                                <li>Abaixo de 70mg/dL - <strong class="text-danger">hipoglicemia</strong></li>
                                <li>Entre 70 e 140mg/dL - <strong class="text-success">normal</strong></li>
                                <li>Acima de 140mg/dL - <strong class="text-purple">hiperglicemia</strong></li>
                            </ul>
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
import axios from 'axios';

export default {
    name: 'App',
    components: {
        HeaderNavigation,
        SideBarNavigation,
        
    },
    data() {
        return {
            paciente: {},
            glicemias: [],
            exibeTabela: false
        }
    },
    beforeMount() {
        
        if (localStorage.getItem('paciente') != null) {
            this.paciente = JSON.parse(localStorage.getItem('paciente'));
            localStorage.removeItem('paciente');

            this.buscarGlicemia(this.paciente);
        } else {
            window.location.href = '/medico/home'
        }
    },
    methods: {
        diferencaHoras(data, hora, dataR, horaR, glicemia) {
            let diff = new Date(data + "T" + hora) -
                new Date(dataR + "T" + horaR);

            let mins = Math.trunc(diff / 1000 / 60);

            this.setStatus(glicemia, mins);

            return (mins < 60) ? mins + " minutos" :
                Math.trunc(mins / 60) + ":" + (mins - Math.trunc(mins / 60) * 60).toString().padStart(2, "0") + " hora(s)";
        },
        setStatus(glicemia, mins) {
            let valorGlic = glicemia.valor;
            glicemia.status = '';
            let status;
            if (valorGlic < 70) status = 'hipoglicemia';
            else if (mins > 120) {
                if (valorGlic >= 70 && valorGlic <= 100) status = 'normal';
                else status = 'hiperglicemia'
            } else {
                if (valorGlic >= 70 && valorGlic <= 140) status = 'normal';
                else status = 'hiperglicemia'
            }
            glicemia.status = status;
        },
        formataData(data) {
            return data.substring(8, 10) + "/"
                + data.substring(5, 7) + "/"
                + data.substring(0, 4);
        },
        buscarGlicemia(paciente) {
            const config = {
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('dadosLogin')).token}` }
            };
            axios.get(`http://localhost:8081/medico/pacientes/glicemias/${paciente.id}`, config)
                .then(response => {
                    this.glicemias = response.data;
                    this.exibeTabela = (this.glicemias.length > 0)
                })
                .catch(error => console.error(error))
        },
        detalharGlicemia(glicemia) {
            localStorage.setItem('glicemia', JSON.stringify(glicemia));
            localStorage.setItem('paciente', JSON.stringify(this.paciente));
            window.location.href = '/medico/detalhar-glicemia-paciente';
        },
    }
}
</script>

<style scoped>
#grid {
    display: grid;
    grid-template-columns: 50px auto;
}

#card-tabela {
    width: 1000px;
    max-height: 100%;
    overflow-y: auto;
}

#medidas-padrao {
    width: 350px;
}

.text-purple {
    color: blueviolet;
}

.cursor-pointer {
    cursor: pointer;
}

</style>