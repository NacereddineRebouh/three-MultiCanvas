"use client";
import {
  SetupScenes,
  getRandomNumber,
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
  const [Scenes, setScenes] = useState<SceneProps[]>([]);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer>();
  const [clock, setclock] = useState<THREE.Clock>(new THREE.Clock());
  useEffect(() => {
    const canvas = document.querySelector("#myThreeJsCanvas");
    if (canvas && !renderer) {
      setRenderer(
        new THREE.WebGLRenderer({ antialias: true, canvas, alpha: true })
      );
      let array: any[] = [];
      array = Array(6)
        .fill(0)
        .map((_, index) => {
          let colorIndex = Math.floor(
            getRandomNumber(0, ColorArray.length - 1)
          );
          const offset = getRandomNumber(1, 3.5);
          const scene = SetupScenes(colorIndex, index, offset);
          if (scene) return scene;
        })
        .filter(Boolean);
      setScenes(array);
    }
    const render = () => {
      if (renderer && document) {
        resizeRendererToDisplaySize(renderer);

        renderer.setScissorTest(false);
        renderer.clear(true, true);
        renderer.setScissorTest(true);
        renderer.setClearColor(0xffffff, 1); // border color
        renderer.clearColor(); // clear color buffer

        const elapsedTime = clock?.getElapsedTime();

        Scenes.map((scene, index) => {
          (
            scene?.sceneInfo.mesh as THREE.Mesh<
              THREE.PlaneGeometry,
              THREE.ShaderMaterial
            >
          ).material.uniforms.u_time.value = elapsedTime;
          (
            scene?.sceneInfo.mesh as THREE.Mesh<
              THREE.PlaneGeometry,
              THREE.ShaderMaterial
            >
          ).material.needsUpdate = true;
          (
            scene?.sceneInfo.mesh as THREE.Mesh<
              THREE.PlaneGeometry,
              THREE.ShaderMaterial
            >
          ).material.uniforms.u_time.value = elapsedTime;
          (
            scene?.sceneInfo.mesh as THREE.Mesh<
              THREE.PlaneGeometry,
              THREE.ShaderMaterial
            >
          ).material.needsUpdate = true;

          if (scene) renderSceneInfo(scene.sceneInfo, renderer);
          scene?.controls.update();
        });
        requestAnimationFrame(render);
      }
    };
    if (renderer) {
      render();
    }
    return () => {
      Scenes.map((scene, index) => {
        scene?.sceneInfo?.scene?.remove();
      });
      renderer?.clear();
    };
  }, [renderer]);

  return (
    <>
      {/* Content */}
      <div className="flex w-full max-w-[1600px] mx-auto h-full flex-col items-center justify-start py-16 px-4 md:px-12 lg:px-24">
        <div className="font-black text-4xl text-teal-700 m-6">
          ThreeJs Multi Canvas
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full w-full p-4 rounded-3xl mx-8 bg-sky-950/10">
          {/* Canvas */}
          <canvas
            id="myThreeJsCanvas"
            className="!z-[-1] fixed top-0 left-0 !h-full !w-full"
          ></canvas>

          {Array(6)
            .fill(0)
            .map((_, index) => {
              return (
                <Card2
                  key={index}
                  index={index}
                  title={`Gradient Card -${index}-`}
                  id={`myThreeJsScene${index}`}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
