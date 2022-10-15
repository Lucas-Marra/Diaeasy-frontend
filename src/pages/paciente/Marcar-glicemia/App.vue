<template>
    <div>
        <HeaderNavigation id="header" />
        <div id="grid">
            <SideBarNavigation class="position-sticky" />
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
                            </div>
                            <div class="mb-3">
                                <label for="observacao" class="form-label">Observação</label>
                                <textarea class="form-control" name="observacao" id="observacao" rows="4"
                                    v-model="registro.observacao"></textarea>
                            </div>
                            <div class="d-flex justify-content-start mb-3">
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
                            <div class="d-flex justify-content-start mb-4">
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
                            <div class="d-flex justify-content-center">
                                <button type="button" class="btn btn-dark dark-blue-diaeasy border-0 w-50 mb-2"
                                    @click="registrar">Registrar</button>
                            </div>
                        </div>
                    </div>
                    <div id="tabela-recentes" class="m-4 mt-0">
                        <div class="w-800px">
                            <h2 class="text-center my-5"><strong>Marcações recentes</strong></h2>
                        </div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col"> </th>
                                    <th scope="col">Glicemia</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Horário</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">
                                <tr>
                                    <th scope="row">1</th>
                                    <td>112 mg/dL</td>
                                    <td>29/09/2022</td>
                                    <td>14:52</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>118 mg/dL</td>
                                    <td>28/09/2022</td>
                                    <td>13:04</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>115 mg/dL</td>
                                    <td>27/09/2022</td>
                                    <td>09:30</td>
                                </tr>
                            </tbody>
                        </table>
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
            nome: 'Lucas',
            registro: {},
            putTeste: {
                "id": 1,
                "valor": 10,
                "data": "2022-03-21",
                "horario": "15:34",
                "dataRefeicao": "2022-03-21",
                "horarioRefeicao": "12:11",
                "observacao": "Só um teste de observação"
            }
        }
    },
    methods: {
        registrar() {
            console.log(this.registro)
            axios.post(`http://localhost:8081/paciente/glicemias/registrar/1`, this.registro) //http://localhost:8081/paciente/glicemias/registrar/1
                .then(response => {
                    console.log('criado', response);
                })
                .catch(e => {
                    console.error(e);
                })
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