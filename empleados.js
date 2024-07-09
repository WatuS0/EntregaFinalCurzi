
let empleadoacutal = 0
const empleados = document.querySelectorAll('.empleado')
const totalEmpleados = empleados.length

function showEmployee(index) {

    empleados.forEach(empleado => {
        empleado.classList.remove('active')
    })

    if (index < 0) {
        index = totalEmpleados - 1
    } else if (index >= totalEmpleados) {
        index = 0
    }

    empleados[index].classList.add('active')
    empleadoacutal = index

    const container = document.querySelector('.empleado-container')
    container.style.transform = `translateX(-${empleadoacutal * 100}%)`
}

function prevEmployee() {
    showEmployee(empleadoacutal - 1)
}

function nextEmployee() {
    showEmployee(empleadoacutal + 1)
}

showEmployee(empleadoacutal)
