
function calcularInflacion(precioInicial, añoInicio, mesInicio, añoFin, mesFin) {
    const meses = ["Enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
    
    let inflacionAcumulada = 1.0;
    console.log(`Inicio del cálculo de inflación.`)
    console.log(`Precio inicial: `, precioInicial)
    console.log(`Desde: `, mesInicio, añoInicio)
    console.log(`Hasta: `, mesFin, añoFin)

    let iAñoInicio = años.findIndex(a => a.nombre === añoInicio.trim())
    let iAñoFin = años.findIndex(a => a.nombre === añoFin.trim())

    if (iAñoInicio === -1 || iAñoFin === -1) {
        console.error("Año de inicio o fin no encontrado en los datos.")
        return null;
    }

    for (let i = iAñoInicio; i <= iAñoFin; i++) {
        let año = años[i]
        let mesInicioIndex = (i === iAñoInicio) ? meses.indexOf(mesInicio.trim()) : 0
        let mesFinIndex = (i === iAñoFin) ? meses.indexOf(mesFin.trim()) : meses.length - 1

        for (let j = mesInicioIndex; j <= mesFinIndex; j++) {
            if (meses[j] in año) {
                console.log(`Mes: ${meses[j]} ${año.nombre}, Inflación: ${año[meses[j]]}%`)
                inflacionAcumulada *= (1 + (año[meses[j]] / 100))
            }
        }
    }

    const inflacionAcumuladaPorcentaje = ((inflacionAcumulada - 1) * 100).toFixed(1)
    console.log("Inflación acumulada: %" + inflacionAcumuladaPorcentaje)
    const precioFinal = precioInicial * inflacionAcumulada
    console.log("Precio final ajustado por inflación: $" + precioFinal.toFixed(2) + " con una inflación acumulada de: %" + inflacionAcumuladaPorcentaje)
    
    return { precioFinal, inflacionAcumuladaPorcentaje }
}

document.getElementById("calcularBt").addEventListener("click", function() {
    const precioInicial = parseFloat(document.getElementById("precioInicial").value)
    const fechaInicio = new Date(document.getElementById("fechaInicio").value)
    const fechaFin = new Date(document.getElementById("fechaFin").value)

    if (isNaN(precioInicial) || isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor ingrese todos los datos correctamente",
            backdrop: 'rgba(0, 123, 255, 0.3)'
          });
        return;
    }

    const añoInicio = fechaInicio.getFullYear().toString()
    const mesInicio = fechaInicio.toLocaleString('es-ES', { month: 'long' })
    const añoFin = fechaFin.getFullYear().toString()
    const mesFin = fechaFin.toLocaleString('es-ES', { month: 'long' })

    const resultado = calcularInflacion(precioInicial, añoInicio, mesInicio, añoFin, mesFin)

    if (resultado !== null) {
        document.getElementById("precioFinal").innerText = resultado.precioFinal.toFixed(2);
        document.getElementById("inflacionAcumulada").innerText = resultado.inflacionAcumuladaPorcentaje + "%"
        Swal.fire({
            title: "Perfecto!",
            text: "La inflacion fue calculada exitosamente",
            icon: "success",
            backdrop: 'rgba(0, 123, 255, 0.3)',
            timer: 1500
          });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al calcular la inflacion, revise los datos ingresados",
            backdrop: 'rgba(0, 123, 255, 0.3)'
          });
    }
})



