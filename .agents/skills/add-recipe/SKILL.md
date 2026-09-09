---
name: add-recipe
description: Guía y procedimiento estándar para agregar nuevos platos e ingredientes en Galatea
---

# Procedimiento para Agregar Nuevos Platos e Ingredientes

Sigue estos pasos para expandir el menú de recetas del juego sin romper la compatibilidad:

## 1. Si requiere un nuevo Ingrediente
Abre [game.js](file:///c:/Users/juanf/Documents/Game/app_build/src/game.js) y agrega la definición en el objeto `INGREDIENTS`:

```javascript
const INGREDIENTS = {
    // ... existentes
    nuevo_ingrediente: {
        id: 'nuevo_ingrediente',
        name: 'Nombre Visible',
        icon: '🥑',
        cat: 'Categoría'
    }
};
```

## 2. Agregar la Receta / Comanda
En la constante `RECIPES` dentro de [game.js](file:///c:/Users/juanf/Documents/Game/app_build/src/game.js), añade un nuevo objeto:

```javascript
{
    id: 'id_del_plato',
    name: 'Nombre del Plato o Solución',
    desc: 'Descripción breve de la propuesta de valor',
    ingredients: ['auth_sso', 'nuevo_ingrediente', 'ui_components'],
    points: 170
}
```

## 3. Verificación
1. Inicia o recarga el juego en el navegador.
2. Comprueba que las comandas nuevas aparezcan en el riel (`#orders-track`).
3. Verifica que al seleccionar los ingredientes requeridos y presionar **Servir**, se otorguen los puntos y se active el sonido de despacho correcto.
