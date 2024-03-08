// function genPDF() {
//   // Obtener los valores
//   const nombre = document.getElementById("nombre").value;
//   const turno = document.getElementById("turno").value;
//   const fecha = document.getElementById("fecha").value;
//   const elementos = document.querySelectorAll('[data-sufijo]');

//   // Nuevo objeto jsPDF
//   const pdf = new jsPDF();
//   let yPos = 20;

//   // Variables para comparar con los valores anteriores
//   let prevNombre = null, prevTurno = null, prevFecha = null;

//   // Configurar estilo de encabezado
//   pdf.setFillColor(31, 79, 120); // Relleno azul
//   pdf.rect(0, 0, pdf.internal.pageSize.width, 15, 'F');
//   pdf.setTextColor(255, 255, 255);
//   pdf.setFontSize(18);
//   pdf.text(8, 10, "Bitácora de turno");

//   // Configurar estilo de contenido
//   pdf.setFillColor(255, 255, 255); // Blanco
//   pdf.setTextColor(0, 0, 0); // Negro
//   pdf.setFontSize(18);

//   // Recorrer elementos y obtener valores
//   elementos.forEach(function (elemento, index) {
//     // Reiniciar acumuladorInfo
//     let acumuladorInfo = "";

//     // Obtener el sufijo y valores
//     const sufijo = elemento.dataset.sufijo;
//     const area = document.getElementById(`area_${sufijo}`).value;
//     const inicio = document.getElementById(`inicio_${sufijo}`).value;
//     const termino = document.getElementById(`termino_${sufijo}`).value;
//     const difTiempo = document.getElementById(`difTiempo_${sufijo}`).value;
//     const observaciones = document.getElementById(`observaciones_${sufijo}`).value;

//     // Valor de subárea
//     let subarea;
//     if (area === "Chapas") {
//       subarea = document.getElementById(`subareaChapas_${sufijo}`).value;
//     } else if (area === "Tableros") {
//       subarea = document.getElementById(`subareaTableros_${sufijo}`).value;
//     } else if (area === "Terminacion") {
//       subarea = document.getElementById(`subareaTerminacion_${sufijo}`).value;
//     } else {
//       subarea = "";
//     }

//     // Construir una cadena con los valores actuales
//     const currentValues = `${nombre}${turno}${fecha}${area}${subarea}${observaciones}${inicio}${termino}${difTiempo}`;

//     // Comparar con los valores anteriores
//     if (
//       currentValues !== prevNombre ||
//       currentValues !== prevTurno ||
//       currentValues !== prevFecha
//     ) {
//       // Añadir nueva página solo si los valores son diferentes
//       if (index > 0) {
//         pdf.addPage();
//         yPos = 20;
//       }
//     }

//     // Dividir las observaciones en líneas
//     const lines = observaciones.split('\n');

//     // Acumular información
//     acumuladorInfo += `\nNombre: ${nombre}\n \n${turno}\n \nFecha actual: ${fecha}\n \nÁrea: ${area}\n \nEquipo: ${subarea}\n \n`;

//     // Añadir líneas de observaciones
//     acumuladorInfo += `Observaciones: ${observaciones}\n \n`;

//     // Añadir el resto de la información
//     acumuladorInfo += `Hora de Inicio: ${inicio}\n \nHora de Termino: ${termino}\n \nDiferencia de Tiempo: ${difTiempo}\n \n`;

//     // Agregar la información
//     pdf.text(8, yPos, acumuladorInfo);



//     // Actualizar los valores anteriores
//     prevNombre = currentValues;
//     prevTurno = currentValues;
//     prevFecha = currentValues;
//   });

//   // Usar el arreglo bases
//   const bases = window.bases;

//   // Comprobar si hay elementos
//   if (bases.length > 0) {
//     // Guardar las promesas
//     const promises = [];

//     // Recorrer el arreglo de bases
//     for (const base64 of bases) {
//       // Crear una promesa para cada imagen
//       const promise = new Promise((resolve, reject) => {
//         // Obtener el tamaño de la imagen
//         const img = new Image();
//         img.src = base64;

//         // Esperar a que la imagen esté cargada
//         img.onload = function () {
//           // Resolver la promesa con la imagen
//           resolve(img);
//         };

//         // Manejar el caso de error
//         img.onerror = function () {
//           reject("Error al cargar la imagen");
//         };
//       });

//       // Añadir la promesa al arreglo
//       promises.push(promise);
//     }

//     // Esperar a que todas las promesas se resuelvan
//     Promise.all(promises)
//       .then((images) => {
//         // Variable para indicar si es la primera imagen
//         let first = true;

