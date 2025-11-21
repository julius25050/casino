// ============================================
// AUTH.JS - Sistema de Autenticación
// ============================================

/**
 * CONFIGURACIÓN DE CREDENCIALES
 * Puedes cambiar el usuario y contraseña aquí
 */
const CREDENCIALES = {
    usuario: 'admin',
    contrasena: 'casino123'
};

/**
 * Valida las credenciales del usuario
 */
function validarCredenciales(usuario, contrasena) {
    return usuario === CREDENCIALES.usuario && contrasena === CREDENCIALES.contrasena;
}

/**
 * Verifica si hay una sesión activa
 */
function verificarSesion() {
    const sesionActiva = localStorage.getItem('sesionActiva');
    
    if (sesionActiva !== 'true') {
        // No hay sesión, redirigir al login
        window.location.href = 'login.html';
    }
}

/**
 * Cierra la sesión actual
 */
function cerrarSesion() {
    localStorage.removeItem('sesionActiva');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
}

// Solo ejecutar en el navegador (lado del cliente)
if (typeof window !== 'undefined') {
    // Verificar sesión en páginas protegidas
    if (window.location.pathname.includes('index.html') || window.location.pathname.includes('maquina.html')) {
        verificarSesion();
    }

    // Agregar evento al botón de cerrar sesión si existe
    document.addEventListener('DOMContentLoaded', function() {
        const btnCerrarSesion = document.getElementById('btnCerrarSesion');
        if (btnCerrarSesion) {
            btnCerrarSesion.addEventListener('click', cerrarSesion);
        }
    });
}
