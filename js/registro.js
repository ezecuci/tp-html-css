
const radios = document.querySelectorAll('.registro__radioButton');
const labelNombre = document.querySelector('.nombre');
const inputNombre = document.getElementById('nombre');

radios.forEach(radio => {

    radio.addEventListener('change', () => {

        if(radio.value === 'personal' && radio.checked){

            labelNombre.textContent = 'Nombre y apellido';
            inputNombre.placeholder = 'Nombre y apellido';

        }else if (radio.value === 'empresa' && radio.checked) {

            labelNombre.textContent = 'Nombre de empresa';
            inputNombre.placeholder = 'Nombre de empresa';
        }
    })

} )






