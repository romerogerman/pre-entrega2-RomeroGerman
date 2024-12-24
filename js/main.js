//CALCULADORA DE TABLA DE POSICIONES//

// Array de equipos
const equipos = [
    { nombre: 'Liebres', ganados: 0, perdidos: 0, favor: 0, contra: 0, puntos: 0 },
    { nombre: 'Acorazados', ganados: 0, perdidos: 0, favor: 0, contra: 0, puntos: 0 },
    { nombre: 'Tridentes', ganados: 0, perdidos: 0, favor: 0, contra: 0, puntos: 0 },
    { nombre: 'Krakens', ganados: 0, perdidos: 0, favor: 0, contra: 0, puntos: 0 }
];

// Función para calcular puntos
function calcularPuntosTorneo() {
    const equipoSeleccionado = document.getElementById('equipo').value;
    const partidosGanados = parseInt(document.getElementById('partidosGanados').value);
    const partidosPerdidos = parseInt(document.getElementById('partidosPerdidos').value);
    const puntosFavor = parseInt(document.getElementById('puntosFavor').value);
    const puntosContra = parseInt(document.getElementById('puntosContra').value);

    // Buscar el equipo seleccionado en el array
    const equipo = equipos.find(e => e.nombre === equipoSeleccionado);

    if (equipo) {
        equipo.ganados = partidosGanados;
        equipo.perdidos = partidosPerdidos;
        equipo.favor = puntosFavor;
        equipo.contra = puntosContra;

        // Calcular puntos totales
        equipo.puntos = (partidosGanados * 3); // 3 puntos por partido ganado

        // Actualizar la diferencia de puntos
        const diferencia = puntosFavor - puntosContra;

        // Actualizar la tabla de posiciones
        actualizarTabla();
        document.getElementById('resultadoPuntos').innerText = `El equipo ${equipoSeleccionado} tiene ${equipo.puntos} puntos acumulados y una diferencia de ${diferencia} puntos.`;
    }
}

// Función para actualizar la tabla de posiciones
function actualizarTabla() {
    const tabla = document.getElementById('tablaPosiciones');
    tabla.innerHTML = equipos.map((e, index) => {
        const diferencia = e.favor - e.contra;
        const partidosJugados = e.ganados + e.perdidos;
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${e.nombre}</td>
                <td>${partidosJugados}</td>
                <td>${e.ganados}</td>
                <td>${e.perdidos}</td>
                <td>${e.favor}</td>
                <td>${e.contra}</td>
                <td>${diferencia}</td>
                <td>${e.puntos}</td>
            </tr>
        `;
    }).join('');
}

// Función para mostrar equipos
function mostrarEquipos() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = equipos.map(e => `
        <p>${e.nombre}: ${e.puntos} puntos, Diferencia de Puntos: ${e.favor - e.contra}</p>
    `).join('');
}

// Función para filtrar y mostrar los mejores equipos
function filtrarMejores() {
    const mejores = equipos.filter(e => e.puntos >= 10);
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = mejores.length
        ? mejores.map(e => `<p>${e.nombre}: ${e.puntos} puntos</p>`).join('')
        : '<p>No hay equipos con más de 10 puntos.</p>';
}

// Inicializar la tabla al cargar la página
window.onload = actualizarTabla;
