// Galatea: Master Kitchen Rush - Game Engine
// Experiencia interactiva de alta cocina y despensa centralizada

const INGREDIENTS = {
    auth_sso: { id: 'auth_sso', name: 'Auth & Biometría', icon: '🔐', cat: 'Seguridad' },
    pay_gateway: { id: 'pay_gateway', name: 'Pasarela de Pagos', icon: '💳', cat: 'Transaccional' },
    push_notify: { id: 'push_notify', name: 'Notificaciones', icon: '🔔', cat: 'Engagement' },
    ui_components: { id: 'ui_components', name: 'UI Kit Accesible', icon: '🎨', cat: 'Experiencia' },
    analytics: { id: 'analytics', name: 'Telemetría & Datos', icon: '📊', cat: 'Métricas' },
    db_sync: { id: 'db_sync', name: 'Sincronización RealTime', icon: '⚡', cat: 'Core' },
    doc_sign: { id: 'doc_sign', name: 'Firma Digital', icon: '✍️', cat: 'LegalTech' },
    ai_recommender: { id: 'ai_recommender', name: 'Asistente IA / Chat', icon: '🤖', cat: 'Innovación' }
};

const RECIPES = [
    {
        id: 'app_creditos',
        name: 'App Móvil de Créditos',
        desc: 'Experiencia transaccional ágil y confiable',
        ingredients: ['auth_sso', 'pay_gateway', 'ui_components'],
        points: 150
    },
    {
        id: 'portal_autoservicio',
        name: 'Portal Autoservicio Web',
        desc: 'Canal omnicanal para autogestión de clientes',
        ingredients: ['auth_sso', 'ui_components', 'push_notify'],
        points: 140
    },
    {
        id: 'checkout_1click',
        name: 'Checkout Rápido 1-Clic',
        desc: 'Flujo de conversión inmediata sin fricción',
        ingredients: ['pay_gateway', 'auth_sso', 'analytics'],
        points: 160
    },
    {
        id: 'onboarding_firma',
        name: 'Onboarding con Firma Digital',
        desc: 'Apertura de cuentas 100% digital en minutos',
        ingredients: ['auth_sso', 'doc_sign', 'ui_components'],
        points: 180
    },
    {
        id: 'superapp_ai',
        name: 'SuperApp con Asistente IA',
        desc: 'Experiencia hiper-personalizada con recomendaciones',
        ingredients: ['ai_recommender', 'db_sync', 'push_notify', 'auth_sso'],
        points: 240
    },
    {
        id: 'centro_notif',
        name: 'Centro de Alertas & Notificaciones',
        desc: 'Monitoreo de seguridad y avisos en tiempo real',
        ingredients: ['push_notify', 'analytics', 'db_sync'],
        points: 150
    }
];

class Game {
    constructor() {
        this.score = 0;
        this.phase = 1; // 1 = Sin Galatea, 2 = Con Galatea
        this.phaseTimer = 30;
        this.timerInterval = null;
        this.activeOrders = [];
        this.currentOrder = null;
        this.plateIngredients = new Set();
        this.combo = 1;

        // Métricas
        this.stats = {
            phase1Delivered: 0,
            phase1TimeSum: 0,
            phase2Delivered: 0,
            phase2TimeSum: 0,
            manualClicks: 0
        };

        // Estado de ingredientes rebeldes en fase 1
        this.rogueProgress = {};
        this.chaosInterval = null;

        this.initDOM();
        this.loadLeaderboard();
    }

