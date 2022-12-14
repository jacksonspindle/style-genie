import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("../../static/hoodie.gltf");

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    group.current.rotation.z = Math.sin(time / 2) / 30;
    group.current.rotation.x = Math.sin(time / 2) / 30;
    group.current.rotation.y = Math.sin(time / 4) / 30;
    group.current.position.y = Math.sin(time / 4) / 30;
  });

  return (
    <group ref={group} {...props} dispose={null} position={[0, 0, 0]}>
      <mesh
        geometry={nodes.blank_hoodie002.geometry}
        material={materials.body}
        position={[-0.04, -0.33, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.01}
      />
    </group>
  );
}

useGLTF.preload("/hoodie.gltf");
