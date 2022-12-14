/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/hoodieTest.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.04, -0.33, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh geometry={nodes.blank_hoodie002_1.geometry} material={materials.body} />
        <mesh geometry={nodes.blank_hoodie002_2.geometry} material={materials.image} />
      </group>
    </group>
  )
}

useGLTF.preload('/hoodieTest.gltf')
