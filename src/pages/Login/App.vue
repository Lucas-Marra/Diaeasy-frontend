<template>
    <div class="container-fluid vh-100" id="content">
        <div class="row h-100">
            <div class="col-sm-6 d-flex justify-content-center align-items-center px-0">
                <div
                    class="w-100 bold py-5 d-flex align-items-center justify-content-center border-end border-secondary">
                    <img src="../../assets/logo-diaeasy.png">
                </div>
            </div>
            <div class="col-sm-6 d-flex flex-column justify-content-center align-items-center">
                <form class="w-400px">
                    <nav class="d-flex justify-content-center">
                        <div class="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab"
                                v-on:click="limpaCampos" data-bs-target="#nav-home" type="button" role="tab"
                                aria-controls="nav-home" aria-selected="true">Paciente</button>
                            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" v-on:click="limpaCampos"
                                data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile"
                                aria-selected="false">Médico</button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane mb-4 fade show active" id="nav-home" role="tabpanel"
                            aria-labelledby="nav-home-tab">
                            <fieldset class="mb-3">
                                <label for="login" class="d-block h5 mb-2 form-label">Usuário</label>
                                <input name="login" v-model="email" class="form-control" id="login" type="text">
                                <span class="form-text text-danger" v-if="v$.email.$error">{{ 
                                        v$.$errors[0].$validator === 'required' ? "Preencha este campo!" : "Insira um e-mail válido!"
                                }}</span>
                            </fieldset>

                            <fieldset>
                                <label for="senha" class="d-block h5 form-label">Senha</label>
                                <input name="senha" id="senha" v-model="senha" class="form-control" type="password">
                                <div class="d-flex justify-content-between">
                                    <span class="form-text text-danger" v-if="v$.senha.$error">Preencha este
                                        campo!</span>
                                    <!-- <a class="form-text" href="">Esqueci minha senha!</a> -->
                                </div>
                            </fieldset>
                        </div>
                        <div class="tab-pane mb-4 fade" id="nav-profile" role="tabpanel"
                            aria-labelledby="nav-profile-tab">
                            <div class="mb-3">
                                <label for="login" class="d-block h5 mb-2 form-label">CRM</label>
                                <input name="login" v-model="email" class="form-control" id="login" type="text">
                                <span class="form-text text-danger" v-if="v$.email.$error">Preencha este campo!</span>
                            </div>

                            <div>
                                <label for="senha" class="d-block h5 form-label">Senha</label>
                                <input name="senha" id="senha" v-model="senha" class="form-control" type="password">
                                <div class="d-flex justify-content-between">
                                    <span class="form-text text-danger" v-if="v$.senha.$error">Preencha este
                                        campo!</span>
                                    <!-- <a class="form-text" href="">Esqueci minha senha!</a> -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <!-- <button type="button"
                            class="btn w-45 btn-lg btn-secondary">Cadastrar</button> -->
                        <button type="button" class="btn w-100 btn-lg btn-primary" v-on:click="logar">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
    setup() {
        return { v$: useValidate() }
    },
    data() {
        return {
            email: '',
            senha: ''
        }
    },
    validations() {
        return {
            email: { required, email, lazy: true },
            senha: { required }
        }
    },
    methods: {
        logar() {
            this.v$.$validate();
        },
        limpaCampos() {
            this.v$.$reset();
            this.email = '';
            this.senha = '';
        }
    },
}
</script>

<style scoped>
#content {
    background-color: #ebebeb;
}

.w-45 {
    width: 45% !important;
}

.w-400px {
    width: 400px
}
</style>