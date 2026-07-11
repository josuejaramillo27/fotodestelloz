// ==========================================
// 1. GESTIÓN DE FECHAS OCUPADAS (Tu "Admin")
// ==========================================
// Para deshabilitar fechas, simplemente agrégalas a este arreglo 
// en formato "YYYY-MM-DD". ¡Guarda y haz push a GitHub!
const fechasOcupadas = [
    "2026-07-15",
    "2026-07-18",
    "2026-07-20"
];

// Inicializar el calendario Flatpickr
flatpickr("#fecha-calendario", {
    locale: "es",           // Idioma español
    minDate: "today",       // No permitir fechas pasadas
    disable: fechasOcupadas, // Bloquear las fechas de arriba
    dateFormat: "Y-m-d"
});

// ==========================================
// 2. LÓGICA DEL MODAL Y FORMULARIO
// ==========================================
const modal = document.getElementById('reserva-modal');
const servicioInput = document.getElementById('servicio-seleccionado');
const modalTitle = document.getElementById('modal-title');

function abrirReserva(nombreServicio) {
    servicioInput.value = nombreServicio;
    modalTitle.innerText = `Reservar: ${nombreServicio}`;
    modal.classList.add('active');
}

function cerrarReserva() {
    modal.classList.remove('active');
}

// Cerrar modal si hacen click fuera de la tarjeta
window.onclick = function(event) {
    if (event.target == modal) {
        cerrarReserva();
    }
}

// Mostrar input extra si es evento corporativo
function verificarCorporativo() {
    const tipoEvento = document.getElementById('tipo-evento').value;
    const divCorporativo = document.getElementById('opcion-corporativa');
    
    if (tipoEvento === 'Corporativo') {
        divCorporativo.style.display = 'block';
    } else {
        divCorporativo.style.display = 'none';
        document.getElementById('horas-extra').value = ""; // Limpiar campo
    }
}

// ==========================================
// 3. ENVÍO DE DATOS A WHATSAPP
// ==========================================
document.getElementById('reserva-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evitar que la página recargue

    // Recopilar datos
    const servicio = document.getElementById('servicio-seleccionado').value;
    const nombre = document.getElementById('nombre').value;
    const tipo = document.getElementById('tipo-evento').value;
    const corporativoExtra = document.getElementById('horas-extra').value;
    const local = document.getElementById('local').value;
    const fecha = document.getElementById('fecha-calendario').value;
    const hora = document.getElementById('hora').value;

    // Número de FOTO DESTELLOZ (Sacado del PDF)
    const telefonoVentas = "51997178421"; 

    // Construir mensaje
    let mensaje = `¡Hola Foto Destelloz! 🎉 Quisiera consultar disponibilidad y reservar:\n\n`;
    mensaje += `✨ *Servicio:* ${servicio} (Base 3 Horas)\n`;
    mensaje += `👤 *Mi Nombre:* ${nombre}\n`;
    mensaje += `🎊 *Tipo de Evento:* ${tipo}\n`;
    
    if (tipo === 'Corporativo' && corporativoExtra !== "") {
        mensaje += `🛠️ *Personalización:* ${corporativoExtra}\n`;
    }

    mensaje += `📍 *Lugar:* ${local}\n`;
    mensaje += `🗓️ *Fecha Elegida:* ${fecha}\n`;
    mensaje += `⏰ *Hora de Inicio:* ${hora}\n\n`;
    mensaje += `¡Quedo a la espera de su confirmación!`;

    // Codificar para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Crear link y abrir en nueva pestaña
    const urlWhatsapp = `https://wa.me/${telefonoVentas}?text=${mensajeCodificado}`;
    window.open(urlWhatsapp, '_blank');

    // Cerrar el modal y limpiar el formulario
    cerrarReserva();
    this.reset();
    document.getElementById('opcion-corporativa').style.display = 'none';
});
