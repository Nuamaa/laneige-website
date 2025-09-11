
// import { useEffect } from "react";
// import { gsap } from "gsap";
// import "./Test.css"; // regular css

// const Test=()=> {
  

//   useEffect(() => {
//     gsap.from('#box1',{
//       x:250,
//       repeat:-1,
//       rotation:360,
//       yoyo:true,
//       duration:2,
      
//       ease:'circ.in',
//     })
//   }, []);

//   return (
//     <div className="container">
//       <div id="box1" className="box">
//         Box
//       </div>
//     </div>
//   );
// }

// App.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useTexture, Decal } from "@react-three/drei";
import * as THREE from "three";

function LipSerumTube({ textureUrl, color = "#c48b8f", position }) {
  const texture = useTexture(textureUrl);
  texture.flipY = false;

  // Profile curve for the upside-down tube
  const points = [];
  points.push(new THREE.Vector2(1.1, 0));   // sealed top
  points.push(new THREE.Vector2(1.1, 1));
  points.push(new THREE.Vector2(1.2, 3));
  points.push(new THREE.Vector2(1.3, 5));
  points.push(new THREE.Vector2(1.7, 9.5));
  points.push(new THREE.Vector2(1.9, 10));  // cap edge

  return (
    <group position={position}>
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
          position={[0, 5, 5.4]}      // center front
          rotation={[Math.PI, 0, 0]}  // upside down
          scale={[4, 10, 10]}          // fix mirror
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

export default function Test1() {
  return (
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

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      <LipSerumTube
        textureUrl="/Chocolate.png"
        color="#5c2c26"
        position={[-3, 0, 0]}
      />
      {/* <LipSerumTube
        textureUrl="/Strawberry.png"
        color="#e3a3b3"
        position={[3, 0, 0]}
      /> */}

      <OrbitControls enablePan={false} />
      <Environment preset="studio" />
    </Canvas>
  );
}


