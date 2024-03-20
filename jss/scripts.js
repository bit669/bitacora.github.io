var bases = [];
document.addEventListener('DOMContentLoaded', function () {
// generar previsualizaciones
function createPreview(file, sufijo) {
    // Crear la estructura de la imagen
    var imgCodified = URL.createObjectURL(file);
    // Asignar un atributo data-index con el valor de bases.length
    var imgContainer = $('<div class="col-md-3 col-sm-4 col-xs-12"><div class="image-container"> <figure> <img src="' + imgCodified + '" alt="Foto del usuario" data-index="' + bases.length + '"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>');
    // Vincula el evento de clic en la cámara al botón subir imágenes
    imgContainer.insertBefore(`#add-photo-container${sufijo}`);
    $(`#add-photo${sufijo}`).on('click', function () {
        $(`#add-new-photo${sufijo}`).click();});}
// convertir imagen a base64
async function convertirImagen(file) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    // Crear y asignar una url temporal
    var url = URL.createObjectURL(file);
    img.src = url;
    // Esperar para que la imagen se cargue
    return new Promise((resolve, reject) => {
        // Asignar una función al onload
        img.onload = function() {
            // Detectar si la imagen es horizontal
            var esHorizontal = img.width > img.height;
            if (esHorizontal) {
                // Ajustar el tamaño del canvas y Rotar imagen
                canvas.width = img.height;
                canvas.height = img.width;
                ctx.rotate(Math.PI / 2);
                ctx.drawImage(img, 0, -img.height);
            } else {
                // Ajustar el tamaño del canvas
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);}
            // Obtener el código base64
            var dataURL = canvas.toDataURL();
            URL.revokeObjectURL(url);
            // Resolver la promesa
            resolve(dataURL);};
        // Asignar una función al onerror
        img.onerror = function() {
            reject("Error al cargar la imagen");};});}
$(document).ready(async function(){
    $(".modal").on("click", function (e) {
        console.log(e);
        if (($(e.target).hasClass("modal-main") || $(e.target).hasClass("close-modal")) && $("#loading").css("display") == "none") {
            closeModal();}});
    // Abrir el inspector de archivos
    $(document).on("click", `[id^="add-photo"]`, function(){
        $(`#add-new-photo${$(this).data('sufijo')}`).click();
    });
    // Cachamos el evento change
    $(document).on("change", `[id^="add-new-photo"]`, async function () {
        console.log(this.files);
        var files = this.files;
        var seEncontraronElementoNoValidos = false;
        var supportedImages = ["image/jpeg", "image/png", "image/gif"];
        for (var i = 0; i < files.length; i++) {
            var element = files[i];
            if (supportedImages.indexOf(element.type) != -1) {
                // Generar la previsualización
                createPreview(element, $(this).data('sufijo'));
                // Convertir la imagen
                var base64 = await convertirImagen(element);
                // Agregar el valor de base64 al arreglo bases
                bases.push(base64);
                // Mostrar el código base64
                console.log(base64); 
                // Usar el valor de base64 fuera de este código
            } else {
                seEncontraronElementoNoValidos = true;}}});
    // Eliminar previsualizaciones
    $(document).on("click", `[id^="Images"] .image-container`, function (e) {
        // Obtener el índice de la imagen
        var index = $(this).find("img").data("index");
        // Eliminar el elemento de bases que corresponde
        bases.splice(index, 1);
        $(this).parent().remove();});});});


// Función para cargar una imagen desde una ruta local y convertirla a base64
async function cargarImagenLocalYConvertirABase64() {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    // Usamos una promesa para esperar a que la imagen se cargue
    return new Promise((resolve, reject) => {
        img.onload = () => {
            var canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
        };
        img.onerror = (e) => {
            reject(new Error('No se pudo cargar la imagen: ' + e.message));
        };
        img.src = 'ARAUCO.png'; // Asegúrate de que la ruta es correcta
    });
}

// Arreglo para almacenar las imágenes en base64
var imagenes = [];

// Función autoinvocada para usar async/await
(async () => {
    try {
        const base64 = await cargarImagenLocalYConvertirABase64();
        imagenes.push(base64);
        console.log('Imagen cargada en el arreglo:', base64);
    } catch (error) {
        console.error('Error al cargar la imagen:', error);
    }
})();