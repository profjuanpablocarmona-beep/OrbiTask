const input = document.getElementById('tareaInput');
const fechaInput = document.getElementById('fechaInput');
const categoriaInput = document.getElementById('categoriaInput');
const prioridadInput = document.getElementById('prioridadInput');
const boton = document.getElementById('btnAgregar');
const lista = document.getElementById('listaTareas');
const emptyState = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');

let tareas = [];
let filtroActual = 'todas';
let editandoId = null;

// Función para generar ID único
function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Función para formatear fecha
function formatearFecha(fecha) {
    if (!fecha) return null;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaTarea = new Date(fecha + 'T00:00:00');
    const diff = fechaTarea - hoy;
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (dias < 0) return { texto: '⚠️ Vencida', clase: 'overdue' };
    if (dias === 0) return { texto: '🔔 Hoy', clase: 'today' };
    if (dias === 1) return { texto: '📅 Mañana', clase: '' };
    return { texto: `📅 ${fechaTarea.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}`, clase: '' };
}

// Función para mostrar/ocultar estado vacío
function toggleEmptyState() {
    const tareasFiltradas = filtrarTareas();
    if (tareasFiltradas.length === 0) {
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
    }
}

// Función para filtrar tareas
function filtrarTareas() {
    let resultado = tareas;
    
    // Filtro por búsqueda
    const busqueda = searchInput.value.toLowerCase().trim();
    if (busqueda) {
        resultado = resultado.filter(t => 
            t.texto.toLowerCase().includes(busqueda)
        );
    }
    
    // Filtro por categoría/estado
    if (filtroActual !== 'todas') {
        if (filtroActual === 'completadas') {
            resultado = resultado.filter(t => t.completada);
        } else if (filtroActual === 'pendientes') {
            resultado = resultado.filter(t => !t.completada);
        } else {
            resultado = resultado.filter(t => t.categoria === filtroActual);
        }
    }
    
    return resultado;
}

// Función para renderizar tareas
function renderizarTareas() {
    lista.innerHTML = '';
    const tareasFiltradas = filtrarTareas();
    
    // Ordenar por prioridad y luego por fecha
    tareasFiltradas.sort((a, b) => {
        const prioridadOrden = { alta: 3, media: 2, baja: 1 };
        if (prioridadOrden[a.prioridad] !== prioridadOrden[b.prioridad]) {
            return prioridadOrden[b.prioridad] - prioridadOrden[a.prioridad];
        }
        if (a.fecha && b.fecha) {
            return new Date(a.fecha) - new Date(b.fecha);
        }
        return 0;
    });
    
    tareasFiltradas.forEach(tarea => {
        const li = document.createElement('li');
        li.dataset.id = tarea.id;
        if (tarea.completada) li.classList.add('hecho');
        
        const fechaInfo = tarea.fecha ? formatearFecha(tarea.fecha) : null;
        
        li.innerHTML = `
            <div class="task-check">${tarea.completada ? '✓' : ''}</div>
            <div class="task-content">
                <div class="task-text">${tarea.texto}</div>
                <input type="text" class="edit-input" value="${tarea.texto}">
                <div class="task-meta">
                    <span class="task-category ${tarea.categoria}">${getCategoriaIcon(tarea.categoria)}</span>
                    ${tarea.fecha ? `<span class="task-date ${fechaInfo.clase}">${fechaInfo.texto}</span>` : ''}
                    <span class="priority-badge ${tarea.prioridad}">${tarea.prioridad}</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="edit-btn" aria-label="Editar tarea">✏️</button>
                <button class="delete" aria-label="Eliminar tarea">❌</button>
            </div>
        `;
        
        lista.appendChild(li);
    });
    
    toggleEmptyState();
    actualizarDashboard();
}

// Función para obtener icono de categoría
function getCategoriaIcon(categoria) {
    const iconos = {
        personal: '👤 Personal',
        trabajo: '💼 Trabajo',
        urgente: '🔥 Urgente',
        ideas: '💡 Ideas'
    };
    return iconos[categoria] || categoria;
}

