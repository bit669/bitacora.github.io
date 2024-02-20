// main.js
var sufijo;
document.addEventListener('DOMContentLoaded', function () {
  // Obtén la fecha actual
  const fechaActual = new Date();
  const formatoFecha = `${fechaActual.getFullYear()}-${agregarCero(fechaActual.getMonth()+1)}-${agregarCero(fechaActual.getDate())}`;
  const formatoHora = `${agregarCero(fechaActual.getHours())}:${agregarCero(fechaActual.getMinutes())}`;
  // Obtén las referencias a los elementos 'fecha' e 'inicio'
  const fechaInput = document.getElementById('fecha');
  const inicioInput = document.getElementById('inicio');
  // Establece los valores de 'fecha' e 'inicio'
  fechaInput ? fechaInput.value = formatoFecha : null;
  inicioInput ? inicioInput.value = formatoHora : null;
  // Función para agregar una nueva tarea
  function agregarTarea() {
      let tareaContainer = document.getElementById("tareasContainer");
      let nuevaTarea = crearElementoTarea();
      tareaContainer.appendChild(nuevaTarea);
      agrentosTarea(nuevaTarea);
  }
// Contador global
let contadorSufijos = 0;
// Cambiar dinámicamente los equipos según el área
function cambiarEquipos(sufijo) {
  const areaSelect = document.getElementById(`area_${sufijo}`);
  const equiposChapas = document.getElementById(`ListChapas_${sufijo}`);
  const equiposTableros = document.getElementById(`ListTableros_${sufijo}`);
  const equiposTerminacion = document.getElementById(`ListTerminacion_${sufijo}`);
  // Oculta los elementos de equipo
  if (equiposChapas) equiposChapas.style.display = 'none';
  if (equiposTableros) equiposTableros.style.display = 'none';
  if (equiposTerminacion) equiposTerminacion.style.display = 'none';
  // Muestra el elemento de equipo correspondiente
  if (areaSelect && equiposChapas && areaSelect.value === 'Chapas') {
      equiposChapas.style.display = '';
  } else if (areaSelect && equiposTableros && areaSelect.value === 'Tableros') {
      equiposTableros.style.display = '';
  } else if (areaSelect && equiposTerminacion && areaSelect.value === 'Terminacion') {
      equiposTerminacion.style.display = '';
  }
}
// Declara la variable tareaContainer y asignale el elemento con id tareasContainer
var tareaContainer = document.getElementById("tareasContainer");
// Crea un array para guardar las tareas
var listaTareas = [];
// Agregar una nueva tarea
function agregarTarea() {
  let nuevaTarea = crearElementoTarea();
  tareaContainer.appendChild(nuevaTarea);
  agregarEventosTarea(nuevaTarea);
  // Llama a cambiarEquipos
  cambiarEquipos(nuevaTarea.dataset.sufijo);
  // Agrega la nueva tarea al array
  listaTareas.push(nuevaTarea);
}

// Borrar la última tarea agregada
function borrarTarea() {
  // Asigna el valor de indiceTarea a array listaTareas
  let indiceTarea = listaTareas.length;
  // Guarda la tarea que vas a borrar
  let tareaBorrar = listaTareas[indiceTarea - 1];
  // Elimina la tarea del array
  listaTareas.splice(indiceTarea - 1, 1);
  // Elimina la tarea del contenedor
  tareaContainer.removeChild(tareaBorrar);
}

// Obtén el botón de agregar tarea
const agregarTareaBtn1 = document.getElementById('agregarTareaBtn');
// Verifica si el botón existe antes del evento 
if (agregarTareaBtn1) {
  agregarTareaBtn1.addEventListener('click', agregarTarea);
}

// Agrega un evento al botón de borrar tarea
borrarTareaBtn.addEventListener('click', borrarTarea);

// Crear un nuevo elemento de tarea
function crearElementoTarea() {
  let tareaDiv = document.createElement("div");
  let sufijo = contadorSufijos++;
  tareaDiv.innerHTML = `
    <div class="seleccion-div">
        <label for="area_${sufijo}">Área:</label>
    <select id="area_${sufijo}" name="area_${sufijo}" onchange="cambiarEquipos(${sufijo})">
        <option value="" disabled selected>Selecciona un área</option>
            <option value="Chapas">Chapas</option>
            <option value="Tableros">Tableros</option>
            <option value="Terminacion">Terminación</option> 
        </select>
    </div>
    <div class="seleccion-div my-2" id="ListChapas_${sufijo}" style="display: none;">
        <label for="subareaChapas_${sufijo}">Equipo:</label>
        <select id="subareaChapas_${sufijo}" name="subareaChapas_${sufijo}">
            <option value="Selecciona un Equipo">Selecciona un Equipo</option>
            <option value="Macerado">Macerado</option>
            <option value="Rollizos">Rollizos</option>
            <option value="Astillador Verde L1">Astillador Verde L1</option>
            <option value="Astillador Verde L2">Astillador Verde L2</option>
        </select>
    </div>
    <div class="seleccion-div my-2" id="ListTableros_${sufijo}" style="display: none;">
        <label for="subareaTableros_${sufijo}">Equipo:</label>
        <select id="subareaTableros_${sufijo}" name="subareaTableros_${sufijo}">
            <option value="Selecciona un Equipo">Selecciona un Equipo</option>
            <option value="Equipo1">Equipo1</option>
            <option value="Equipo2">Equipo2</option>
        </select>
    </div>
    <div class="seleccion-div my-2" id="ListTerminacion_${sufijo}" style="display: none;">
        <label for="subareaTerminacion_${sufijo}">Equipo:</label>
        <select id="subareaTerminacion_${sufijo}" name="subareaTerminacion_${sufijo}">
            <option value="Selecciona un Equipo">Selecciona un Equipo</option>
            <option value="Equipo ter1">Equipo ter1</option>
            <option value="Equipo ter2">Equipo ter2</option>
        </select>
    </div>
    <div class="seleccion-div my-2">
        <label for="inicio_${sufijo}">Inicio:</label>
        <input type="time" id="inicio_${sufijo}" name="inicio_${sufijo}">
    </div>
    <div class="seleccion-div">
        <label for="termino_${sufijo}">Termino:</label>
        <input type="time" id="termino_${sufijo}" name="termino_${sufijo}">
    </div>
    <div class="seleccion-div">
        <label for="difTiempo_${sufijo}">Diferencia:</label>
        <input type="time" id="difTiempo_${sufijo}" name="difTiempo_${sufijo}" readonly style="margin-bottom: 20px;">
    </div>
    <div class="mb-2">
        <label for="observaciones_${sufijo}" class="lbl-observaciones">
            <span class="text-observaciones">Observaciones</span>
        </label><br>
        <textarea id="observaciones_${sufijo}" name="observaciones_${sufijo}" required rows="2"></textarea>
    </div>

    
    <div class="container_${sufijo}">
    <section id="Images" class="images-cards">
    <form action="upload.php" method="post" enctype="multipart/form-data">
    <div class="row">
        <div class="col-md-3 col-sm-4 col-xs-12" id="add-photo-container${sufijo}">
            <div class="add-new-photo first" id="add-photo${sufijo}">
                <span><img src="camara(3).svg" alt="Agregar Foto"></span>
            </div>
            <input type="file" multiple id="add-new-photo${sufijo}" name="images${sufijo}[]" data-sufijo="${sufijo}">
        </div>
    </div>
</form>
    </section>
</div>

`;
  // Asignar evento directamente desde JavaScript
  let areaSelect = tareaDiv.querySelector(`#area_${sufijo}`);
  if (areaSelect) {
      areaSelect.addEventListener('change', function () {
          cambiarEquipos(sufijo);
      });
  }
  tareaDiv.dataset.sufijo = sufijo;
  return tareaDiv;
}
  // Función para agregar eventos a tarea
  function agregarEventosTarea(tareaElement) {
      let sufijo = tareaElement.dataset.sufijo;
      let inicioInput = tareaElement.querySelector(`#inicio_${sufijo}`);
      let terminoInput = tareaElement.querySelector(`#termino_${sufijo}`);
      if (inicioInput && terminoInput) {
          inicioInput.addEventListener('change', function () {
              calcularDiferenciaTiempo(sufijo);
          });
          terminoInput.addEventListener('change', function () {
              calcularDiferenciaTiempo(sufijo);
          });
      }
      let observacionesInput = tareaElement.querySelector(`#observaciones_${sufijo}`);
      if (observacionesInput) {
          observacionesInput.addEventListener('input', function () {
              autoExpand(this);
          });
      }
      document.getElementById("btn-generar-pdf").addEventListener("click", function () {
          document.getElementById("btn-modal").checked = false;
          genPDF(sufijo);
      });
      calcularDiferenciaTiempo(sufijo);
  }
  // Función para agregar un cero a números menores de 10
  function agregarCero(numero) {
      return numero < 10 ? '0' + numero : numero;
  }
  // Función para expandir dinámicamente el texto
  function autoExpand(textarea) {
      textarea.style.height = '63px';
      var newHeight = textarea.scrollHeight + 2;
      textarea.style.height = newHeight > 300 ? '300px' : newHeight + 'px';
  }
// Obtén todas las entradas de observaciones
var observacionesInputs = document.querySelectorAll('[id^="observaciones_"]');
// Verifica si existen entradas
if (observacionesInputs) {
   // Agrega un evento de escucha a cada entrada
   observacionesInputs.forEach(function (observacionesInput) {
       observacionesInput.addEventListener('input', function () {
           autoExpand(this);
       });
   });
}
// Generar un PDF
function genPDF(sufijo) {
  console.log(`Generando PDF para sufijo ${sufijo}`);
  // Cierra el modal después de generar el PDF
  document.getElementById("btn-modal").checked = false;
}
  // Obtén el botón de generar PDF
  const btnGenerarPDF = document.getElementById("btn-generar-pdf");
  // Verifica si el botón existe antes de agregar el evento
  if (btnGenerarPDF) {
      btnGenerarPDF.addEventListener("click", function () {
      // Llama a la función
          let sufijo = 0;
          genPDF(sufijo);
      });
  }
  // Asegúrate de que el elemento con ID 'btn-modal' existe
  const btnModal = document.getElementById('btn-modal');
  if (btnModal) {
      btnModal.addEventListener('change', function () {
  // Agrega un evento de escucha al cambio de estado del botón
document.getElementById('btn-modal').addEventListener('change', function () {
  document.querySelector('.container-modal').classList.toggle('visible');
});
});
  }
// Obtén el botón de cerrar
var btnCerrar = document.getElementById("btn-cerrar");
btnCerrar.addEventListener("click", function() {
// Cerrar el modal
document.getElementById("btn-modal").checked = false;
});
});