<template>
    <div>
        <HeaderNavigation />
        <div id="grid">
            <SideBarNavigation class="position-sticky" />
            <div id="content">
                <h2 class="ms-4 mt-5">Bem-vindo, {{ nome }}</h2>
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
</style>