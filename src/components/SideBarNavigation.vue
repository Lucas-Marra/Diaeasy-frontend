<template>
    <div class="vh-100 top-0">
        <div class="d-flex flex-column align-items-center">
            <a v-for="icon in (tipo == 'paciente' ? iconesPaciente : iconesMedico)" :key="icon.src" :href="icon.href" class="pb-3 border-bottom border-white">
                <img :src="require(`@/assets/${icon.src}`)" :alt="icon.alt" :title="icon.title" class="icons mt-3">
            </a>
        </div>
    </div>
</template>

<script>

export default {
    name: 'SideBarComponent',
    props: {
        tipo: String
        
    },
    data() {
        return {
            iconesPaciente: [
                { 
                    href: '/paciente/home', 
                    src: 'home.png', 
                    alt: 'Icone de casa indicando home', 
                    title: 'Home' 
                },
                {
                    href: '/paciente/marcar-glicemia',
                    src: 'ok.png',
                    alt: 'Icone de marcação para marcar glicemia',
                    title: 'Marcar glicemia'
                },
                {
                    href: '/paciente/consultar-glicemia',
                    src: 'list.png',
                    alt: 'Ícone de lista para consultar glicemias',
                    title: 'Consultar glicemia'
                }
            ],
            iconesMedico: [
                { 
                    href: '/medico/home', 
                    src: 'home.png', 
                    alt: 'Icone de casa indicando home', 
                    title: 'Home' 
                },
                {
                    href: '/medico/cadastrar-paciente', 
                    src: 'cadastroPac.png', 
                    alt: 'Icone de pessoa com o símbolo de adição do lado indicando cadastro de paciente', 
                    title: 'Cadastro paciente'
                },
                {
                    href: '/medico/consultar-pacientes', 
                    src: 'pacientes.png', 
                    alt: 'Icone de varias pessoas indicando consulta de pacientes', 
                    title: 'Consultar pacientes'
                }
            ]
        }
    }
}
</script>

<style scoped>
* {
    background-color: #083b66;
    margin: 0;
}

.top-0 {
    top: 0;
    left: 0;
}

.w-50px {
    width: 50px;
    max-width: 50px;
}

.icons {
    width: 30px;
}
</style>