var bases = []; // Inicializar el arreglo vacío
document.addEventListener('DOMContentLoaded', function () {
// generar previsualizaciones
function createPreview(file, sufijo) {
    // Crear la estructura de la imagen antes de insertarla
    var imgCodified = URL.createObjectURL(file);
    // Asignar un atributo data-index con el valor de bases.length
    var imgContainer = $('<div class="col-md-3 col-sm-4 col-xs-12"><div class="image-container"> <figure> <img src="' + imgCodified + '" alt="Foto del usuario" data-index="' + bases.length + '"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>');
    // Vincula el evento de clic en la cámara al botón para subir imágenes
    imgContainer.insertBefore(`#add-photo-container${sufijo}`);
    $(`#add-photo${sufijo}`).on('click', function () {
        $(`#add-new-photo${sufijo}`).click();
    });
}
// convertir una imagen a base64
async function convertirImagen(file) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    // Crear una url temporal
    var url = URL.createObjectURL(file);
    // Asignar la url
    img.src = url;
    // Crear una promesa para esperar a que la imagen se cargue
    return new Promise((resolve, reject) => {
        // Asignar una función al onload
        img.onload = function() {
            // Ajustar el tamaño
            canvas.width = img.width;
            canvas.height = img.height;
            // Dibujar la imagen en el canvas
            ctx.drawImage(img, 0, 0);
            // Obtener el código base64
            var dataURL = canvas.toDataURL();
            // Liberar la url temporal
            URL.revokeObjectURL(url);
            // Resolver la promesa con el código base64
            resolve(dataURL);
        };
        // Asignar una función al onerror
        img.onerror = function() {
            // Rechazar la promesa con un mensaje de error
            reject("Error al cargar la imagen");
        };
    });
}
$(document).ready(async function(){
    // Modal
    $(".modal").on("click", function (e) {
        console.log(e);
        if (($(e.target).hasClass("modal-main") || $(e.target).hasClass("close-modal")) && $("#loading").css("display") == "none") {
            closeModal();
        }
    });
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
                // Convertir la imagen a base64
                var base64 = await convertirImagen(element);
                // Agregar el valor de base64 al arreglo bases
                bases.push(base64);
                // Mostrar el código base64
                console.log(base64); 
                // Usar el valor de base64 fuera de este código
            } else {
                seEncontraronElementoNoValidos = true;
            }
        }
    });
    // Eliminar previsualizaciones
    $(document).on("click", `[id^="Images"] .image-container`, function (e) {
        // Obtener el índice de la imagen
        var index = $(this).find("img").data("index");
        // Eliminar el elemento de bases que corresponde al índice
        bases.splice(index, 1);
        // Eliminar el elemento del DOM
        $(this).parent().remove();
    });
});
});