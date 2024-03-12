function genPDF() {
  const nombre = document.getElementById("nombre").value;
  const turno = document.getElementById("turno").value;
  const fecha = document.getElementById("fecha").value;
  const elementos = document.querySelectorAll('[data-sufijo]');
  const pdf = new jsPDF();
  let yPosTexto = 20;

  // Configurar encabezado y contenido
  pdf.setFillColor(31, 79, 120); // Relleno azul
  pdf.rect(0, 0, pdf.internal.pageSize.width, 15, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.text(8, 10, "Bitácora de turno");
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
    const lines = observaciones.split('\n');
    acumuladorInfo += `Nombre: ${nombre} \n Turno: ${turno} \n Fecha actual: ${fecha} \n Área: ${area} \n Equipo: ${subarea} \n Observaciones: ${observaciones} \n Hora de Inicio: ${inicio} \n Hora de Termino: ${termino} \n Diferencia de Tiempo: ${difTiempo} \n `;

    if (index > 0) {
      pdf.addPage();
    }
    pdf.text(8, yPosTexto, acumuladorInfo);
    yPosTexto = 20; // Reset yPosTexto for the next page
  });

  // Añadir imágenes al final, cada una en una página separada
  const bases = window.bases;
  bases.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    img.onload = function () {
      if (index > 0 || elementos.length > 0) {
        pdf.addPage();
      }
      pdf.addImage(this, 'JPEG', 20, yPosTexto, this.naturalWidth / 10, this.naturalHeight / 10);
    };
    img.onerror = function () {
      console.error("Error al cargar la imagen");
    };
  });

  // Guardar el PDF una vez que todas las imágenes se hayan cargado
  Promise.all(bases.map(src => new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = resolve;
    image.onerror = reject;
  }))).then(() => {
    pdf.save("Bitácora " + nombre + " " + fecha + ".pdf");
  }).catch(error => {
    console.error(error);
    alert("Hubo un error al cargar las imágenes.");
  });
}
