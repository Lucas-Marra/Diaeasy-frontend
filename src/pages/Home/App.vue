<template>
    <div>
        <HeaderNavigation />
        <SideBarNavigation />
        <div class="d-inline-block position-absolute">
            <div>
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
.height {
    height: 10000px;
}
</style>