'use client';

import React from 'react';
import type { ReviewWithUser } from 'types/ReviewWithUser';
import { Drawer, DrawerTrigger } from '@ui/drawer';
import ScrollContainerCard from '@components/ScrollContainer/ScrollContainerCard';
import MarkerPopupContents from '@components/MarkerPopup/MarkerPopupContents';

interface IScrollContainerProps {
  data: ReviewWithUser[];
}

function ScrollContainer ({ data }: IScrollContainerProps) {
  const half = Math.ceil(data.length / 2);

  const firstData = data.slice(0, half);
  const secondData = data.slice(half);

  return (
    <div className='h-full overflow-y-auto'>
      <div className='mx-auto grid max-w-5xl grid-cols-2 items-start gap-3 px-0 md:grid-cols-2 lg:grid-cols-2'>
        <div className='grid gap-1'>
          {firstData.map((el) => (
            <Drawer key={el.id}>
              <DrawerTrigger asChild>
                <div>
                  <ScrollContainerCard el={el} />
                </div>
              </DrawerTrigger>
              <MarkerPopupContents locationMarker={el.restaurant} />
            </Drawer>
          ))}
        </div>
        <div>
          {secondData.map((el) => (
            <Drawer key={el.id}>
              <DrawerTrigger asChild>
                <div>
                  <ScrollContainerCard el={el} />
                </div>
              </DrawerTrigger>
              <MarkerPopupContents locationMarker={el.restaurant} />
            </Drawer>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScrollContainer;