// Función para actualizar el dashboard con animaciones
function actualizarDashboard() {
    const totales = tareas.length;
    const hechas = tareas.filter(t => t.completada).length;
    const pendientes = totales - hechas;
    
    // Calcular porcentaje
    const porcentaje = totales > 0 ? Math.round((hechas / totales) * 100) : 0;

    // Actualizar números con animación
    animateNumber('total', totales);
    animateNumber('completadas', hechas);
    animateNumber('pendientes', pendientes);

    // Actualizar porcentaje
    document.getElementById('porcentaje').innerText = porcentaje + '%';
    
    // Actualizar barra de progreso
    document.getElementById('progressBar').style.width = porcentaje + '%';

    // Actualizar barras del gráfico
    const maxHeight = 150;
    const alturaCompletadas = totales > 0 ? (hechas / Math.max(totales, 8)) * maxHeight : 0;
    const alturaPendientes = totales > 0 ? (pendientes / Math.max(totales, 8)) * maxHeight : 0;
    
    document.getElementById('barraCompletadas').style.height = alturaCompletadas + "px";
    document.getElementById('barraPendientes').style.height = alturaPendientes + "px";

    // Actualizar contadores por categoría
    const categorias = ['personal', 'trabajo', 'urgente', 'ideas'];
    categorias.forEach(cat => {
        const count = tareas.filter(t => t.categoria === cat).length;
        document.getElementById(`count-${cat}`).innerText = count;
    });

    // Guardar en localStorage
    guardarTareas();
}

// Animación de números
function animateNumber(elementId, targetNumber) {
    const element = document.getElementById(elementId);
    const currentNumber = parseInt(element.innerText) || 0;
    const increment = targetNumber > currentNumber ? 1 : -1;
    const duration = 300;
    const steps = Math.abs(targetNumber - currentNumber);
    const stepDuration = steps > 0 ? duration / steps : 0;

    if (currentNumber === targetNumber) return;

    let current = currentNumber;
    const timer = setInterval(() => {
        current += increment;
        element.innerText = current;
        
        if (current === targetNumber) {
            clearInterval(timer);
        }
    }, stepDuration);
}

// Agregar tarea
function agregarTarea() {
    const textoTarea = input.value.trim();
    
    if (textoTarea === "") {
        input.style.animation = 'shake 0.3s';
        setTimeout(() => {
            input.style.animation = '';
        }, 300);
        return;
    }
    
    const nuevaTarea = {
        id: generarId(),
        texto: textoTarea,
        completada: false,
        fecha: fechaInput.value || null,
        categoria: categoriaInput.value,
        prioridad: prioridadInput.value
    };
    
    tareas.push(nuevaTarea);
    
    input.value = "";
    fechaInput.value = "";
    input.focus();
    
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    renderizarTareas();
}

// Event listener para el botón agregar
boton.addEventListener('click', agregarTarea);

// Event listener para Enter en el input
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});

// Event listener para búsqueda
searchInput.addEventListener('input', renderizarTareas);

// Event listeners para filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        filtroActual = e.target.dataset.filter;
        renderizarTareas();
    });
});

// Event listener para la lista de tareas
lista.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    
    const tareaId = li.dataset.id;
    const tarea = tareas.find(t => t.id === tareaId);
    
    if (e.target.classList.contains('delete')) {
        li.style.animation = 'slideOut 0.3s ease';
        
        setTimeout(() => {
            tareas = tareas.filter(t => t.id !== tareaId);
            renderizarTareas();
        }, 250);
        
    } else if (e.target.classList.contains('edit-btn')) {
        const editInput = li.querySelector('.edit-input');
        const taskText = li.querySelector('.task-text');
        
        if (li.classList.contains('task-editing')) {
            // Guardar edición
            tarea.texto = editInput.value.trim();
            if (tarea.texto === '') {
                tarea.texto = taskText.textContent;
            }
            li.classList.remove('task-editing');
            renderizarTareas();
        } else {
            // Entrar en modo edición
            li.classList.add('task-editing');
            editInput.style.display = 'block';
            editInput.focus();
            editInput.select();
        }
        
    } else if (e.target.classList.contains('task-check') || e.target.classList.contains('task-text')) {
        tarea.completada = !tarea.completada;
        
        if (navigator.vibrate && tarea.completada) {
            navigator.vibrate([50, 30, 50]);
        }
        
        renderizarTareas();
    }
});

// Event listener para edición con Enter
lista.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.classList.contains('edit-input')) {
        const li = e.target.closest('li');
        const tareaId = li.dataset.id;
        const tarea = tareas.find(t => t.id === tareaId);
        
        tarea.texto = e.target.value.trim();
        if (tarea.texto === '') {
            tarea.texto = li.querySelector('.task-text').textContent;
        }
        li.classList.remove('task-editing');
        renderizarTareas();
    }
});

// Funciones de persistencia
function guardarTareas() {
    localStorage.setItem("orbiTaskData", JSON.stringify(tareas));
}

function cargarTareas() {
    const data = localStorage.getItem("orbiTaskData");
    if (data) {
        tareas = JSON.parse(data);
    }
}

// Cargar datos al inicio
window.addEventListener('load', () => {
    cargarTareas();
    renderizarTareas();
    
    // Animación de entrada
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Prevenir pérdida de datos
window.addEventListener('beforeunload', guardarTareas);