//         // Recorrer el arreglo de imágenes
//         for (const img of images) {
//           // Obtener tamaño de la imagen
//           const iWidth = img.naturalWidth;
//           const iHeight = img.naturalHeight;

          // // Reducir tamaño de la imagen
          // const width = iWidth / 5;
          // const height = iHeight / 5;

          // // Calcular coordenadas
          // const x = (pdf.internal.pageSize.width - width) / 2;
          // const y = (pdf.internal.pageSize.height - height) / 2;

//           // Si es la primera imagen, añadir una página
//           if (first) {
//             pdf.addPage();
//           }

//           // Añadir la imagen con las coordenadas
//           pdf.addImage(img.src, "JPEG", x, y, width, height);

//           // Cambiar el valor de 'first'
//           first = false;
//         }

//         // Guardar el PDF
//         pdf.save("Bitácora " + nombre + " " + fecha + ".pdf");
//       })
//       .catch((error) => {
//         alert(error);
//       });
//   } else {
//     pdf.save("Bitácora " + nombre + " " + fecha + ".pdf");
//   }
// }

























function genPDF() {
  let prevNombre = null;
  let prevTurno = null;
  let prevFecha = null;

  const nombre = document.getElementById("nombre").value;
  const turno = document.getElementById("turno").value;
  const fecha = document.getElementById("fecha").value;
  const elementos = document.querySelectorAll('[data-sufijo]');
  const pdf = new jsPDF();

  let yPosTexto = 20;
  let yPosImagenes = 20;

  // Configurar estilo de encabezado
  pdf.setFillColor(31, 79, 120); // Relleno azul
  pdf.rect(0, 0, pdf.internal.pageSize.width, 15, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.text(8, 10, "Bitácora de turno");

  // Configurar estilo de contenido
  pdf.setFillColor(255, 255, 255); // Blanco
  pdf.setTextColor(0, 0, 0); // Negro
  pdf.setFontSize(18);

  elementos.forEach(function (elemento, index) {
    let acumuladorInfo = "";
    const sufijo = elemento.dataset.sufijo;
    const area = document.getElementById(`area_${sufijo}`).value;
    const inicio = document.getElementById(`inicio_${sufijo}`).value;
    const termino = document.getElementById(`termino_${sufijo}`).value;
    const difTiempo = document.getElementById(`difTiempo_${sufijo}`).value;
    const observaciones = document.getElementById(`observaciones_${sufijo}`).value;

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

    const currentValues = `${nombre}${turno}${fecha}${area}${subarea}${observaciones}${inicio}${termino}${difTiempo}`;

    if (
      currentValues !== prevNombre ||
      currentValues !== prevTurno ||
      currentValues !== prevFecha
    ) {
      if (index > 0) {
        pdf.addPage();
        yPosTexto = 20;
      }
    }

    const lines = observaciones.split('\n');

    acumuladorInfo += `\nNombre: ${nombre}\n \n ${turno}\n \n Fecha actual: ${fecha}\n \n Área: ${area}\n \n Equipo: ${subarea}\n \n `;
    acumuladorInfo += `Observaciones:\n ${observaciones}\n \n `;
    acumuladorInfo += `Hora de Inicio: ${inicio}\n \n Hora de Termino: ${termino}\n \n Diferencia de Tiempo: ${difTiempo}\n \n `;

    pdf.text(8, yPosTexto, acumuladorInfo);

    prevNombre = currentValues;
    prevTurno = currentValues;
    prevFecha = currentValues;

  });

  const bases = window.bases;

  if (bases.length > 0) {
    const promises = bases.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
  
        img.onload = function () {
          resolve(img);
          pdf.addPage();
        };
  
        img.onerror = function () {
          reject("Error al cargar la imagen");
        };
      });
    });
  
    Promise.all(promises)
      .then(images => {
        images.forEach(img => {
          const iWidth = img.naturalWidth;
          const iHeight = img.naturalHeight;
          const width = iWidth / 10;
          const height = iHeight / 10;
  
          // Asegúrate de que la imagen cabe en la página, si no, añade una nueva página
          if (yPosImagenes + height > pdf.internal.pageSize.height) {
            pdf.addPage();
            yPosImagenes = 20; // Restablece la posición Y para la nueva página
          }
  
          yPosImagenes += 10; // Espacio antes de la imagen
  
          pdf.addImage(img.src, "JPEG", 10, yPosImagenes, width, height);
  
          yPosImagenes += height + 10; // Espacio después de la imagen
        });
  
        pdf.save("Bitácora " + nombre + " " + fecha + ".pdf");
      })
      .catch(error => {
        console.error(error);
        alert("Hubo un error al cargar las imágenes.");
      });
  } else {
    pdf.save("Bitácora " + nombre + " " + fecha + ".pdf");
  }
}  

















