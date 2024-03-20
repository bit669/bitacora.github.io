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
function cargarImagenLocalYConvertirABase64(rutaLocal) {
    return new Promise((resolve, reject) => {
        // Crear un nuevo objeto de imagen
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous'); // Tratar con imágenes de dominio cruzado
        img.onload = function () {
            // Crear un canvas para dibujar la imagen
            var canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0, 0);
            // Convertir la imagen a base64
            var dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
        };
        img.onerror = function () {
            reject(new Error('No se pudo cargar la imagen'));
        };
        // Asignar la ruta de la imagen al src para iniciar la carga
        img.src = rutaLocal;
    });
}

