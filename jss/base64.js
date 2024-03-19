// Este módulo manejará todo lo relacionado con la fuente personalizada

// Función para agregar la fuente al VFS de jsPDF
export function agregarFuenteAlVFS(doc, miFuenteBase64) {
    doc.addFileToVFS('miFuente.ttf', miFuenteBase64);
}

// Función para registrar la fuente en jsPDF
export function registrarFuente(doc, nombreFuente) {
  doc.addFont('miFuente.ttf', nombreFuente, 'normal');
}

// Función para establecer la fuente en el documento
export function establecerFuente(doc, nombreFuente) {
  doc.setFont(nombreFuente);
}
