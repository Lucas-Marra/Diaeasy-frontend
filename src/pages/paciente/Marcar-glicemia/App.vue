<template>
    <div>
        <HeaderNavigation id="header" tipo="paciente"/>
        <div id="grid">
            <SideBarNavigation class="position-sticky" tipo="paciente"/>
            <div id="content">
                <div class="d-flex justify-content-around flex-wrap">
                    <div class="m-4 mt-0">
                        <div class="w-500px">
                            <h2 class="text-center my-5"><strong>Nova Marcação</strong></h2>
                        </div>
                        <div id="card-marcacao" class="p-3">
                            <h4 class="d-block">Marcar Medição de Glicemia</h4>
                            <div class="mb-3">
                                <label for="glicemia" class="form-label">Valor da Glicemia</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" name="glicemia" id="glicemia"
                                        v-model="registro.valor" aria-describedby="basic-addon2">
                                    <span class="input-group-text" id="basic-addon2">mg/dL</span>
                                </div>
                                <span class="form-text text-danger" v-if="erro.valor">Preencha este campo com um valor válido!</span>
                            </div>
                            <div class="mb-3">
                                <label for="observacao" class="form-label">Observação</label>
                                <textarea class="form-control" name="observacao" id="observacao" rows="4"
                                    v-model="registro.observacao"></textarea>
                            </div>
                            <div class="d-flex justify-content-start">
                                <div class="me-4">
                                    <label for="data" class="form-label">Data</label>
                                    <input type="date" class="form-control" name="data" id="data"
                                        v-model="registro.data">
                                </div>
                                <div>
                                    <label for="hora" class="form-label">Hora</label>
                                    <input type="time" class="form-control" name="hora" id="hora"
                                        v-model="registro.horario">
                                </div>
                            </div>
                            <div class="mb-3" v-if="erro.data"><span class="form-text text-danger">Selecione uma data e hora válidos!</span></div>
                            <div v-else class="mb-3"></div>
                            <div class="d-flex justify-content-start">
                                <div class="me-4">
                                    <label for="dataRefeicao" class="form-label">Data última refeição</label>
                                    <input type="date" class="form-control" name="dataRefeicao" id="dataRefeicao"
                                        v-model="registro.dataRefeicao">
                                </div>
                                <div>
                                    <label for="horaRefeicao" class="form-label">Hora da última refeição</label>
                                    <input type="time" class="form-control" name="horaRefeicao" id="horaRefeicao"
                                        v-model="registro.horarioRefeicao">
                                </div>
                            </div>
                            <div class="mb-4" v-if="erro.dataRefeicao"><span class="form-text text-danger" >Selecione uma data e hora válidos!<br>* Este horário deve ser anterior  ao de marcação</span></div>
                            <div v-else class="mb-4"></div>
                            <div class="d-flex justify-content-center">
                                <button type="submit" class="btn btn-dark dark-blue-diaeasy border-0 w-50 mb-2"
                                    @click="registrar" id="botaoReg">Registrar</button>
                            </div>
                            <Loading class="d-none" id="loading"/>
                        </div>
                    </div>
                    <div id="tabela-recentes" class="m-4 mt-0">
                        <div class="w-800px">
                            <h2 class="text-center my-5"><strong>Marcações recentes</strong></h2>
                        </div>
                        <table class="table table-striped" v-if="glicemias.length != 0 ">
                            <thead>
                                <tr>
                                    <th scope="col"> </th>
                                    <th scope="col">Glicemia</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Horário</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                <tr v-for="(glicemia, index) in glicemias" :key="glicemia.id">
                                    <th scope="row">{{index+1}}</th>
                                    <td>{{ glicemia.valor }} mg/dL</td>
                                    <td>{{ glicemia.dia }}</td>
                                    <td>{{ glicemia.hora }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-else class="d-flex justify-content-center">
                            <p class="h5">Nenhuma glicemia recente registrada</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ConfirmationModal :message="mensagemModal" ref="modalConfirmacao"/>

    </div>
</template>

<script>
import HeaderNavigation from "@/components/HeaderNavigation.vue";
import SideBarNavigation from "@/components/SideBarNavigation.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import Loading from "@/components/Loading.vue";
import axios from 'axios';


export default {
    name: 'App',
    components: {
    HeaderNavigation,
    SideBarNavigation,
    ConfirmationModal,
    Loading
},
    data() {
        return {
            mensagemModal: '',
            registro: {
                valor: undefined,
                data: '',
                horario: '',
                dataRefeicao: '', 
                horarioRefeicao: '',
                observacao: '',
            },
            erro: {
                valor: false,
                data: false,
                dataRefeicao: false,
            },
            glicemias: []
        }
    },
    beforeMount() {
        this.buscaGlicemias()
    },
    methods: {
        buscaGlicemias() {
            const dadosLogin = JSON.parse(localStorage.getItem('dadosLogin'));
            const config = {
                headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('dadosLogin')).token}` }
            };

            axios.get(`http://localhost:8081/paciente/glicemias/recentes/${dadosLogin.id}`, config)
                .then((response) => {
                    this.glicemias = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        registrar() {
            document.getElementById('loading').classList.remove('d-none');
            document.getElementById('botaoReg').setAttribute('disabled', 'true');

            
            if (this.validaCampos()) {
                const dadosLogin = JSON.parse(localStorage.getItem('dadosLogin'));
                const config = {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('dadosLogin')).token}` }
                };
                axios.post(`http://localhost:8081/paciente/glicemias/registrar/${dadosLogin.id}`, this.registro, config)
                    .then(() => {
                        this.mensagemModal = 'Sucesso na marcação!'
                        this.$refs.modalConfirmacao.abrirModal(true);
                        this.buscaGlicemias();
                    })
                    .catch(() => {
                        this.mensagemModal = 'Ocorreu um erro!'
                        this.$refs.modalConfirmacao.abrirModal(false);
                    });
            }
                
            document.getElementById('botaoReg').removeAttribute('disabled');
            document.getElementById('loading').classList.add('d-none');
        },
        validaCampos() {
            let valido = true;

            if(this.registro.valor > 0 && this.registro.valor < 2000) {
                this.erro.valor = false;
            } else {
                this.erro.valor = true;
                valido = false;
            }
            
            if(this.registro.data != '' && this.registro.horario != '') {
                if(Date.parse(`${this.registro.data}T${this.registro.horario}`) < Date.now()) {
                    this.erro.data = false;
                } else {
                    this.erro.data = true;
                    valido = false;
                }
            } else {
                this.erro.data = true;
                valido = false;
            }

            if(this.registro.dataRefeicao != '' && this.registro.horarioRefeicao != '') {
                if(Date.parse(`${this.registro.dataRefeicao}T${this.registro.horarioRefeicao}`) <= Date.parse(`${this.registro.data}T${this.registro.horario}`)) {
                    this.erro.dataRefeicao = false;
                } else {
                    this.erro.dataRefeicao = true;
                    valido = false;
                }
            } else {
                this.erro.dataRefeicao = true;
                valido = false;
            }

            return valido;
        }
    },
}
</script>

<style scoped>
#grid {
    display: grid;
    grid-template-columns: 50px auto;
}

#card-marcacao {
    width: 500px;
    height: min-content;
    border-radius: 5px;
    background-color: #55c6c9;
}

#tabela-recentes {
    width: 800px;
    height: min-content;
}

.w-800px {
    width: 800px;
}

.w-500px {
    width: 500px;
}

.dark-blue-diaeasy {
    background-color: #083b66;
    color: white;
}


</style>