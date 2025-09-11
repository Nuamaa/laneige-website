
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useTexture,
  Decal,
} from "@react-three/drei";
import * as THREE from "three";
import { GLTFExporter } from "three-stdlib";

function downloadGLB(object) {
  if (!object) return;
  const exporter = new GLTFExporter();
  exporter.parse(
    object,
    (gltf) => {
      const blob = new Blob([gltf], { type: "application/octet-stream" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "LipSerumTube.glb";
      link.click();
    },
    { binary: true } // export as .glb
  );
}

const LipSerumTube = React.forwardRef(
  ({ textureUrl, color = "#c48b8f", position }, ref) => {
    const texture = useTexture(textureUrl);
    texture.flipY = false;

    // Profile curve for the tube
    const points = [];
    points.push(new THREE.Vector2(1.1, 0)); // sealed top
    points.push(new THREE.Vector2(1.1, 1));
    points.push(new THREE.Vector2(1.2, 3));
    points.push(new THREE.Vector2(1.3, 5));
    points.push(new THREE.Vector2(1.7, 9.5));
    points.push(new THREE.Vector2(1.9, 10)); // cap edge

    return (
      <group ref={ref} position={position}>
        {/* Tube body */}
        <mesh castShadow receiveShadow>
          <latheGeometry args={[points, 128]} />
          <meshPhysicalMaterial
            color={color}
            clearcoat={0.6}
            roughness={0.4}
            metalness={0.05}
          />

          {/* Decal with correct orientation */}
          <Decal
            position={[0, 5, 5.4]} // front
            rotation={[Math.PI, 0, 0]} // upside down
            scale={[4, 10, 10]}
            map={texture}
          />
        </mesh>

        {/* Cap at bottom */}
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[1.0, 1.0, 0.8, 70]} />
          <meshPhysicalMaterial
            color="#ffffff"
            transparent
            opacity={0.5}
            roughness={0.1}
            metalness={0}
          />
        </mesh>
      </group>
    );
  }
);

export default function Test() {
  const tubeRef = useRef();

  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 6, 20], fov: 40 }}
        style={{ height: "100vh", width: "100vw" }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 20, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />

        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 0]}
          receiveShadow
        >
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>

        <LipSerumTube
          ref={tubeRef}
          textureUrl="/Strawberry.png"
          color="#e3a3b3"
          position={[3, 0, 0]}
        />

        <OrbitControls enablePan={false} />
        <Environment preset="studio" />
      </Canvas>

      {/* Export Button */}
      <button
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 10,
          padding: "10px 15px",
          borderRadius: "8px",
          border: "none",
          background: "#e3a3b3",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => downloadGLB(tubeRef.current)}
      >
        Download 3D Model
      </button>
    </>
  );
}

