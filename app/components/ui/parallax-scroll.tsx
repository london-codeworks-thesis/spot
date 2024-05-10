"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import cn from "@/lib/utils";
import Gerry from '~/gerry.png';
import { Rate } from "antd";

export const ParallaxScroll = ({
  images,
  data,
  className,
}: {
    images: string[];
  data: any[]
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 500]);

  const half = Math.ceil(images.length / 2);

  const firstPart = images.slice(0, half);
  const secondPart = images.slice(half);
  const firstData = data.slice(0, half);
  const secondData = data.slice(half);

  return (
    <div
      className={cn("h-[50rem] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-start max-w-5xl mx-auto gap-3 px-0"
        ref={gridRef}
      >
        <div className="grid gap-3">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }} // Apply the translateY motion value here
              key={"grid-1" + idx}
            >
              <Image
                src={el}
                className="h-60 w-full object-cover object-left-top rounded-lg gap-3 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
              <div className="flex flex-row m-1 items-center">
                <div>
                <Image
                  src={Gerry}
                  className="rounded-full aspect-square"
                  height={20}
                    width={20}
                    alt="profilePic"
                  />
                  </div>
                <div className="flex flex-col flex-1">
                  <h1>{firstData[idx].name}</h1>
                  <Rate count={5} defaultValue={firstData[idx].rating} disabled style={{ color: 'black'}}/>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-3">
          {secondPart.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={"grid-2" + idx}>
              
              
              <Image
                src={el}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-3 !m-0 !p-0"
                height="400"
                width="400"
                alt="thumbnail"
              />
              <div className="flex flex-row m-1 items-center">
                <div>
                <Image
                  src={Gerry}
                  className="rounded-full aspect-square"
                  height={20}
                    width={20}
                    alt="profilePic"
                  />
                  </div>
                <div className="flex flex-col flex-1">
                  <h1>{secondData[idx].name}</h1>
                  <Rate count={5} defaultValue={secondData[idx].rating} disabled style={{color: 'black'}}/>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
