# 🎰 Sistema de Control de Máquinas de Casino

## 📋 ¿Qué es esto?

Este es un sistema completo para llevar el control de múltiples máquinas de casino. Te permite:
- 🔐 **Iniciar sesión** con usuario y contraseña para proteger tus datos
- ➕ **Agregar y eliminar máquinas** según las necesites
- 💰 **Registrar contadores individuales** para cada máquina
- 📊 **Ver estadísticas en tiempo real** de cada máquina
- 📜 **Historial individual** por cada máquina
- 📈 **Resumen general** de todas tus máquinas
- 🎯 **Cálculo automático** de utilidades

---

## 🚀 Cómo usar el sistema (Guía Paso a Paso)

### 🔐 Paso 1: Iniciar Sesión

1. Ve a la carpeta `casino` en tu escritorio
2. Busca el archivo **`login.html`**
3. **Haz doble clic en `login.html`** para abrir el sistema
4. Verás la pantalla de inicio de sesión
5. Ingresa las credenciales:
   - **Usuario:** `admin`
   - **Contraseña:** `casino123`
6. Haz clic en **"Iniciar Sesión"**

> 💡 **Importante:** Estas son las credenciales por defecto. Más adelante te explico cómo cambiarlas.

### ➕ Paso 2: Agregar Máquinas

1. Una vez dentro, verás la página principal con todas tus máquinas
2. En la parte superior está el formulario **"Agregar Nueva Máquina"**
3. Llena los datos:
   - **Nombre de la Máquina**: Por ejemplo "Máquina 1", "Máquina A", etc.
   - **Ubicación** (opcional): Por ejemplo "Sala principal", "Entrada", etc.
4. Haz clic en **"Agregar Máquina"**
5. La máquina aparecerá en la lista abajo

> 📝 **Puedes agregar hasta 20 máquinas o las que necesites**

### 📊 Paso 3: Registrar Contadores de una Máquina

1. En la lista de máquinas, haz clic en **"Ver Detalle →"** de la máquina que quieres actualizar
2. Verás la página individual de esa máquina con:
   - Los contadores actuales (General y Premios)
   - La utilidad actual
   - El historial de registros
3. Para agregar un nuevo registro, llena el formulario:
   - **Contador General**: El contador actual de dinero echado (acumulativo)
   - **Contador de Premios**: El contador actual de premios pagados (acumulativo)
   - **Fecha**: La fecha del registro
   - **Notas** (opcional): Cualquier observación
4. Haz clic en **"Guardar Registro"**

> ⚠️ **Importante:** Los contadores son **acumulativos**. Debes ingresar el valor total que muestra el contador de la máquina, no solo lo que se agregó ese día.

### 📈 Paso 4: Ver Estadísticas

**En la página individual de cada máquina verás:**
- 💰 **Contador General**: Total de dinero echado a la máquina
- 🎁 **Contador de Premios**: Total de dinero pagado por la máquina
- 💵 **Utilidad Total**: Ganancia o pérdida (Echado - Pagado)
  - **Verde** = Ganancia
  - **Rojo** = Pérdida

**En la página principal verás:**
- Total de máquinas registradas
- Total de dinero echado a TODAS las máquinas
- Total de dinero pagado por TODAS las máquinas
- Utilidad total del negocio

### 📜 Paso 5: Ver el Historial

**Historial individual:**
- Cada máquina tiene su propio historial
- Muestra todos los registros ordenados por fecha (más recientes primero)
- Puedes eliminar registros individuales si es necesario

**Para ver el historial de una máquina:**
1. Ve a la página de la máquina (botón "Ver Detalle")
2. Desplázate hacia abajo para ver la tabla de historial

### 🗑️ Paso 6: Eliminar Máquinas o Registros

**Para eliminar una máquina completa:**
- En la página principal, haz clic en el ícono 🗑️ de la máquina
- Confirma la eliminación
- ⚠️ Esto borrará la máquina y TODO su historial

**Para eliminar un registro específico:**
- Ve a la página de la máquina
- En el historial, haz clic en "Eliminar" en la fila del registro

**Para limpiar todo el historial de una máquina:**
- Ve a la página de la máquina
- Haz clic en "Limpiar Historial"
- Confirma la acción

### 🚪 Paso 7: Cerrar Sesión

- En cualquier página, haz clic en el botón **"Cerrar Sesión"** (arriba a la derecha)
- Serás redirigido al login
- Tus datos están guardados y seguros

---

## 📚 Conceptos Explicados (para principiantes)

### 1. ¿Qué es HTML?
- **HTML** es como el "esqueleto" de la página web
- Define la estructura: títulos, formularios, tablas, botones, etc.
- El archivo `index.html` contiene toda la estructura de la página

### 2. ¿Qué es CSS?
- **CSS** es el "diseño" o "estilo" de la página
- Define los colores, tamaños, espacios, animaciones, etc.
- El archivo `styles.css` hace que la página se vea bonita

### 3. ¿Qué es JavaScript?
- **JavaScript** es el "cerebro" de la página
- Hace que la página sea interactiva (botones, cálculos, guardar datos)
- El archivo `script.js` contiene toda la lógica de la aplicación

### 4. ¿Qué es LocalStorage?
- **LocalStorage** es como una "caja de almacenamiento" en tu navegador
- Guarda los datos de forma automática y permanente
- Los datos NO se borran cuando cierras el navegador
- Los datos se guardan SOLO en ese navegador de ese dispositivo
- ⚠️ **Importante**: Si borras los datos del navegador o usas "modo incógnito", los datos se perderán

