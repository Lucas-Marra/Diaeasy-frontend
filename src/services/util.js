
export const validaPaciente = function() {
    const storageLogin = localStorage.getItem('dadosLogin');
    
    if(storageLogin != null) {
        const objetoLogin = JSON.parse(storageLogin);
        if(objetoLogin.tipo != 'paciente') {
            return false
        } else if(objetoLogin.token != null) {
            return true
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export const validaMedico = function() {
    const storageLogin = localStorage.getItem('dadosLogin');
    
    if(storageLogin != null) {
        const objetoLogin = JSON.parse(storageLogin);
        if(objetoLogin.tipo != 'medico') {
            return false
        } else if(objetoLogin.token != null) {
            return true
        } else {
            return false;
        }
    } else {
        return false;
    }
}