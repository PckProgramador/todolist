/**
 * Imports
 */
import { mostrarGrafico } from "./helpers/grafico.js";
import { cargarLocalStorage } from "./helpers/localStorage.js";
import { generateAndDownloadPDF } from "./helpers/pdf.js";
import {
  añadirTarea,
  añadirTareasPrevias,
  validarTarea,
  borrarTarea,
  buscarTarea,
} from "./helpers/tareas.js";

/**
 * Variables globales
 */
const botonAñadir = document.querySelector(".add-task-btn");
const inputAñadir = document.getElementById("new-task-input");
const listaTareas = document.querySelector(".tasks-list-ul");
const botonMostrarGrafico = document.querySelector(".mostrar-graficos-link");
const seccionGrafico = document.querySelector(".grafico-container");
const botonGuardarPdf = document.querySelector(".generar-pdf");
const inputBuscar = document.querySelector(".search-input");
/**
 * Funciones
 */

/**
 * Logica
 */
const tareasLocalStorage = cargarLocalStorage();
añadirTareasPrevias(tareasLocalStorage, listaTareas);
mostrarGrafico(seccionGrafico, cargarLocalStorage());
/**
 * Eventos
 */

botonAñadir.addEventListener("click", (e) => {
  añadirTarea(inputAñadir.value, listaTareas);
  mostrarGrafico(seccionGrafico, cargarLocalStorage());
});

inputAñadir.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    añadirTarea(inputAñadir.value, listaTareas);
  }
  mostrarGrafico(seccionGrafico, cargarLocalStorage());
});

listaTareas.addEventListener("click", (e) => {
  if (e.target.id === "checkboxid") {
    validarTarea(e);
  }

  if (e.target.id == "botonBorrarId") {
    borrarTarea(e, listaTareas);
  }

  mostrarGrafico(seccionGrafico, cargarLocalStorage());
});

botonMostrarGrafico.addEventListener("click", (e) => {
  mostrarGrafico(seccionGrafico, cargarLocalStorage());
});

botonGuardarPdf.addEventListener("click", (e) => {
  generateAndDownloadPDF();
});

inputBuscar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let texto = inputBuscar.value;
    console.log(texto);
    buscarTarea(texto);
  }
});
