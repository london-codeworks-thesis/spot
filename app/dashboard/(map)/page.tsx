'use client';

import React from 'react';
import Map, { Marker } from 'react-map-gl';
import { Input } from '@/components/ui/input';
import markerData from '../../lib/data';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const coordinates = markerData;

export default function Page () {
  return (
    <div className='relative h-full w-full'>
      <Input
        placeholder='Search...'
        className='absolute left-16 top-4 z-10 w-4/6 bg-white p-6'
      />
      <Map
        reuseMaps
        initialViewState={{
          latitude: 51.4949702,
          longitude: -0.1277006,
          zoom: 10,
        }}
        mapStyle='mapbox://styles/sampolge/clvwm3wpt01sx01o0e8hcesym'
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {coordinates.map((item) => (
          <Marker
            key={item[2]}
            latitude={item[0]}
            longitude={item[1]}
            color='red'
          />
        ))}
      </Map>
    </div>
  );
}
