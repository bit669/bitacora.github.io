var bases = [];
document.addEventListener('DOMContentLoaded', function () {
    // generar previsualizaciones
    function createPreview(file, sufijo) {
        var imgCodified = URL.createObjectURL(file);
        var imgElement = $('<img src="' + imgCodified + '" alt="Foto del usuario">');
        imgElement.attr('data-index', bases.length);
        var esHorizontal = img.width > img.height;
        if (esHorizontal) {
            imgElement.attr('data-es-horizontal', 'true');
        }
        var imgContainer = $('<div class="col-md-3 col-sm-4 col-xs-12"><div class="image-container"> <figure>');
        imgContainer.append(imgElement);
        imgContainer.append('<figcaption> <i class="icon-cross"></i> </figcaption> </figure> </div></div>');
        imgContainer.insertBefore(`#add-photo-container${sufijo}`);
    }

    // convertir imagen a base64
    async function convertirImagen(file) {
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var img = new Image();
        var url = URL.createObjectURL(file);
        img.src = url;
        return new Promise((resolve, reject) => {
            img.onload = function() {
                var esHorizontal = img.width > img.height;
                if (esHorizontal) {
                    canvas.width = img.height;
                    canvas.height = img.width;
                    ctx.rotate(Math.PI / 2);
                    ctx.drawImage(img, 0, -img.height);
                } else {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                }
                var dataURL = canvas.toDataURL();
                URL.revokeObjectURL(url);
                resolve(dataURL);
            };
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