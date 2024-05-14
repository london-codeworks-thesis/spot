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

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    console.log('click', e.target);
  }

  return (
    <div
      className={cn("h-[50rem] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-start max-w-5xl mx-auto gap-3 px-0"
        ref={gridRef}
      >
        <div className="grid gap-1">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }} // Apply the translateY motion value here
              key={"grid-1" + idx}
            >
              <div onClick={handleClick}>
              <Image
                src={el}
                className="h-60 w-full object-contain object-left-top rounded-lg gap-3 !m-0 !p-0"
                width="400"
                height={0}
                style={{height: 'auto'}}
                alt="thumbnail"
              />
              <div className="flex flex-row m-1 items-center p-1">
                <div className='mr-1'>
                <Image
                  src={firstData[idx].user.image}
                  className="rounded-full aspect-square"
                  height={35}
                    width={35}
                    alt="profilePic"
                  />
                  </div>
                <div className="flex flex-col flex-1 w-20 ml-0.5">
                  <h1 className='text-nowrap truncate -mb-1'>{firstData[idx].restaurant.name}</h1>
                  <Rate count={5} defaultValue={firstData[idx].rating_food} disabled style={{ padding: '2px', color: 'black', fontSize: 12}}/>
                </div>
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
                width="400"
                height={0}
                style={{height: 'auto'}}
                alt="thumbnail"
              />
              <div className="flex flex-row m-1 items-center p-1">
                <div className='mr-1'>
                <Image
                  src={secondData[idx].user.image}
                  className="rounded-full aspect-square"
                  height={35}
                    width={35}
                    alt="profilePic"
                  />
                  </div>
                <div className="flex flex-col flex-1 w-20 ml-0.5">
                  <h1 className='text-nowrap truncate -mb-1'>{secondData[idx].restaurant.name}</h1>
                  <Rate count={5} defaultValue={secondData[idx].rating_food} disabled style={{ padding: '2px', color: 'black', fontSize: 12 }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
