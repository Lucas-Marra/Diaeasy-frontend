<template>
    <div>
        <HeaderNavigation id="header" />
        <div id="grid">
            <SideBarNavigation class="position-sticky" />
            <div id="content" class="d-flex justify-content-center">
                <div id="card-marcacao" class="p-3">
                    <h4 class="d-block">Marcar Medição de Glicemia</h4>
                    <div class="mb-3">
                        <label for="glicemia" class="form-label">Valor da Glicemia:</label>
                        <input type="text" class="form-control" name="glicemia" id="glicemia">
                    </div>
                    <div class="d-flex justify-content-start mb-3">
                        <div class="me-4">
                            <label for="glicemia" class="form-label">Data:</label>
                            <input type="date" class="form-control" name="glicemia" id="glicemia">
                        </div>
                        <div>
                            <label for="glicemia" class="form-label">Hora:</label>
                            <input type="time" class="form-control" name="glicemia" id="glicemia">
                        </div>
                    </div>
                    <div class="d-flex justify-content-between">
                        <button type="button"
                            class="btn w-100 btn-lg dark-blue-diaeasy">Registrar</button>
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
.height {
    height: 10000px;
}

#grid {
    display: grid;
    grid-template-columns: 50px auto;
}

#card-marcacao {
    width: 500px;
    height: min-content;
    border-radius: 5px;
    background-color: #55c6c9;
    margin: 10em 0;
}

.dark-blue-diaeasy {
    background-color: #083b66;
    color: white;
}
</style>