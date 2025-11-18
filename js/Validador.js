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

    esTelefonoValido(telefono) {
        const formatoTelefono = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?[\d-.\s]{6,10}$/;
        return formatoTelefono.test(telefono);
    }

    esMensajeValido(mensaje) {
        const formatoMensaje = /^[\wÀ-ÿ\s.,!?()'"-]{10,500}$/;
        return formatoMensaje.test(mensaje);
    }

    esMontoValido(monto) {
   
        const formato = /^\d+(\.\d{1,2})?$/;
        if (!formato.test(monto)) return false;

        const numero = parseFloat(monto);
        return numero >= 5 && numero <= 500;
    }
}