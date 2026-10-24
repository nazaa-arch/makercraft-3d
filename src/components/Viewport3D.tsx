import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { ParametricSettings } from '../types/maker';

interface Viewport3DProps {
  settings: ParametricSettings;
  onMeshUpdated?: (geometry: THREE.BufferGeometry, vertexCount: number, faceCount: number) => void;
}

export const Viewport3D: React.FC<Viewport3DProps> = ({ settings, onMeshUpdated }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  // Initialize Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xa855f7, 2.0);
    dirLight1.position.set(10, 20, 15); dirLight1.intensity = 2.4;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 1.8);
    dirLight2.position.set(-15, -10, -10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 1.2, 50);
    pointLight.position.set(0, 0, 15);
    scene.add(pointLight);

    // Mouse Drag Rotation
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !meshRef.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      meshRef.current.rotation.y += deltaX * 0.008;
      meshRef.current.rotation.x += deltaY * 0.008;

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z = Math.max(8, Math.min(60, camera.position.z + e.deltaY * 0.02));
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    container.addEventListener('wheel', onWheel);

    // Resize Handler
    const onResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Render loop
    let animId: number;
    const animate = () => {
      if (meshRef.current && settings.autoRotate && !isDraggingRef.current) {
        meshRef.current.rotation.y += 0.008 * settings.rotationSpeed;
        meshRef.current.rotation.x += 0.004 * settings.rotationSpeed;
      }
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  // Update Geometry & Material whenever settings change
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (meshRef.current) {
      scene.remove(meshRef.current);
      meshRef.current.geometry.dispose();
      if (Array.isArray(meshRef.current.material)) {
        meshRef.current.material.forEach((m) => m.dispose());
      } else {
        meshRef.current.material.dispose();
      }
    }

    let geometry: THREE.BufferGeometry;

    if (settings.geometry === 'torus-knot') {
      geometry = new THREE.TorusKnotGeometry(
        settings.scale * 3.5,
        settings.tubeRadius * 1.2,
        Math.min(256, settings.resolution * 2),
        32,
        Math.round(settings.p),
        Math.round(settings.q)
      );
    } else if (settings.geometry === 'mobius') {
      // Procedural Möbius Strip
      const uSegments = settings.resolution;
      const vSegments = 24;
      const positions: number[] = [];
      const indices: number[] = [];

      for (let i = 0; i <= uSegments; i++) {
        const u = (i / uSegments) * Math.PI * 2;
        for (let j = 0; j <= vSegments; j++) {
          const v = ((j / vSegments) - 0.5) * settings.tubeRadius * 3;
          const x = (settings.scale * 4 + v * Math.cos(u / 2)) * Math.cos(u);
          const y = (settings.scale * 4 + v * Math.cos(u / 2)) * Math.sin(u);
          const z = v * Math.sin(u / 2);
          positions.push(x, y, z);
        }
      }

      for (let i = 0; i < uSegments; i++) {
        for (let j = 0; j < vSegments; j++) {
          const a = i * (vSegments + 1) + j;
          const b = (i + 1) * (vSegments + 1) + j;
          const c = (i + 1) * (vSegments + 1) + (j + 1);
          const d = i * (vSegments + 1) + (j + 1);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();
    } else if (settings.geometry === 'spherical-harmonic') {
      // Deformed Spherical Harmonics
      const uSeg = Math.min(128, settings.resolution);
      const vSeg = Math.min(96, Math.floor(settings.resolution * 0.75));
      const pos: number[] = [];
      const idx: number[] = [];

      for (let i = 0; i <= uSeg; i++) {
        const theta = (i / uSeg) * Math.PI; // 0 to pi
        for (let j = 0; j <= vSeg; j++) {
          const phi = (j / vSeg) * Math.PI * 2; // 0 to 2pi
          const rBase = settings.scale * 4;
          const mod = 1.0 + 0.35 * Math.sin(settings.p * theta) * Math.cos(settings.q * phi);
          const r = rBase * mod;

          const x = r * Math.sin(theta) * Math.cos(phi);
          const y = r * Math.cos(theta);
          const z = r * Math.sin(theta) * Math.sin(phi);
          pos.push(x, y, z);
        }
      }

      for (let i = 0; i < uSeg; i++) {
        for (let j = 0; j < vSeg; j++) {
          const a = i * (vSeg + 1) + j;
          const b = (i + 1) * (vSeg + 1) + j;
          const c = (i + 1) * (vSeg + 1) + (j + 1);
          const d = i * (vSeg + 1) + (j + 1);
          idx.push(a, b, d);
          idx.push(b, c, d);
        }
      }

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geometry.setIndex(idx);
      geometry.computeVertexNormals();
    } else {
      // Superformula / Klein fallback
      geometry = new THREE.TorusGeometry(
        settings.scale * 3.5,
        settings.tubeRadius * 1.5,
        32,
        settings.resolution
      );
    }

    // Determine Material Color / Properties
    let matColor = 0xa855f7;
    let roughness = 0.25;
    let metalness = 0.7;

    if (settings.theme === 'cyberpunk') {
      matColor = 0xec4899;
      metalness = 0.85;
      roughness = 0.15;
    } else if (settings.theme === 'emerald-matrix') {
      matColor = 0x10b981;
      metalness = 0.75;
      roughness = 0.2;
    } else if (settings.theme === 'amber-gold') {
      matColor = 0xf59e0b;
      metalness = 0.95;
      roughness = 0.1;
    } else if (settings.theme === 'hologram') {
      matColor = 0x06b6d4;
      metalness = 0.3;
      roughness = 0.5;
    }

    const material = new THREE.MeshStandardMaterial({
      color: matColor,
      roughness,
      metalness,
      wireframe: settings.wireframe,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Report stats
    const vertexCount = geometry.getAttribute('position').count;
    const faceCount = geometry.getIndex() ? geometry.getIndex()!.count / 3 : vertexCount / 3;
    if (onMeshUpdated) {
      onMeshUpdated(geometry, vertexCount, Math.floor(faceCount));
    }
  }, [settings]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
    />
  );
};
