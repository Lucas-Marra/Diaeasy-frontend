<template>
    <div class="card d-flex align-items-center justify-content-center" @click="realizaAcao()">
        <h5><strong>{{acao}}</strong></h5>
    </div>
</template>

<script>


export default {
    name: 'CardAcaoComponent',
    props: {
        acao: String,
        redirect: String
    },
    methods: {
        realizaAcao() {
            window.location.href = this.redirect
        }
    }
}
</script>

<style scoped>
.card {
    cursor: pointer;
    width: 300px;
    height: 100px;
    background-color: #55c6c9;
    border: none;
    border-radius: 5px;
}
</style>