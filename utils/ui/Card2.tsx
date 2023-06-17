"use client";
import SceneInit from "@/lib/SceneInit";
import { GUI } from "dat.gui";
import React, { useEffect } from "react";
import * as THREE from "three";

type Props = {
  title: string;
  index: number;
  id: string;
};

export default function Card2({ title, index, id, ...props }: Props) {
  return (
    <div
      {...props}
      className="w-full place-items-stretch flex min-h-[330px] flex-col items-start justify-start gap-y-2 text-start overflow-hidden rounded-xl"
    >
      <p className="p-2 text-lg font-black">{title}</p>
      <div className="relative overflow-hidden rounded-xl h-full w-full max-h-[300px]  ">
        <div
          className="w-full overflow-hidden rounded-xl h-full"
          id={id}
          // data-diagram={id}
        />
        <div className=" font-bold text-lg text-emerald-700 italic absolute top-5 left-5 text-start flex items-center justify-start">
          <p>Title {index}</p>
        </div>
      </div>
    </div>
  );
}
