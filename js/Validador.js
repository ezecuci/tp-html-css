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

    esNumeroTarjetaValido(numero) {

        const formatoTarjeta = /^(?:\d{4}\s?){4}$/;
        
        return formatoTarjeta.test(numero);
    }

    esFechaVencimientoValida(fecha) {
    
        const formatoFecha = /^(0[1-9]|1[0-2])\/\d{2}$/; 
    
        return formatoFecha.test(fecha);
    }
    
    esCodigoSeguridadValido(codigo) {
        
        const formatoCodigo = /^\d{3}$/;
        
        return formatoCodigo.test(codigo);
    }

}