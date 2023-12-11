import html2pdf from "html2pdf.js";
// Función para generar y descargar el PDF
export function generateAndDownloadPDF() {
  // Obtén el contenido HTML que quieres convertir a PDF (por ejemplo, el cuerpo del HTML)
  const contenidoHTML = document.querySelector(".grafico-container");

  // Configura las opciones para la generación del PDF
  const opcionesPDF = {
    margin: 10,
    filename: "toDoList.pdf", // Nombre del archivo PDF
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };
  html2pdf()
    .from(contenidoHTML)
    .set(opcionesPDF)
    .save(); /* Aquí pon el archivo PDF generado */
  // Genera el PDF con html2pdf.js

  //   Una vez que el PDF se ha generado, puedes enviarlo al servidor
  //   Utiliza Fetch o Axios para enviar el PDF al servidor
  //   Ejemplo con Fetch:
  // fetch("http://localhost:5173/files", {
  //   method: "POST",
  //   body: html2pdf()
  //     .from(contenidoHTML)
  //     .set(opcionesPDF)
  //     .save() /* Aquí pon el archivo PDF generado */,
  // })
  //   .then((response) => {
  //     // Manejar la respuesta del servidor si es necesario
  //   })
  //   .catch((error) => {
  //     console.error("Error al enviar el archivo PDF al servidor:", error);
  //   });
}
