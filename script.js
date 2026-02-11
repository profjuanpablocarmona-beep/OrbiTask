document.addEventListener('DOMContentLoaded', () => {

    // ELEMENTOS
    const tareaInput = document.getElementById('tareaInput');
    const fechaInput = document.getElementById('fechaInput');
    const categoriaInput = document.getElementById('categoriaInput');
    const prioridadInput = document.getElementById('prioridadInput');
    const btnAgregar = document.getElementById('btnAgregar');
    const listaTareas = document.getElementById('listaTareas');
    const emptyState = document.getElementById('emptyState');
    const themeToggle = document.getElementById('themeToggle');

    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const chartFilters = document.querySelectorAll('.chart-filter');

    const totalEl = document.getElementById('total');
    const completadasEl = document.getElementById('completadas');
    const pendientesEl = document.getElementById('pendientes');
    const porcentajeEl = document.getElementById('porcentaje');
    const progressBar = document.getElementById('progressBar');

    // DATOS
    let tareas = [];

    // ----------------------------
    // SWITCH DIA/NOCHE
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark');
    });

    // ----------------------------
    // FUNCIONES
    function actualizarLista() {
        listaTareas.innerHTML = '';

        let filtroActivo = document.querySelector('.filter-btn.active').dataset.filter;
        let busqueda = searchInput.value.toLowerCase();

        const tareasFiltradas = tareas.filter(tarea => {
            const porFiltro = filtroActivo === 'todas' || tarea.categoria === filtroActivo || 
                              (filtroActivo === 'pendientes' && !tarea.completada) ||
                              (filtroActivo === 'completadas' && tarea.completada);
            const porBusqueda = tarea.nombre.toLowerCase().includes(busqueda);
            return porFiltro && porBusqueda;
        });

        if (tareasFiltradas.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }

        tareasFiltradas.forEach((tarea, index) => {
            const li = document.createElement('li');
            li.classList.toggle('completed', tarea.completada);

            li.innerHTML = `
                <div>
                    <strong>${tarea.nombre}</strong> - ${tarea.fecha} - ${tarea.categoria} - ${tarea.prioridad}
                </div>
                <div class="task-actions">
                    <button class="toggle">${tarea.completada ? 'Desmarcar' : 'Marcar'}</button>
                    <button class="eliminar">Eliminar</button>
                </div>
            `;
            listaTareas.appendChild(li);

            // EVENTOS BOTONES
            li.querySelector('.toggle').addEventListener('click', () => {
                tarea.completada = !tarea.completada;
                actualizarLista();
                actualizarEstadisticas();
                actualizarGrafico();
            });
            li.querySelector('.eliminar').addEventListener('click', () => {
                tareas.splice(index,1);
                actualizarLista();
                actualizarEstadisticas();
                actualizarGrafico();
            });
        });
    }

    function actualizarEstadisticas() {
        const total = tareas.length;
        const completadas = tareas.filter(t => t.completada).length;
        const pendientes = total - completadas;

        totalEl.textContent = total;
        completadasEl.textContent = completadas;
        pendientesEl.textContent = pendientes;

        let porcentaje = total === 0 ? 0 : Math.round((completadas / total) * 100);
        porcentajeEl.textContent = porcentaje + '%';
        progressBar.style.width = porcentaje + '%';
    }

    // ----------------------------
    // AGREGAR TAREA
    btnAgregar.addEventListener('click', () => {
        const nombre = tareaInput.value.trim();
        const fecha = fechaInput.value;
        const categoria = categoriaInput.value;
        const prioridad = prioridadInput.value;

        if (!nombre) return;

        tareas.push({
            nombre,
            fecha,
            categoria,
            prioridad,
            completada: false
        });

        tareaInput.value = '';
        fechaInput.value = '';
        actualizarLista();
        actualizarEstadisticas();
        actualizarGrafico();
    });

    // ----------------------------
    // BUSCAR TAREAS
    searchInput.addEventListener('input', actualizarLista);

    // ----------------------------
    // FILTROS
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            actualizarLista();
        });
    });

    // ----------------------------
    // CHART JS
    const ctx = document.getElementById('tareasChart').getContext('2d');
    let chartData = {labels: ['Completadas','Pendientes','Totales'], datasets: [{label:'Tareas',data:[0,0,0],backgroundColor: ['#667eea','#764ba2','#ff6ec7'],borderRadius: 10} ]};
    let tareasChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            responsive:true,
            plugins:{legend:{display:false}},
            scales:{y:{beginAtZero:true}}
        }
    });

    function actualizarGrafico(categoria='todas') {
        let filtradas = categoria==='todas'? tareas: tareas.filter(t=>t.categoria===categoria);
        const completadas = filtradas.filter(t=>t.completada).length;
        const pendientes = filtradas.filter(t=>!t.completada).length;
        const total = filtradas.length;

        tareasChart.data.datasets[0].data = [completadas, pendientes, total];
        tareasChart.update();
    }

    chartFilters.forEach(btn=>{
        btn.addEventListener('click', ()=>{
            chartFilters.forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            actualizarGrafico(btn.dataset.cat);
        });
    });

});
