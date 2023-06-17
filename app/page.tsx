"use client";
import SceneInit from "@/lib/SceneInit";
import Card from "@/utils/ui/Card";
import { useEffect } from "react";
import * as THREE from "three";
export default function Home() {
  // useEffect(() => {
  //   let ThreeScene: SceneInit | null = null;
  //   ThreeScene = new SceneInit("myThreeJsCanvas");
  //   ThreeScene.initialize({ stats: true });
  //   ThreeScene.animate();
  //   if (ThreeScene.controls) {
  //     ThreeScene.controls.autoRotate = false;
  //     ThreeScene.controls.enableDamping = true;
  //   }

  //   if (ThreeScene.scene)
  //     ThreeScene.scene.background = new THREE.Color(0.847, 0.914, 0.996);

  //   return () => {
  //     ThreeScene?.scene?.remove();
  //     ThreeScene?.stats?.end();
  //     ThreeScene?.stats?.dom.remove();
  //     ThreeScene?.scene?.clear();
  //   };
  // }, []);

  return (
    <div className="flex w-full h-screen flex-col items-center justify-start p-24">
      <div className="font-black text-4xl text-teal-700">
        Three Configurator
      </div>
      <div className="grid grid-cols-4 gap-6 h-full w-full p-4">
        <Card
          key={0}
          title={`Gradient Card -${0}-`}
          canvasId={`myThreeJsCanvas${0}`}
        />
      </div>
    </div>
  );
}
