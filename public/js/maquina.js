// ============================================
// MAQUINA.JS - Gestión de Máquina Individual
// ============================================

// Variables globales
let maquinaActual = null;
let idMaquinaActual = null;

document.addEventListener('DOMContentLoaded', function() {
    // Obtener ID de la máquina de la URL
    const urlParams = new URLSearchParams(window.location.search);
    idMaquinaActual = parseInt(urlParams.get('id'));
    
    if (!idMaquinaActual) {
        alert('❌ No se especificó una máquina válida');
        window.location.href = 'index.html';
        return;
    }
    
    // Cargar información de la máquina
    cargarInfoMaquina();
    
    // Cargar historial
    cargarHistorial();
    
    // Configurar fecha actual
    document.getElementById('fecha').valueAsDate = new Date();
    
    // Manejar formulario de registro
    document.getElementById('formRegistro').addEventListener('submit', function(e) {
        e.preventDefault();
        agregarRegistro();
    });
    
    // Manejar botón de limpiar historial
    document.getElementById('btnLimpiarHistorial').addEventListener('click', function() {
        limpiarHistorial();
    });
    
    // Manejar filtros de fecha
    document.getElementById('btnFiltrar').addEventListener('click', function() {
        filtrarPorFechas();
    });
    
    document.getElementById('btnLimpiarFiltro').addEventListener('click', function() {
        limpiarFiltro();
    });
});

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

/**
 * Carga la información de la máquina
 */
function cargarInfoMaquina() {
    const maquinas = obtenerMaquinas();
    maquinaActual = maquinas.find(m => m.id === idMaquinaActual);
    
    if (!maquinaActual) {
        alert('❌ Máquina no encontrada');
        window.location.href = 'index.html';
        return;
    }
    
    // Actualizar título
    document.getElementById('nombreMaquinaHeader').textContent = `🎰 ${maquinaActual.nombre}`;
    document.getElementById('ubicacionMaquina').textContent = `📍 ${maquinaActual.ubicacion}`;
    
    // Actualizar contadores
    actualizarContadores();
}

/**
 * Actualiza los contadores de la máquina
 */
function actualizarContadores() {
    const registros = obtenerRegistrosMaquina(idMaquinaActual);
    
    let contadorActual = 0;
    let premiosActual = 0;
    let totalRecaudado = 0;
    let totalPremiosPagados = 0;
    let ultimoRecaudo = 0;
    let ultimosPremios = 0;
    let ultimaUtilidad = 0;
    
    if (registros.length > 0) {
        // Ordenar por fecha para obtener el más reciente
        registros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        const ultimoRegistro = registros[0];
        
        // El contador actual es el del último registro
        contadorActual = ultimoRegistro.contadorActual;
        premiosActual = ultimoRegistro.premiosActual;
        
        // Valores del último período
        ultimoRecaudo = ultimoRegistro.recaudo;
        ultimosPremios = ultimoRegistro.premiosPagados;
        ultimaUtilidad = ultimoRegistro.utilidadPeriodo;
        
        // Calcular totales sumando todas las diferencias
        registros.forEach(registro => {
            totalRecaudado += registro.recaudo;
            totalPremiosPagados += registro.premiosPagados;
        });
    }
    
    const utilidadTotal = totalRecaudado - totalPremiosPagados;
    
    // Contadores actuales
    document.getElementById('contadorGeneral').textContent = `$${contadorActual.toFixed(2)}`;
    document.getElementById('contadorPremios').textContent = `$${premiosActual.toFixed(2)}`;
    
    // Último período
    document.getElementById('ultimoRecaudo').textContent = `$${ultimoRecaudo.toFixed(2)}`;
    document.getElementById('ultimosPremios').textContent = `$${ultimosPremios.toFixed(2)}`;
    
    const ultimaUtilidadElement = document.getElementById('ultimaUtilidad');
    ultimaUtilidadElement.textContent = `$${ultimaUtilidad.toFixed(2)}`;
    ultimaUtilidadElement.className = 'info-value ' + (ultimaUtilidad >= 0 ? 'positivo' : 'negativo');
}

/**
 * Agrega un nuevo registro
 */
