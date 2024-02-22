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

// // Obtener el botón por su id
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
//   // Usar el arreglo bases que contiene los códigos base64
//   const bases = window.bases;
//   // Comprobar si el arreglo tiene algún elemento
//   if (bases.length > 0) {
//     // Crear un arreglo para guardar las promesas
//     const promises = [];
//     // Recorrer el arreglo
//     for (const base64 of bases) {
//       // Crear una promesa para cada imagen
//       const promise = new Promise((resolve, reject) => {
//         // Crear una imagen HTML para obtener su tamaño real
//         const img = new Image();
//         img.src = base64;
//         // Esperar a que la imagen esté cargada
//         img.onload = function () {
//           // Resolver la promesa con la imagen
//           resolve(img);
//         };
//         // Manejar el caso de error
//         img.onerror = function () {
//           // Rechazar la promesa con un mensaje de error
//           reject("Error al cargar la imagen");
//         };
//       });
//       // Añadir la promesa al arreglo
//       promises.push(promise);
//     }
//     // Esperar a que todas las promesas se resuelvan
//     Promise.all(promises)
//       .then((images) => {
//         // contador para las imágenes
//         let count = 0;
//         // Recorrer el arreglo de imágenes
//         for (const img of images) {
//           // Obtener el tamaño natural de la imagen
//           const iWidth = img.naturalWidth;
//           const iHeight = img.naturalHeight;
//           // Reducir el tamaño de la imagen 
//           const width = iWidth / 42;
//           const height = iHeight / 42;
//           // Calcular la posición en el documento Dividir la página en 6 partes Usar el contador para asignar la imagen a una parte
//           let x, y;
//           switch (count % 6) {
//             case 0:
//               // izquierda superior
//               x = 10;
//               y = 10;
//               break;
//             case 1:
//               // izquierda central
//               x = 10;
//               y = pdf.internal.pageSize.getHeight() / 3 + 11;
//               break;
//             case 2:
//               // izquierda inferior
//               x = 10;
//               y = pdf.internal.pageSize.getHeight() * 2 / 3 + 11;
//               break;
//             case 3:
//               // derecha superior
//               x = pdf.internal.pageSize.getWidth() / 2 + 5;
//               y = 10;
//               break;
//             case 4:
//               // derecha central
//               x = pdf.internal.pageSize.getWidth() / 2 + 5;
//               y = pdf.internal.pageSize.getHeight() / 3 + 11;
//               break;
//             case 5:
//               // derecha inferior
//               x = pdf.internal.pageSize.getWidth() / 2 + 5;
//               y = pdf.internal.pageSize.getHeight() * 2 / 3 + 11;
//               break;
//           }
//           // Añadir la imagen al documento PDF
//           pdf.addImage(
//             img.src,
//             "JPEG",
//             x, // Colocar la imagen
//             y, // Colocar la imagen
//             width,
//             height
//           );

//           // Incrementar el contador
//           count++;
//           // Comprobar si hay más de 6 imágenes
//           if (count % 6 === 0 && count < images.length) {
//             // Crear una nueva página en el PDF
//             pdf.addPage();
//           }
//         }
//         // Guardar el documento PDF con el nombre "imagenes.pdf"
//         pdf.save("imagenes.pdf");
//       })
//       .catch((error) => {
//         // Mostrar el mensaje de error
//         alert(error);
//       });
//   } else {
//     // Mostrar un mensaje de error
//     alert("Por favor, selecciona una imagen");
//   }
// }