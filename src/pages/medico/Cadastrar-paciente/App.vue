<template>
    <div>
        <HeaderNavigation tipo="medico"/>
        <div id="grid">
            <SideBarNavigation class="position-sticky" tipo="medico"/>
            <div id="content">
                <h2 class="d-flex justify-content-center mt-5 mb-3"><strong>Cadastrar Paciente</strong></h2>
                <div class="d-flex justify-content-around mb-5">
                    <form class="w-50">
                        <div class="row mb-3">
                            <fieldset class="col-8">
                                <label for="nome" class="form-label">Nome do Paciente</label>
                                <input type="text" class="form-control" name="nome" id="nome" v-model="paciente.nome"/>
                                <span class="form-text text-danger" v-if="v$.paciente.nome.$error">Preencha este
                                        campo!</span>
                            </fieldset>
                            <fieldset class="col-4">
                                <label for="dataNasc" class="form-label">Data Nascimento</label>
                                <input type="date" class="form-control" name="dataNasc" id="dataNasc" v-model="paciente.dataNascimento"/>
                                <span class="form-text text-danger" v-if="erro.data">Preencha este
                                        campo!<br>*data deve ser anterior a hoje</span>
                            </fieldset>
                        </div>
                        <div class="row mb-3 justify-content-between">
                            <fieldset class="col-8">
                                <label for="documento" class="form-label">CPF</label>
                                <input type="text" class="form-control" v-model="paciente.documento" v-mask="'###.###.###-##'" name="documento" id="documento" />
                                <span class="form-text text-danger" v-if="v$.paciente.documento.$error || erro.tamDoc">Preencha este
                                        campo corretamente!</span>
                                <span class="form-text text-danger" v-if="erro.docValido">Insira um valor válido!</span>
                            </fieldset>
                            <fieldset class="col-4">
                                <label class="form-label d-block">Sexo Biológico</label>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="sexo" id="masculino" value="Masculino" v-model="paciente.sexo" checked>
                                    <label class="form-check-label" for="masculino">Masculino</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="sexo" id="feminino" v-model="paciente.sexo" value="Feminino">
                                    <label class="form-check-label" for="feminino">Feminino</label>
                                </div>
                            </fieldset>
                        </div>
                        <div class="row">
                            <fieldset class="col-6">
                                <label for="email" class="form-label">E-mail do Paciente</label>
                                <input type="text" class="form-control" name="email" id="email" v-model="paciente.email"/>
                                <span class="form-text text-danger" v-if="v$.paciente.email.$error">{{ 
                                        v$.$errors[0].$validator === 'required' ? "Preencha este campo!" : "Insira um e-mail válido!"
                                }}</span>
                            </fieldset>
                            <fieldset class="col-6">
                                <label for="senha" class="form-label">Senha</label>
                                <input type="password" class="form-control" name="senha" id="senha" v-model="paciente.senha"/>
                                <span class="form-text text-danger" v-if="v$.paciente.senha.$error">Preencha este
                                        campo!</span>
                            </fieldset>
                        </div>
                        
                        <div  class="d-flex justify-content-end mt-5">
                            <button type="button" class="btn w-25 btn-warning border-0 me-2"
                                @click="voltar()">Voltar</button>
                            <button type="button" class=" btn btn-dark dark-blue-diaeasy border-0 w-25"
                                @click="cadastrar()">Cadastrar</button>
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
                nome: '',
                dataNasc: '',
                documento: '',
                sexo: 'Masculino',
                email: '',
                senha: ''
            },
            erro: {
                tamDoc: false,
                docValido: false,
                data: false
            },
            mensagemModal: ''
        }
    },
    validations() {
        return {
            paciente: {
                email: { required, email, lazy: true },
                senha: { required },
                nome: { required },
                documento: { required }
            }
        }
    },
    beforeMount() {
        
        this.nome = JSON.parse(localStorage.getItem('dadosLogin')).nome
        
    },
    methods: {
        cadastrar() {
            if(this.validaCampos()) {
                const dadosLogin = JSON.parse(localStorage.getItem('dadosLogin'));
                const config = {
                    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('dadosLogin')).token}` }
                };
                axios.post(`http://localhost:8081/medico/pacientes/registrar/${dadosLogin.id}`, this.paciente, config)
                    .then(() => {
                        this.mensagemModal = 'Sucesso no cadastro!'
                        this.$refs.modalConfirmacao.abrirModal(true);
                        this.limpaCampos();
                    })
                    .catch(() => {
                        this.mensagemModal = 'Ocorreu um erro!'
                        this.$refs.modalConfirmacao.abrirModal(false);
                    });
            }
        },
        limpaCampos() {
            this.paciente = {
                nome: '',
                dataNascimento: '',
                documento: '',
                sexo: 'Masculino',
                email: '',
                senha: ''
            }
            this.v$.$reset();
        },
        validaCampos() {
            this.erro.docValido = false;
            this.erro.tamDoc = (this.paciente.documento.length < 14);
            this.v$.$validate();
            let valido = true;

            if(this.v$.paciente.$error) {
                valido = false;
            }

            if(this.erro.tamDoc) {
                valido = false;
            } else {
                if(!this.validaCPF(this.paciente.documento.replaceAll('.', '').replace('-', ''))) {
                    this.erro.docValido = true;
                    valido = false;
                }
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
        validaCPF(cpf) {
            if (cpf.length != 11 || 
            cpf == "00000000000" || 
            cpf == "11111111111" || 
            cpf == "22222222222" || 
            cpf == "33333333333" || 
            cpf == "44444444444" || 
            cpf == "55555555555" || 
            cpf == "66666666666" || 
            cpf == "77777777777" || 
            cpf == "88888888888" || 
            cpf == "99999999999")
                return false;		
            // Valida 1o digito	
            let add = 0;	
            for (let i=0; i < 9; i ++)		
                add += parseInt(cpf.charAt(i)) * (10 - i);	

            let rev = 11 - (add % 11);	
            if (rev == 10 || rev == 11)		
                rev = 0;	
            if (rev != parseInt(cpf.charAt(9)))		
                return false;		
            // Valida 2o digito	
            add = 0;	
            for (let i = 0; i < 10; i ++)		
                add += parseInt(cpf.charAt(i)) * (11 - i);	
            rev = 11 - (add % 11);	
            if (rev == 10 || rev == 11)	
                rev = 0;	
            if (rev != parseInt(cpf.charAt(10)))
                return false;		
            return true;   
        },
        voltar() {
            window.location.href = '/medico/home'
        }
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