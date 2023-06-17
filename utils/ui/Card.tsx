"use client";
import SceneInit from "@/lib/SceneInit";
import React, { useEffect } from "react";
import * as THREE from "three";

type Props = {
  title: string;
  canvasId: string;
};

export default function Card({ title, canvasId, ...props }: Props) {
  useEffect(() => {
    let ThreeScene: SceneInit | null = null;
    ThreeScene = new SceneInit(canvasId);
    ThreeScene.initialize({ stats: false });
    // ThreeScene?.stats?.end();
    // ThreeScene?.stats?.dom.remove();
    ThreeScene.animate();
    if (ThreeScene.controls) {
      ThreeScene.controls.autoRotate = false;
      ThreeScene.controls.enableDamping = true;
    }

    if (ThreeScene.scene) {
      ThreeScene.scene.background = new THREE.Color(0.847, 0.914, 0.996);
    }

    return () => {
      ThreeScene?.scene?.remove();
      ThreeScene?.scene?.clear();
      console.log("remounted");
    };
  }, []);

  return (
    <div
      {...props}
      className="w-full !aspect-square place-items-stretch flex flex-col items-start justify-start gap-y-2 text-start"
    >
      <p className="p-2 text-lg font-black">{title}</p>
      <div className="overflow-hidden w-full h-full rounded-xl">
        <canvas className="w-full !aspect-square" id={canvasId} />
      </div>
    </div>
  );
}
