<template>
    <div>
        <HeaderNavigation id="header" tipo="paciente"/>
        <div id="grid">
            <SideBarNavigation class="position-sticky" tipo="paciente"/>
            <div id="content">
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
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                <tr v-for="(glicemia, index) in glicemias" :key="glicemia.id" class="cursor-pointer"
                                    >
                                    <th scope="row" class="text-center" @click="detalharGlicemia(glicemia)">{{ index + 1 }}</th>
                                    <td @click="detalharGlicemia(glicemia)">{{ glicemia.valor }} mg/dL</td>
                                    <td @click="detalharGlicemia(glicemia)">{{ formataData(glicemia.data) }}</td>
                                    <td @click="detalharGlicemia(glicemia)">{{ glicemia.horario }}</td>
                                    <td @click="detalharGlicemia(glicemia)">{{ diferencaHoras(glicemia.data, glicemia.horario,
                                    glicemia.dataRefeicao, glicemia.horarioRefeicao, glicemia) }}</td>
                                    <td @click="detalharGlicemia(glicemia)">
                                        <strong v-if="glicemia.status == 'normal'" class="text-success">{{
                                        glicemia.status
                                        }}</strong>
                                        <strong v-else-if="glicemia.status == 'hiperglicemia'" class="text-purple">{{
                                        glicemia.status }}</strong>
                                        <strong v-else class="text-danger">{{ glicemia.status }}</strong>
                                    </td>
                                    <td><img @click="confirmarExcluir(glicemia)" src="../../../assets/excluir.png" class="icons" title="deletar"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="col-sm-6 mt-2 ">
                        <h4 class="text-center">Nenhum registro encontrado</h4>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-secondary" @click="registrarNova()">Registrar nova marcação de
                                glicemia</button>
                        </div>
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
        <div class="modal " id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Excluir</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Confirmar exclusão de glicemia?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="cancelar" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" @click="excluir()">Confirmar</button>
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
import * as bootstrap from 'bootstrap';

export default {
    name: 'App',
    components: {
        HeaderNavigation,
        SideBarNavigation,
    },
    data() {
        return {
            glicemias: [],
            exibeTabela: false
        }
    },
    beforeMount() {
        this.buscarGlicemias();

    },
    methods: {
        buscarGlicemias() {
            const dadosLogin = JSON.parse(localStorage.getItem('dadosLogin'));
            const config = {
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('dadosLogin')).token}` }
            };
            axios.get(`http://localhost:8081/paciente/glicemias/${dadosLogin.id}`, config)
                .then(response => {
                    this.glicemias = response.data;
                    this.exibeTabela = (this.glicemias.length > 0)
                })
                .catch(error => console.error(error))
        },
        detalharGlicemia(glicemia) {
            localStorage.setItem('glicemia', JSON.stringify(glicemia));
            window.location.href = '/paciente/detalhar-glicemia';
        },
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
        registrarNova() {
            window.location.href = '/paciente/marcar-glicemia';
        },
        confirmarExcluir(glicemia) {
            localStorage.setItem('glicemiaSelecionada', JSON.stringify(glicemia));
            const modal = new bootstrap.Modal('#modal');
            
            modal.show();
        },
        excluir() {
            const glicemia = JSON.parse(localStorage.getItem('glicemiaSelecionada'));

            const config = {
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('dadosLogin')).token}` }
            };

            axios.delete(`http://localhost:8081/paciente/glicemias/delete/${glicemia.id}`, config)
            .then(response => {
                this.glicemias = response.data;
                this.exibeTabela = (this.glicemias.length > 0)
                this.buscarGlicemias();

                document.getElementById('cancelar').click();
                
            })
            .catch(error => {
                console.error(error);
                document.getElementById('cancelar').click();
            })

        }
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

.icons {
    width: 25px;
}
</style>