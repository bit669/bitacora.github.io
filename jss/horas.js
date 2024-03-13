document.addEventListener('DOMContentLoaded', function () {
    // Función para agregar un cero a números menores de 10
    function agregarCero(numero) {
        return numero < 10 ? '0' + numero : numero;
    }

    // Establece la fecha actual en el formato día/mes/año
    const fechaActual = new Date();
    const formatoFecha = agregarCero(fechaActual.getDate()) + '/' + agregarCero(fechaActual.getMonth() + 1) + '/' + fechaActual.getFullYear();
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        fechaInput.value = formatoFecha;
    }

    // Obtiene el elemento de entrada con el id 'termino'
    const terminoInput = document.getElementById('termino');
    if (terminoInput) {
        // Agrega un evento de escucha para cambios en el input 'termino'
        terminoInput.addEventListener('input', function () {
            // Obtiene los valores de inicio, término y el elemento de diferencia de tiempo
            const inicio = document.getElementById('inicio').value;
            const termino = this.value;
            const difTiempo = document.getElementById('difTiempo');
            // Reinicia el valor de difTiempo
            difTiempo.value = '';
            // Verifica si hay valores en inicio y término
            if (inicio && termino) {
                // Convierte las horas de inicio y término en objetos Date
                const inicioFecha = new Date(`2022-01-01 ${inicio}`);
                const terminoFecha = new Date(`2022-01-01 ${termino}`);
                // Comprueba si la hora de inicio es mayor o igual a la hora de término
                if (inicioFecha >= terminoFecha) {
                    alert('Por favor, ingrese una hora de término mayor a la hora de inicio.');
                    difTiempo.value = 'Error';
                    return;
                }
                // Calcula la diferencia de tiempo
                const dif = terminoFecha - inicioFecha;
                const horas = Math.floor(dif / (1000 * 60 * 60));
                const minutos = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
                difTiempo.value = agregarCero(horas) + ':' + agregarCero(minutos);
            }
        });
    }
});




// document.addEventListener('DOMContentLoaded', function () {
//     // Obtiene el elemento de entrada con el id 'termino'
//     const terminoInput = document.getElementById('termino');
//     if (terminoInput) {
//         // Agrega un evento de escucha para cambios en el input 'termino'
//         terminoInput.addEventListener('input', function () {
//             // Obtiene los valores de inicio, término y el elemento de diferencia de tiempo
//             const inicio = document.getElementById('inicio').value;
//             const termino = this.value;
//             const difTiempo = document.getElementById('difTiempo');
//             // Reinicia el valor de difTiempo
//             difTiempo.value = '';
//             // Verifica si hay valores en inicio y término
//             if (inicio && termino) {
//                 // Convierte las horas de inicio y término en objetos Date
//                 const inicioFecha = new Date(`2022-01-01 ${inicio}`);
//                 const terminoFecha = new Date(`2022-01-01 ${termino}`);
//                 // Comprueba si la hora de inicio es mayor o igual a la hora de término
//                 if (inicioFecha >= terminoFecha) {
//                     alert('Por favor, ingrese una hora de término mayor a la hora de inicio.');
//                     difTiempo.value = 'Error';
//                     return;
//                 }
//                 // Calcula la diferencia de tiempo
//                 const dif = terminoFecha - inicioFecha;
//                 const horas = Math.floor(dif / (1000 * 60 * 60));
//                 const minutos = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
//                 difTiempo.value = agregarCero(horas) + ':' + agregarCero(minutos);
//             }
//         });
//     }
//     // Obtén la fecha actual y sus formatos
//     const fechaActual = new Date();
//     const formatoFecha = `${fechaActual.getFullYear()}-${agregarCero(fechaActual.getMonth() + 1)}-${agregarCero(fechaActual.getDate())}`;
//     const formatoHora = `${agregarCero(fechaActual.getHours())}:${agregarCero(fechaActual.getMinutes())}`;
//     // Obtén los elementos de entrada de fecha e inicio    
//     const fechaInput = document.getElementById('fecha');
//     const inicioInput = document.getElementById('inicio');
//     // Establece los valores predeterminados de fecha e inicio
//     fechaInput ? fechaInput.value = formatoFecha : null;
//     inicioInput ? inicioInput.value = formatoHora : null;
//     // Calcular la diferencia entre inicio y término
//     function calcularDiferenciaTiempo(sufijo) {
//         let inicioInput = document.getElementById(`inicio_${sufijo}`);
//         let terminoInput = document.getElementById(`termino_${sufijo}`);
//         let difTiempoInput = document.getElementById(`difTiempo_${sufijo}`);
//         if (inicioInput && terminoInput && difTiempoInput) {
//             let inicio = inicioInput.value;
//             let termino = terminoInput.value;
//             difTiempoInput.value = '';
//             if (inicio && termino) {
//                 let inicioFecha = new Date(`2022-01-01 ${inicio}`);
//                 let terminoFecha = new Date(`2022-01-01 ${termino}`);
//                 if (inicioFecha >= terminoFecha) {
//                     alert('Por favor, ingrese una hora de término mayor a la hora de inicio.');
//                     difTiempoInput.value = 'Error';
//                     return;
//                 }
//                 let dif = terminoFecha - inicioFecha;
//                 let horas = Math.floor(dif / (1000 * 60 * 60));
//                 let minutos = Math.floor((dif % (1000 * 60 * 60)) / (1000 * 60));
//                 difTiempoInput.value = agregarCero(horas) + ':' + agregarCero(minutos);
//             }
//         }
//     }
// // Exportar la función
// window.calcularDiferenciaTiempo = calcularDiferenciaTiempo;
//         // Función para agregar un cero
//         function agregarCero(numero) {
//             return numero < 10 ? '0' + numero : numero;
//         }
// })