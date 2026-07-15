// ==================== 3D BACKGROUND - VERSÃO PRO ABSURDA ====================
// Particle Engine Pro - Nível AAA / Produto Vendável
// Autor: Raphael Freitas
// Características: Shader Avançado, Bloom Real, Energia Dinâmica, LOD Inteligente,
// Parallax, Gravidade, Warp, Arquitetura Plugável

import * as THREE from "https://cdn.skypack.dev/three@0.152.2";
import { EffectComposer } from "https://cdn.skypack.dev/three@0.152.2/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.skypack.dev/three@0.152.2/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "https://cdn.skypack.dev/three@0.152.2/examples/jsm/postprocessing/UnrealBloomPass.js";

class ParticleEnginePro {
    constructor(container, options = {}) {
        this.container = container;
        
        // Configuração padrão ABSURDA
        this.config = {
            // Partículas
            particleCount: 2000,
            maxParticles: 3000,
            minParticles: 800,
            
            // Cores (temas)
            themes: {
                dark: {
                    primary: [0.2, 0.6, 1.0],
                    secondary: [0.8, 0.2, 1.0],
                    tertiary: [0.3, 0.9, 0.7],
                    background: [0.05, 0.07, 0.12]
                },
                light: {
                    primary: [0.1, 0.3, 0.8],
                    secondary: [0.6, 0.2, 0.6],
                    tertiary: [0.2, 0.7, 0.5],
                    background: [0.95, 0.97, 1.0]
                },
                sunset: {
                    primary: [0.98, 0.45, 0.09],
                    secondary: [0.94, 0.27, 0.27],
                    tertiary: [0.93, 0.28, 0.60],
                    background: [0.10, 0.06, 0.04]
                },
                forest: {
                    primary: [0.06, 0.73, 0.51],
                    secondary: [0.02, 0.59, 0.41],
                    tertiary: [0.20, 0.83, 0.53],
                    background: [0.04, 0.10, 0.07]
                },
                ocean: {
                    primary: [0.02, 0.71, 0.83],
                    secondary: [0.03, 0.57, 0.70],
                    tertiary: [0.13, 0.83, 0.93],
                    background: [0.04, 0.08, 0.12]
                }
            },
            
            // Bloom
            bloom: {
                strength: 1.2,
                radius: 0.8,
                threshold: 0.1
            },
            
            // Animação
            animation: {
                speed: 0.8,
                warpIntensity: 0.5,
                mouseStrength: 1.2,
                scrollStrength: 1.5,
                energyDecay: 0.96
            },
            
            // Performance
            performance: {
                targetFPS: 60,
                adaptiveQuality: true,
                mobileOptimization: true
            },
            
            ...options
        };
        
        // Estado interno
        this.state = {
            clock: new THREE.Clock(),
            mouse: new THREE.Vector2(0, 0),
            mouseVelocity: new THREE.Vector2(0, 0),
            lastMouse: new THREE.Vector2(0, 0),
            energy: 0,
            maxEnergy: 2.5,
            scroll: 0,
            scrollTarget: 0,
            time: 0,
            deltaTime: 0,
            fps: 60,
            frameCount: 0,
            lastFrameTime: performance.now(),
            isMobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
            theme: 'dark',
            quality: 'high',
            isActive: true,
            interactionBoost: 1.0
        };
        
        // Componentes Three.js
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.composer = null;
        this.bloomPass = null;
        this.points = null;
        this.material = null;
        this.geometry = null;
        
        // Callbacks
        this.callbacks = {
            onThemeChange: null,
            onQualityChange: null,
            onPerformanceDrop: null
        };
        
        this.init();
    }
    
    // ==================== INICIALIZAÇÃO ====================
    init() {
        console.log('🚀 ParticleEnginePro - Inicializando versão ABSURDA');
        
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupPostProcessing();
        this.setupParticles();
        this.setupEnvironment();
        this.bindEvents();
        this.detectDeviceCapabilities();
        this.startAnimationLoop();
        
        console.log('✅ Engine ABSURDA inicializada com', this.config.particleCount, 'partículas');
    }
    
