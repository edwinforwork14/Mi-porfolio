"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import ErrorBoundary from "./ErrorBoundary";

function Model({ url }: { url: string }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);

  useFrame((state) => {
    if (!group.current) return;
    // Smooth mouse-follow rotation
    const x = state.mouse.x * 0.3;
    const y = state.mouse.y * 0.2;
    group.current.rotation.set(-y, x, 0);
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={2.5}
      position={[0, -1, 0]}
    />
  );
}

function FallbackModel() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const x = state.mouse.x * 0.3;
    const y = state.mouse.y * 0.2;
    meshRef.current.rotation.set(-y, x, 0);
  });

  return (
    <mesh ref={meshRef} position={[0, -1, 0]} scale={2.5}>
      <dodecahedronGeometry args={[0.8, 0]} />
      <meshStandardMaterial
        color="#A83279"
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight
        position={[-10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1.5}
      />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <ErrorBoundary fallback={<FallbackModel />}>
          <Suspense fallback={<FallbackModel />}>
            <Model url="/models/alex-head.glb" />
          </Suspense>
        </ErrorBoundary>
      </Float>

      <Environment preset="city" />
      <ContactShadows
        opacity={0.4}
        scale={10}
        blur={2}
        far={4.5}
        position={[0, -2, 0]}
      />
    </>
  );
}

export default function Character() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
