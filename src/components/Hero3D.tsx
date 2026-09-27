"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/** A grid of nodes connected by faint lines — a neural/particle matrix. */
function MatrixGrid({
  columns,
  rows,
  spacing,
}: {
  columns: number;
  rows: number;
  spacing: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo(() => {
    const arr: { pos: [number, number, number]; phase: number }[] = [];
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        arr.push({
          pos: [
            (i - columns / 2) * spacing,
            (j - rows / 2) * spacing,
            0,
          ],
          phase: Math.random() * Math.PI * 2,
        });
      }
    }
    return arr;
  }, [columns, rows, spacing]);

  // Line segments connecting horizontal + vertical neighbours.
  const lineGeom = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        const a: [number, number, number] = [
          (i - columns / 2) * spacing,
          (j - rows / 2) * spacing,
          0,
        ];
        if (i < columns - 1) {
          const b: [number, number, number] = [
            (i - columns / 2 + 1) * spacing,
            (j - rows / 2) * spacing,
            0,
          ];
          positions.push(...a, ...b);
        }
        if (j < rows - 1) {
          const b: [number, number, number] = [
            (i - columns / 2) * spacing,
            (j - rows / 2 + 1) * spacing,
            0,
          ];
          positions.push(...a, ...b);
        }
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return g;
  }, [columns, rows, spacing]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.08;
    groupRef.current.position.x = Math.sin(t * 0.2) * 0.4;
    groupRef.current.position.y = Math.cos(t * 0.25) * 0.4;
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.25}
        />
      </lineSegments>
      {nodes.map((n, idx) => (
        <mesh key={idx} position={n.pos}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial
            color={idx % 7 === 0 ? "#7000FF" : "#00F0FF"}
            emissive={idx % 7 === 0 ? "#7000FF" : "#00F0FF"}
            emissiveIntensity={0.6}
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Particles that drift with scroll + cursor parallax. */
function ParticleField({
  count,
}: {
  count: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.02;
    ref.current.position.y = state.pointer.y * 1.2;
    ref.current.position.x = state.pointer.x * 1.2;
  });

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return (
    <points ref={ref} geometry={geom}>
      <pointsMaterial
        size={0.06}
        color="#00F0FF"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function CursorRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 12], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00F0FF" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#7000FF" />
        <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.4}>
          <MatrixGrid columns={14} rows={14} spacing={1.3} />
        </Float>
        <ParticleField count={400} />
        <CursorRig />
      </Canvas>
    </div>
  );
}
