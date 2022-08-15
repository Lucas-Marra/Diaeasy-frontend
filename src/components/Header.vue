<template>
    <header>
        <div class="px-4 h-80px d-flex background align-items-center justify-content-between">
            <img src="@/assets/logo-diaeasy-header.png" class="h-70 background"/>
            <div class="background d-flex justify-content-between align-items-center">
                <div class="pe-5 background">
                    <p class="background mb-0">Lucas Marra</p>
                    <p class="background mb-0">Médico</p>
                </div>
                <p class="background mb-0">Sair</p>
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

.background {
    background-color: rgb(221, 221, 221);
}

.h-70 {
    height: 70% !important;
}

</style>