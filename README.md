# 🚀 OrbiTask - Gestor de Tareas Inteligente

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/LocalStorage-FF6B6B?style=for-the-badge&logo=databricks&logoColor=white" />
</div>

<br>

<div align="center">
  <h3>✨ Organiza tu día, alcanza tus metas ✨</h3>
  <p>Aplicación web moderna de gestión de tareas con categorías, prioridades, fechas límite y análisis de progreso en tiempo real.</p>
</div>

---

## 📸 Preview

![OrbiTask Preview](https://profjuanpablocarmona-beep.github.io/OrbiTask/)
> *Interfaz moderna con diseño glassmorphism y animaciones fluidas*

---

## ✨ Características Principales

### 🎯 Gestión Completa de Tareas
- ✅ **Crear, editar y eliminar** tareas con un click
- 📝 **Edición inline** - Doble click para editar rápidamente
- ✓ **Marcar como completadas** con animaciones suaves
- 🎨 **Interfaz intuitiva** con feedback visual inmediato

### 🏷️ Organización Avanzada
- **4 Categorías predefinidas:**
  - 👤 Personal
  - 💼 Trabajo
  - 🔥 Urgente
  - 💡 Ideas
- **3 Niveles de prioridad:**
  - 🔴 Alta
  - 🟡 Media
  - 🟢 Baja
- 📅 **Fechas límite** con indicadores visuales:
  - ⚠️ Tareas vencidas
  - 🔔 Tareas de hoy
  - 📅 Próximas tareas

### 🔍 Búsqueda y Filtros
- 🔎 **Búsqueda en tiempo real** por texto
- 🔘 **Filtros inteligentes:**
  - Todas las tareas
  - Solo pendientes
  - Solo completadas
  - Por categoría específica

### 📊 Dashboard de Progreso
- 📈 **Estadísticas en tiempo real:**
  - Total de tareas
  - Tareas completadas
  - Tareas pendientes
- 📊 **Visualización gráfica:**
  - Barra de progreso porcentual
  - Gráfico de barras animado
  - Contador por categorías
- 🎯 **Análisis visual** del estado de tus tareas

### 💾 Persistencia de Datos
- 🔒 **LocalStorage** - Tus datos se guardan automáticamente
- 🔄 **Sincronización automática** - Sin necesidad de "guardar"
- 💪 **Sin backend necesario** - Funciona 100% offline

### 🎨 Diseño Moderno
- 🌈 **Gradientes vibrantes** y colores profesionales
- ✨ **Glassmorphism** - Efecto de vidrio esmerilado
- 🎭 **Animaciones fluidas** en todas las interacciones
- 📱 **100% Responsive** - Perfecto en móvil, tablet y desktop
- 🎪 **Formas flotantes animadas** en el fondo

---

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Diseño moderno con Flexbox y Grid
- **JavaScript ES6+** - Lógica de la aplicación
- **LocalStorage API** - Persistencia de datos
- **Animaciones CSS** - Transiciones suaves
- **Responsive Design** - Mobile-first approach

---

## 🚀 Instalación y Uso

### Opción 1: Descarga Directa
```bash
# 1. Clona el repositorio
git clone https://github.com/tu-usuario/orbitask.git

# 2. Abre el archivo
cd orbitask
# Abre index.html en tu navegador
```

### Opción 2: Live Server (Recomendado)
```bash
# Si usas VS Code con Live Server
# Click derecho en index.html → "Open with Live Server"
```

### Opción 3: GitHub Pages
Puedes ver la demo en vivo aquí: [OrbiTask Demo](https://profjuanpablocarmona-beep.github.io/OrbiTask/)

---

## 📖 Cómo Usar

### Agregar una Tarea
1. Escribe el nombre de la tarea
2. (Opcional) Selecciona una fecha límite
3. Elige una categoría
4. Selecciona la prioridad
5. Click en "Agregar" o presiona `Enter`

### Editar una Tarea
- Click en el botón ✏️ de edición
- Modifica el texto
- Presiona `Enter` o click fuera para guardar

### Completar una Tarea
- Click en el checkbox ✓ o en el texto de la tarea
- Se marcará como completada con animación

### Eliminar una Tarea
- Click en el botón ❌ de eliminación
- La tarea se eliminará con animación de salida

### Filtrar Tareas
- Usa los botones de filtro para ver:
  - Todas las tareas
  - Solo pendientes
  - Solo completadas
  - Por categoría específica

### Buscar Tareas
- Escribe en el campo de búsqueda 🔍
- Los resultados se filtran en tiempo real

---

## 🎨 Características de Diseño

### Paleta de Colores
- **Principal:** Gradiente Púrpura (`#667eea` → `#764ba2`)
- **Completadas:** Verde (`#28a745`)
- **Pendientes:** Rojo (`#f56565`)
- **Fondo:** Blanco translúcido con blur

### Tipografía
- **Fuente:** Inter, SF Pro, Segoe UI
- **Pesos:** 300 (Light), 500 (Medium), 600 (SemiBold), 700 (Bold)

### Animaciones
- Entrada de tareas: Slide-in desde la izquierda
- Salida de tareas: Slide-out hacia la derecha
- Números: Animación incremental
- Hover: Elevación con sombra
- Formas de fondo: Flotación continua

---

## 📱 Responsive Breakpoints
```css
/* Desktop: > 968px */
/* Tablet: 768px - 968px */
/* Mobile: < 768px */
```

La aplicación se adapta perfectamente a:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1440px+)

---

## 🔧 Estructura del Proyecto
```
orbitask/
│
├── index.html          # Estructura HTML
├── style.css           # Estilos y animaciones
├── script.js           # Lógica de la aplicación
├── README.md           # Documentación
└── preview.png         # Captura de pantalla (opcional)
```

---

## 🎯 Próximas Mejoras (Roadmap)

- [ ] Modo oscuro / claro
- [ ] Drag & drop para reordenar tareas
- [ ] Subtareas anidadas
- [ ] Exportar a PDF / Excel
- [ ] Recordatorios por notificación
- [ ] Sincronización en la nube
- [ ] Temas personalizables
- [ ] Estadísticas por semana/mes
- [ ] Integración con Google Calendar

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si quieres mejorar el proyecto:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

Juan Pablo Carmona Quinteros

---

## 🌟 Agradecimientos

- Inspirado en las mejores prácticas de UI/UX modernas
- Diseño influenciado por aplicaciones como Todoist y Notion
- Iconos de emojis nativos del sistema

---

<div align="center">
  <h3>⭐ Si te gustó este proyecto, dale una estrella ⭐</h3>
  <p>Hecho con ❤️ y mucho ☕</p>
</div>
