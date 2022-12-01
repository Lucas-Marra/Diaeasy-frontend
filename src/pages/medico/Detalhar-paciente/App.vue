<template>
    <div>
        <HeaderNavigation tipo="medico"/>
        <div id="grid">
            <SideBarNavigation class="position-sticky" tipo="medico"/>
            <div id="content">
                <h2 class="d-flex justify-content-center mt-5 mb-3"><strong>{{verificaAlterar ? 'Alterar Paciente': 'Detalhar Paciente'}}</strong></h2>
                <div class="d-flex justify-content-around mb-5">
                    <form class="w-50">
                        <div class="row mb-3">
                            <fieldset class="col-8">
                                <label for="nome" class="form-label">Nome do Paciente</label>
                                <input type="text" class="form-control" name="nome" id="nome" :disabled="!verificaAlterar" v-model="paciente.nome"/>
                                <span class="form-text text-danger" v-if="v$.paciente.nome.$error">Preencha este
                                        campo!</span>
                            </fieldset>
                            <fieldset class="col-4">
                                <label for="dataNasc" class="form-label">Data Nascimento</label>
                                <input type="date" class="form-control" name="dataNasc" id="dataNasc" :disabled="!verificaAlterar" v-model="paciente.dataNascimento"/>
                                <span class="form-text text-danger" v-if="erro.data">Preencha este
                                        campo!<br>*data deve ser anterior a hoje</span>
                            </fieldset>
                        </div>
                        <div class="row mb-3 justify-content-between">
                            <fieldset class="col-8">
                                <label for="email" class="form-label">E-mail do Paciente</label>
                                <input type="text" class="form-control" name="email" id="email" :disabled="!verificaAlterar" v-model="paciente.email"/>
                                <span class="form-text text-danger" v-if="v$.paciente.email.$error">{{ 
                                        v$.$errors[0].$validator === 'required' ? "Preencha este campo!" : "Insira um e-mail válido!"
                                }}</span>
                            </fieldset>
                            <fieldset class="col-4">
                                <label class="form-label d-block">Sexo Biológico</label>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="sexo" id="masculino" value="Masculino" :disabled="!verificaAlterar" v-model="paciente.sexo">
                                    <label class="form-check-label" for="masculino">Masculino</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="sexo" id="feminino" v-model="paciente.sexo" :disabled="!verificaAlterar" value="Feminino">
                                    <label class="form-check-label" for="feminino">Feminino</label>
                                </div>
                            </fieldset>
                        </div>
                        
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
import useValidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { mask } from 'vue-the-mask'
import axios from "axios";

export default {
    name: 'App',
    directives: { mask },
    components: {
        HeaderNavigation,
        SideBarNavigation,
        ConfirmationModal
        
    },
    setup() {
        return { v$: useValidate() }
    },
    data() {
        return {
            paciente: {
            },
            pacienteOriginal: {
            },
            erro: {
                data: false
            },
            verificaAlterar: false,
            mensagemModal: ''
        }
    },
    validations() {
        return {
            paciente: {
                email: { required, email, lazy: true },
                nome: { required },
            }
        }
    },
    beforeMount() {
        
        this.nome = JSON.parse(localStorage.getItem('dadosLogin')).nome
        
        if (localStorage.getItem('paciente') != null) {
            this.paciente = JSON.parse(localStorage.getItem('paciente'));
            localStorage.removeItem('paciente')
        } else {
            window.location.href = '/medico/consultar-pacientes'
        }
    },
    methods: {
        confirmarAlteracao() {
            if(this.validaCampos()) {
                const dadosLogin = JSON.parse(localStorage.getItem('dadosLogin'));
                const config = {
                    headers: { Authorization: `Bearer ${dadosLogin.token}` }
                };
                axios.put(`http://localhost:8081/medico/pacientes/alterar`, this.paciente, config)
                    .then(() => {
                        this.mensagemModal = 'Sucesso na alteração!'
                        this.$refs.modalConfirmacao.abrirModal(true);
                        this.verificaAlterar = false;
                    })
                    .catch(() => {
                        this.mensagemModal = 'Ocorreu um erro!'
                        this.paciente = {...this.pacienteOriginal}
                        this.$refs.modalConfirmacao.abrirModal(false);
                    });
            }
        },
        voltar() {
            window.location.href = '/medico/consultar-pacientes';
        },
        alterar() {
            this.verificaAlterar = true;

            this.pacienteOriginal = {...this.paciente}
        },
        cancelar() {
            this.verificaAlterar = false;

            this.paciente = {...this.pacienteOriginal}

            this.validaCampos();
        },
        validaCampos() {
            this.v$.$validate();
            let valido = true;

            if(this.v$.paciente.$error) {
                valido = false;
            }

            if(!this.validaDataNasc()) {
                valido = false
            }

            return valido;

        },
        validaDataNasc() {
            if(this.paciente.dataNascimento != '') {
                if(Date.parse(`${this.paciente.dataNascimento}T00:01`) < Date.now()) {
                    this.erro.data = false;
                    return true;
                } else {
                    this.erro.data = true;
                    return false
                }
            }
            this.erro.data = true;
            return false
        },
    }
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