<template>
    <div>
        <HeaderNavigation id="header" tipo="paciente"/>
        <div id="grid">
            <SideBarNavigation class="position-sticky" tipo="paciente"/>
            <div id="content">
                <h2 class="d-flex justify-content-center mt-5 mb-3"><strong>{{verificaAlterar ? 'Alteração Glicemia' : 'Detalhe Glicemia'
                }}</strong></h2>
                <div class="d-flex justify-content-around mb-5">
                    <form>
                        <div class="row mb-3">
                            <fieldset class="col-5">
                                <label for="valor" class="form-label">Valor Glicemia</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" name="valor" id="valor"
                                        :disabled="!verificaAlterar" aria-describedby="basic-addon2" v-model="marcacao.valor" />
                                    <span class="input-group-text" id="basic-addon2">mg/dL</span>
                                </div>
                            </fieldset>
                            <fieldset class="col-4">
                                <label for="data" class="form-label">Data</label>
                                <input type="date" class="form-control" name="data" id="data" :disabled="!verificaAlterar"
                                v-model="marcacao.data" />
                            </fieldset>
                            <fieldset class="col-3">
                                <label for="hora" class="form-label">Hora</label>
                                <input type="time" class="form-control" name="hora" id="hora" :disabled="!verificaAlterar"
                                v-model="marcacao.horario" />
                            </fieldset>
                        </div>
                        <span class="form-text text-danger" v-if="erro.valor">Preencha a glicemia com um valor válido!<br></span>
                        <span v-if="erro.data" class="form-text text-danger">Selecione uma data e hora válidos!</span>
                        <fieldset class="mb-3">
                            <label for="obs" class="form-label">Observação</label>
                            <textarea name="obs" class="form-control" id="obs" rows="5" v-model="marcacao.observacao"
                                :disabled="!verificaAlterar"></textarea>
                        </fieldset>
                        <div class="row ">
                            <fieldset class="col-6">
                                <label for="dataRefeicao" class="form-label">Data última refeição</label>
                                <input type="date" class="form-control" name="dataRefeicao" id="dataRefeicao"
                                    :disabled="!verificaAlterar" v-model="marcacao.dataRefeicao" />
                            </fieldset>
                            <fieldset class="col-6">
                                <label for="horaRefeicao" class="form-label">Hora última refeição</label>
                                <input type="time" class="form-control" name="horaRefeicao" id="horaRefeicao"
                                    :disabled="!verificaAlterar" v-model="marcacao.horarioRefeicao" />
                            </fieldset>
                        </div>
                        <span v-if="erro.dataRefeicao" class="form-text text-danger" >Selecione uma data e hora válidos!<br>* Este horário deve ser anterior  ao de marcação</span>
                        <div v-if="!verificaAlterar" class="d-flex justify-content-end mt-5">
                            <button type="button" class="btn w-25 btn-warning border-0 me-2"
                                @click="voltar()">Voltar</button>
                            <button type="button" class=" btn btn-dark dark-blue-diaeasy border-0 w-25"
                                @click="alterar()">Alterar</button>
                        </div>
                        <div v-else class="d-flex justify-content-end mt-5">
                            <button type="button" class="btn w-25 btn-warning border-0 me-2"
                                @click="cancelar()">Cancelar</button>
                            <button type="button" class="btn w-25 btn-dark dark-blue-diaeasy border-0"
                                @click="confirmarAlteracao()">Confirmar</button>
                        </div>
                    </form>
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
import axios from "axios";

export default {
    name: 'App',
    components: {
        HeaderNavigation,
        SideBarNavigation,
        ConfirmationModal
    },
    data() {
        return {
            marcacaoOriginal: {},
            marcacao: {},
            verificaAlterar: false,
            erro: {
                valor: false,
                data: false,
                dataRefeicao: false,
            },
            mensagemModal: ''
        }
    },
    methods: {
        voltar() {
            window.location.href = '/paciente/consultar-glicemias';
        },
        confirmarAlteracao() {
            if (this.validaCampos()) {
                const config = {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('dadosLogin')).token}` }
                };
                axios.put(`http://localhost:8081/paciente/glicemias/alterar`, this.marcacao, config)
                    .then(() => {
                        this.mensagemModal = 'Sucesso na alteração!'
                        this.$refs.modalConfirmacao.abrirModal(true);
                        this.verificaAlterar = false;
                    })
                    .catch(() => {
                        this.mensagemModal = 'Ocorreu um erro!'
                        this.marcacao = {...this.marcacaoOriginal}
                        this.$refs.modalConfirmacao.abrirModal(false);
                    });
            }
        },
        cancelar() {
            this.verificaAlterar = false;

            this.marcacao = {...this.marcacaoOriginal}

            this.erro.data = false;
            this.erro.dataRefeicao = false;
            this.erro.valor = false;
        },
        alterar() {
            this.verificaAlterar = true;

            this.marcacaoOriginal = {...this.marcacao}
        },
        validaCampos() {
            let valido = true;

            if(this.marcacao.valor > 0 && this.marcacao.valor < 2000) {
                this.erro.valor = false;
            } else {
                this.erro.valor = true;
                valido = false;
            }
            
            if(this.marcacao.data != '' && this.marcacao.horario != '') {
                if(Date.parse(`${this.marcacao.data}T${this.marcacao.horario}`) < Date.now()) {
                    this.erro.data = false;
                } else {
                    this.erro.data = true;
                    valido = false;
                }
            } else {
                this.erro.data = true;
                valido = false;
            }

            if(this.marcacao.dataRefeicao != '' && this.marcacao.horarioRefeicao != '') {
                if(Date.parse(`${this.marcacao.dataRefeicao}T${this.marcacao.horarioRefeicao}`) <= Date.parse(`${this.marcacao.data}T${this.marcacao.horario}`)) {
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
    mounted() {
        if (localStorage.getItem('glicemia') != null) {
            this.marcacao = JSON.parse(localStorage.getItem('glicemia'));
            localStorage.removeItem('glicemia')
        } else {
            window.location.href = '/paciente/consultar-glicemia'
        }
    },
}
</script>
    
<style scoped>
#grid {
    display: grid;
    grid-template-columns: 50px auto;
}

.dark-blue-diaeasy {
    background-color: #083b66;
    color: white;
}
</style>