function agregarRegistro() {
    const contadorActual = parseFloat(document.getElementById('contadorEntrada').value);
    const premiosActual = parseFloat(document.getElementById('contadorSalida').value);
    const fecha = document.getElementById('fecha').value;
    const notas = document.getElementById('notas').value.trim();
    
    // Obtener el registro anterior
    const registros = obtenerRegistrosMaquina(idMaquinaActual);
    let contadorAnterior = 0;
    let premiosAnterior = 0;
    
    if (registros.length > 0) {
        // Ordenar por fecha para obtener el más reciente
        registros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        const ultimoRegistro = registros[0];
        contadorAnterior = ultimoRegistro.contadorActual;
        premiosAnterior = ultimoRegistro.premiosActual;
    }
    
    // Calcular diferencias (recaudo desde la última vez)
    const recaudo = contadorActual - contadorAnterior;
    const premiosPagados = premiosActual - premiosAnterior;
    const utilidadPeriodo = recaudo - premiosPagados;
    
    // Validar que los contadores no sean menores a los anteriores
    if (recaudo < 0) {
        alert('⚠️ El contador actual no puede ser menor al contador anterior.\n\nContador anterior: $' + contadorAnterior.toFixed(2) + '\nContador ingresado: $' + contadorActual.toFixed(2));
        return;
    }
    
    if (premiosPagados < 0) {
        alert('⚠️ El contador de premios actual no puede ser menor al contador anterior.\n\nPremios anterior: $' + premiosAnterior.toFixed(2) + '\nPremios ingresado: $' + premiosActual.toFixed(2));
        return;
    }
    
    // Crear registro
    const registro = {
        id: Date.now(),
        idMaquina: idMaquinaActual,
        contadorActual: contadorActual,
        premiosActual: premiosActual,
        recaudo: recaudo,
        premiosPagados: premiosPagados,
        utilidadPeriodo: utilidadPeriodo,
        fecha: fecha,
        notas: notas,
        fechaCreacion: new Date().toISOString()
    };
    
    // Guardar registro
    guardarRegistro(registro);
    
    // Limpiar formulario
    document.getElementById('formRegistro').reset();
    document.getElementById('fecha').valueAsDate = new Date();
    
    // Recargar
    actualizarContadores();
    cargarHistorial();
    
    mostrarNotificacion('✅ Registro guardado exitosamente');
}

/**
 * Guarda un registro
 */
function guardarRegistro(registro) {
    let registros = obtenerRegistrosMaquina(idMaquinaActual);
    registros.push(registro);
    localStorage.setItem(`registros_${idMaquinaActual}`, JSON.stringify(registros));
}

/**
 * Carga el historial de registros
 */
function cargarHistorial(fechaDesde = null, fechaHasta = null) {
    let registros = obtenerRegistrosMaquina(idMaquinaActual);
    const historialBody = document.getElementById('historialBody');
    const mensajeVacio = document.getElementById('mensajeVacio');
    const resumenPeriodo = document.getElementById('resumenPeriodo');
    
    // Limpiar tabla
    historialBody.innerHTML = '';
    
    if (registros.length === 0) {
        mensajeVacio.style.display = 'block';
        resumenPeriodo.style.display = 'none';
        return;
    }
    
    // Filtrar por fechas si se especificaron
    let registrosFiltrados = registros;
    if (fechaDesde && fechaHasta) {
        registrosFiltrados = registros.filter(registro => {
            const fechaRegistro = new Date(registro.fecha);
            const desde = new Date(fechaDesde);
            const hasta = new Date(fechaHasta);
            return fechaRegistro >= desde && fechaRegistro <= hasta;
        });
        
        if (registrosFiltrados.length === 0) {
            mensajeVacio.style.display = 'block';
            mensajeVacio.textContent = 'No hay registros en el período seleccionado.';
            resumenPeriodo.style.display = 'none';
            return;
        }
        
        // Calcular totales del período
        let totalRecaudoPeriodo = 0;
        let totalPremiosPeriodo = 0;
        
        registrosFiltrados.forEach(registro => {
            totalRecaudoPeriodo += registro.recaudo;
            totalPremiosPeriodo += registro.premiosPagados;
        });
        
        const utilidadPeriodo = totalRecaudoPeriodo - totalPremiosPeriodo;
        
        // Mostrar resumen del período
        document.getElementById('periodoRecaudo').textContent = `$${totalRecaudoPeriodo.toFixed(2)}`;
        document.getElementById('periodoPremios').textContent = `$${totalPremiosPeriodo.toFixed(2)}`;
        
        const periodoUtilidadElement = document.getElementById('periodoUtilidad');
        periodoUtilidadElement.textContent = `$${utilidadPeriodo.toFixed(2)}`;
        periodoUtilidadElement.className = 'resumen-value ' + (utilidadPeriodo >= 0 ? 'positivo' : 'negativo');
        
        resumenPeriodo.style.display = 'block';
    } else {
        resumenPeriodo.style.display = 'none';
    }
    
    mensajeVacio.style.display = 'none';
    mensajeVacio.textContent = 'No hay registros para esta máquina. Agrega tu primer registro arriba.';
    
    // Ordenar por fecha (más recientes primero)
    registrosFiltrados.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    // Crear filas
    registrosFiltrados.forEach(registro => {
        const fila = document.createElement('tr');
        
        const claseUtilidad = registro.utilidadPeriodo >= 0 ? 'positivo' : 'negativo';
        const notasTexto = registro.notas || '-';
        
        fila.innerHTML = `
            <td>${formatearFecha(registro.fecha)}</td>
            <td>$${registro.contadorActual.toFixed(2)}</td>
            <td>$${registro.premiosActual.toFixed(2)}</td>
            <td>$${registro.recaudo.toFixed(2)}</td>
            <td>$${registro.premiosPagados.toFixed(2)}</td>
            <td class="${claseUtilidad}"><strong>$${registro.utilidadPeriodo.toFixed(2)}</strong></td>
            <td>${notasTexto}</td>
            <td>
                <button class="btn btn-eliminar btn-sm" onclick="eliminarRegistro(${registro.id})">
                    Eliminar
                </button>
            </td>
        `;
        
        historialBody.appendChild(fila);
    });
}

