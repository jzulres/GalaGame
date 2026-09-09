# Especificación Funcional: Galatea Master Kitchen Rush

## 1. Visión General
**Galatea: Master Kitchen Rush** es un juego interactivo de ritmo rápido y gamificación temática de cocina / entrega de productos digitales. Compara el caos del desarrollo tradicional frente a la eficiencia de una plataforma centralizada (Galatea).

---

## 2. Fases del Juego y Dinámica

### Fase 1: Cocina Tradicional (El Caos)
- **Duración**: 30 segundos.
- **Mecánica**:
  - Los ingredientes simulan "componentes rebeldes" que se mueven, esquivan el cursor o requieren múltiples clics (simulando retrabajo e integraciones manuales).
  - Comandas con tiempos límite estrictos y tiempos de entrega lentos.
  - Mayor fricción operativa y menor puntaje por segundo.

### Fase 2: Cocina Vanguardia / Centralizada (Con Galatea)
- **Duración**: 30 segundos.
- **Mecánica**:
  - Despensa centralizada e instantánea (1 solo clic por componente/ingrediente).
  - Multiplicadores de combo (`x1`, `x2`, `x3`, etc.) por entregas consecutivas sin fallos.
  - Auto-sugerencias y mayor velocidad de despacho.

---

## 3. Elementos Principales del Juego

### 3.1. Riel de Comandas (`#orders-track`)
- Muestra hasta 3 o 4 comandas simultáneas con barra de tiempo descendente.
- Cada comando especifica el plato a construir, sus ingredientes requeridos y la recompensa en puntos.

### 3.2. Tabla de Armado y Montaje (`.prep-board`)
- Muestra la comando actualmente activa en preparación.
- Permite seleccionar ingredientes desde la despensa y montarlos en el plato.
- Botón de **Despachar / Servir (`#serve-btn`)** para entregar la orden y validar ingredientes.

### 3.3. Despensa de Ingredientes (`.pantry-grid`)
- Contiene los ingredientes/componentes clave (ej. *Auth & Biometría*, *Pasarela de Pagos*, *Telemetría & Datos*, *UI Kit Accesible*, *Firma Digital*, etc.).

### 3.4. HUD y Métricas
- **Temporizador**: Conteo regresivo de 30s por fase.
- **Puntaje**: Acumulador global con bonus de combo.
- **Leaderboard / Métricas Finales**: Comparativa de tiempo promedio de entrega Fase 1 vs. Fase 2.

### 3.5 Tutorial de como jugar
- Crear un modal que explique como jugar al juego.
- Este modal debe tener 3 pasos que expliquen como jugar al juego de manera interactiva.
- **Modal explicativo con pasos**:
  1. *Paso 1*: Observa la comanda en el riel superior.
  2. *Paso 2*: Elige los ingredientes necesarios en la despensa.
  3. *Paso 3*: Presiona "Despachar" para sumar puntos y mantener el combo.
- **Botón de cerrar**: Permite volver al menú o iniciar la partida directamente.
- **Funcionamiento** Este tutorial debe de aparecer despues del popUp de bienvenida y antes de iniciar la partida, es necesario que el portal de bienvenida directamente tenga un boton para el tutorial y en el tutorial despues de ver cada paso si permite aplicar el juego .

---

## 4. Condiciones de Victoria y Fin de Juego
1. Al finalizar los 60s totales (30s Fase 1 + 30s Fase 2), se despliega el modal de resumen de resultados.
2. Se muestra el gráfico comparativo de productividad, entregas completadas y se permite guardar el nombre en el Leaderboard local (`localStorage`).


## 5. Actualizaciones sobre palabras usadas
1. No utilizar las palabras refrigerador, nevera o similares. Utilizar "Despensa" en su lugar.


