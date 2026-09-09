# Contexto de Arquitectura y Código

## 1. Stack Tecnológico
- **Frontend Core**: HTML5 Semántico + Vanilla JavaScript moderno (ES6 Classes).
- **Diseño & Estilos**: Vanilla CSS (`style.css`), uso intensivo de variables CSS (`--bg-dark`, `--accent-gold`, etc.), diseño responsivo y animaciones fluidas con GPU (`transform`, `opacity`).
- **Motor de Audio**: Web Audio API pura (`AudioContext` con síntesis de osciladores en [audio.js](file:///c:/Users/juanf/Documents/Game/app_build/src/audio.js)), completamente offline y sin dependencias de red o archivos `.mp3`.
- **Persistencia**: `localStorage` para almacenamiento de tabla de clasificaciones (Leaderboard).

---

## 2. Mapa de Archivos del Proyecto

```text
Game/
├── .agents/                    # Contexto, especificaciones y habilidades para IA
│   ├── constitution.md         # Leyes supremas e inviolables del proyecto
│   ├── spec.md                 # Reglas funcionales y diseño del juego
│   ├── context.md              # Arquitectura técnica y tecnologías
│   ├── agent.md                # Reglas y rol del asistente de IA
│   ├── memorias.md             # Decisiones técnicas y aprendizajes
│   └── skills/                 # Flujos de trabajo estructurados
│       ├── add-recipe/SKILL.md # Procedimiento para agregar recetas
│       └── audio-sfx/SKILL.md  # Procedimiento para sintetizar sonido
└── app_build/
    └── src/
        ├── index.html          # Estructura del HUD, riel de comandas, modales y mesa de trabajo
        ├── style.css           # Estilos visuales, tema oscuro/dorado, efectos de brillo y partículas
        ├── game.js             # Lógica del juego: recetas, ingredientes, estados de fase y eventos
        └── audio.js            # Clase SoundFX con síntesis de audio para todos los eventos
```

---

## 3. Flujo de Datos y Clases Principales

### `Game` ([game.js](file:///c:/Users/juanf/Documents/Game/app_build/src/game.js))
- Administra el estado global: `score`, `phase` (1 o 2), `phaseTimer`, `activeOrders`, `plateIngredients`, `combo`.
- **Tutorial Interactivo (3 Pasos)**: Módulo `initTutorialEvents()`, `openTutorial()`, `setTutorialStep()`, con simulación en vivo de selección de ingredientes y prueba de botón Despachar.
- Genera comandas periódicas desde `RECIPES`.
- Controla el comportamiento caótico de la Fase 1 (`rogueProgress`, `chaosInterval`).
- Maneja el guardado y carga del leaderboard (`loadLeaderboard()`, `saveScore()`).

### `SoundFX` ([audio.js](file:///c:/Users/juanf/Documents/Game/app_build/src/audio.js))
- Instancia y desbloquea el `AudioContext` tras interacción de usuario.
- Métodos de efectos: `playClick()`, `playServe()`, `playError()`, `playCombo()`, `playPhaseTransition()`, `playBell()`, etc.
