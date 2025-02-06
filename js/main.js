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

        
        equipo.puntos = (partidosGanados * 3); // 3 puntos por partido ganado

        
        const diferencia = puntosFavor - puntosContra;

        
        actualizarTabla();
        document.getElementById('resultadoPuntos').innerText = `El equipo ${equipoSeleccionado} tiene ${equipo.puntos} puntos acumulados y una diferencia de ${diferencia} puntos.`;
    }
}


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


function mostrarEquipos() {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = equipos.map(e => `
        <p>${e.nombre}: ${e.puntos} puntos, Diferencia de Puntos: ${e.favor - e.contra}</p>
    `).join('');
}


function filtrarMejores() {
    const mejores = equipos.filter(e => e.puntos >= 10);
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = mejores.length
        ? mejores.map(e => `<p>${e.nombre}: ${e.puntos} puntos</p>`).join('')
        : '<p>No hay equipos con más de 10 puntos.</p>';
}


window.onload = actualizarTabla;



document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const confirmationMessage = document.getElementById("confirmationMessage");

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); 

        
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        
        if (!name || !email || !message) {
            alert("Por favor, completa todos los campos antes de enviar.");
            return;
        }

        
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

        
        confirmationMessage.style.display = "block";

        
        contactForm.reset();


        setTimeout(() => {
            confirmationMessage.style.display = "none";
        }, 5000);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const resultadosDiv = document.getElementById("resultados");


    fetch('../data/resultados.json')
        .then(response => response.json())
        .then(data => {

            mostrarResultados(data);


            document.getElementById("votar-inti").addEventListener("click", () => votarJugador(data, "INTI SELLARES"));
            document.getElementById("votar-maximiliano").addEventListener("click", () => votarJugador(data, "MAXIMILIANO LAGNADO"));
            document.getElementById("votar-german").addEventListener("click", () => votarJugador(data, "GERMAN ROMERO"));
        })
        .catch(error => console.error('Error al cargar los resultados:', error));


    function votarJugador(data, jugadorVotado) {
        const jugadorIndex = data.jugadores.findIndex(j => j.nombre === jugadorVotado);
        if (jugadorIndex !== -1) {
            data.jugadores[jugadorIndex].votos += 1;
        }


        mostrarResultados(data);


        Swal.fire({
            title: '¡Gracias por tu voto!',
            text: `Has votado por ${jugadorVotado}`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }


    function mostrarResultados(data) {

        resultadosDiv.innerHTML = '';


        data.jugadores.forEach(jugador => {
            const p = document.createElement("p");
            p.textContent = `${jugador.nombre}: ${jugador.votos} votos`;
            resultadosDiv.appendChild(p);
        });
    }
});




