# Memorias y Registro de Decisiones Técnicas

Este archivo almacena el historial de decisiones, problemas resueltos y el roadmap del proyecto para mantener la coherencia a lo largo de las sesiones de trabajo.

---

## 1. Decisiones de Arquitectura Tomadas
- **Audio Procedural (Web Audio API)**: En lugar de cargar archivos `.mp3` o `.wav` que podrían fallar o tener latencia en entornos offline/ferias, se programaron osciladores de onda senoidal, triangular y ruido blanco sintetizado.
- **Riel de Comandas Físico**: Se diseñó visualmente un riel metálico con pinzas (`.metal-bar`, `.metal-clip`) para emular la barra de comandas de una cocina real.
- **Metáfora Cocina / Software**: Los ingredientes representan capacidades técnicas (Auth, Pagos, Telemetría, Firma Digital) ensamblados en productos digitales finales (App Créditos, SuperApp, Checkout).
- **Sistema de Toasts Apilados**: Implementación de contenedor vertical Flexbox (`#floating-toast-container`) para avisos y feedback flotante, garantizando que múltiples mensajes consecutivos se apilen ordenadamente sin sobreponerse.
- **Tutorial Interactivo en 3 Pasos**: Flujo educativo integrado entre el modal de bienvenida y el inicio de la partida, con pestañas interactivas, mini-plato de prueba y demostración del botón Despachar con simulación de combo.
- **Terminología Oficial**: Uso estricto de la palabra **"Despensa"** en lugar de refrigerador o nevera en toda la interfaz y narrativa.

---

## 2. Problemas Resueltos y "Gotchas"
- **Desbloqueo de AudioContext**: Los navegadores modernos bloquean la reproducción de audio si no proviene de un gesto del usuario (`click`). `SoundFX.init()` se ejecuta de forma segura en cada llamada con chequeo de estado `suspended`.
- **Efecto de caos en Fase 1**: Se añadieron traslados dinámicos y eventos de esquivar el cursor (`playDodge()`) para transmitir la frustración de la cocina tradicional sin romper la jugabilidad.
- **[RESUELTO] Sobreposición de mensajes flotantes (Pop/Toast)**: Antes los mensajes se creaban en posición absoluta estática (`left: 50%, top: 45%`) sobreponiéndose unos sobre otros. Se resolvió creando un contenedor flexbox centralizado con animación `toastPopIn`/`toastFadeOut` y un límite de 4 avisos en pantalla para evitar saturación.

---

## 3. Bugs Detectados y Pendientes
- *(Sin bugs pendientes actualmente)*
