<template>
    <header id="header" class="override">
        <div class="px-4 h-80px d-flex background align-items-center justify-content-between ">
            <img src="@/assets/logo-diaeasy-header.png" class="h-70 background" />
            <div class="background d-flex justify-content-between align-items-center">
                <!-- <p class="background pe-5 mb-0">Configurações</p>
                <p class="background pe-5 mb-0">Sair</p> -->
                <div class=" background me-5">
                    <p class="background mb-0"><strong>{{tipo.toUpperCase()}}</strong></p>
                    <p class="background mb-0">{{ nome }}</p>
                </div>
                <div class=" background me-5" v-if="tipo == 'paciente'">
                    <p class="background mb-0"><strong>MÉDICO RESPONSÁVEL</strong></p>
                    <p class="background mb-0">{{ medico }}</p>
                </div>
                <div class="background d-flex align-items-center cursor-pointer" @click="sair()">
                    <p class="background mb-0" >Sair</p>
                    <img src="@/assets/logout.png" class="w-25px"/>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent',
    props: {
      tipo: String,
    },
    data() {
        return {
            medico: null,
            nome: null
        }
    },
    beforeMount() {
        const dadosLogin = localStorage.getItem('dadosLogin');

        if (dadosLogin != null) {
            const dadosLoginObject = JSON.parse(localStorage.getItem("dadosLogin"));
            if(this.tipo == 'paciente') {
                this.medico = dadosLoginObject.medicoResponsavel;
            }

            this.nome = dadosLoginObject.nome;
        }
    },
    methods: {
        sair() {
            localStorage.removeItem('dadosLogin');
            window.location.reload()
        }
    }
}

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