let tareas = [];

const form = document.getElementById("formTarea");
const lista = document.getElementById("listaTareas");
const mensaje = document.getElementById("mensaje");

function mostrarTareas() {
  lista.innerHTML = "";
  tareas.forEach((t, i) => {
    const li = document.createElement("li");
    li.innerHTML = `${t.titulo} - ${t.fecha} - <span class="color-${t.prioridad}">${t.prioridad}</span>`;
    if (t.completada) li.classList.add("completada");

    li.addEventListener("click", () => {
      tareas[i].completada = !tareas[i].completada;
      guardar();
      mostrarTareas();
    });

    lista.appendChild(li);
  });
}

function guardar() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const fecha = document.getElementById("fecha").value;
  const prioridad = document.getElementById("prioridad").value;

  if (titulo && fecha) {
    tareas.push({ titulo, fecha, prioridad, completada: false });
    guardar();
    mostrarTareas();
    mensaje.textContent = "¡Tarea añadida con éxito!";
    form.reset();
    setTimeout(()=> mensaje.textContent = "", 1500);
  }
});

window.onload = () => {
  const guardadas = localStorage.getItem("tareas");
  if (guardadas) tareas = JSON.parse(guardadas);
  mostrarTareas();
};
