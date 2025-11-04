export class Validador {

    esPasswordValida(password) {

        const caracteresRequeridos = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
        
        return caracteresRequeridos.test(password);
    }

    sonIguales(string1, string2) {

        return string1 === string2;
    }

    esNombrePropioValido(nombre) {

        const requisito = /^[A-ZÁÉÍÓÚÑ]+(\s[A-ZÁÉÍÓÚÑ]+){0,5}$/;

        return requisito.test(nombre);
    }

    esUnEmailValido(email) {

        const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return formatoEmail.test(email);
    }

}