/**
 * Imports
 */
import { v4 as uuidv4 } from "uuid";
import {
  borrarLocalStorage,
  cargarLocalStorage,
  guardarLocalStorage,
  sustituirLocalStorage,
} from "./localStorage.js";

/**
 *  Funcion que añade una nueva tarea a la lista y al localstorage
 * @param {String} texto Texto
 * @param {HTMLElement} lista Elemento html de la lista
 */
export function añadirTarea(texto, lista) {
  const elementoLi = document.createElement("li");
  elementoLi.textContent = texto;
  elementoLi.id = "lid";
  lista.appendChild(elementoLi);
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "checkboxid";
  elementoLi.appendChild(checkbox);
  const botonBorrar = document.createElement("button");
  botonBorrar.type = "button";
  botonBorrar.id = "botonBorrarId";
  botonBorrar.textContent = "Borrar";
  elementoLi.appendChild(botonBorrar);
  const objetoTareas = { tarea: texto, estado: 0, id: uuidv4() };
  elementoLi.setAttribute("uuid", objetoTareas.id);
  guardarLocalStorage(objetoTareas);
}

/**
 * Funcion que añade las tareas del localstorage a la lista
 * @param {Array} tareasPrevias Texto
 * @param {HTMLElement} lista Elemento html de la lista
 */
export function añadirTareasPrevias(tareasPrevias, lista) {
  if (tareasPrevias != null) {
    const tareasLista = lista.getElementsByTagName("li");

    for (let elemento of tareasPrevias) {
      const elementoLi = document.createElement("li");
      elementoLi.textContent = elemento.tarea;
      elementoLi.id = "lid";
      elementoLi.setAttribute("uuid", elemento.id);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = "checkboxid";
      elementoLi.appendChild(checkbox);
      const botonBorrar = document.createElement("button");
      botonBorrar.id = "botonBorrarId";
      botonBorrar.textContent = "Borrar";
      elementoLi.appendChild(botonBorrar);
      lista.appendChild(elementoLi);
      if (elemento.estado == 1) {
        checkbox.checked = true;
        elementoLi.classList.add("completed");
      }
    }
  }
}

/**
 *
 * @param {Event} e Evento de click sobre la checkbox
 */
export function validarTarea(e) {
  const elementoLi = e.target.closest("#lid");

  if (!elementoLi.classList.contains("completed")) {
    sustituirLocalStorage(elementoLi.getAttribute("uuid"));
    elementoLi.classList.add("completed");
  } else {
    sustituirLocalStorage(elementoLi.getAttribute("uuid"));
    elementoLi.classList.remove("completed");
  }
}

/**
 * Borrar tareas del html y del localstorage
 * @param {} e
 */
export function borrarTarea(e, listaTareas) {
  const elementoLi = e.target.closest("#lid");
  elementoLi.remove();
  borrarLocalStorage(elementoLi.getAttribute("uuid"));
}

export function buscarTarea(texto, lista) {
  const tareas = cargarLocalStorage();
  if (tareas.length === 0 || detectarTextoIgual(texto, tareas) === false) {
    const modal = document.createElement("dialog");
    //Unimos al div contenedor el dialog y mostramos la información
    document.body.appendChild(modal);
    modal.textContent = "¡¡¡Tarea no encontrada!!!, pulsa para salir.";
    modal.showModal();
    modal.addEventListener("click", (r) => {
      modal.close();
    });
  } else {
    const tareaEncontrada = detectarTextoIgual(texto, tareas);
    const modal = document.createElement("dialog");
    //Unimos al div contenedor el dialog y mostramos la información
    document.body.appendChild(modal);
    modal.textContent =
      "Tarea encontrada!! El texto de la tarea es: '" +
      tareaEncontrada.tarea +
      "'. Haz click para salir";
    modal.showModal();
    modal.addEventListener("click", (r) => {
      modal.close();
    });
  }
}

function detectarTextoIgual(texto, tareas) {
  for (let tarea of tareas) {
    if (tarea.tarea === texto) {
      return tarea; //devulve el objeto tarea del localstorage
    }
  }
  return false;
}
