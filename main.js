//entrada
//obtener ciudad, pais y divs necesarios

const resultado = document.querySelector("#resultado");
const container = document.querySelector(".container");
const formulario = document.querySelector("#formulario");

//proceso
//generar el clima consumiendo api y validar errores
window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});
// formulario.addEventListener("submit", buscarClima);

function buscarClima(e) {
  e.preventDefault();

  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  //validamos errores
  if (ciudad === "" || pais === "") {
    mensajeError("Te falta rellenar los campos");
  } else {
    //consultamos api
    consultarAPI(ciudad, pais);
  }
}

function mensajeError(mensaje) {
  const alert = document.querySelector(".limpia");

  if (!alert) {
    const alerta = document.createElement("div");
    alerta.classList.add("limpia", "bg-white", "text-red-600", "font-bold", "mt-5", "rounded", "text-center", "p-2", "w-8/12", "mx-auto", "md:w-6/12");
    alerta.innerHTML = mensaje;

    //agregar hijo al padre
    container.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 5000);
  }
}

function consultarAPI(ciudad, pais) {
  const apiKey = "a756bd7c6bea46d06935192d5587e1a1";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
  spinner();
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      limpiarHTML();
      if (datos.cod === "404") {
        mensajeError("Dato ingresado no válido");
      } else {
        mostrarClima(datos);
      }
    });
}

//salida
//mostrar al usuario el clima
function mostrarClima(datos) {
  const {
    main: { temp, temp_max, temp_min },
    name,
  } = datos;

  const lugar = name;
  const actual = kelvinCentigrados(temp);
  const max = kelvinCentigrados(temp_max);
  const min = kelvinCentigrados(temp_min);

  //Mostrar lugar
  const mostrarLugar = document.createElement("p");
  mostrarLugar.classList.add("font-bold", "text-gray-700");
  mostrarLugar.innerHTML = `<strong> El Clima en : ${lugar} </strong>`;

  //temperatura actual
  const tempActual = document.createElement("p");
  tempActual.classList.add("font-bold", "text-6xl");
  tempActual.innerHTML = `
    <strong> ${actual} &#8451;</strong>
  `;

  //temperatura maxima
  const tempMax = document.createElement("p");
  tempMax.classList.add("font-bold", "text-3xl");
  tempMax.innerHTML = `
    <strong> Máx: ${max} &#8451;</strong>
  `;

  //temperatura minima
  const tempMin = document.createElement("p");
  tempMin.classList.add("font-bold", "text-2xl");
  tempMin.innerHTML = `
    <strong> Mín: ${min} &#8451;</strong>
  `;

  const resultadoDiv = document.createElement("div");
  resultadoDiv.appendChild(mostrarLugar);
  resultadoDiv.appendChild(tempActual);
  resultadoDiv.appendChild(tempMax);
  resultadoDiv.appendChild(tempMin);

  resultado.appendChild(resultadoDiv);
}

function kelvinCentigrados(temp) {
  return parseInt(temp - 273.15);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function spinner() {
  limpiarHTML();

  const spinner = document.createElement("div");
  spinner.classList.add("sk-cube-grid");
  spinner.innerHTML = `
  <div class="sk-cube sk-cube1"></div>
  <div class="sk-cube sk-cube2"></div>
  <div class="sk-cube sk-cube3"></div>
  <div class="sk-cube sk-cube4"></div>
  <div class="sk-cube sk-cube5"></div>
  <div class="sk-cube sk-cube6"></div>
  <div class="sk-cube sk-cube7"></div>
  <div class="sk-cube sk-cube8"></div>
  <div class="sk-cube sk-cube9"></div>
  `;
  resultado.appendChild(spinner);
}
