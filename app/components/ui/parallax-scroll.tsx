'use client';

import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import cn from '@/lib/utils';
import { Rate } from 'antd';

export const ParallaxScroll = ({
  data,
  className,
}: {
  data: any[];
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef, // Use the container for scrolling
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 500]);

  const half = Math.ceil(data.length / 2);

  const firstData = data.slice(0, half);
  const secondData = data.slice(half);

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    console.log('click', e.target);
  }

  return (
    <div className={cn('h-full overflow-y-auto', className)} ref={containerRef}>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 items-start max-w-5xl mx-auto gap-3 px-0'>
        <div className='grid gap-1'>
          {firstData.map((el, idx) => (
            <motion.div style={{ y: translateFirst }} key={'grid-1' + idx}>
              <div onClick={handleClick}>
                <Image
                  src={el.restaurant.image_url}
                  className='h-60 w-full object-contain object-left-top rounded-lg gap-3 !m-0 !p-0'
                  width='400'
                  height={0}
                  style={{ height: 'auto' }}
                  alt='thumbnail'
                />
                <div className='flex flex-row m-1 items-center p-1'>
                  <div className='mr-1'>
                    {firstData[idx]?.user?.image && (
                      <Image
                        src={firstData[idx].user.image}
                        className='rounded-full aspect-square'
                        height={35}
                        width={35}
                        alt='profilePic'
                      />
                    )}
                  </div>
                  <div className='flex flex-col flex-1 w-20 ml-0.5'>
                    <h1 className='text-nowrap truncate -mb-1'>{firstData[idx]?.restaurant?.name}</h1>
                    <Rate count={5} defaultValue={firstData[idx]?.rating_food || 0} disabled style={{ padding: '2px', color: 'black', fontSize: 12 }} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className='grid gap-3'>
          {secondData.map((el, idx) => (
            <motion.div style={{ y: translateSecond }} key={'grid-2' + idx}>
              <Image
                src={el.restaurant.image_url}
                className='h-80 w-full object-cover object-left-top rounded-lg gap-3 !m-0 !p-0'
                width='400'
                height={0}
                style={{ height: 'auto' }}
                alt='thumbnail'
              />
              <div className='flex flex-row m-1 items-center p-1'>
                <div className='mr-1'>
                  {secondData[idx]?.user?.image && (
                    <Image
                      src={secondData[idx].user.image}
                      className='rounded-full aspect-square'
                      height={35}
                      width={35}
                      alt='profilePic'
                    />
                  )}
                </div>
                <div className='flex flex-col flex-1 w-20 ml-0.5'>
                  <h1 className='text-nowrap truncate -mb-1'>{secondData[idx]?.restaurant?.name}</h1>
                  <Rate count={5} defaultValue={secondData[idx]?.rating_food || 0} disabled style={{ padding: '2px', color: 'black', fontSize: 12 }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
