varying vec2 vUv;
varying vec3 vColor;
      // Permutes the given vec4 value

vec4 permute(vec4 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}
void main() {
  vUv = uv;
  vColor = vec3(1., 0.545, 0.239);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}