### 5. ¿Qué archivos tengo y para qué sirven?
```
casino/
├── login.html      ← Página de inicio de sesión (ABRIR ESTE PRIMERO)
├── index.html      ← Página principal con lista de máquinas
├── maquina.html    ← Página de detalle de cada máquina
├── styles.css      ← Diseño y colores de todo el sistema
├── auth.js         ← Maneja el inicio de sesión y seguridad
├── machines.js     ← Gestión de máquinas (agregar, eliminar, listar)
├── maquina.js      ← Gestión de registros de cada máquina
└── README.md       ← Este archivo con todas las instrucciones
```

---

## ⚙️ Cómo funciona técnicamente

### Sistema de Autenticación
1. Cuando inicias sesión, el sistema valida tu usuario y contraseña
2. Si son correctos, guarda una "sesión activa" en LocalStorage
3. Todas las páginas verifican si hay sesión activa
4. Si no hay sesión, te redirige automáticamente al login
5. Al cerrar sesión, se borra la sesión activa

### Gestión de Máquinas
1. Cada máquina tiene un ID único (timestamp)
2. Las máquinas se guardan en LocalStorage como un array
3. Los registros de cada máquina se guardan por separado con la clave `registros_{ID}`
4. Esto permite tener un historial independiente para cada máquina

### Cálculo de Utilidades
1. Los contadores son **acumulativos** (como los contadores reales de las máquinas)
2. El último registro siempre tiene los valores más actuales
3. La utilidad se calcula: Contador General - Contador de Premios
4. Los totales generales suman las utilidades de todas las máquinas

### Almacenamiento de Datos
- **LocalStorage** es una "base de datos" local del navegador
- Los datos NO desaparecen al cerrar el navegador
- Los datos están solo en ESE navegador de ESA computadora
- NO necesitas internet para que funcione

---

## ❓ Preguntas Frecuentes

### ¿Necesito internet para usar esta página?
**No.** La página funciona completamente sin internet porque todos los archivos están en tu computadora.

### ¿Los datos se sincronizan en otros dispositivos?
**No.** Los datos se guardan solo en el navegador de tu computadora. Si quieres acceder desde otro dispositivo, necesitarías una versión con servidor (más avanzada).

### ¿Cómo cambio el usuario y contraseña?
1. Ve a la carpeta `casino`
2. Haz clic derecho en el archivo `auth.js`
3. Abre con Bloc de notas (o cualquier editor de texto)
4. En las primeras líneas verás:
   ```javascript
   const CREDENCIALES = {
       usuario: 'admin',
       contrasena: 'casino123'
   };
   ```
5. Cambia `'admin'` por tu usuario deseado
6. Cambia `'casino123'` por tu contraseña deseada
7. Guarda el archivo
8. Listo, ahora usa las nuevas credenciales para entrar

### ¿Qué pasa si borro el caché del navegador?
Si borras los datos de navegación (caché, cookies, etc.), los registros se perderán. Ten cuidado al hacer esto.

### ¿Puedo usar esta página en mi teléfono?
Sí, puedes copiar la carpeta `casino` a tu teléfono y abrir el archivo `index.html` con un navegador móvil. La página está diseñada para funcionar en pantallas pequeñas (responsive).

### ¿Puedo cambiar los colores o el diseño?
Sí, puedes editar el archivo `styles.css` para cambiar colores, tamaños, etc. Si no sabes cómo, pregúntame.

### ¿Puedo hacer una copia de seguridad de los datos?
Los datos están almacenados en el navegador. Para hacer una copia de seguridad manual:
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Application" o "Almacenamiento"
3. Busca "Local Storage"
4. Copia el contenido de "registrosCasino"

En el futuro podríamos agregar una función para exportar los datos a un archivo Excel o CSV.

---

## 🔧 Solución de Problemas

### La página no se abre
- Asegúrate de abrir el archivo `index.html` (no los otros archivos)
- Haz clic derecho sobre `index.html` → "Abrir con" → Elige tu navegador

### No se guardan los registros
- Verifica que estés usando un navegador moderno (Chrome, Firefox, Edge actualizados)
- No uses el modo incógnito/privado del navegador
- Asegúrate de no tener bloqueadores que impidan usar LocalStorage

### La página se ve mal o sin colores
- Asegúrate de que el archivo `styles.css` esté en la misma carpeta que `index.html`
- Verifica que los tres archivos estén juntos en la misma carpeta

### Los botones no funcionan
- Asegúrate de que el archivo `script.js` esté en la misma carpeta que `index.html`
- Abre la consola del navegador (F12) y busca errores

---

## 📞 Soporte

Si tienes algún problema o quieres agregar nuevas funcionalidades, ¡no dudes en preguntar!

### Mejoras que se pueden agregar en el futuro:
- 📊 Exportar datos a Excel o CSV
- 📈 Gráficas de rendimiento por máquina
- 🔍 Filtros y búsquedas avanzadas
- 📱 Versión con servidor para acceso desde múltiples dispositivos
- 💾 Copia de seguridad automática con descarga de archivos
- 🖨️ Generar reportes en PDF
- 👥 Múltiples usuarios con diferentes niveles de acceso
- 📅 Reportes por rangos de fechas
- 🔔 Alertas cuando una máquina tenga pérdidas

---

## 📝 Notas Importantes

1. **Todos los archivos deben estar en la misma carpeta** para que funcione correctamente
2. **No necesitas instalar nada**, solo abrir `login.html`
3. **Siempre abre `login.html` primero** para iniciar el sistema
4. **Los datos se guardan automáticamente** cada vez que agregas algo
5. **Esta es una versión local**, solo funciona en tu computadora
6. **Haz copias de seguridad** de la carpeta completa regularmente
7. **Los contadores son acumulativos**, ingresa siempre el valor total que muestra la máquina
8. **Cambia las credenciales por defecto** para mayor seguridad

---

¡Listo! Ya puedes empezar a usar tu sistema de control de máquinas de casino. 🎰✨
