import React, { useRef } from "react";
import { useGLTF, Decal, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Shoe = ({ ...props }) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("../../static/shoe.gltf");

  return (
    <group ref={group} {...props}>
      <group rotation={[-Math.PI, -0.85, -Math.PI]}>
        <mesh geometry={nodes.Plane003.geometry} material={materials.body}>
          <Decal position={[0, 0, 1]} scale={[props.scaleX, props.scaleY]} />
        </mesh>
        <mesh geometry={nodes.Plane003_1.geometry} material={materials.sole} />
        <mesh
          geometry={nodes.Plane003_2.geometry}
          material={materials.collar}
        />
        <mesh geometry={nodes.Plane003_3.geometry} material={materials.tag} />
        <mesh
          geometry={nodes.Plane003_4.geometry}
          material={materials.tongue}
        />
        <mesh geometry={nodes.Plane003_8.geometry} material={materials.toe}>
          <Decal position={[0, 0, 1]} scale={[props.scaleX, props.scaleY]} />
        </mesh>
        <mesh geometry={nodes.Plane003_9.geometry} material={materials.badge} />
        <mesh
          geometry={nodes.Plane003_10.geometry}
          material={materials.tongueStrap}
        />
        <mesh
          geometry={nodes.Plane003_11.geometry}
          material={materials.laces}
        />
        <mesh
          geometry={nodes.Plane003_12.geometry}
          material={materials.eyelets}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/shoe.gltf");

export default Shoe;
