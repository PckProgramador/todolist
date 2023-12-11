import * as echarts from "echarts";

export function mostrarGrafico(seccionGrafico, arrayTareas) {
  let myChart = echarts.init(seccionGrafico);
  let tareasRealizadas = 0;
  let tareasIncompletas = 0;

  for (let tarea of arrayTareas) {
    tarea.estado === 0 ? tareasIncompletas++ : tareasRealizadas++;
  }
  let option = {
    title: {
      text: "To do list",
      subtext: "Tareas realizadas vs tareas incompletas",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "60%",
        data: [
          { value: tareasRealizadas, name: "Realizadas" },
          { value: tareasIncompletas, name: "Incompletas" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  option && myChart.setOption(option);
}
