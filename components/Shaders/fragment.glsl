varying vec2 vUv;
uniform float uAlpha;
uniform float uMultiplier;
void main() {
  vec2 vuv = vUv * uMultiplier;
  vec2 mulvUv = mod(vuv, 1.0);
  float strength = step(0.5, mulvUv.y);
  float alpha = uAlpha;
  float opacity = min(alpha, strength);

  vec3 color = vec3(1., 0.22, 0.361);
  if(opacity == 0.5)
    color = vec3(0.31, 0.384, 0.553);
  gl_FragColor = vec4(color, opacity);
}