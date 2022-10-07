<template>
    <div>
        <HeaderNavigation id="header" />
        <div id="grid">
            <SideBarNavigation class="position-sticky" />
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
                                    v-model="marcacao.hora" />
                            </fieldset>
                        </div>
                        <fieldset class="mb-3">
                            <label for="obs" class="form-label">Observação</label>
                            <textarea name="obs" class="form-control" id="obs" rows="5" v-model="marcacao.obs"
                                :disabled="!verificaAlterar"></textarea>
                        </fieldset>
                        <div class="row mb-5">
                            <fieldset class="col-6">
                                <label for="dataRefeicao" class="form-label">Data última refeição</label>
                                <input type="date" class="form-control" name="dataRefeicao" id="dataRefeicao"
                                    :disabled="!verificaAlterar" v-model="marcacao.dataRefeicao" />
                            </fieldset>
                            <fieldset class="col-6">
                                <label for="horaRefeicao" class="form-label">Hora última refeição</label>
                                <input type="time" class="form-control" name="horaRefeicao" id="horaRefeicao"
                                    :disabled="!verificaAlterar" v-model="marcacao.horaRefeicao" />
                            </fieldset>
                        </div>
                        <div v-if="!verificaAlterar" class="d-flex justify-content-end">
                            <button type="button" class="btn w-25 btn-warning border-0 me-2"
                                @click="voltar()">Voltar</button>
                            <button type="button" class=" btn btn-dark dark-blue-diaeasy border-0 w-25"
                                @click="this.verificaAlterar = true;">Alterar</button>
                        </div>
                        <div v-else class="d-flex justify-content-end">
                            <button type="button" class="btn w-25 btn-warning border-0 me-2"
                                @click="this.verificaAlterar = false;">Cancelar</button>
                            <button type="button" class="btn w-25 btn-dark dark-blue-diaeasy border-0"
                                @click="confirmarAlteracao()">Confirmar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderNavigation from "@/components/HeaderNavigation.vue";
import SideBarNavigation from "@/components/SideBarNavigation.vue";

export default {
    name: 'App',
    components: {
        HeaderNavigation,
        SideBarNavigation,
    },
    data() {
        return {
            marcacao: {},
            verificaAlterar: false,
        }
    },
    methods: {
        voltar() {
            window.location.href = '/paciente/consultar-glicemias';
        },
    },
    beforeMount() {
        if (localStorage.getItem('glicemia') == null) {
            console.error('deu ruim negao');
        } else {
            this.marcacao = JSON.parse(localStorage.getItem('glicemia'));
            localStorage.removeItem('glicemia')
            console.log(this.marcacao)
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