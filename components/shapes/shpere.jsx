import React from "react";
import vShader from "@/components/Shaders/vertex.glsl";
import fShader from "@/components/Shaders/fragment.glsl";
import * as THREE from "three";
const RadialGradientMaterial = new THREE.ShaderMaterial({
  transparent: true,
  uniforms: {
    uMultiplier: { value: 40 },
    uAlpha: { value: 0.5 },
  },
  side: THREE.DoubleSide,
  wireframe: false,
  vertexShader: vShader,
  fragmentShader: fShader,
});
const sphereGeometry = new THREE.SphereGeometry(16, 32, 32);
const sphereMesh = new THREE.Mesh(sphereGeometry, RadialGradientMaterial);
sphereMesh.material.needsUpdate = true;

export default sphereMesh;
