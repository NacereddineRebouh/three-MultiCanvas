import * as THREE from "three";
import vShader from "@/components/Shaders/Torus/vertex.glsl";
import fShader from "@/components/Shaders/Torus/fragment.glsl";

const RadialGradientMaterial = new THREE.ShaderMaterial({
  transparent: true,
  uniforms: {
    u_time: { value: 0 },
    //   uAlpha: { value: 0.5 },
  },
  side: THREE.DoubleSide,
  wireframe: false,
  vertexShader: vShader,
  fragmentShader: fShader,
});
const torusGeometry = new THREE.TorusGeometry(6, 2, 200, 200);
const torusMesh = new THREE.Mesh(torusGeometry, RadialGradientMaterial);

export default torusMesh;
