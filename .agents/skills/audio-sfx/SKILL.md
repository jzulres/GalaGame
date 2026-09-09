---
name: audio-sfx
description: Procedimiento para crear o ajustar efectos de sonido procedurales con Web Audio API
---

# Creación de Efectos de Sonido con Web Audio API

Todos los sonidos de *Galatea* son sintetizados mediante osciladores y nodos de ganancia en [audio.js](file:///c:/Users/juanf/Documents/Game/app_build/src/audio.js).

## Plantilla Base para un Nuevo Sonido

Agrega un nuevo método en la clase `SoundFX`:

```javascript
playCustomSound() {
    if (this.muted) return;
    this.init(); // Asegura que el AudioContext esté activo

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // 1. Tipo de onda: 'sine' (suave), 'triangle' (juguetón), 'square' (retro 8-bit), 'sawtooth' (agresivo)
    osc.type = 'sine';

    // 2. Frecuencia y rampa de tono
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.1);

    // 3. Ganancia (volumen y envolvente ADSR)
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

    // 4. Conexión de nodos
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    // 5. Reproducción y parada
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
}
```

## Reglas Clave
- Utiliza siempre rampas exponenciales (`exponentialRampToValueAtTime`) para evitar chasquidos (*pops/clicks*) al inicio o fin del sonido.
- Mantén duraciones cortas (0.05s a 0.35s) para efectos de interfaz y respuestas rápidas.
