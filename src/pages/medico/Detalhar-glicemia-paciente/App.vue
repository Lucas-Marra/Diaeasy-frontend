<template>
    <div>
        <HeaderNavigation tipo="medico"/>
        <div id="grid">
            <SideBarNavigation class="position-sticky" tipo="medico"/>
            <div id="content">
                <h2 class="ms-4 mt-5 mb-5"><strong>Paciente observado: </strong>{{ paciente.nome }}</h2>
                <div>
                <h2 class="d-flex justify-content-center mt-5 mb-3"><strong>Detalhe Glicemia</strong></h2>
                <div class="d-flex justify-content-around mb-5">
                    <form>
                        <div class="row mb-3">
                            <fieldset class="col-5">
                                <label for="valor" class="form-label">Valor Glicemia</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" name="valor" id="valor"
                                        disabled aria-describedby="basic-addon2" v-model="marcacao.valor" />
                                    <span class="input-group-text" id="basic-addon2">mg/dL</span>
                                </div>
                            </fieldset>
                            <fieldset class="col-4">
                                <label for="data" class="form-label">Data</label>
                                <input type="date" class="form-control" name="data" id="data" disabled
                                v-model="marcacao.data" />
                            </fieldset>
                            <fieldset class="col-3">
                                <label for="hora" class="form-label">Hora</label>
                                <input type="time" class="form-control" name="hora" id="hora" disabled
                                v-model="marcacao.horario" />
                            </fieldset>
                        </div>
                        <fieldset class="mb-3">
                            <label for="obs" class="form-label">Observação</label>
                            <textarea name="obs" class="form-control" id="obs" rows="5" v-model="marcacao.observacao"
                                disabled></textarea>
                        </fieldset>
                        <div class="row ">
                            <fieldset class="col-6">
                                <label for="dataRefeicao" class="form-label">Data última refeição</label>
                                <input type="date" class="form-control" name="dataRefeicao" id="dataRefeicao"
                                    disabled v-model="marcacao.dataRefeicao" />
                            </fieldset>
                            <fieldset class="col-6">
                                <label for="horaRefeicao" class="form-label">Hora última refeição</label>
                                <input type="time" class="form-control" name="horaRefeicao" id="horaRefeicao"
                                    disabled v-model="marcacao.horarioRefeicao" />
                            </fieldset>
                        </div>
                        <div class="d-flex justify-content-end mt-5">
                            <button type="button" class="btn w-25 btn-warning border-0"
                                @click="voltar()">Voltar</button>
                        </div>
                    </form>
                </div>
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
            paciente: {},
            marcacao: {}
        }
    },
    beforeMount() {

        if (localStorage.getItem('glicemia') != null) {
            this.marcacao = JSON.parse(localStorage.getItem('glicemia'));
            localStorage.removeItem('glicemia');

            this.paciente = JSON.parse(localStorage.getItem('paciente'));
            localStorage.removeItem('paciente');

        } else {
            window.location.href = '/medico/home'
        }
        
    },
    methods: {
        voltar() {
            localStorage.setItem('paciente', JSON.stringify(this.paciente));
            window.location.href = '/medico/consultar-glicemias-paciente'
        }
    }
}
</script>

<style scoped>
#grid {
    display: grid;
    grid-template-columns: 50px auto;
}
</style>