// document.addEventListener('DOMContentLoaded', function () {
// //Genera las previsualizaciones
// function createPreview(file) {
//     var imgCodified = URL.createObjectURL(file);
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
//     // Eliminar previsualizaciones
//     $(document).on("click", "#Images .image-container", function(e){
//         $(this).parent().remove();
//         //Obtiene la URL de la imagen
//         var url = $(this).find("img").attr("src");
//         //Busca la clave correspondiente en el localStorage
//         for (var i = 0; i < localStorage.length; i++) {
//             var key = localStorage.key(i);
//             var value = localStorage.getItem(key);
//             //Si la URL coincide con el valor, elimina la clave
//             if (url == URL.createObjectURL(value)) {
//                 localStorage.removeItem(key);
//                 break;
//             }
//         }
//     });
//     // -> Eliminar previsualizaciones
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











//Genera las previsualizaciones
function createPreview(file) {
    var imgCodified = URL.createObjectURL(file);
    var img = $('<div class="col-md-3 col-sm-4 col-xs-12"><div class="image-container"> <figure> <img src="' + imgCodified + '" alt="Foto del usuario"> <figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>');
    $(img).insertBefore("#add-photo-container");

}

$(document).ready(function(){
    // Modal
    $(".modal").on("click", function (e) {
        console.log(e);
        if (($(e.target).hasClass("modal-main") || $(e.target).hasClass("close-modal")) && $("#loading").css("display") == "none") {
            closeModal();
        }
    });
    // -> Modal
    // Abrir el inspector de archivos
    $(document).on("click", "#add-photo", function(){
        $("#add-new-photo").click();
    });
    // -> Abrir el inspector de archivos
    // Cachamos el evento change
    $(document).on("change", "#add-new-photo", function () {
    
        console.log(this.files);
        var files = this.files;
        var element;
        var supportedImages = ["image/jpeg", "image/png", "image/gif"];
        var seEncontraronElementoNoValidos = false;

        for (var i = 0; i < files.length; i++) {
            element = files[i];
            
            if (supportedImages.indexOf(element.type) != -1) {
                createPreview(element);
            }
            else {
                seEncontraronElementoNoValidos = true;
            }
        }
    });
    // -> Cachamos el evento change
    // Eliminar previsualizaciones
    $(document).on("click", "#Images .image-container", function(e){
        $(this).parent().remove();
    });

    // -> Eliminar previsualizaciones
});