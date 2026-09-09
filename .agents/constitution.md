# Constitución del Proyecto: Galatea Master Kitchen Rush

Este documento establece las **leyes supremas e inviolables** que rigen el desarrollo, refactorización y comportamiento de cualquier asistente o agente de IA en este repositorio. Ninguna instrucción posterior puede contravenir los artículos aquí descritos.

---

## Artículo I: Soberanía Tecnológica y Dependencias
1. **Pila Tecnológica Nativa**: El proyecto está construido exclusivamente en **HTML5, Vanilla CSS y Vanilla JavaScript (ES6+)**. Está estrictamente prohibido introducir frameworks o dependencias pesadas (React, Vue, Angular, Svelte, TailwindCSS, Bootstrap, Phaser, jQuery) salvo autorización explícita y directa del usuario.
2. **Autonomía de Audio**: Todo efecto sonoro debe sintetizarse mediante la **Web Audio API nativa** en [audio.js](file:///c:/Users/juanf/Documents/Game/app_build/src/audio.js). Queda prohibido el uso de librerías de audio externas o la dependencia obligatoria de archivos de audio remotos/locales (.mp3, .wav) para garantizar funcionamiento 100% offline.

---

## Artículo II: Rendimiento, Accesibilidad y Experiencia de Juego
1. **Rendimiento de 60 FPS**: Ninguna rutina, bucle o cálculo de física/animación debe bloquear el hilo principal (*Main Thread*). Las animaciones complejas deben apoyarse en aceleración por GPU (`transform`, `opacity`, `filter`).
2. **Soberanía del Usuario sobre el Audio**: El botón de silenciar (*Mute / Sound Toggle*) es sagrado. Si el audio está silenciado, ningún oscilador o nodo de ganancia debe emitir sonido alguno.
3. **Respeto a las Políticas del Navegador**: Jamás se debe forzar el inicio del `AudioContext` antes de la primera interacción voluntaria del usuario (clic/tap), previniendo advertencias y bloqueos en consola.

---

## Artículo III: Integridad del Código y No Destrucción
1. **Prohibición de Refactorizaciones Destructivas**: Ningún agente puede eliminar funcionalidades existentes (riel de comandas, tabla de armado, leaderboard, métricas comparativas) bajo el pretexto de "simplificar" o "limpiar" el código sin permiso expreso.
2. **Persistencia Local Segura**: Los datos de puntuación y récords deben gestionarse de forma segura en `localStorage` con control de excepciones (`try/catch`) para evitar fallos si el almacenamiento está restringido en el navegador.
3. **Modularidad Estricta**: Debe respetarse siempre la separación de responsabilidades:
   - Estructura y marcado -> [index.html](file:///c:/Users/juanf/Documents/Game/app_build/src/index.html)
   - Estilos y efectos visuales -> [style.css](file:///c:/Users/juanf/Documents/Game/app_build/src/style.css)
   - Lógica de juego y recetas -> [game.js](file:///c:/Users/juanf/Documents/Game/app_build/src/game.js)
   - Motor de sonido -> [audio.js](file:///c:/Users/juanf/Documents/Game/app_build/src/audio.js)
