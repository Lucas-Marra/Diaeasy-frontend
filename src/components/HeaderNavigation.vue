<template>
    <header id="header" class="override">
        <div class="px-4 h-80px d-flex background align-items-center justify-content-between ">
            <img src="@/assets/logo-diaeasy-header.png" class="h-70 background" />
            <div class="background d-flex justify-content-between align-items-center">
                <!-- <p class="background pe-5 mb-0">Configurações</p>
                <p class="background pe-5 mb-0">Sair</p> -->
                <div class=" background">
                    <p class="background mb-0">Lucas Marra</p>
                    <p class="background mb-0"><strong>Paciente</strong></p>
                </div>
                <div class="ms-5 background d-flex align-items-center cursor-pointer">
                    <p class="background mb-0" @click="sair()">Sair</p>
                    <img src="@/assets/logout.png" class="w-25px"/>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent'
}
//   props: {
//     page: String,
//     link: ''
//   }
// }
</script>

<style scoped>
.h-80px {
    height: 80px;
}

.cursor-pointer {
    cursor: pointer;
}

.w-25px {
    width: 25px;
}

.override {
    z-index: -1;
}

.background {
    background-color: rgb(221, 221, 221);
}

.h-70 {
    height: 70% !important;
}

</style>