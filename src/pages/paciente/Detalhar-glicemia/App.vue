<template>
    <div>
        <HeaderNavigation id="header" />
        <div id="grid">
            <SideBarNavigation class="position-sticky" />
            <div id="content">
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