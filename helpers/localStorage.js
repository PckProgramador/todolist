/**
 * Funcion que guarda en local storage la nueva tarea
 * @param {Object} objeto objeto con el texto de la tarea
 */
export function guardarLocalStorage(objeto) {
  if (localStorage.getItem("tareas")) {
    const datosGuardados = JSON.parse(localStorage.getItem("tareas"));
    const datosNuevos = [].concat(datosGuardados, objeto);
    localStorage.setItem("tareas", JSON.stringify(datosNuevos));
  } else {
    localStorage.setItem("tareas", JSON.stringify(objeto));
  }
}

/**
 *
 * @param {String} id Id del objeto dentro del localStorage que esta en el dataAtribute UUID
 * @returns true si se ha cumplido, sino no se ha sustituido
 */
export function sustituirLocalStorage(id) {
  if (localStorage.getItem("tareas")) {
    const datosGuardados = JSON.parse(localStorage.getItem("tareas"));
    let datosNuevos;
    if (Array.isArray(datosGuardados)) {
      datosNuevos = Array.from(datosGuardados);
    } else {
      datosNuevos = Array.from([datosGuardados]);
    }

    for (let elemento of datosNuevos) {
      if (elemento.id === id) {
        if (elemento.estado == 0) {
          elemento.estado = 1;
        } else {
          elemento.estado = 0;
        }
        localStorage.setItem("tareas", JSON.stringify(datosNuevos));
        return true;
      }
    }
    localStorage.setItem("tareas", JSON.stringify(datosNuevos));
  } else {
    localStorage.setItem("tareas", JSON.stringify(objeto));
  }
}

/**
 *
 * @returns devuelve las tareas cargadas en el localstorage
 * Si no hay tareas te devuelve un array vacio para no mostrar nada
 */
export function cargarLocalStorage() {
  let arrayTareas = [];
  if (localStorage.getItem("tareas")) {
    arrayTareas = [].concat(JSON.parse(localStorage.getItem("tareas")));
  }

  return arrayTareas;
}

/**
 * Funcion que borra del localStorage una tarea por el uuiid
 */
export function borrarLocalStorage(id) {
  const datosGuardados = JSON.parse(localStorage.getItem("tareas"));
  let datosNuevos;
  let datosSinObjeto = [];
  if (Array.isArray(datosGuardados)) {
    datosNuevos = Array.from(datosGuardados);
  } else {
    datosNuevos = Array.from([datosGuardados]);
  }

  for (let elemento of datosNuevos) {
    if (elemento.id != id) {
      datosSinObjeto.push(elemento);
    }
  }
  localStorage.setItem("tareas", JSON.stringify(datosSinObjeto));
}
