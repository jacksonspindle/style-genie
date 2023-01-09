import React, { useRef } from "react";
import { Decal, useGLTF, useTexture, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Hoodie = ({ ...props }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("../../static/hoodie.gltf");

  const bodyTexture = useTexture(
    props.image === "" ? "../../static/trap.png" : props.image
    // "../../static/trap.png"
  );
  bodyTexture.needsUpdate = true;

  if (bodyTexture) {
    bodyTexture.wrapS = bodyTexture.wrapT = THREE.RepeatWrapping;
    bodyTexture.repeat.set(1, 1);
    bodyTexture.anisotropy = 16;
    // bodyTexture.image.height = 2100;
  }

  const photoMaterial = <meshBasicMaterial map={bodyTexture} />;

  useFrame((state) => {
    console.log(props.image);
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
        material-color={props.color}
      >
        {photoMaterial}
        <Decal position={[2, 2, 1]} scale={[1, 1, 1]} debug>
          {photoMaterial}
        </Decal>
      </mesh>
    </group>
  );
};

useGLTF.preload("/hoodie.gltf");

export default Hoodie;
