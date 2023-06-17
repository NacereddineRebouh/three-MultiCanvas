import React, { DOMElement } from "react";
import * as THREE from "three";
import ColorArray from "@/lib/ColorArray.json";
import {
  RadialGradientMaterial,
  planeGeometry,
} from "@/components/shapes/plane";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type Props = {};
type SceneProps = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  elem: Element;
  mesh: THREE.Mesh;
};

function makeScene(elem: Element): {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  elem: Element;
  mesh: any;
} {
  const scene = new THREE.Scene();

  const fov = 45;
  const { width, height } = elem.getBoundingClientRect();
  const aspecRatio = width / height; // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspecRatio, near, far);
  camera.position.set(0, 0, 38);
  camera.lookAt(0, 0, 0);

  // Seperating Logic
  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }
  const mesh = null;
  return { scene, camera, elem, mesh };
}

export function SetupScenes(colorIndex: number, index: number, offset: number) {
  const element = document.querySelector("#myThreeJsScene" + index);
  if (element) {
    const palette = ColorArray[colorIndex].map(
      (color) => new THREE.Color(color)
    );
    console.log("index::", colorIndex);
    const sceneInfo = makeScene(element);
    const material = RadialGradientMaterial.clone();
    material.uniforms.u_offset.value = offset;
    material.uniforms.palette.value = palette;
    material.needsUpdate = true;
    const mesh = new THREE.Mesh(planeGeometry, material);
    sceneInfo.scene.add(mesh);
    sceneInfo.mesh = mesh;
    sceneInfo.camera.position.set(0, 40, 45);
    const controls = new OrbitControls(
      sceneInfo.camera,
      sceneInfo.elem as HTMLElement
    );
    controls.update();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.target.set(0, 40, 0);
    controls.update();

    return { sceneInfo, controls };
  }
}
export function SetupScene2(index: number, offset: number) {
  const element = document.querySelector("#myThreeJsScene1");
  if (element) {
    const palette = ColorArray[index].map((color) => new THREE.Color(color));

    const sceneInfo = makeScene(element);
    const material = RadialGradientMaterial.clone();
    material.uniforms.palette.value = palette;
    // material.uniforms.u_offset.value = 1.3;
    material.uniforms.u_offset.value = offset;
    material.needsUpdate = true;
    const mesh = new THREE.Mesh(planeGeometry, material);
    sceneInfo.scene.add(mesh);
    sceneInfo.mesh = mesh;
    sceneInfo.camera.position.set(0, 40, 45);
    const controls = new OrbitControls(
      sceneInfo.camera,
      sceneInfo.elem as HTMLElement
    );
    controls.update();
    controls.target.set(0, 40, 0);
    controls.update();
    return { sceneInfo, controls };
  }
}

export function resizeRendererToDisplaySize(renderer: THREE.WebGLRenderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

export function renderSceneInfo(
  sceneInfo: SceneProps,
  renderer: THREE.WebGLRenderer
) {
  const { scene, camera, elem } = sceneInfo;

  // get the viewport relative position of this element
  const { top, bottom, left, right, width, height } =
    elem.getBoundingClientRect();

  const isOffScreen =
    bottom < 0 ||
    top > renderer.domElement.clientHeight ||
    right < 0 ||
    left > renderer.domElement.clientWidth;

  if (isOffScreen) {
    return;
  }

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
  renderer.setScissor(left, positiveYUpBottom, width, height);
  renderer.setViewport(left, positiveYUpBottom, width, height);
  renderer.render(scene, camera);
}

export function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
