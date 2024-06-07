'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import React, { useRef } from 'react';
import Image from 'next/image';
import { Rate } from 'antd';
import { ReviewWithUser } from 'types/ReviewWithUser';
import MarkerPopupContents from '@/components/markerPopupContents';
import { DrawerTrigger, Drawer } from './ui/drawer';

export function ParallaxScroll ({ data }: { data: ReviewWithUser[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef, // Use the container for scrolling
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 500]);

  const half = Math.ceil(data.length / 2);

  const firstData = data.slice(0, half);
  const secondData = data.slice(half);

  // function handleClick (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
  //   // TODO Handle click
  //   console.log('click', e.target);
  // }

  return (
    <div className='h-full overflow-y-auto' ref={containerRef}>
      <div className='mx-auto grid max-w-5xl grid-cols-2 items-start gap-3 px-0 md:grid-cols-2 lg:grid-cols-2'>
        <div className='grid gap-1'>
          {firstData.map((el, idx) => (
            <Drawer key={el.id}>
              <DrawerTrigger asChild>
                <motion.div style={{ y: translateFirst }}>
                  <Image
                    src={el.restaurant.image_url!}
                    className='!m-0 h-60 w-full gap-3 rounded-lg object-contain object-left-top !p-0'
                    width='400'
                    height={0}
                    style={{ height: 'auto' }}
                    alt='thumbnail'
                  />
                  <div className='m-1 flex flex-row items-center p-1'>
                    <div className='mr-1'>
                      {firstData[idx]?.user?.image && (
                        <Image
                          src={firstData[idx].user.image!}
                          className='aspect-square rounded-full'
                          height={35}
                          width={35}
                          alt='profilePic'
                        />
                      )}
                    </div>
                    <div className='ml-0.5 flex w-20 flex-1 flex-col'>
                      <h1 className='-mb-1 truncate text-nowrap'>
                        {firstData[idx]?.restaurant?.name}
                      </h1>
                      <Rate
                        count={5}
                        defaultValue={firstData[idx]?.rating_food || 0}
                        disabled
                        style={{ padding: '2px', color: 'black', fontSize: 12 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </DrawerTrigger>
              <MarkerPopupContents locationMarker={el.restaurant} />
            </Drawer>
          ))}
        </div>
        <div className='grid gap-3'>
          {secondData.map((el, idx) => (
            <Drawer key={el.id}>
              <DrawerTrigger asChild>
                <motion.div style={{ y: translateSecond }}>
                  <Image
                    src={el.restaurant.image_url!}
                    className='!m-0 h-80 w-full gap-3 rounded-lg object-cover object-left-top !p-0'
                    width='400'
                    height={0}
                    style={{ height: 'auto' }}
                    alt='thumbnail'
                  />
                  <div className='m-1 flex flex-row items-center p-1'>
                    <div className='mr-1'>
                      {secondData[idx]?.user?.image && (
                        <Image
                          src={secondData[idx].user.image!}
                          className='aspect-square rounded-full'
                          height={35}
                          width={35}
                          alt='profilePic'
                        />
                      )}
                    </div>
                    <div className='ml-0.5 flex w-20 flex-1 flex-col'>
                      <h1 className='-mb-1 truncate text-nowrap'>
                        {secondData[idx]?.restaurant?.name}
                      </h1>
                      <Rate
                        count={5}
                        defaultValue={secondData[idx]?.rating_food || 0}
                        disabled
                        style={{ padding: '2px', color: 'black', fontSize: 12 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </DrawerTrigger>
              <MarkerPopupContents locationMarker={el.restaurant} />
            </Drawer>
          ))}
        </div>
      </div>
    </div>
  );
}
