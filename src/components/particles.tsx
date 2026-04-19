// @ts-nocheck
'use client';
import { useState, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function Particles({ count = 5000 }) {
  const pointsRef = useRef();
  const [hovered, setHovered] = useState(false);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sphere = new THREE.SphereGeometry(4, 32, 32);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const vertex = new THREE.Vector3().fromBufferAttribute(sphere.attributes.position, i % sphere.attributes.position.count);
      vertex.toArray(pos, i3);
      
      const color = new THREE.Color();
      color.setHSL(0, 0, Math.random() * 0.4 + 0.4); // Monochromatic zinc/white hues
      color.toArray(col, i3);
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += delta / 20;
      pointsRef.current.rotation.y += delta / 30;

      const { pointer } = state;
      const target = new THREE.Quaternion().setFromEuler(new THREE.Euler(pointer.y * 0.1, pointer.x * 0.1, 0));
      pointsRef.current.quaternion.slerp(target, 0.1);
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}
