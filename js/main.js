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


// Formulario de contacto
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const confirmationMessage = document.getElementById("confirmationMessage");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita el envío tradicional del formulario

        // Capturar valores de los campos
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validación simple de campos
        if (!name || !email || !message) {
            alert("Por favor, completa todos los campos antes de enviar.");
            return;
        }

        // Simular el envío guardando los datos en localStorage
        const contactData = {
            name: name,
            email: email,
            message: message,
            date: new Date().toISOString()
        };

        console.log("Formulario enviado:", contactData);

        let storedContacts = JSON.parse(localStorage.getItem("contactMessages")) || [];
        storedContacts.push(contactData);
        localStorage.setItem("contactMessages", JSON.stringify(storedContacts));

        console.log("Datos guardados en localStorage:", storedContacts);

        // Mostrar mensaje de confirmación
        confirmationMessage.style.display = "block";

        // Limpiar el formulario
        contactForm.reset();

        // Ocultar el mensaje de confirmación después de unos segundos
        setTimeout(() => {
            confirmationMessage.style.display = "none";
        }, 5000);
    });
});
// java de la encuesta en rosters/hof//
document.addEventListener("DOMContentLoaded", () => {
    const resultadosDiv = document.getElementById("resultados");

    // Cargar los resultados desde el archivo JSON
    fetch('../js/data/resultados.json')  // Actualizamos la ruta al archivo JSON
        .then(response => response.json())
        .then(data => {
            // Mostrar los resultados iniciales
            mostrarResultados(data);

            // Funciones para votar por cada jugador
            document.getElementById("votar-inti").addEventListener("click", () => votarJugador(data, "INTI SELLARES"));
            document.getElementById("votar-maximiliano").addEventListener("click", () => votarJugador(data, "MAXIMILIANO LAGNADO"));
            document.getElementById("votar-german").addEventListener("click", () => votarJugador(data, "GERMAN ROMERO"));
        })
        .catch(error => console.error('Error al cargar los resultados:', error));

    // Función para votar por un jugador
    function votarJugador(data, jugadorVotado) {
        const jugadorIndex = data.jugadores.findIndex(j => j.nombre === jugadorVotado);
        if (jugadorIndex !== -1) {
            data.jugadores[jugadorIndex].votos += 1;
        }

        // Mostrar los resultados inmediatamente después de votar
        mostrarResultados(data);

        // Para probar que la actualización funciona, podemos mostrar los datos de votos en consola
        console.log(data.jugadores);
    }

    // Función para mostrar los resultados
    function mostrarResultados(data) {
        // Limpiar los resultados previos
        resultadosDiv.innerHTML = '';

        // Crear un elemento HTML para cada jugador y mostrar sus votos
        data.jugadores.forEach(jugador => {
            const p = document.createElement("p");
            p.textContent = `${jugador.nombre}: ${jugador.votos} votos`;
            resultadosDiv.appendChild(p);
        });
    }
});