    initDOM() {
        // Elementos HUD
        this.timerEl = document.getElementById('timer-val');
        this.scoreEl = document.getElementById('score-val');
        this.phaseIndicatorEl = document.getElementById('phase-indicator');
        this.ordersTrackEl = document.getElementById('orders-track');

        // Áreas de preparación
        this.currentDishTitleEl = document.getElementById('current-dish-title');
        this.currentDishDescEl = document.getElementById('current-dish-desc');
        this.plateIngredientsEl = document.getElementById('plate-ingredients');
        this.serveBtn = document.getElementById('serve-btn');

        // Paneles de preparación
        this.chaoticKitchenEl = document.getElementById('chaotic-kitchen');
        this.chaoticArenaEl = document.getElementById('chaotic-arena');
        this.fridgeContainerEl = document.getElementById('fridge-container');
        this.fridgeUnitEl = document.getElementById('fridge-unit');
        this.pantryGridEl = document.getElementById('pantry-grid');

        // Modales
        this.introModal = document.getElementById('intro-modal');
        this.tutorialModal = document.getElementById('tutorial-modal');
        this.transitionModal = document.getElementById('transition-modal');
        this.gameOverModal = document.getElementById('game-over-modal');

        // Botones de acción principales
        const openTutBtn = document.getElementById('open-tutorial-btn');
        if (openTutBtn) openTutBtn.addEventListener('click', () => this.openTutorial());
        const quickStartBtn = document.getElementById('quick-start-btn');
        if (quickStartBtn) quickStartBtn.addEventListener('click', () => this.startGame());

        document.getElementById('start-phase2-btn').addEventListener('click', () => this.startPhase2());
        document.getElementById('restart-btn').addEventListener('click', () => this.resetGame());
        document.getElementById('save-score-btn').addEventListener('click', () => this.saveScore());
        this.serveBtn.addEventListener('click', () => this.serveCurrentDish());

        // Configuración del Tutorial Interactivo
        this.initTutorialEvents();

        // Sonido
        document.getElementById('sound-toggle').addEventListener('click', (e) => {
            window.soundFX.muted = !window.soundFX.muted;
            e.target.textContent = window.soundFX.muted ? '🔇' : '🔊';
        });

        this.renderPantryItems();
    }

