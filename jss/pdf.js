function genPDF() {
  // Obtener los valores
  const nombre = document.getElementById("nombre").value;
  const turno = document.getElementById("turno").value;
  const fecha = document.getElementById("fecha").value;
  const elementos = document.querySelectorAll('[data-sufijo]');
  
  // Crear un nuevo objeto jsPDF para cada tarea
  const doc = new jsPDF();
  let yPos = 20;

  // Encabezado azul
  doc.setFillColor(31, 79, 120); // Relleno azul RGB
  doc.rect(0, 0, doc.internal.pageSize.width, 15, 'F'); // Rectángulo del encabezado

  // Texto en el encabezado
  doc.setTextColor(255, 255, 255); // Texto blanco
  doc.setFontSize(18);
  doc.text(8, 10, "Bitácora de turno");

  // Restaurar colores y estilos predeterminados
  doc.setFillColor(255, 255, 255); // Restaurar color de relleno predeterminado (blanco)
  doc.setTextColor(0, 0, 0); // Restaurar color de texto predeterminado (negro)
  doc.setFontSize(18);

  // Recorrer los elementos y obtener sus valores
  elementos.forEach(function (elemento) {
    // Reiniciar acumuladorInfo para cada elemento
    let acumuladorInfo = "";

    // Obtener el sufijo del elemento
    const sufijo = elemento.dataset.sufijo;
    // Obtener el área, el inicio, el término, la diferencia y las observaciones del elemento
    const area = document.getElementById(`area_${sufijo}`).value;
    const inicio = document.getElementById(`inicio_${sufijo}`).value;
    const termino = document.getElementById(`termino_${sufijo}`).value;
    const difTiempo = document.getElementById(`difTiempo_${sufijo}`).value;
    const observaciones = document.getElementById(`observaciones_${sufijo}`).value;
    // Determinar el valor de subárea en función del área
    let subarea;
    if (area === "Chapas") {
      subarea = document.getElementById(`subareaChapas_${sufijo}`).value;
    } else if (area === "Tableros") {
      subarea = document.getElementById(`subareaTableros_${sufijo}`).value;
    } else if (area === "Terminacion") {
      subarea = document.getElementById(`subareaTerminacion_${sufijo}`).value;
    } else {
      subarea = "";
    }

    // Acumular la información en la variable
    acumuladorInfo += `
    \n
    Nombre: ${nombre}\n
    ${turno}\n
    Fecha actual: ${fecha}\n
    Área: ${area}\n
    Equipo: ${subarea}\n
    Observaciones: \n \n ${observaciones}\n
    Hora de Inicio: ${inicio}\n
    Hora de Termino: ${termino}\n
    Diferencia de Tiempo: ${difTiempo}\n
    \n
    `;

    // Verificar si es necesario agregar una nueva página
    if (yPos + 105 > doc.internal.pageSize.height) {
      doc.addPage();
      yPos = 20;  // Restablecer la posición en la nueva página
    }

    // Agregar la información acumulada al PDF
    doc.text(8, yPos, acumuladorInfo);

    // // Obtener el archivo de la imagen que el usuario sube
    // var file = document.getElementById (`input_${sufijo}`).files [0];
    // // Crear la URL temporal de la imagen
    // var imgCodified = URL.createObjectURL (file);
    // // Agregar la imagen al PDF
    // doc.addImage (imgCodified, "JPEG", 10, 10, 50, 50); // Ajustar los parámetros según sea necesario

    
  });

  // Guardar el PDF
  doc.save("Bitácora " + nombre + " " + fecha + ".pdf");
}

























//codigo que permite crear un pdf con imagenes

// Obtener el botón por su id
// const boton = document.getElementById("generar-pdf");

// // Añadir un evento click al botón usando una función flecha
// boton.addEventListener("click", () => {
//   // Llamar a la función que genera el PDF
//   generarPDF();
// });

// // Definir la función que genera el PDF
// function generarPDF() {
//   // Crear una instancia de jsPDF
//   const pdf = new jsPDF();

//   // Usar el arreglo bases que contiene los códigos base64 de las imágenes
//   const bases = window.bases;

//   // Comprobar si el arreglo bases tiene algún elemento
//   if (bases.length > 0) {
//     // Crear una variable para contar el número de imágenes procesadas
//     let count = 0;

//     // Recorrer el arreglo bases
//     for (let i = 0; i < bases.length; i++) {
//       // Obtener el código base64 actual
//       const base64 = bases[i];

//       // Crear una imagen HTML para obtener su tamaño real
//       const img = new Image();
//       img.src = base64;

//       // Esperar a que la imagen esté cargada antes de obtener su tamaño
//       img.onload = function () {
//         // Calcular la relación de aspecto
//         const aspectRatio = img.width / img.height;

//         // Especificar el tamaño de la imagen en el documento PDF
//         const width = 180; // Puedes ajustar el ancho según tus necesidades
//         const height = width / aspectRatio;

//         // Añadir la imagen al documento PDF usando el código base64 y el tamaño calculado
//         pdf.addImage(base64, "JPEG", 10, 10 + count * (height + 10), width, height);

//         // Incrementar el contador de imágenes procesadas
//         count++;

//         // Si todas las imágenes han sido procesadas, guardar el documento PDF
//         if (count === bases.length) {
//           // Guardar el documento PDF con el nombre "imagenes.pdf"
//           pdf.save("imagenes.pdf");
//         }
//       };
//     }
//   } else {
//     // Mostrar un mensaje de error al usuario
//     alert("Por favor, selecciona al menos una imagen");
//   }
// }
