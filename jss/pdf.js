function genPDF() {
  let prevNombre = null;
  let prevTurno = null;
  let prevFecha = null;
  const Bitácora = document.getElementById("Bitácora").value;
  const nombre = document.getElementById("nombre").value;
  const turno = document.getElementById("turno").value;
  const fecha = document.getElementById("fecha").value;
  const elementos = document.querySelectorAll('[data-sufijo]');
  const pdf = new jsPDF();
  let yPosTexto = 20;
  let yPosImagenes = 10;

  // Configurar encabezado y contenido
  pdf.setFillColor(31, 79, 120); // Relleno azul
  pdf.rect(0, 0, pdf.internal.pageSize.width, 15, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.text(8, 10, "Bitácora de turno " + Bitácora);
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
      subarea = "";}

      const currentValues = `${nombre}${turno}${fecha}${area}${subarea}${observaciones}${inicio}${termino}${difTiempo}`;

      if (
        currentValues !== prevNombre ||
        currentValues !== prevTurno ||
        currentValues !== prevFecha
      ){
        if (index > 0) {
          pdf.addPage();
          yPosTexto = 20;
        }}
  
      const lines = observaciones.split('\n');
      acumuladorInfo += `\n Nombre: ${nombre}\n \n ${turno}\n \n Fecha actual: ${fecha}\n \n Área: ${area}\n \n Equipo: ${subarea}\n \n `;
      acumuladorInfo += `Observaciones:\n ${observaciones}\n \n `;
      acumuladorInfo += `Hora de Inicio: ${inicio}\n \n Hora de Termino: ${termino}\n \n Diferencia de Tiempo: ${difTiempo}\n \n `;
  
      pdf.text(8, yPosTexto, acumuladorInfo);
      prevNombre = currentValues;
      prevTurno = currentValues;
      prevFecha = currentValues;
    });

  const bases = window.bases;

// Añadir imágenes al final, cada una en una página separada
bases.forEach(src => {
  const img = new Image();
  img.src = src;
  img.onload = function () {
    pdf.addPage(); // Añadir una nueva página para cada imagen

    // Crear un canvas para poder rotar la imagen
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Configurar el tamaño del canvas al tamaño de la imagen
    canvas.width = this.naturalWidth;
    canvas.height = this.naturalHeight;

    // Colocar la imagen en el canvas
    ctx.drawImage(this, 0, 0);

    // Rotar la imagen 90 grados si es horizontal
    if (this.naturalWidth > this.naturalHeight) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(90 * Math.PI / 180);
      ctx.drawImage(this, -this.naturalWidth / 2, -this.naturalHeight / 2);
    }

    // Convertir el canvas a data URI
    const dataURI = canvas.toDataURL('image/jpeg');

    // Añadir la imagen rotada al PDF
    pdf.addImage(dataURI, 'JPEG', 10, yPosImagenes, this.naturalWidth / 15, this.naturalHeight / 15);
  };
  img.onerror = function () {
    console.error("Error al cargar la imagen");
  };
});


  // Guardar el PDF una vez que todas las imágenes se hayan cargado
  Promise.all(bases.map(img => new Promise((resolve, reject) => {
    const image = new Image();
    image.src = img;
    image.onload = resolve;
    image.onerror = reject;
  }))).then(() => {
    pdf.save("Bitácora" + " " + Bitácora + " " + turno + " " + nombre + " " + fecha + ".pdf");
  }).catch(error => {
    console.error(error);
    alert("Hubo un error al cargar las imágenes.");
  });
}