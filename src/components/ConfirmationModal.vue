<template>
    <div class="modal" id="modalConfirmacao" tabindex="-1" aria-labelledby="modalConfirmacao" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">

                <OkConfirmation :message="message" v-if="ok"/>
                <ErrorConfirmation :message="message" v-else/>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as bootstrap from 'bootstrap';
import ErrorConfirmation from './ErrorConfirmation.vue';
import OkConfirmation from './OkConfirmation.vue';

export default {
    name: 'ConfirmationModalComponent',
    components: {
        OkConfirmation,
        ErrorConfirmation
    },
    props: {
        message: String
    },
    data() {
        return {
            ok: true
        }
    },
    methods: {
        abrirModal(ok) {
            this.ok = ok;
            
            const modal = new bootstrap.Modal('#modalConfirmacao');
            
            modal.show();
        }
    }
}
</script>