    setupScene() {
        this.scene = new THREE.Scene();
        const bg = this.config.themes[this.state.theme].background;
        this.scene.background = new THREE.Color(bg[0], bg[1], bg[2]);
        
        // Névoa para profundidade
        this.scene.fog = new THREE.FogExp2(this.scene.background, 0.002);
    }
    
    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            65,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 2, 38);
        this.camera.lookAt(0, 0, 0);
    }
    
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.state.isMobile ? 1.5 : 2));
        this.renderer.domElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        `;
        
        this.container.prepend(this.renderer.domElement);
    }
    
    setupPostProcessing() {
        this.composer = new EffectComposer(this.renderer);
        
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
        
        this.bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            this.config.bloom.strength,
            this.config.bloom.radius,
            this.config.bloom.threshold
        );
        this.composer.addPass(this.bloomPass);
    }
    
    setupParticles() {
        const count = this.config.particleCount;
        
        this.geometry = new THREE.BufferGeometry();
        
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const randomness = new Float32Array(count);
        const phases = new Float32Array(count);
        
        const theme = this.config.themes[this.state.theme];
        const color1 = new THREE.Color(theme.primary[0], theme.primary[1], theme.primary[2]);
        const color2 = new THREE.Color(theme.secondary[0], theme.secondary[1], theme.secondary[2]);
        const color3 = new THREE.Color(theme.tertiary[0], theme.tertiary[1], theme.tertiary[2]);
        
        for (let i = 0; i < count; i++) {
            // Distribuição em esfera com concentração no centro
            const r = Math.pow(Math.random(), 1.5) * 45;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            positions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
            positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r * 0.6; // achatamento vertical
            positions[i * 3 + 2] = Math.cos(phi) * r;
            
            // Cores baseadas na posição
            const mixFactor = (r / 45);
            let color;
            if (mixFactor < 0.33) {
                color = color1.clone().lerp(color2, mixFactor * 3);
            } else if (mixFactor < 0.66) {
                color = color2.clone().lerp(color3, (mixFactor - 0.33) * 3);
            } else {
                color = color3.clone().lerp(color1, (mixFactor - 0.66) * 3);
            }
            
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
            
            scales[i] = 0.3 + Math.random() * 0.8;
            randomness[i] = Math.random();
            phases[i] = Math.random() * Math.PI * 2;
        }
        
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
        this.geometry.setAttribute('aRandom', new THREE.BufferAttribute(randomness, 1));
        this.geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
        
        // Shader ABSURDO
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uMouseVelocity: { value: new THREE.Vector2(0, 0) },
                uEnergy: { value: 0 },
                uScroll: { value: 0 },
                uPixelRatio: { value: this.renderer.getPixelRatio() },
                uInteractionBoost: { value: 1.0 }
            },
            vertexShader: `
                attribute float aScale;
                attribute float aRandom;
                attribute float aPhase;
                attribute vec3 color;
                
                uniform float uTime;
                uniform vec2 uMouse;
                uniform vec2 uMouseVelocity;
                uniform float uEnergy;
                uniform float uScroll;
                uniform float uPixelRatio;
                uniform float uInteractionBoost;
                
                varying vec3 vColor;
                varying float vAlpha;
                
                void main() {
                    vec3 pos = position;
                    
                    float dist = length(pos);
                    float normDist = dist / 45.0;
                    
                    // Movimento orgânico complexo (múltiplas frequências)
                    float wave1 = sin(uTime * 0.8 + pos.x * 0.08 + aPhase) * cos(uTime * 0.5 + pos.z * 0.06) * 1.2;
                    float wave2 = cos(uTime * 0.6 + pos.y * 0.1 + aRandom * 10.0) * sin(uTime * 0.4 + pos.x * 0.07) * 1.0;
                    float wave3 = sin(uTime * 1.2 + pos.z * 0.05) * cos(uTime * 0.3 + pos.y * 0.09) * 0.8;
                    
                    pos.x += wave1 * (0.8 + aRandom * 0.5);
                    pos.y += wave2 * (0.6 + aRandom * 0.4);
                    pos.z += wave3 * (0.7 + aRandom * 0.3);
                    
                    // Efeito de energia (expansão)
                    vec3 energyOffset = normalize(pos) * uEnergy * (1.5 + aRandom * 1.0);
                    pos += energyOffset;
                    
                    // Gravidade do mouse (campo de força)
                    vec3 mousePos = vec3(uMouse.x * 20.0, uMouse.y * 15.0, 0.0);
                    vec3 toMouse = mousePos - pos;
                    float mouseDist = length(toMouse);
                    float mouseForce = uInteractionBoost * (1.0 / (mouseDist * 0.3 + 1.0)) * 0.8;
                    pos += normalize(toMouse) * mouseForce * (0.5 + uEnergy * 0.5);
                    
                    // Efeito de velocidade do mouse (arrasto)
                    vec3 velocityOffset = vec3(uMouseVelocity.x * 3.0, uMouseVelocity.y * 2.0, 0.0) * (1.0 / (dist * 0.2 + 1.0));
                    pos += velocityOffset;
                    
                    // Warp com scroll
                    pos.z += uScroll * (5.0 + aRandom * 3.0);
                    
                    // Rotação suave do campo inteiro
                    float rotAngle = uTime * 0.03;
                    pos.xz = mat2(cos(rotAngle), -sin(rotAngle), sin(rotAngle), cos(rotAngle)) * pos.xz;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    
                    // Tamanho dinâmico baseado em distância, energia e interação
                    float sizeFactor = aScale * (0.8 + uEnergy * 0.4 + mouseForce * 0.3);
                    gl_PointSize = sizeFactor * 12.0 * uPixelRatio * (250.0 / -mvPosition.z);
                    
                    // Cores variantes
                    vColor = color;
                    
                    // Alpha baseado em distância e energia
                    vAlpha = 0.4 + 0.6 * (1.0 - normDist) + uEnergy * 0.2;
                    vAlpha = clamp(vAlpha, 0.3, 1.0);
                    
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vAlpha;
                
                void main() {
                    vec2 center = gl_PointCoord - vec2(0.5);
                    float dist = length(center);
                    
                    // Gradiente radial suave com halo
                    float innerGlow = 1.0 - smoothstep(0.0, 0.35, dist);
                    float outerGlow = 1.0 - smoothstep(0.2, 0.55, dist);
                    
                    float strength = innerGlow * 0.8 + outerGlow * 0.4;
                    
                    // Efeito de brilho no centro
                    float coreGlow = exp(-dist * 4.0) * 0.5;
                    strength += coreGlow;
                    
                    // Cor final com variação
                    vec3 finalColor = vColor;
                    
                    // Adiciona branco no centro para efeito de brilho
                    finalColor = mix(finalColor, vec3(1.0), coreGlow * 0.7);
                    
                    // Alpha final
                    float alpha = strength * vAlpha;
                    
                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });
        
        this.points = new THREE.Points(this.geometry, this.material);
        this.scene.add(this.points);
    }
    
    setupEnvironment() {
        // Estrelas distantes para profundidade
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 2000;
        const starPositions = new Float32Array(starCount * 3);
        
        for (let i = 0; i < starCount * 3; i += 3) {
            const r = 80 + Math.random() * 120;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            starPositions[i] = Math.sin(phi) * Math.cos(theta) * r;
            starPositions[i + 1] = Math.sin(phi) * Math.sin(theta) * r;
            starPositions[i + 2] = Math.cos(phi) * r;
        }
        
        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.15,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        const stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(stars);
    }
    
    // ==================== EVENTOS ====================
    bindEvents() {
        // Mouse com suavização e cálculo de velocidade
        window.addEventListener('mousemove', (e) => {
            this.state.lastMouse.copy(this.state.mouse);
            
            this.state.mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
            this.state.mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
            
            // Calcular velocidade do mouse
            this.state.mouseVelocity.x = this.state.mouse.x - this.state.lastMouse.x;
            this.state.mouseVelocity.y = this.state.mouse.y - this.state.lastMouse.y;
            
            // Aumentar energia com movimento do mouse
            const speed = Math.sqrt(
                this.state.mouseVelocity.x ** 2 + 
                this.state.mouseVelocity.y ** 2
            );
            
            this.state.energy = Math.min(
                this.state.maxEnergy,
                this.state.energy + speed * 2.5
            );
            
            this.state.interactionBoost = 1.0 + speed * 2.0;
        });
        
        // Mouse leave - reset suave
        window.addEventListener('mouseleave', () => {
            this.state.energy *= 0.3;
            this.state.interactionBoost = 1.0;
        });
        
        // Scroll com suavização
        window.addEventListener('scroll', () => {
            this.state.scrollTarget = window.scrollY * 0.002;
        }, { passive: true });
        
        // Touch events para mobile
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length) {
                this.state.lastMouse.copy(this.state.mouse);
                
                this.state.mouse.x = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
                this.state.mouse.y = -(e.touches[0].clientY / window.innerHeight - 0.5) * 2;
                
                this.state.energy = Math.min(this.state.maxEnergy, this.state.energy + 0.3);
                this.state.interactionBoost = 1.5;
            }
        }, { passive: true });
        
        window.addEventListener('touchend', () => {
            this.state.energy *= 0.5;
            this.state.interactionBoost = 1.0;
        });
        
        // Resize
        window.addEventListener('resize', () => this.onResize());
        
        // Visibility change
        document.addEventListener('visibilitychange', () => {
            this.state.isActive = !document.hidden;
            if (this.state.isActive) {
                this.state.clock = new THREE.Clock();
            }
        });
        
        // Detectar mudança de tema do documento
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((m) => {
                if (m.attributeName === 'data-theme') {
                    const newTheme = document.documentElement.getAttribute('data-theme');
                    this.setTheme(newTheme);
                }
            });
        });
        
        observer.observe(document.documentElement, { attributes: true });
    }
    
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, this.state.isMobile ? 1.5 : 2));
        
        this.composer.setSize(window.innerWidth, window.innerHeight);
        
        this.material.uniforms.uPixelRatio.value = this.renderer.getPixelRatio();
    }
    
    // ==================== SISTEMA DE PERFORMANCE ====================
    detectDeviceCapabilities() {
        // Detectar GPU via WebGL
        const gl = this.renderer.getContext();
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        
        if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            console.log('🎮 GPU:', renderer);
            
            // Ajustar qualidade baseado na GPU
            if (renderer.includes('Intel') || renderer.includes('Mali')) {
                this.state.quality = 'medium';
                this.config.particleCount = Math.floor(this.config.particleCount * 0.7);
            } else if (renderer.includes('Apple')) {
                this.state.quality = 'high';
            }
        }
        
        // Ajustes para mobile
        if (this.state.isMobile) {
            this.config.particleCount = Math.floor(this.config.particleCount * 0.6);
            this.config.bloom.strength = 0.8;
            this.bloomPass.strength = 0.8;
        }
        
        this.recreateParticles();
    }
    
    updatePerformance() {
        const now = performance.now();
        this.state.deltaTime = (now - this.state.lastFrameTime) / 1000;
        this.state.lastFrameTime = now;
        
        // Calcular FPS
        this.state.frameCount++;
        if (now - this.state.lastFPSUpdate >= 1000) {
            this.state.fps = this.state.frameCount;
            this.state.frameCount = 0;
            this.state.lastFPSUpdate = now;
            
            // LOD adaptativo baseado em FPS
            if (this.config.performance.adaptiveQuality) {
                if (this.state.fps < 40 && this.config.particleCount > this.config.minParticles) {
                    this.config.particleCount = Math.max(
                        this.config.minParticles,
                        Math.floor(this.config.particleCount * 0.85)
                    );
                    this.recreateParticles();
                    console.log('⚡ Performance: Reduzindo para', this.config.particleCount, 'partículas');
                    
                    if (this.callbacks.onPerformanceDrop) {
                        this.callbacks.onPerformanceDrop({ fps: this.state.fps, particles: this.config.particleCount });
                    }
                } else if (this.state.fps > 55 && this.config.particleCount < this.config.maxParticles) {
                    this.config.particleCount = Math.min(
                        this.config.maxParticles,
                        Math.floor(this.config.particleCount * 1.05)
                    );
                    this.recreateParticles();
                }
            }
        }
        
        // Decaimento de energia
        this.state.energy *= this.config.animation.energyDecay;
        this.state.interactionBoost = 1.0 + (this.state.interactionBoost - 1.0) * 0.9;
        
        // Suavização do scroll
        this.state.scroll += (this.state.scrollTarget - this.state.scroll) * 0.05;
    }
    
    recreateParticles() {
        if (this.points) {
            this.scene.remove(this.points);
            this.geometry.dispose();
            this.material.dispose();
        }
        this.setupParticles();
    }
    
    // ==================== ANIMAÇÃO ====================
    startAnimationLoop() {
        const animate = () => {
            if (!this.state.isActive) {
                requestAnimationFrame(animate);
                return;
            }
            
            requestAnimationFrame(animate);
            
            // Atualizar tempo
            this.state.time += this.state.deltaTime * this.config.animation.speed;
            
            // Atualizar performance
            this.updatePerformance();
            
            // Atualizar uniforms
            this.material.uniforms.uTime.value = this.state.time;
            this.material.uniforms.uMouse.value = this.state.mouse;
            this.material.uniforms.uMouseVelocity.value = this.state.mouseVelocity;
            this.material.uniforms.uEnergy.value = this.state.energy;
            this.material.uniforms.uScroll.value = this.state.scroll;
            this.material.uniforms.uInteractionBoost.value = this.state.interactionBoost;
            
            // Parallax da câmera
            const targetX = this.state.mouse.x * 4.0 * this.config.animation.mouseStrength;
            const targetY = this.state.mouse.y * 3.0 * this.config.animation.mouseStrength + 2;
            
            this.camera.position.x += (targetX - this.camera.position.x) * 0.03;
            this.camera.position.y += (targetY - this.camera.position.y) * 0.03;
            
            // Efeito de zoom com scroll
            const targetZ = 38 + this.state.scroll * this.config.animation.scrollStrength * 15;
            this.camera.position.z += (targetZ - this.camera.position.z) * 0.02;
            
            this.camera.lookAt(0, 0, 0);
            
            // Renderizar com pós-processamento
            this.composer.render();
        };
        
        animate();
    }
    
    // ==================== API PÚBLICA ====================
    setTheme(theme) {
        if (this.config.themes[theme]) {
            this.state.theme = theme;
            
            const bg = this.config.themes[theme].background;
            this.scene.background = new THREE.Color(bg[0], bg[1], bg[2]);
            this.scene.fog = new THREE.FogExp2(this.scene.background, 0.002);
            
            // Atualizar cores das partículas
            this.recreateParticles();
            
            if (this.callbacks.onThemeChange) {
                this.callbacks.onThemeChange(theme);
            }
            
            console.log('🎨 Tema alterado para:', theme);
        }
    }
    
    setQuality(quality) {
        const levels = {
            low: { multiplier: 0.4, bloom: 0.5 },
            medium: { multiplier: 0.7, bloom: 0.8 },
            high: { multiplier: 1.0, bloom: 1.2 },
            ultra: { multiplier: 1.3, bloom: 1.5 }
        };
        
        const config = levels[quality] || levels.high;
        
        this.config.particleCount = Math.floor(2000 * config.multiplier);
        this.bloomPass.strength = config.bloom;
        this.state.quality = quality;
        
        this.recreateParticles();
        
        if (this.callbacks.onQualityChange) {
            this.callbacks.onQualityChange(quality);
        }
        
        console.log('⚡ Qualidade alterada para:', quality);
    }
    
    setEnergy(energy) {
        this.state.energy = Math.min(this.state.maxEnergy, Math.max(0, energy));
    }
    
    boostEnergy(amount = 1.0) {
        this.state.energy = Math.min(this.state.maxEnergy, this.state.energy + amount);
        this.state.interactionBoost = 2.0;
    }
    
    getStats() {
        return {
            fps: this.state.fps,
            particles: this.config.particleCount,
            energy: this.state.energy,
            quality: this.state.quality,
            theme: this.state.theme,
            isMobile: this.state.isMobile
        };
    }
    
    on(event, callback) {
        if (event === 'themeChange') this.callbacks.onThemeChange = callback;
        if (event === 'qualityChange') this.callbacks.onQualityChange = callback;
        if (event === 'performanceDrop') this.callbacks.onPerformanceDrop = callback;
    }
    
    dispose() {
        this.state.isActive = false;
        
        if (this.points) {
            this.scene.remove(this.points);
            this.geometry.dispose();
            this.material.dispose();
        }
        
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer.domElement.remove();
        }
        
        console.log('🧹 ParticleEnginePro completamente removida');
    }
}

// ==================== EXPORTAÇÃO E INICIALIZAÇÃO ====================
let engineInstance = null;

function initParticleEngine(container = document.body, options = {}) {
    if (!engineInstance) {
        engineInstance = new ParticleEnginePro(container, options);
        
        // Detectar tema inicial
        const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        engineInstance.setTheme(initialTheme);
        
        // Expor para debug
        window.__PARTICLE_ENGINE__ = engineInstance;
    }
    
    return engineInstance;
}

// Auto-inicialização
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => initParticleEngine(), 100);
    });
} else {
    setTimeout(() => initParticleEngine(), 100);
}

// Exportar para uso global
window.ParticleEnginePro = ParticleEnginePro;
window.initParticleEngine = initParticleEngine;

// Exemplo de uso avançado:
/*
const engine = initParticleEngine(document.body, {
    particleCount: 2500,
    bloom: { strength: 1.5, radius: 0.6, threshold: 0.1 },
    animation: { speed: 1.0, mouseStrength: 1.5 }
});

// API disponível:
engine.setTheme('sunset');
engine.setQuality('ultra');
engine.boostEnergy(2.0);
engine.getStats();
engine.on('themeChange', (theme) => console.log('Novo tema:', theme));
*/