// function genPDF() {
//   // Obtener los valores
//   const nombre = document.getElementById("nombre").value;
//   const turno = document.getElementById("turno").value;
//   const fecha = document.getElementById("fecha").value;
//   const elementos = document.querySelectorAll('[data-sufijo]');

//   // Nuevo objeto jsPDF
//   const pdf = new jsPDF();
//   let yPos = 20;

//   // Configurar estilo de encabezado
//   pdf.setFillColor(31, 79, 120); // Relleno azul
//   pdf.rect(0, 0, pdf.internal.pageSize.width, 15, 'F');
//   pdf.setTextColor(255, 255, 255);
//   pdf.setFontSize(18);
//   pdf.text(8, 10, "Bitácora de turno");

//   // Configurar estilo de contenido
//   pdf.setFillColor(255, 255, 255); // Blanco
//   pdf.setTextColor(0, 0, 0); // Negro
//   pdf.setFontSize(18);

//   // Recorrer elementos y obtener valores
//   elementos.forEach(function (elemento, index) {
//     // Reiniciar acumuladorInfo
//     let acumuladorInfo = "";

//     // Obtener el sufijo y valores
//     const sufijo = elemento.dataset.sufijo;
//     const area = document.getElementById(`area_${sufijo}`).value;
//     const inicio = document.getElementById(`inicio_${sufijo}`).value;
//     const termino = document.getElementById(`termino_${sufijo}`).value;
//     const difTiempo = document.getElementById(`difTiempo_${sufijo}`).value;
//     const observaciones = document.getElementById(`observaciones_${sufijo}`).value;

//     // Valor de subárea
//     let subarea;
//     if (area === "Chapas") {
//       subarea = document.getElementById(`subareaChapas_${sufijo}`).value;
//     } else if (area === "Tableros") {
//       subarea = document.getElementById(`subareaTableros_${sufijo}`).value;
//     } else if (area === "Terminacion") {
//       subarea = document.getElementById(`subareaTerminacion_${sufijo}`).value;
//     } else {
//       subarea = "";
//     }

//     // Acumular info
//     acumuladorInfo += `\n
//       Nombre: ${nombre}\n
//       ${turno}\n
//       Fecha actual: ${fecha}\n
//       Área: ${area}\n
//       Equipo: ${subarea}\n
//       Observaciones: \n \n ${observaciones}\n
//       Hora de Inicio: ${inicio}\n
//       Hora de Termino: ${termino}\n
//       Diferencia de Tiempo: ${difTiempo}\n`;

//     // Agregar la información
//     pdf.text(8, yPos, acumuladorInfo);

//     // Si hay más elementos, añadir una nueva página
//     if (index < elementos.length - 1) {
//       pdf.addPage();
//       yPos = 20;
//     }
//   });

//   // Usar el arreglo bases
//   const bases = window.bases;

//   // Comprobar si hay elementos
//   if (bases.length > 0) {
//     // Guardar las promesas
//     const promises = [];

//     // Recorrer el arreglo de bases
//     for (const base64 of bases) {
//       // Crear una promesa para cada imagen
//       const promise = new Promise((resolve, reject) => {
//         // Obtener el tamaño de la imagen
//         const img = new Image();
//         img.src = base64;

//         // Esperar a que la imagen esté cargada
//         img.onload = function () {
//           // Resolver la promesa con la imagen
//           resolve(img);
//         };

//         // Manejar el caso de error
//         img.onerror = function () {
//           reject("Error al cargar la imagen");
//         };
//       });

//       // Añadir la promesa al arreglo
//       promises.push(promise);
//     }

//     // Esperar a que todas las promesas se resuelvan
//     Promise.all(promises)
//       .then((images) => {
//         // Variable para indicar si es la primera imagen
//         let first = true;

//         // Recorrer el arreglo de imágenes
//         for (const img of images) {
//           // Obtener tamaño de la imagen
//           const iWidth = img.naturalWidth;
//           const iHeight = img.naturalHeight;

//           // Reducir tamaño de la imagen
//           const width = iWidth / 20;
//           const height = iHeight / 20;

//           // Calcular coordenadas
//           const x = (pdf.internal.pageSize.width - width) / 2;
//           const y = (pdf.internal.pageSize.height - height) / 2;

//           // Si es la primera imagen, añadir una página
//           if (first) {
//             pdf.addPage();
//           }

//           // Añadir la imagen con las coordenadas
//           pdf.addImage(img.src, "JPEG", x, y, width, height);

//           // Cambiar el valor de 'first'
//           first = false;
//         }

//         // Guardar el PDF
//         pdf.save("Bitácora " + nombre + " " + fecha + ".pdf");
//       })
//       .catch((error) => {
//         alert(error);
//       });
//   } else {
//     pdf.save("Bitácora " + nombre + " " + fecha + ".pdf");
//   }
// }
