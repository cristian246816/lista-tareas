const listaTareas = document.getElementById("lista-tareas");
const total = document.getElementById("total");
const completadas = document.getElementById("completadas");
const inputTarea = document.getElementById("input-tarea");
const botonAgregar = document.getElementById("boton-agregar");

let tareas = [
    {id: 1, tarea: "Hacer ejercicio", completada: false },
    {id: 2, tarea: "Leer un libro", completada: false },
    {id: 3, tarea: "Aprender a cocinar", completada: false },
];

function mostrarTareas() {
    let html = "";
    tareas.forEach((tarea) => {
        html += generarFilaTarea(tarea);
    });

    listaTareas.innerHTML = html;
    actualizarContadores();
}

function generarFilaTarea(tarea) {
    const { id, tarea: t, completada } = tarea;
    return `
        <tr>
            <td>${id}</td>
            <td>${t}</td>
            <td>
                <input type="checkbox" data-id="${id}" ${completada ? "checked" : ""}>
            </td>
            <td>
                <button data-id="${id}">❌</button>
            </td>
        </tr>
    `;
}

function actualizarContadores() {
    total.textContent = tareas.length;
    completadas.textContent = tareas.filter((tarea) => tarea.completada).length;
}

function eliminarTarea(id) {
    tareas = tareas.filter((tarea) => tarea.id !== id);
    mostrarTareas();
}

function alternarTarea(id) {
    const tarea = tareas.find((t) => t.id === id);
    tarea.completada = !tarea.completada;
    mostrarTareas();
}

function agregarTarea() {
    const textoTarea = inputTarea.value.trim();
    if (!textoTarea) {
        alert("Ingresa una tarea.");
        return;
    }

    const nuevaTarea = { id: tareas.length + 1, tarea: textoTarea, completada: false };
    tareas.push(nuevaTarea);
    inputTarea.value = "";
    mostrarTareas();
}

mostrarTareas();

botonAgregar.addEventListener("click", agregarTarea);

listaTareas.addEventListener("click", (event) => {
    const id = parseInt(event.target.getAttribute("data-id"));
    if (!isNaN(id)) {
        if (event.target.matches("input[type='checkbox']")) {
            alternarTarea(id);
        } else if (event.target.matches("button")) {
            eliminarTarea(id);
        }
    }
});

