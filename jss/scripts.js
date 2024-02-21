// document.addEventListener('DOMContentLoaded', function () {
// //Genera las previsualizaciones
// function createPreview(file) {
//     var imgCodified = file;
//     var img = $('<div class="col-md-3 col-sm-4 col-xs-12"><div class="image-container"> <figure> <img src="' + imgCodified + '" alt="Foto del usuario"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>');
//     $(img).insertBefore("#add-photo-container");
//     //Guarda la imagen en Base64
//     var reader = new FileReader();
//     reader.onload = function(e) {
//         var base64 = e.target.result;
//         //Asigna una clave única
//         var key = "imagen" + Date.now();
//         localStorage.setItem(key, base64);
//     }
//     reader.readAsDataURL(file);
// }
// $(document).ready(function(){
//     // Modal
//     $(".modal").on("click", function (e) {
//         console.log(e);
//         if (($(e.target).hasClass("modal-main") || $(e.target).hasClass("close-modal")) && $("#loading").css("display") == "none") {
//             closeModal();
//         }
//     });
//     // -> Modal
//     // Abrir el inspector de archivos
//     $(document).on("click", "#add-photo", function(){
//         $("#add-new-photo").click();
//     });
//     // Cachamos el evento change
//     $(document).on("change", "#add-new-photo", function () {
    
//         console.log(this.files);
//         var files = this.files;
//         var element;
//         var supportedImages = ["image/jpeg", "image/png", "image/gif"];
//         var seEncontraronElementoNoValidos = false;

//         for (var i = 0; i < files.length; i++) {
//             element = files[i];
            
//             if (supportedImages.indexOf(element.type) != -1) {
//                 createPreview(element);
//             }
//             else {
//                 seEncontraronElementoNoValidos = true;
//             }
//         }
//     });
//     //evento change
// // Eliminar previsualizaciones
// $(document).on("click", "#Images .image-container", function(e){
//     $(this).parent().remove();
//     //Obtiene el valor en Base64 de la imagen
//     var base64 = $(this).find("img").attr("src");
//     //Busca la clave correspondiente en el localStorage
//     for (var i = 0; i < localStorage.length; i++) {
//         var key = localStorage.key(i);
//         var value = localStorage.getItem(key);
//         //Si el valor en Base64 coincide con el valor, elimina la clave
//         if (base64 == value) {
//             localStorage.removeItem(key);
//             break;
//         }
//     }
// });
// // -> Eliminar previsualizaciones

//     // Recuperar las imágenes
//     for (var i = 0; i < localStorage.length; i++) {
//         var key = localStorage.key(i);
//         var value = localStorage.getItem(key);
//         //Crea una previsualización
//         var img = $('<div class="col-md-3 col-sm-4 col-xs-12"><div class="image-container"> <figure> <img src="' + value + '" alt="Foto del usuario"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>');
//         $(img).insertBefore("#add-photo-container");
//     }
//     // Recuperar las imágenes
//     for (var i = 0; i < localStorage.length; i++) {
//         var key = localStorage.key(i);
//         var value = localStorage.getItem(key);
//         //Crea una URL
//         var url = URL.createObjectURL(value);
//         //Crea una previsualización
//         var img = $('<div class="col-md-3 col-sm-4 col-xs-12"><div class="image-container"> <figure> <img src="' + url + '" alt="Foto del usuario"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>');
//         $(img).insertBefore("#add-photo-container");
//     }
//     // -> Recuperar las imágenes
// });
// });







// version con sufijos
var bases; // Inicializar el arreglo bases
var bases = []; // Inicializar el arreglo bases como un arreglo vacío
document.addEventListener('DOMContentLoaded', function () {
    // Función para generar previsualizaciones
    function createPreview(file, sufijo) {
        // Crear la estructura de la imagen antes de insertarla
        var imgCodified = URL.createObjectURL(file);
        var imgContainer = $('<div class="col-md-3 col-sm-4 col-xs-12"><div class="image-container"> <figure> <img src="' 
            + imgCodified + '" alt="Foto del usuario"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>');
        // Vincula el evento de clic en la cámara al botón para subir imágenes
        imgContainer.insertBefore(`#add-photo-container${sufijo}`);
        $(`#add-photo${sufijo}`).on('click', function () {
            $(`#add-new-photo${sufijo}`).click();
        });
    }

    // Función para convertir una imagen a base64
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
            // Asignar una función al evento onload
            img.onload = function() {
                // Ajustar el tamaño del canvas
                canvas.width = img.width;
                canvas.height = img.height;
                // Dibujar la imagen en el canvas
                ctx.drawImage(img, 0, 0);
                // Obtener el código base64 del canvas
                var dataURL = canvas.toDataURL();
                // Liberar la url temporal
                URL.revokeObjectURL(url);
                // Resolver la promesa con el código base64
                resolve(dataURL);
            };
            // Asignar una función al evento onerror
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
                    // Mostrar el código base64 en la consola
                    console.log(base64); 
                    // Usar el valor de base64 fuera de este código
                    // ...
                } else {
                    seEncontraronElementoNoValidos = true;
                }
            }
        });
        // Eliminar previsualizaciones
        $(document).on("click", `[id^="Images"] .image-container`, function (e) {
            $(this).parent().remove();
        });
    });
});
