"use client";
import {
  SetupScenes,
  getRandomNumber,
  renderScene,
  renderSceneInfo,
  resizeRendererToDisplaySize,
} from "@/lib/createScene";
import Card2 from "@/utils/ui/Card2";
import React, { useEffect, useState } from "react";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import ColorArray from "@/lib/ColorArray.json";

type Props = {};
type SceneInfoProps = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  elem: Element;
  mesh: THREE.Mesh;
};
type SceneProps = {
  sceneInfo: SceneInfoProps;
  controls: OrbitControls;
};

export default function Page({}: Props) {
  const [Scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer>();
  const [clock, setclock] = useState<THREE.Clock>(new THREE.Clock());
  useEffect(() => {
    const canvas = document.querySelector("#myThreeJsCanvas");
    if (canvas && !renderer && !Scene) {
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      setRenderer(renderer);
      const res = SetupScenes(0, 0, 0);
      if (res) {
        const scene = res.sceneInfo.scene;
        setScene(scene);
        setCamera(res.sceneInfo.camera);
      }
    }
    const render = () => {
      if (renderer && document && Scene && camera) {
        resizeRendererToDisplaySize(renderer);

        const elapsedTime = clock?.getElapsedTime();
        const mesh = Scene.getObjectByName("background");
        console.log("mesh1", mesh);
        if (mesh) {
          (
            mesh as THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>
          ).material.uniforms.u_time.value = elapsedTime;
          (
            mesh as THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>
          ).material.needsUpdate = true;
          (
            mesh as THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>
          ).material.uniforms.u_time.value = elapsedTime;
          (
            mesh as THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>
          ).material.needsUpdate = true;
        }

        renderScene(
          Scene,
          camera,
          window.innerWidth,
          window.innerHeight,
          renderer
        );
        requestAnimationFrame(render);
      }
    };
    if (renderer) {
      render();
    }
    return () => {
      Scene?.remove();
      renderer?.clear();
    };
  }, [renderer, camera, Scene]);

  return (
    <>
      {/* Content */}
      <div className="flex h-screen w-screen mx-auto flex-col items-center justify-start py-16 px-4 md:px-12 lg:px-24">
        <div className="h-full w-full p-4 rounded-3xl mx-8 bg-sky-950/10">
          {/* Canvas */}
          <canvas id="myThreeJsCanvas" className="!h-full !w-full"></canvas>
        </div>
      </div>
    </>
  );
}
