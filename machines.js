// ============================================
// MACHINES.JS - Gestión de Máquinas
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const formAgregarMaquina = document.getElementById('formAgregarMaquina');
    
    // Cargar máquinas al iniciar
    cargarMaquinas();
    
    // Manejar formulario de agregar máquina
    formAgregarMaquina.addEventListener('submit', function(e) {
        e.preventDefault();
        agregarMaquina();
    });
});

// ============================================
// FUNCIONES DE GESTIÓN DE MÁQUINAS
// ============================================

/**
 * Obtiene todas las máquinas guardadas
 */
function obtenerMaquinas() {
    const maquinasJSON = localStorage.getItem('maquinas');
    return maquinasJSON ? JSON.parse(maquinasJSON) : [];
}

/**
 * Guarda las máquinas en LocalStorage
 */
function guardarMaquinas(maquinas) {
    localStorage.setItem('maquinas', JSON.stringify(maquinas));
}

/**
 * Agrega una nueva máquina
 */
function agregarMaquina() {
    const nombre = document.getElementById('nombreMaquina').value.trim();
    const ubicacion = document.getElementById('ubicacion').value.trim();
    
    // Validar que no exista una máquina con el mismo nombre
    const maquinas = obtenerMaquinas();
    const existe = maquinas.find(m => m.nombre.toLowerCase() === nombre.toLowerCase());
    
    if (existe) {
        alert('❌ Ya existe una máquina con ese nombre. Por favor usa otro nombre.');
        return;
    }
    
    // Crear nueva máquina
    const nuevaMaquina = {
        id: Date.now(),
        nombre: nombre,
        ubicacion: ubicacion || 'Sin ubicación',
        fechaCreacion: new Date().toISOString()
    };
    
    // Guardar
    maquinas.push(nuevaMaquina);
    guardarMaquinas(maquinas);
    
    // Limpiar formulario
    document.getElementById('formAgregarMaquina').reset();
    
    // Recargar lista
    cargarMaquinas();
    
    mostrarNotificacion('✅ Máquina agregada exitosamente');
}

/**
 * Elimina una máquina
 */
function eliminarMaquina(id) {
    if (!confirm('⚠️ ¿Estás seguro de que quieres eliminar esta máquina?\n\nSe eliminará la máquina y TODO su historial de registros. Esta acción no se puede deshacer.')) {
        return;
    }
    
    let maquinas = obtenerMaquinas();
    maquinas = maquinas.filter(m => m.id !== id);
    guardarMaquinas(maquinas);
    
    // También eliminar los registros de esta máquina
    localStorage.removeItem(`registros_${id}`);
    
    cargarMaquinas();
    mostrarNotificacion('✅ Máquina eliminada');
}

/**
 * Carga y muestra todas las máquinas
 */
function cargarMaquinas() {
    const maquinas = obtenerMaquinas();
    const listaMaquinas = document.getElementById('listaMaquinas');
    const mensajeVacio = document.getElementById('mensajeVacio');
    
    // Limpiar lista
    listaMaquinas.innerHTML = '';
    
    if (maquinas.length === 0) {
        mensajeVacio.style.display = 'block';
        actualizarResumenGeneral(0, 0, 0, 0);
        return;
    }
    
    mensajeVacio.style.display = 'none';
    
    // Variables para totales
    let totalEntrada = 0;
    let totalSalida = 0;
    let totalUtilidad = 0;
    
    // Crear tarjeta para cada máquina
    maquinas.forEach(maquina => {
        const stats = obtenerEstadisticasMaquina(maquina.id);
        totalEntrada += stats.totalEntrada;
        totalSalida += stats.totalSalida;
        totalUtilidad += stats.utilidad;
        
        const tarjeta = document.createElement('div');
        tarjeta.className = 'maquina-card';
        
        const claseUtilidad = stats.utilidad >= 0 ? 'positivo' : 'negativo';
        
        tarjeta.innerHTML = `
            <div class="maquina-header">
                <h3>🎰 ${maquina.nombre}</h3>
                <button class="btn-icon btn-eliminar-maquina" onclick="eliminarMaquina(${maquina.id})" title="Eliminar máquina">
                    🗑️
                </button>
            </div>
            <p class="maquina-ubicacion">📍 ${maquina.ubicacion}</p>
            <div class="maquina-stats">
                <div class="stat-item">
                    <span class="stat-label">Total Echado:</span>
                    <span class="stat-value">$${stats.totalEntrada.toFixed(2)}</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">Total Pagado:</span>
                    <span class="stat-value">$${stats.totalSalida.toFixed(2)}</span>
                </div>
                <div class="stat-item highlight">
                    <span class="stat-label">Utilidad:</span>
                    <span class="stat-value ${claseUtilidad}">$${stats.utilidad.toFixed(2)}</span>
                </div>
            </div>
            <button class="btn btn-primary btn-ver-maquina" onclick="verMaquina(${maquina.id})">
                Ver Detalle →
            </button>
        `;
        
        listaMaquinas.appendChild(tarjeta);
    });
    
    // Actualizar resumen general
    actualizarResumenGeneral(maquinas.length, totalEntrada, totalSalida, totalUtilidad);
}

/**
 * Obtiene las estadísticas de una máquina específica
 */
function obtenerEstadisticasMaquina(idMaquina) {
    const registros = obtenerRegistrosMaquina(idMaquina);
    
    let totalRecaudado = 0;
    let totalPremiosPagados = 0;
    
    // Sumar TODOS los recaudos y premios pagados
    registros.forEach(registro => {
        totalRecaudado += registro.recaudo || 0;
        totalPremiosPagados += registro.premiosPagados || 0;
    });
    
    return {
        totalEntrada: totalRecaudado,
        totalSalida: totalPremiosPagados,
        utilidad: totalRecaudado - totalPremiosPagados
    };
}

/**
 * Obtiene los registros de una máquina específica
 */
function obtenerRegistrosMaquina(idMaquina) {
    const registrosJSON = localStorage.getItem(`registros_${idMaquina}`);
    return registrosJSON ? JSON.parse(registrosJSON) : [];
}

/**
 * Actualiza el resumen general
 */
function actualizarResumenGeneral(totalMaquinas, totalEntrada, totalSalida, totalUtilidad) {
    document.getElementById('totalMaquinas').textContent = totalMaquinas;
    document.getElementById('totalEntrada').textContent = `$${totalEntrada.toFixed(2)}`;
    document.getElementById('totalSalida').textContent = `$${totalSalida.toFixed(2)}`;
    document.getElementById('utilidadTotal').textContent = `$${totalUtilidad.toFixed(2)}`;
}

/**
 * Redirige a la página de detalle de una máquina
 */
function verMaquina(idMaquina) {
    window.location.href = `maquina.html?id=${idMaquina}`;
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Muestra una notificación temporal
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
