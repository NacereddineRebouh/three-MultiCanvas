import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import planeMesh from "@/components/shapes/plane";
import ColorArray from "@/lib/ColorArray.json";

export default class SceneInit {
  scene: THREE.Scene | undefined;
  camera: THREE.PerspectiveCamera | undefined;
  renderer: THREE.WebGLRenderer | undefined;
  fov: number;
  composer: EffectComposer | undefined;
  nearPlane: number;
  farPlane: number;
  canvasId: string;
  uniforms: { u_time: number };
  clock: THREE.Clock | undefined;
  stats: Stats | undefined;
  controls: OrbitControls | undefined;
  ambientLight: THREE.AmbientLight | undefined;
  directionalLight: THREE.DirectionalLight | undefined;
  palette: THREE.Color[] | undefined;
  constructor(CanvasId: string) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;
    this.uniforms = { u_time: 0 };

    // NOTE: Camera params;
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = CanvasId;

    // NOTE: Additional components.
    this.clock = undefined;
    this.stats = undefined;
    this.controls = undefined;

    // NOTE: Preprocessing
    this.composer = undefined;
    // NOTE: Lighting is basically required.
    this.ambientLight = undefined;
    this.directionalLight = undefined;
    let index = Math.floor(Math.random() * ColorArray.length);
    this.palette = ColorArray[index].map((color) => new THREE.Color(color));
  }

  initialize({ stats = true }: { stats: boolean }) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color("#ffffff");
    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId) as HTMLCanvasElement;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      canvas.clientWidth / canvas.clientHeight,
      this.nearPlane,
      this.farPlane
    );
    this.camera.position.z = 38;
    if (window) {
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      // document.body.appendChild(this.renderer.domElement);
    }
    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    if (stats) {
      this.stats = new Stats();
      document.body.appendChild(this.stats.dom);
    }

    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // directional light - parallel sun rays
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // this.directionalLight.castShadow = true;
    this.directionalLight.position.set(0, 32, 64);
    this.scene.add(this.directionalLight);

    //Preprocessing
    this.composer = new EffectComposer(this.renderer);

    this.composer.addPass(new RenderPass(this.scene, this.camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.4,
      0.0001,
      0.01
    );
    // this.composer.addPass(bloomPass);
    // this.composer.addPass(bloomPass);
    // this.scene.add(torusMesh);
    this.scene.add(planeMesh);
    // if window resizes
    window.addEventListener("resize", () => this.onWindowResize(canvas), false);
  }

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this?.controls?.update();
    this?.stats?.update();
    this?.composer?.render();
  }

  render() {
    // NOTE: Update uniform data on each render.
    const elapsedTime = this.clock?.getElapsedTime();
    planeMesh.material.uniforms.u_time.value = elapsedTime;
    planeMesh.material.uniforms.palette.value = this.palette;
    planeMesh.material.needsUpdate = true;
    if (this.scene && this.camera)
      this?.renderer?.render(this.scene, this.camera);
  }

  onWindowResize(canvas: HTMLCanvasElement) {
    if (this.camera) {
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this?.camera?.updateProjectionMatrix();
      this?.renderer?.setPixelRatio(window.devicePixelRatio);
      this?.renderer?.setSize(canvas.clientWidth, canvas.clientHeight);
    }
  }
}
