<template>
    <div>
        <HeaderNavigation tipo="medico"/>
        <div id="grid">
            <SideBarNavigation class="position-sticky" tipo="medico"/>
            <div id="content">
                <h2 class="ms-4 mt-5 mb-5">Bem-vindo, {{ nome }}</h2>
                <div class="ms-4 d-flex justify-content-start">
                    <CardAcao class="me-3" acao="Cadastrar Paciente" redirect="/medico/cadastrar-paciente"/>
                    <CardAcao class="me-3" acao="Consultar Pacientes" redirect="/medico/consultar-pacientes"/>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import HeaderNavigation from "@/components/HeaderNavigation.vue";
import SideBarNavigation from "@/components/SideBarNavigation.vue";
import CardAcao from "@/components/CardAcao.vue";

export default {
    name: 'App',
    components: {
        HeaderNavigation,
        SideBarNavigation,
        CardAcao
        
    },
    data() {
        return {
            nome: null
        }
    },
    beforeMount() {
        
        this.nome = JSON.parse(localStorage.getItem('dadosLogin')).nome
        
    }
}
</script>

<style scoped>
#grid {
    display: grid;
    grid-template-columns: 50px auto;
}
</style>