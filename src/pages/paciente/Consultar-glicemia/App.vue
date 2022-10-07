<template>
    <div>
        <HeaderNavigation id="header" />
        <div id="grid">
            <SideBarNavigation class="position-sticky" />

            <div id="content" class="d-flex justify-content-around flex-wrap h-50 mt-5">
                <div id="card-tabela" class="ps-5">
                    <table class="table table-striped table-hover border">
                        <thead>
                            <tr>
                                <th scope="col" class="text-center">#</th>
                                <th scope="col">Glicemia</th>
                                <th scope="col">Data</th>
                                <th scope="col">Horário</th>
                                <th scope="col">Última refeição</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr class="cursor-pointer" @click="detalharGlicemia()">
                                <th scope="row" class="text-center">1</th>
                                <td>112 mg/dL</td>
                                <td>29/09/2022</td>
                                <td>14:52</td>
                                <td>13:00</td>
                                <td><strong class="text-success">Normal</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="medidas-padrao">
                    <p class="h5 text-center"><strong>Valores Referência</strong></p>
                    <ul>
                        <li>Abaixo de 70mg/dL - <strong class="text-danger">hipoglicemia</strong></li>
                        <li>Entre 70 e 100mg/dL - <strong class="text-success">normal</strong></li>
                        <li>Acima de 100mg/dL (jejum) - <strong class="text-danger">hiperglicemia</strong></li>
                        <li>Acima de 140mg/dL (até 2 horas após refeição) - <strong
                                class="text-danger">hiperglicemia</strong></li>
                    </ul>
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
            glicemia: {
                valor: 200,
                obs: 'Lorem Lucas Ipsum Marra',
                data: '2022-08-12',
                hora: '15:24',
                dataRefeicao: '2022-08-12',
                horaRefeicao: '12:00'
            }
        }
    },
    methods: {
        detalharGlicemia() {
            localStorage.setItem('glicemia', JSON.stringify(this.glicemia));
            // localStorage.removeItem('glicemia')
            window.location.href = '/paciente/detalhar-glicemia';
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
    width: 800px;
    max-height: 100%;
    overflow-y: auto;
}

#medidas-padrao {
    width: 600px;
}

.cursor-pointer {
    cursor: pointer;
}
</style>