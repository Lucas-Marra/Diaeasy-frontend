<template>
    <div>
        <HeaderNavigation id="header" />
        <div id="grid">
            <SideBarNavigation class="position-sticky" />
            <div id="content">
                <div class="d-flex justify-content-around flex-wrap">
                    <div class="m-4">
                        <div class="w-500px">
                            <h3 class="text-center">Nova Marcação</h3>
                        </div>
                        <div id="card-marcacao" class="p-3">
                            <h4 class="d-block">Marcar Medição de Glicemia</h4>
                            <div class="mb-3">
                                <label for="glicemia" class="form-label">Valor da Glicemia</label>
                                <div class="input-group">
                                    <input type="number" class="form-control" name="glicemia" id="glicemia"
                                        aria-describedby="basic-addon2">
                                    <span class="input-group-text" id="basic-addon2">mg/dL</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="observacao" class="form-label">Observação</label>
                                <textarea class="form-control" name="observacao" id="observacao" rows="4"></textarea>
                            </div>
                            <div class="d-flex justify-content-start mb-3">
                                <div class="me-4">
                                    <label for="data" class="form-label">Data</label>
                                    <input type="date" class="form-control" name="data" id="data">
                                </div>
                                <div>
                                    <label for="hora" class="form-label">Hora</label>
                                    <input type="time" class="form-control" name="hora" id="hora">
                                </div>
                            </div>
                            <div class="d-flex justify-content-start mb-4">
                                <div class="me-4">
                                    <label for="dataRefeicao" class="form-label">Data última refeição</label>
                                    <input type="date" class="form-control" name="dataRefeicao" id="dataRefeicao">
                                </div>
                                <div>
                                    <label for="horaRefeicao" class="form-label">Hora da última refeição</label>
                                    <input type="time" class="form-control" name="horaRefeicao" id="horaRefeicao">
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <button  type="button" class="btn btn-dark dark-blue-diaeasy border-0 w-50 mb-2">Registrar</button>
                            </div>
                        </div>
                    </div>
                    <div id="tabela-recentes" class="m-4">
                        <div class="w-800px">
                            <h3 class="text-center">Marcações recentes</h3>
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

export default {
    name: 'App',
    components: {
        HeaderNavigation,
        SideBarNavigation,
    },
    data() {
        return {
            nome: 'Lucas'
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