/**
 * Elimina un registro
 */
function eliminarRegistro(idRegistro) {
    if (!confirm('¿Estás seguro de que quieres eliminar este registro?')) {
        return;
    }
    
    let registros = obtenerRegistrosMaquina(idMaquinaActual);
    registros = registros.filter(r => r.id !== idRegistro);
    localStorage.setItem(`registros_${idMaquinaActual}`, JSON.stringify(registros));
    
    actualizarContadores();
    cargarHistorial();
    mostrarNotificacion('✅ Registro eliminado');
}

/**
 * Limpia todo el historial de la máquina
 */
function limpiarHistorial() {
    if (!confirm('⚠️ ¿Estás seguro de que quieres eliminar TODO el historial de esta máquina?\n\nEsta acción no se puede deshacer.')) {
        return;
    }
    
    localStorage.removeItem(`registros_${idMaquinaActual}`);
    actualizarContadores();
    cargarHistorial();
    mostrarNotificacion('✅ Historial eliminado');
}

/**
 * Filtra el historial por rango de fechas
 */
function filtrarPorFechas() {
    const fechaDesde = document.getElementById('fechaDesde').value;
    const fechaHasta = document.getElementById('fechaHasta').value;
    
    if (!fechaDesde || !fechaHasta) {
        alert('⚠️ Por favor selecciona ambas fechas (Desde y Hasta)');
        return;
    }
    
    if (new Date(fechaDesde) > new Date(fechaHasta)) {
        alert('⚠️ La fecha "Desde" no puede ser mayor que la fecha "Hasta"');
        return;
    }
    
    cargarHistorial(fechaDesde, fechaHasta);
}

/**
 * Limpia el filtro y muestra todos los registros
 */
function limpiarFiltro() {
    document.getElementById('fechaDesde').value = '';
    document.getElementById('fechaHasta').value = '';
    document.getElementById('resumenPeriodo').style.display = 'none';
    cargarHistorial();
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Obtiene todas las máquinas
 */
function obtenerMaquinas() {
    const maquinasJSON = localStorage.getItem('maquinas');
    return maquinasJSON ? JSON.parse(maquinasJSON) : [];
}

/**
 * Obtiene los registros de una máquina
 */
function obtenerRegistrosMaquina(idMaquina) {
    const registrosJSON = localStorage.getItem(`registros_${idMaquina}`);
    return registrosJSON ? JSON.parse(registrosJSON) : [];
}

/**
 * Formatea una fecha
 */
function formatearFecha(fecha) {
    const partes = fecha.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

/**
 * Muestra una notificación
 */
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Agregar animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
