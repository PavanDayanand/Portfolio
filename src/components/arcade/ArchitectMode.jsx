import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
  ContactShadows,
  Float,
  Text,
  Html,
  useCursor,
} from "@react-three/drei";

// --- Components ---

function Screen({ position, rotation, scale = 1, url }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Monitor Stand */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.1, 0.2, 1, 32]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Monitor Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 2, 0.1]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* Screen Content (Iframe) */}
      <Html
        transform
        wrapperClass="htmlScreen"
        distanceFactor={1.5}
        position={[0, 0, 0.06]}
        rotation={[0, 0, 0]}
      >
        <iframe
          src={url}
          title="screen"
          style={{
            width: "1024px",
            height: "640px",
            border: "none",
            borderRadius: "4px",
            background: "#000",
          }}
        />
      </Html>
    </group>
  );
}

function Laptop({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Base */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.1, 1.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Screen */}
      <group position={[0, 0.05, -0.75]} rotation={[-0.2, 0, 0]}>
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[2, 1.5, 0.1]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        {/* Screen Glow */}
        <mesh position={[0, 0.75, 0.06]}>
          <planeGeometry args={[1.9, 1.4]} />
          <meshStandardMaterial
            color="#00ffcc"
            emissive="#00ffcc"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </group>
  );
}

function Desk() {
  return (
    <group position={[0, -2, 0]}>
      {/* Table Top */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[8, 0.2, 4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.5} />
      </mesh>
      {/* Legs */}
      <mesh position={[-3.5, -1.5, 1.5]}>
        <cylinderGeometry args={[0.1, 0.1, 3, 32]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[3.5, -1.5, 1.5]}>
        <cylinderGeometry args={[0.1, 0.1, 3, 32]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[-3.5, -1.5, -1.5]}>
        <cylinderGeometry args={[0.1, 0.1, 3, 32]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[3.5, -1.5, -1.5]}>
        <cylinderGeometry args={[0.1, 0.1, 3, 32]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
}

function Chair() {
  return (
    <group position={[0, -2, 2.5]} rotation={[0, Math.PI, 0]}>
      {/* Seat */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[1.5, 0.2, 1.5]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 2, -0.7]}>
        <boxGeometry args={[1.5, 2, 0.2]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 32]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[1, 1, 0.1, 32]} />
        <meshStandardMaterial color="#111" />
      </mesh>
    </group>
  );
}

function Speaker({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.6, 1, 0.6]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      <mesh position={[0, 0.2, 0.31]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, -0.2, 0.31]}>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
}

function Lamp({ position }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 32]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Head */}
      <mesh position={[0.5, 2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <coneGeometry args={[0.3, 0.6, 32, 1, true]} />
        <meshStandardMaterial color="#444" side={2} />
      </mesh>
      {/* Light Source */}
      <spotLight
        position={[0.5, 1.8, 0]}
        angle={0.5}
        penumbra={0.5}
        intensity={2}
        color="#ffaa00"
        target-position={[0, 0, 0]}
      />
    </group>
  );
}

function Poster({ position, rotation, color = "#ff0055" }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[1.5, 2]} />
      <meshStandardMaterial color={color} />
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[1.6, 2.1, 0.05]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
    </mesh>
  );
}

function PenStand({ position }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.15, 0.15, 0.4, 32]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Pens */}
      <mesh position={[0.05, 0.2, 0]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 16]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh position={[-0.05, 0.2, 0.05]} rotation={[-0.1, 0.2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 16]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  );
}

function ArchitectMode() {
  return (
    <div className="w-full h-full bg-black">
      <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
        <Suspense fallback={<Html center>Loading Scene...</Html>}>
          <OrbitControls
            enableZoom={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={4}
            maxDistance={12}
            target={[0, 0, 0]}
          />

          {/* Environment */}
          <Environment preset="city" />
          <ambientLight intensity={0.3} />

          {/* Main Desk Setup */}
          <group position={[0, -0.5, 0]}>
            <Desk />
            <Chair />
            {/* Tech */}
            <Screen position={[0, 1.2, -1]} url="/" />{" "}
            {/* Main Monitor showing Home */}
            <Screen
              position={[-3.2, 1.2, -0.5]}
              rotation={[0, 0.3, 0]}
              url="/projects"
            />{" "}
            {/* Second Monitor */}
            <Laptop position={[2, 0.1, 0.5]} rotation={[0, -0.3, 0]} />
            <Speaker position={[-2, 0.5, 0]} rotation={[0, 0.2, 0]} />
            <Speaker position={[2, 0.5, 0]} rotation={[0, -0.2, 0]} />
            {/* Decor */}
            <Lamp position={[-3.5, 0, 1]} />
            <PenStand position={[3, 0.2, 1]} />
            {/* Posters (Floating in space behind) */}
            <Poster
              position={[-4, 3, -4]}
              rotation={[0, 0.2, 0]}
              color="#00ffcc"
            />
            <Poster
              position={[4, 3, -4]}
              rotation={[0, -0.2, 0]}
              color="#ff0055"
            />
          </group>

          {/* Shadows */}
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={15}
            blur={2.5}
            far={4}
          />

          {/* Title */}
          <Text
            position={[0, 4, -5]}
            fontSize={2}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.1}
          >
            THE ARCHITECT
          </Text>
        </Suspense>
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm pointer-events-none bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
        Drag to rotate • Scroll to zoom • Interact with screens
      </div>
    </div>
  );
}

export default ArchitectMode;
