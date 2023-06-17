import * as THREE from "three";
import vShader from "@/components/Shaders/Plane/vertex.glsl";
import fShader from "@/components/Shaders/Plane/fragment.glsl";
import colors from "nice-color-palettes";

export const RadialGradientMaterial = new THREE.ShaderMaterial({
  transparent: true,
  uniforms: {
    u_time: { value: 0 },
    palette: { value: [] },
    u_offset: { value: 20 },
    //   uAlpha: { value: 0.5 },
  },
  side: THREE.DoubleSide,
  wireframe: false,
  vertexShader: vShader,
  fragmentShader: fShader,
});
export const planeGeometry = new THREE.PlaneGeometry(150, 150, 100, 100);
const planeMesh = new THREE.Mesh(planeGeometry, RadialGradientMaterial);
export default planeMesh;
