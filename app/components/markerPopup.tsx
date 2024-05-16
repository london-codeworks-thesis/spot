'use client';

import React, { forwardRef, useRef } from 'react';
import { Marker } from 'react-map-gl';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import MarkerPopupContents from './markerPopupContents';

type MarkerPopupProps = {
  locationMarker: any;
};

const FocusableMarker = forwardRef<HTMLButtonElement | null, any>(
  (props, ref) => (
    <button
      type='button'
      ref={ref}
      style={{ background: 'none', border: 'none', padding: 0 }}
    >
      <Marker {...props} />
    </button>
  ),
);

export default function MarkerPopup ({ locationMarker }: MarkerPopupProps) {
  const markerRef = useRef(null);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <FocusableMarker
          ref={markerRef}
          key={locationMarker.id}
          latitude={locationMarker.latitude}
          longitude={locationMarker.longitude}
          color='black'
        />
      </DrawerTrigger>
      <MarkerPopupContents locationMarker={locationMarker} />
    </Drawer>
  );
}
