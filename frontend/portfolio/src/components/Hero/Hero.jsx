import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import * as THREE from 'three';

const RippleHero = () => {
  const containerRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const materialRef = useRef(null);
  const clockRef = useRef(null);
  const animationFrameRef = useRef(null);
  const waterBuffersRef = useRef(null);
  const waterTextureRef = useRef(null);
  const autoDropIntervalRef = useRef(null);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });
  const mouseThrottleTimeRef = useRef(0);
  
  const [isLoaded, setIsLoaded] = useState(false);

  // Optimized settings for low-end machines with visible ripples
  const settings = useRef({
    damping: 0.96,
    tension: 0.04,
    resolution: 384,
    rippleStrength: 3.5, // Increased for visibility
    mouseIntensity: 0.8,
    clickIntensity: 4.0,
    rippleRadius: 30,
    autoDrops: true,
    autoDropInterval: 3000,
    autoDropIntensity: 2.5
  }).current;

  const gradientColors = useRef({
    colorA1: [0.82, 0.88, 0.96],
    colorA2: [0.70, 0.78, 0.92],
    colorB1: [0.88, 0.85, 0.96],
    colorB2: [0.75, 0.77, 0.92]
  }).current;

  const initWaterRipple = useCallback(() => {
    const resolution = settings.resolution;
    waterBuffersRef.current = {
      current: new Float32Array(resolution * resolution),
      previous: new Float32Array(resolution * resolution)
    };

    waterTextureRef.current = new THREE.DataTexture(
      waterBuffersRef.current.current,
      resolution,
      resolution,
      THREE.RedFormat,
      THREE.FloatType
    );
    waterTextureRef.current.minFilter = THREE.LinearFilter;
    waterTextureRef.current.magFilter = THREE.LinearFilter;
    waterTextureRef.current.needsUpdate = true;
  }, [settings.resolution]);

  const createBackground = useCallback(() => {
    const backgroundShader = {
      uniforms: {
        waterTexture: { value: waterTextureRef.current },
        rippleStrength: { value: settings.rippleStrength },
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight)
        },
        time: { value: 0 },
        colorA1: {
          value: new THREE.Vector3(
            gradientColors.colorA1[0],
            gradientColors.colorA1[1],
            gradientColors.colorA1[2]
          )
        },
        colorA2: {
          value: new THREE.Vector3(
            gradientColors.colorA2[0],
            gradientColors.colorA2[1],
            gradientColors.colorA2[2]
          )
        },
        colorB1: {
          value: new THREE.Vector3(
            gradientColors.colorB1[0],
            gradientColors.colorB1[1],
            gradientColors.colorB1[2]
          )
        },
        colorB2: {
          value: new THREE.Vector3(
            gradientColors.colorB2[0],
            gradientColors.colorB2[1],
            gradientColors.colorB2[2]
          )
        }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D waterTexture;
        uniform float rippleStrength;
        uniform vec2 resolution;
        uniform float time;
        uniform vec3 colorA1;
        uniform vec3 colorA2;
        uniform vec3 colorB1;
        uniform vec3 colorB2;
        varying vec2 vUv;

        float S(float a, float b, float t) {
          return smoothstep(a, b, t);
        }

        mat2 Rot(float a) {
          float s = sin(a);
          float c = cos(a);
          return mat2(c, -s, s, c);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = fract(sin(dot(ip, vec2(12.9898, 78.233))) * 43758.5453);
          float b = fract(sin(dot(ip + vec2(1.0, 0.0), vec2(12.9898, 78.233))) * 43758.5453);
          float c = fract(sin(dot(ip + vec2(0.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453);
          float d = fract(sin(dot(ip + vec2(1.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453);
          fp = fp * fp * (3.0 - 2.0 * fp);
          return mix(mix(a, b, fp.x), mix(c, d, fp.x), fp.y);
        }

        void main() {
          float waterHeight = texture2D(waterTexture, vUv).r;
          float step = 1.0 / resolution.x;
          vec2 distortion = vec2(
            texture2D(waterTexture, vec2(vUv.x + step, vUv.y)).r - texture2D(waterTexture, vec2(vUv.x - step, vUv.y)).r,
            texture2D(waterTexture, vec2(vUv.x, vUv.y + step)).r - texture2D(waterTexture, vec2(vUv.x, vUv.y - step)).r
          ) * rippleStrength * 10.0;

          vec2 tuv = vUv + distortion;
          tuv -= 0.5;
          float ratio = resolution.x / resolution.y;
          tuv.y *= 1.0/ratio;

          vec3 layer1 = mix(colorA1, colorA2, S(-0.3, 0.2, (tuv*Rot(radians(-5.0))).x));
          vec3 layer2 = mix(colorB1, colorB2, S(-0.3, 0.2, (tuv*Rot(radians(-5.0))).x));
          vec3 finalComp = mix(layer1, layer2, S(0.5, -0.3, tuv.y));

          float noiseValue = noise(tuv * 20.0 + time * 0.1) * 0.06;
          finalComp += vec3(noiseValue);

          float vignette = 1.0 - smoothstep(0.5, 1.5, length(tuv * 1.5));
          finalComp *= mix(0.88, 1.0, vignette);

          gl_FragColor = vec4(finalComp, 1.0);
        }
      `
    };

    const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    materialRef.current = new THREE.ShaderMaterial({
      uniforms: backgroundShader.uniforms,
      vertexShader: backgroundShader.vertexShader,
      fragmentShader: backgroundShader.fragmentShader
    });

    const mesh = new THREE.Mesh(geometry, materialRef.current);
    sceneRef.current.add(mesh);
  }, [settings.rippleStrength, gradientColors]);

  const updateWaterSimulation = useCallback(() => {
    if (!waterBuffersRef.current) return;

    const { current, previous } = waterBuffersRef.current;
    const { damping, tension, resolution } = settings;
    const safeTension = Math.min(tension, 0.05);

    for (let i = 1; i < resolution - 1; i++) {
      for (let j = 1; j < resolution - 1; j++) {
        const index = i * resolution + j;
        const top = previous[index - resolution];
        const bottom = previous[index + resolution];
        const left = previous[index - 1];
        const right = previous[index + 1];

        current[index] = (top + bottom + left + right) / 2 - current[index];
        current[index] = current[index] * damping + previous[index] * (1 - damping);
        current[index] += (0 - previous[index]) * safeTension;
        current[index] = Math.max(-1.0, Math.min(1.0, current[index]));
      }
    }

    [waterBuffersRef.current.current, waterBuffersRef.current.previous] = [
      waterBuffersRef.current.previous,
      waterBuffersRef.current.current
    ];

    if (waterTextureRef.current) {
      waterTextureRef.current.image.data = waterBuffersRef.current.current;
      waterTextureRef.current.needsUpdate = true;
    }
  }, [settings]);

  const addRipple = useCallback((x, y, strength = 1.0) => {
    if (!waterBuffersRef.current) return;

    const { resolution, rippleRadius } = settings;
    const normalizedX = x / window.innerWidth;
    const normalizedY = 1.0 - y / window.innerHeight;
    const texX = Math.floor(normalizedX * resolution);
    const texY = Math.floor(normalizedY * resolution);
    const radius = rippleRadius;
    const rippleStrength = strength;
    const radiusSquared = radius * radius;

    for (let i = -radius; i <= radius; i++) {
      for (let j = -radius; j <= radius; j++) {
        const distanceSquared = i * i + j * j;
        if (distanceSquared <= radiusSquared) {
          const posX = texX + i;
          const posY = texY + j;
          if (posX >= 0 && posX < resolution && posY >= 0 && posY < resolution) {
            const index = posY * resolution + posX;
            const distance = Math.sqrt(distanceSquared);
            const rippleValue = Math.cos(((distance / radius) * Math.PI) / 2) * rippleStrength;
            waterBuffersRef.current.previous[index] += rippleValue;
          }
        }
      }
    }
  }, [settings]);

  const drawOverlayRipples = useCallback(() => {
    // Removed blue circle indicators - ripples are visible through the shader distortion
  }, []);

  const tick = useCallback(() => {
    updateWaterSimulation();
    drawOverlayRipples();

    if (materialRef.current && clockRef.current) {
      materialRef.current.uniforms.rippleStrength.value = settings.rippleStrength;
      materialRef.current.uniforms.time.value += clockRef.current.getDelta();
    }

    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(tick);
  }, [updateWaterSimulation, drawOverlayRipples, settings.rippleStrength]);

  const setupAutoDrops = useCallback(() => {
    if (autoDropIntervalRef.current) {
      clearInterval(autoDropIntervalRef.current);
    }

    if (settings.autoDrops) {
      autoDropIntervalRef.current = setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        addRipple(x, y, settings.autoDropIntensity);
      }, settings.autoDropInterval);
    }
  }, [settings, addRipple]);

  useEffect(() => {
    if (!containerRef.current || !overlayCanvasRef.current) return;

    // Setup overlay canvas
    const overlayCanvas = overlayCanvasRef.current;
    overlayCanvas.width = window.innerWidth;
    overlayCanvas.height = window.innerHeight;

    // Initialize Three.js
    rendererRef.current = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: "high-performance",
      alpha: true
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    containerRef.current.appendChild(rendererRef.current.domElement);

    sceneRef.current = new THREE.Scene();
    cameraRef.current = new THREE.OrthographicCamera(
      -window.innerWidth / 2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      -window.innerHeight / 2,
      0.1,
      1000
    );
    cameraRef.current.position.z = 10;

    clockRef.current = new THREE.Clock();

    initWaterRipple();
    createBackground();

    // Event handlers
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      const now = performance.now();
      if (now - mouseThrottleTimeRef.current < 32) return;
      mouseThrottleTimeRef.current = now;

      const dx = x - lastMousePositionRef.current.x;
      const dy = y - lastMousePositionRef.current.y;
      const distSquared = dx * dx + dy * dy;

      if (distSquared > 10) {
        addRipple(x, y, settings.mouseIntensity);
        lastMousePositionRef.current = { x, y };
      }
    };

    const handleClick = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      addRipple(x, y, settings.clickIntensity);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      overlayCanvas.width = width;
      overlayCanvas.height = height;

      cameraRef.current.left = -width / 2;
      cameraRef.current.right = width / 2;
      cameraRef.current.top = height / 2;
      cameraRef.current.bottom = -height / 2;
      cameraRef.current.updateProjectionMatrix();

      rendererRef.current.setSize(width, height);

      if (materialRef.current) {
        materialRef.current.uniforms.resolution.value.set(width, height);
      }

      if (sceneRef.current.children[0] && sceneRef.current.children[0].geometry) {
        sceneRef.current.children[0].geometry.dispose();
        sceneRef.current.children[0].geometry = new THREE.PlaneGeometry(width, height);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    setupAutoDrops();
    tick();
    setIsLoaded(true);

    // Initial center ripple
    setTimeout(() => {
      addRipple(window.innerWidth / 2, window.innerHeight / 2, 3.0);
    }, 300);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (autoDropIntervalRef.current) {
        clearInterval(autoDropIntervalRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [initWaterRipple, createBackground, addRipple, setupAutoDrops, tick, settings]);

  const handleSocialClick = useCallback((platform) => {
    const urls = {
      github: 'https://github.com/donaldcolin',
      linkedin: 'https://linkedin.com/in/donaldcolin',
      email: 'mailto:dcolin207@gmail.com'
    };
    window.open(urls[platform], '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <style>{`
        @keyframes ripple-distort {
          0%, 100% { 
            filter: url(#ripple-filter);
            transform: translateZ(0);
          }
        }
        
        .ripple-text {
          filter: url(#ripple-filter);
          will-change: filter;
        }
      `}</style>

      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="ripple-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence 
              id="ripple-turbulence" 
              type="turbulence" 
              baseFrequency="0.02 0.015" 
              numOctaves="2" 
              result="turbulence"
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="turbulence" 
              scale="3" 
              xChannelSelector="R" 
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Three.js background */}
      <div ref={containerRef} className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1 }} />
      
      {/* UI Content */}
      <div className="relative w-full h-full" style={{ zIndex: 10 }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-80 h-96 md:w-96 md:h-[28rem]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/50 bg-white/90 backdrop-blur-sm">
              <img
                src="https://res.cloudinary.com/dt9apeyvy/image/upload/v1759164079/WhatsApp_Image_2025-09-29_at_22.03.21_ragkdn.jpg"
                alt="Donald Colin - Full Stack Developer & Strategist"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>

        <div className="absolute top-6 left-6 md:top-8 md:left-8">
          <p className="text-2xl font-bold text-slate-800 ripple-text" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Donald Colin
          </p>
        </div>

        <div className="absolute top-6 right-6 md:top-8 md:right-8 flex gap-2">
          {[
            { platform: 'github', icon: Github, label: 'GitHub' },
            { platform: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
            { platform: 'email', icon: Mail, label: 'Email' }
          ].map(({ platform, icon: Icon, label }) => (
            <button
              key={platform}
              onClick={() => handleSocialClick(platform)}
              className="p-2.5 rounded-lg shadow-lg transition-all duration-200 hover:scale-105 bg-white/90 backdrop-blur-sm hover:bg-white"
              aria-label={`Visit ${label} Profile`}
            >
              <Icon className="w-4 h-4 text-slate-600 hover:text-slate-800" />
            </button>
          ))}
        </div>

        <div className="absolute bottom-8 left-8 flex items-center gap-3">
          <div className="flex items-center gap-2 py-2 px-3 rounded-full shadow-lg bg-white/90 backdrop-blur-sm ripple-text">
            <ArrowDown size={16} className="text-slate-600 animate-bounce" />
            <span className="text-sm font-medium text-slate-600" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Scroll
            </span>
          </div>
        </div>
      </div>

      {/* Overlay canvas for visible ripple indicators */}
      <canvas
        ref={overlayCanvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 20 }}
      />
    </div>
  );
};

export default RippleHero;