    initTutorialEvents() {
        this.currentTutStep = 1;
        this.tutDemoIngredients = new Set();

        // Tabs del tutorial
        document.querySelectorAll('.tut-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const step = parseInt(e.currentTarget.dataset.step);
                this.setTutorialStep(step);
            });
        });

        // Botones de navegación
        document.getElementById('tut-next-step-btn').addEventListener('click', () => {
            this.setTutorialStep(this.currentTutStep + 1);
        });

        document.getElementById('tut-prev-step-btn').addEventListener('click', () => {
            this.setTutorialStep(this.currentTutStep - 1);
        });

        document.getElementById('tut-back-menu-btn').addEventListener('click', () => {
            window.soundFX.playClick();
            this.tutorialModal.classList.add('hidden');
            this.introModal.classList.remove('hidden');
        });

        document.getElementById('tut-start-game-btn').addEventListener('click', () => {
            this.startGame();
        });

        // Interactividad Paso 2: Plato de pruebas
        const demoItems = [
            { btnId: 'tut-demo-btn-1', id: 'auth', name: '🔐 Auth & Biometría' },
            { btnId: 'tut-demo-btn-2', id: 'pay', name: '💳 Pasarela de Pagos' },
            { btnId: 'tut-demo-btn-3', id: 'ui', name: '🎨 UI Kit Accesible' }
        ];

        demoItems.forEach(item => {
            const btn = document.getElementById(item.btnId);
            if (btn) {
                btn.addEventListener('click', () => {
                    window.soundFX.playClick();
                    if (this.tutDemoIngredients.has(item.name)) {
                        this.tutDemoIngredients.delete(item.name);
                        btn.classList.remove('selected');
                    } else {
                        this.tutDemoIngredients.add(item.name);
                        btn.classList.add('selected');
                    }
                    this.renderTutDemoPlate();
                });
            }
        });

        // Interactividad Paso 3: Probar botón despachar
        const testServeBtn = document.getElementById('tut-test-serve-btn');
        if (testServeBtn) {
            testServeBtn.addEventListener('click', () => {
                window.soundFX.playServe();
                window.soundFX.playCombo();
                const feedbackEl = document.getElementById('tut-serve-feedback');
                if (feedbackEl) {
                    feedbackEl.textContent = '🎉 ¡Despacho exitoso! +150 pts (¡Combo x2 Activado!)';
                    feedbackEl.style.animation = 'none';
                    feedbackEl.offsetHeight; // trigger reflow
                    feedbackEl.style.animation = 'toastPopIn 0.3s ease';
                }
            });
        }
    }

    renderTutDemoPlate() {
        const container = document.getElementById('tut-plate-slots');
        if (!container) return;

        if (this.tutDemoIngredients.size === 0) {
            container.innerHTML = '<span class="plate-slot">Haz clic en los ingredientes de arriba para probar</span>';
            return;
        }

        container.innerHTML = '';
        this.tutDemoIngredients.forEach(ingName => {
            const slot = document.createElement('div');
            slot.className = 'plate-slot ready';
            slot.innerHTML = `<span>${ingName}</span> <span>✓</span>`;
            container.appendChild(slot);
        });
    }

    openTutorial() {
        window.soundFX.init();
        window.soundFX.playClick();
        this.introModal.classList.add('hidden');
        this.tutorialModal.classList.remove('hidden');
        this.setTutorialStep(1);
    }

    setTutorialStep(step) {
        if (step < 1 || step > 3) return;
        window.soundFX.playClick();
        this.currentTutStep = step;

        // Actualizar tabs
        document.querySelectorAll('.tut-tab').forEach(tab => {
            tab.classList.toggle('active', parseInt(tab.dataset.step) === step);
        });

        // Mostrar panel correspondiente
        for (let i = 1; i <= 3; i++) {
            const panel = document.getElementById(`tut-step-${i}`);
            if (panel) {
                panel.classList.toggle('hidden', i !== step);
                panel.classList.toggle('active', i === step);
            }
        }

        // Controlar botones de navegación
        const prevBtn = document.getElementById('tut-prev-step-btn');
        const nextBtn = document.getElementById('tut-next-step-btn');
        const startBtn = document.getElementById('tut-start-game-btn');

        if (prevBtn) prevBtn.classList.toggle('hidden', step === 1);
        if (nextBtn) nextBtn.classList.toggle('hidden', step === 3);
        if (startBtn) startBtn.classList.toggle('hidden', step !== 3);
    }

    startGame() {
        window.soundFX.init();
        window.soundFX.playClick();
        this.introModal.classList.add('hidden');
        this.tutorialModal.classList.add('hidden');
        this.phase = 1;
        this.score = 0;
        this.stats = {
            phase1Delivered: 0,
            phase1TimeSum: 0,
            phase2Delivered: 0,
            phase2TimeSum: 0,
            manualClicks: 0
        };

        this.updateHUD();
        this.setPhase1UI();
        this.activeOrders = [];
        this.spawnOrder();
        this.spawnOrder();

        this.startTimer(30, () => this.endPhase1());
    }

    startTimer(seconds, onComplete) {
        clearInterval(this.timerInterval);
        this.phaseTimer = seconds;
        this.timerEl.textContent = `${this.phaseTimer}s`;

        this.timerInterval = setInterval(() => {
            this.phaseTimer--;
            this.timerEl.textContent = `${this.phaseTimer}s`;

            if (this.phaseTimer <= 0) {
                clearInterval(this.timerInterval);
                onComplete();
            }
        }, 1000);
    }

    setPhase1UI() {
        this.phaseIndicatorEl.textContent = 'Fase 1: Cocina Caótica (Sin Galatea)';
        this.phaseIndicatorEl.className = 'phase-pill phase1';
        this.chaoticKitchenEl.classList.remove('hidden');
        this.fridgeContainerEl.classList.add('hidden');
        if (this.fridgeUnitEl) this.fridgeUnitEl.classList.remove('doors-open');

        this.startChaosLoop();
        this.renderChaoticArena();
    }

    /* Bucle para mover ingredientes dinámicamente en la cocina caótica */
    startChaosLoop() {
        clearInterval(this.chaosInterval);
        this.chaosInterval = setInterval(() => {
            if (this.phase !== 1) return;
            const items = this.chaoticArenaEl.querySelectorAll('.rogue-ingredient');
            const arenaWidth = this.chaoticArenaEl.clientWidth || 350;
            const arenaHeight = this.chaoticArenaEl.clientHeight || 360;

            items.forEach(el => {
                // Posición aleatoria y rotación dinámica dentro de la arena
                const maxX = Math.max(10, arenaWidth - 155);
                const maxY = Math.max(10, arenaHeight - 115);
                const newX = Math.floor(Math.random() * maxX);
                const newY = Math.floor(Math.random() * maxY);
                const randomRot = Math.floor((Math.random() - 0.5) * 18);

                el.style.left = `${newX}px`;
                el.style.top = `${newY}px`;
                el.style.transform = `rotate(${randomRot}deg)`;
            });
        }, 900);
    }

    renderChaoticArena() {
        this.chaoticArenaEl.innerHTML = '';
        if (!this.currentOrder) return;

        const arenaWidth = this.chaoticArenaEl.clientWidth || 350;
        const arenaHeight = this.chaoticArenaEl.clientHeight || 360;

        this.currentOrder.ingredients.forEach(ingKey => {
            if (this.plateIngredients.has(ingKey)) return; // Ya capturado

            const ing = INGREDIENTS[ingKey];
            if (!this.rogueProgress[ingKey]) this.rogueProgress[ingKey] = 0;

            const card = document.createElement('div');
            card.className = 'rogue-ingredient';
            card.id = `rogue-${ingKey}`;

            const maxX = Math.max(10, arenaWidth - 155);
            const maxY = Math.max(10, arenaHeight - 115);
            const initialX = Math.floor(Math.random() * maxX);
            const initialY = Math.floor(Math.random() * maxY);

            card.style.left = `${initialX}px`;
            card.style.top = `${initialY}px`;

            const currentPct = this.rogueProgress[ingKey];

            card.innerHTML = `
                <div class="rogue-icon">${ing.icon}</div>
                <div class="rogue-name">${ing.name}</div>
                <div class="rogue-status">⚠️ Sin estandarizar</div>
                <div class="rogue-progress-bar">
                    <div class="rogue-progress-fill" style="width: ${currentPct}%"></div>
                </div>
            `;

            // Ocasional intento de huida rápida al acercar el cursor (25% chance)
            card.addEventListener('mouseenter', () => {
                if (Math.random() < 0.25) {
                    window.soundFX.playDodge();
                    const escapeX = Math.floor(Math.random() * maxX);
                    const escapeY = Math.floor(Math.random() * maxY);
                    card.style.left = `${escapeX}px`;
                    card.style.top = `${escapeY}px`;
                } else {
                    window.soundFX.playDodge();
                }
            });

            // Atrapar al hacer clic
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                this.catchRogueIngredient(ingKey, card);
            });

            this.chaoticArenaEl.appendChild(card);
        });
    }

    catchRogueIngredient(ingKey, cardEl) {
        window.soundFX.playWhoosh();
        this.stats.manualClicks++;
        this.rogueProgress[ingKey] = (this.rogueProgress[ingKey] || 0) + 35;

        const msgs = ['⚠️ ¡Comprando de nuevo!', '🏃‍♂️ ¡Se movió rápido!', '🐌 ¡Reinventando código!'];
        const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
        this.showFloatingText(randomMsg, '#f87171');

        if (this.rogueProgress[ingKey] >= 100) {
            this.plateIngredients.add(ingKey);
            window.soundFX.playClick();
            this.showFloatingText('✅ ¡Ingrediente asegurado!', '#ffb703');
            cardEl.remove();
        } else {
            // Actualizar barra de progreso y salto ágil para obligar a perseguir
            const fill = cardEl.querySelector('.rogue-progress-fill');
            if (fill) fill.style.width = `${this.rogueProgress[ingKey]}%`;

            const arenaWidth = this.chaoticArenaEl.clientWidth || 350;
            const arenaHeight = this.chaoticArenaEl.clientHeight || 360;
            const jumpX = Math.floor(Math.random() * Math.max(10, arenaWidth - 155));
            const jumpY = Math.floor(Math.random() * Math.max(10, arenaHeight - 115));
            cardEl.style.left = `${jumpX}px`;
            cardEl.style.top = `${jumpY}px`;
            cardEl.style.transform = `rotate(${(Math.random() - 0.5) * 20}deg) scale(1.05)`;
        }

        this.renderPlate();
    }

    /* Renderizar despensa para Fase 2 */
    renderPantryItems() {
        this.pantryGridEl.innerHTML = '';
        Object.values(INGREDIENTS).forEach(ing => {
            const item = document.createElement('div');
            item.className = 'pantry-item';
            item.id = `pantry-${ing.id}`;
            item.innerHTML = `
                <div class="pantry-icon">${ing.icon}</div>
                <div class="pantry-name">${ing.name}</div>
                <div class="pantry-category">${ing.cat}</div>
            `;
            item.addEventListener('click', () => this.clickPantryIngredient(ing.id));
            this.pantryGridEl.appendChild(item);
        });
    }

    clickPantryIngredient(ingKey) {
        if (this.phase !== 2 || !this.currentOrder) return;

        if (this.currentOrder.ingredients.includes(ingKey)) {
            if (!this.plateIngredients.has(ingKey)) {
                this.plateIngredients.add(ingKey);
                window.soundFX.playClick();
                this.showFloatingText('✨ ¡Capacidad Reutilizada!', '#00e5ff');
                this.renderPlate();

                if (this.canServe()) {
                    this.serveCurrentDish();
                }
            }
        } else {
            window.soundFX.playError();
            this.showFloatingText('❌ Este canal no requiere esa capacidad', '#ef4444');
        }
    }

    highlightNeededPantryItems() {
        if (this.phase !== 2 || !this.currentOrder) return;
        document.querySelectorAll('.pantry-item').forEach(el => el.classList.remove('needed'));
        this.currentOrder.ingredients.forEach(ingKey => {
            if (!this.plateIngredients.has(ingKey)) {
                const el = document.getElementById(`pantry-${ingKey}`);
                if (el) el.classList.add('needed');
            }
        });
    }

    spawnOrder() {
        if (this.activeOrders.length >= 4) return;
        const randomRecipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
        const order = {
            ...randomRecipe,
            orderId: Date.now() + Math.random(),
            createdTime: Date.now()
        };
        this.activeOrders.push(order);
        if (!this.currentOrder) {
            this.selectOrder(order);
        }
        this.renderOrdersTrack();
    }

    selectOrder(order) {
        this.currentOrder = order;
        this.plateIngredients.clear();
        this.rogueProgress = {};

        this.currentDishTitleEl.textContent = order.name;
        this.currentDishDescEl.textContent = order.desc;

        this.renderOrdersTrack();
        this.renderPlate();

        if (this.phase === 1) {
            this.renderChaoticArena();
        } else {
            this.highlightNeededPantryItems();
        }
    }

    renderOrdersTrack() {
        this.ordersTrackEl.innerHTML = '';
        this.activeOrders.forEach(order => {
            const ticket = document.createElement('div');
            ticket.className = `order-ticket ${order === this.currentOrder ? 'active-target' : ''}`;
            ticket.innerHTML = `
                <div class="order-header">
                    <div class="order-name">${order.name}</div>
                    <div class="order-points">+${order.points} pts</div>
                </div>
                <div class="order-ingredients-needed">
                    ${order.ingredients.map(ingId => `
                        <span class="ing-tag ${order === this.currentOrder && this.plateIngredients.has(ingId) ? 'fulfilled' : ''}">
                            ${INGREDIENTS[ingId].icon} ${INGREDIENTS[ingId].name}
                        </span>
                    `).join('')}
                </div>
            `;
            ticket.addEventListener('click', () => this.selectOrder(order));
            this.ordersTrackEl.appendChild(ticket);
        });
    }

    renderPlate() {
        this.plateIngredientsEl.innerHTML = '';
        if (!this.currentOrder) return;

        this.currentOrder.ingredients.forEach(ingKey => {
            const isReady = this.plateIngredients.has(ingKey);
            const slot = document.createElement('div');
            slot.className = `plate-slot ${isReady ? 'ready' : ''}`;
            slot.innerHTML = `
                <span>${INGREDIENTS[ingKey].icon}</span>
                <span>${INGREDIENTS[ingKey].name}</span>
                <span>${isReady ? '✓' : '...'}</span>
            `;
            this.plateIngredientsEl.appendChild(slot);
        });

        this.serveBtn.disabled = !this.canServe();
        if (this.phase === 2) {
            this.highlightNeededPantryItems();
        }
    }

    canServe() {
        if (!this.currentOrder) return false;
        return this.currentOrder.ingredients.every(id => this.plateIngredients.has(id));
    }

    serveCurrentDish() {
        if (!this.canServe()) return;

        const timeTaken = (Date.now() - this.currentOrder.createdTime) / 1000;
        let pointsEarned = this.currentOrder.points;

        if (this.phase === 1) {
            this.stats.phase1Delivered++;
            this.stats.phase1TimeSum += timeTaken;
            window.soundFX.playServe();
            this.showFloatingText(`+${pointsEarned} pts (¡Con sudor y demora!)`, '#ffb703');
        } else {
            this.stats.phase2Delivered++;
            this.stats.phase2TimeSum += timeTaken;
            this.combo++;
            pointsEarned = Math.round(pointsEarned * (1 + (this.combo * 0.25)));
            window.soundFX.playServe();
            window.soundFX.playCombo();
            this.showFloatingText(`🚀 ¡SERVIDO! +${pointsEarned} pts (Combo x${this.combo})`, '#00e5ff');
        }

        this.score += pointsEarned;
        this.updateHUD();

        // Eliminar orden
        this.activeOrders = this.activeOrders.filter(o => o.orderId !== this.currentOrder.orderId);
        this.currentOrder = null;

        this.spawnOrder();
        if (this.activeOrders.length > 0) {
            this.selectOrder(this.activeOrders[0]);
        }
    }

    showFloatingText(text, color = '#fff') {
        let container = document.getElementById('floating-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'floating-toast-container';
            container.className = 'floating-toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'floating-feedback-toast';
        toast.textContent = text;
        toast.style.color = color;
        toast.style.borderColor = color ? `${color}66` : 'rgba(255, 255, 255, 0.18)';
        toast.style.boxShadow = color ? `0 8px 24px rgba(0, 0, 0, 0.5), 0 0 14px ${color}44` : '0 8px 24px rgba(0, 0, 0, 0.5)';

        // Evitar saturación excesiva manteniendo máximo 4 mensajes simultáneos
        while (container.children.length >= 4) {
            container.firstElementChild.remove();
        }

        container.appendChild(toast);

        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 1500);
    }

    updateHUD() {
        this.scoreEl.textContent = this.score;
    }

    endPhase1() {
        clearInterval(this.chaosInterval);
        window.soundFX.playGalateaFanfare();
        this.transitionModal.classList.remove('hidden');
    }

    startPhase2() {
        this.transitionModal.classList.add('hidden');
        this.phase = 2;
        this.combo = 1;

        this.phaseIndicatorEl.textContent = 'Fase 2: Despensa Galatea (+400 Capacidades)';
        this.phaseIndicatorEl.className = 'phase-pill phase2';

        // Ocultar cocina caótica y mostrar contenedor de la Despensa
        this.chaoticKitchenEl.classList.add('hidden');
        this.fridgeContainerEl.classList.remove('hidden');

        // Animación de apertura de compuertas de la Despensa
        setTimeout(() => {
            window.soundFX.playFridgeDoor();
            if (this.fridgeUnitEl) {
                this.fridgeUnitEl.classList.add('doors-open');
            }
        }, 150);

        // Reiniciar plato
        this.plateIngredients.clear();
        if (this.currentOrder) {
            this.selectOrder(this.currentOrder);
        } else {
            this.spawnOrder();
        }

        // 45 segundos para alta velocidad
        this.startTimer(45, () => this.endGame());
    }

    endGame() {
        clearInterval(this.timerInterval);
        clearInterval(this.chaosInterval);
        window.soundFX.playGalateaFanfare();
        this.showGameOverModal();
    }

    showGameOverModal() {
        const avgTimeP1 = this.stats.phase1Delivered > 0 
            ? (this.stats.phase1TimeSum / this.stats.phase1Delivered).toFixed(1) 
            : '25.0';
        const avgTimeP2 = this.stats.phase2Delivered > 0 
            ? (this.stats.phase2TimeSum / this.stats.phase2Delivered).toFixed(1) 
            : '3.2';

        document.getElementById('final-score-val').textContent = this.score;
        document.getElementById('metric-p1-delivered').textContent = `${this.stats.phase1Delivered} canales`;
        document.getElementById('metric-p2-delivered').textContent = `${this.stats.phase2Delivered} canales`;
        document.getElementById('metric-p1-time').textContent = `${avgTimeP1} seg / canal`;
        document.getElementById('metric-p2-time').textContent = `${avgTimeP2} seg / canal`;
        document.getElementById('metric-p1-waste').textContent = `${Math.min(95, 50 + this.stats.manualClicks * 3)}% (Alto)`;
        document.getElementById('metric-p2-waste').textContent = `0% (100% Sostenible)`;

        this.gameOverModal.classList.remove('hidden');
        document.getElementById('save-score-btn').disabled = false;
        this.renderLeaderboard();
    }

    resetGame() {
        this.gameOverModal.classList.add('hidden');
        document.getElementById('save-score-btn').disabled = false;
        this.startGame();
    }

    saveScore() {
        const input = document.getElementById('player-name-input');
        const name = input.value.trim() || 'Chef Galatea';
        const list = JSON.parse(localStorage.getItem('galatea_leaderboard') || '[]');
        list.push({ name, score: this.score, date: new Date().toLocaleDateString() });
        list.sort((a, b) => b.score - a.score);
        localStorage.setItem('galatea_leaderboard', JSON.stringify(list.slice(0, 10)));
        input.value = '';
        this.renderLeaderboard();
        document.getElementById('save-score-btn').disabled = true;
    }

    loadLeaderboard() {
        if (!localStorage.getItem('galatea_leaderboard')) {
            const mock = [
                { name: 'Master Chef Digital', score: 3100, date: 'Hoy' },
                { name: 'Arquitecto Galatea', score: 2600, date: 'Hoy' },
                { name: 'Canales Omnicanal', score: 2150, date: 'Hoy' }
            ];
            localStorage.setItem('galatea_leaderboard', JSON.stringify(mock));
        }
    }

    renderLeaderboard() {
        const container = document.getElementById('leaderboard-list');
        const list = JSON.parse(localStorage.getItem('galatea_leaderboard') || '[]');
        container.innerHTML = list.map((item, idx) => `
            <div class="leaderboard-row ${idx === 0 ? 'gold' : ''}">
                <span>#${idx + 1} ${item.name}</span>
                <strong>${item.score} pts</strong>
            </div>
        `).join('') || '<div class="leaderboard-row">Sé el primero en el podio</div>';
    }
}

// Iniciar al cargar página
window.addEventListener('DOMContentLoaded', () => {
    window.game = new Game();
});
