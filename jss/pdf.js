function genPDF() {
  let prevNombre = null; let prevTurno = null; let prevFecha = null;
  const Bitácora = document.getElementById("Bitácora").value;
  const nombre = document.getElementById("nombre").value;
  const turno = document.getElementById("turno").value;
  const fecha = document.getElementById("fecha").value;
  const elementos = document.querySelectorAll('[data-sufijo]');
  const pdf = new jsPDF();
  let yPosTexto = 20; let yPosImagenes = 10; let xPosImagenes = 42;
  elementos.forEach(function (elemento, index) {
    // Encabezado y contenido
    pdf.setFillColor(31, 79, 120); // Relleno azul
    pdf.rect(0, 0, pdf.internal.pageSize.width, 23, 'F'); // Largo del encabezado
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(25); // Tamaño del texto
    pdf.text(8, 14, "Bitácora de turno " + Bitácora);
    pdf.setFillColor(255, 255, 255); // Blanco
    pdf.setTextColor(0, 0, 0); // Negro
    pdf.setFontSize(17);
    // Añadir el encabezado con la imagen
    const imagenes = window.imagenes; // Asegúrate de que este arreglo contenga las imágenes en base64
    if (imagenes.length > 0) {
      const headerImg = imagenes[0]; // Usar la primera imagen del arreglo para el encabezado
      pdf.addImage(headerImg, 'JPEG', 160, 2, 35, 15);}

    let acumuladorInfo = "";
    const sufijo = elemento.dataset.sufijo;
    const area = document.getElementById(`area_${sufijo}`).value;
    const inicio = document.getElementById(`inicio_${sufijo}`).value;
    const termino = document.getElementById(`termino_${sufijo}`).value;
    const difTiempo = document.getElementById(`difTiempo_${sufijo}`).value;
    let observaciones = document.getElementById(`observaciones_${sufijo}`).value;
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
        yPosTexto = 20;}}
    // Insertar texto
    const maxLineLength = 190;
    observaciones = pdf.splitTextToSize(observaciones, maxLineLength);
    acumuladorInfo += `\n \nNombre: ${nombre}\n \n${turno}\n \nFecha actual: ${fecha}\n \nÁrea: ${area}\n \nEquipo: ${subarea}\n \nObservaciones: \n`;
    observaciones.forEach(line => {
    acumuladorInfo += `${line} \n`;});
    acumuladorInfo += `\nHora de Inicio: ${inicio}\n \nHora de Termino: ${termino}\n \nDiferencia de Tiempo: ${difTiempo}`;
    pdf.text(8, yPosTexto, acumuladorInfo.split('\n'));
    prevNombre = currentValues;
    prevTurno = currentValues;
    prevFecha = currentValues;});
    const bases = window.bases;
    // Añadir imágenes al final
    bases.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = function () {
    pdf.addPage();
    // Comprobar si la imagen es horizontal
    if (this.naturalWidth > this.naturalHeight) {
      pdf.addImage(this.src, "JPEG", xPosImagenes, yPosImagenes, this.naturalWidth / 16, this.naturalHeight / 16, 'NONE', 'NONE', 90);
    } else {
      // Si no es horizontal, añadir la imagen
      pdf.addImage(this.src, "JPEG", xPosImagenes, yPosImagenes, this.naturalWidth / 16, this.naturalHeight / 16);}};
     img.onerror = function () {
    console.error("Error al cargar la imagen");};});
  // Guardar el PDF cuando las imágenes se hayan cargado
  Promise.all(bases.map(img => new Promise((resolve, reject) => {
    const image = new Image();
    image.src = img;
    image.onload = resolve;
    image.onerror = reject;
  }))).then(() => {
    pdf.save("Bitácora " + Bitácora + " " + turno + " " + nombre + " " + fecha + ".pdf");
  }).catch(error => {
    console.error(error);
    alert("Hubo un error al cargar las imágenes.");});}