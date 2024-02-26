function genPDF() {
// Obtener los valores
  const nombre = document.getElementById("nombre").value;
  const turno = document.getElementById("turno").value;
  const fecha = document.getElementById("fecha").value;
  const elementos = document.querySelectorAll('[data-sufijo]');
//nuevo objeto jsPDF
  const pdf = new jsPDF();
  let yPos = 20;
  pdf.setFillColor(31, 79, 120); // Relleno azul
  pdf.rect(0, 0, pdf.internal.pageSize.width, 15, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(18);
  pdf.text(8, 10, "Bitácora de turno");
  pdf.setFillColor(255, 255, 255); //blanco
  pdf.setTextColor(0, 0, 0); //negro
  pdf.setFontSize(18);
// Recorrer elementos y obtener valores
  elementos.forEach(function (elemento) {
// Reiniciar acumuladorInfo
  let acumuladorInfo = "";
// Obtener el sufijo y valores
  const sufijo = elemento.dataset.sufijo;
  const area = document.getElementById(`area_${sufijo}`).value;
  const inicio = document.getElementById(`inicio_${sufijo}`).value;
  const termino = document.getElementById(`termino_${sufijo}`).value;
  const difTiempo = document.getElementById(`difTiempo_${sufijo}`).value;
  const observaciones = document.getElementById(`observaciones_${sufijo}`).value;
// valor de subárea
  let subarea;
  if (area === "Chapas") {
    subarea = document.getElementById(`subareaChapas_${sufijo}`).value;
} else if (area === "Tableros") {
    subarea = document.getElementById(`subareaTableros_${sufijo}`).value;
} else if (area === "Terminacion") {
    subarea = document.getElementById(`subareaTerminacion_${sufijo}`).value;
} else {
    subarea = "";}
// Acumular la info
  acumuladorInfo += `\n
Nombre: ${nombre}\n
${turno}\n
Fecha actual: ${fecha}\n
Área: ${area}\n
Equipo: ${subarea}\n
Observaciones: \n \n ${observaciones}\n
Hora de Inicio: ${inicio}\n
Hora de Termino: ${termino}\n
Diferencia de Tiempo: ${difTiempo}\n`;
// nueva página
if (yPos + 105 > pdf.internal.pageSize.height) {
  pdf.addPage(); yPos = 20;}
// Agregar la información
  pdf.text(8, yPos, acumuladorInfo);});
// Usar el arreglo bases
const bases = window.bases;
// Comprobar si hay algún elemento
if (bases.length > 0) {
// guardar las promesas
  const promises = [];
// Recorrer el arreglo
  for (const base64 of bases) {
// Crear una promesa para cada imagen
    const promise = new Promise((resolve, reject) => {
// obtener su tamaño real
    const img = new Image();
    img.src = base64;
// Esperar que la imagen esté cargada
    img.onload = function () {
// Resolver la promesa con la imagen
    resolve(img);};
// Manejar el caso de error
    img.onerror = function () {
    reject("Error al cargar la imagen");};});
// Añadir la promesa al arreglo
    promises.push(promise);}
// Esperar que las promesas se resuelvan
  Promise.all(promises)
    .then((images) => {
// contador imágenes
    let count = 0;
// Recorrer el arreglo de imágenes
  for (const img of images) {
  // Obtener el tamaño
    const iWidth = img.naturalWidth;
    const iHeight = img.naturalHeight;
  // Reducir el tamaño 
    const width = iWidth / 20;
    const height = iHeight / 20;
  // Dividir la página Usar contador para asignar imagen
    let x, y;
  switch (count % 4) {
    case 0://izquierda superior
      x = 10;
      y = 10;
      break;
    case 1://derecha superior
      x = pdf.internal.pageSize.getWidth() / 2 + 5;
      y = 10;
      break;
    case 2://izquierda inferior
      x = 10;
      y = pdf.internal.pageSize.getHeight() / 2 + 11;
      break;
    case 3://derecha inferior
      x = pdf.internal.pageSize.getWidth() / 2 + 5;
      y = pdf.internal.pageSize.getHeight() / 2 + 11;
      break;}
  pdf.addPage();
  pdf.addImage(
    img.src,"JPEG",x,y,width,height);
  count++;}
  pdf.save("Bitácora "+nombre+" "+fecha+".pdf");})
  .catch((error) => {
    alert(error);});
} else {
  pdf.save("Bitácora "+nombre+" "+fecha+".pdf");}}