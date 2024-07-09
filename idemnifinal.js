//Idemnizaciones.

const importeagregado = 1.21

function calcularIndemnizacion(sueldo, años, fallecimiento) {
    let sueldobase = parseFloat(sueldo) * importeagregado
    let sueldox = sueldobase * años

    if (fallecimiento === "si") {
        sueldox = sueldox * 0.50
    }

    return sueldox
}

document.querySelector("#calcularBtn").addEventListener("click", function() {
    const sueldo = document.querySelector("#salario").value
    const años = document.querySelector("#anios").value
    const fallecimiento = document.querySelector("#despido").value

    if (sueldo !== "" && años !== "" && fallecimiento !== "Seleccionar...") {
        const indemnizacion = calcularIndemnizacion(sueldo, años, fallecimiento)
        document.querySelector("#valorIdemnizacion").innerText = indemnizacion.toFixed(2)
        guardarIndemnizacionEnLS(indemnizacion)
        Swal.fire({
            title: "Perfecto!",
            text: "La idemnizacion fue calculada exitosamente",
            icon: "success",
            backdrop: 'rgba(0, 123, 255, 0.3)'
          });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Hubo algun problema! Porfavor revisa los datos",
            backdrop: 'rgba(0, 123, 255, 0.3)'
          });
    }
})

//Local Storage

function recuperarUltimaIdemnizacion() {
    return JSON.parse(localStorage.getItem("ultimaIndemnizacion"))
}

function guardarIndemnizacionEnLS(indemnizacion) {
    const ultimaIndemnizacion = {
        fecha: new Date(),
        indemnizacion: indemnizacion.toFixed(2)
    };

    localStorage.setItem("ultimaIndemnizacion", JSON.stringify(ultimaIndemnizacion))
}

document.querySelector("#btnverultimaidemnizacion").addEventListener("click", () => {
    const ultimaIndemnizacion = recuperarUltimaIdemnizacion()

    if (ultimaIndemnizacion !== null) {
        Swal.fire({
            text: "Su última indemnización fue el: " + new Date(ultimaIndemnizacion.fecha).toLocaleString() + " con un monto de: $" + ultimaIndemnizacion.indemnizacion, 
            width: 600,
            padding: "3em",
            color: "#716add",
            backdrop: `
              rgba(0,0,123,0.4)
              left top
              no-repeat`
          });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se han realizado cotizaciones previamente",
            backdrop: 'rgba(0, 123, 255, 0.3)'
          });
    }
})

Swal.fire({
    text: "Su última indemnización fue el: " + new Date(ultimaIndemnizacion.fecha).toLocaleString() + " con un monto de: $" + ultimaIndemnizacion.indemnizacion, 
    width: 600,
    padding: "3em",
    color: "#716add",
    background: "#fff url(/images/trees.png)",
    backdrop: `
      rgba(0,0,123,0.4)
      url("/images/nyan-cat.gif")
      left top
      no-repeat
    `
  });