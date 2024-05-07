'use client';

import React from 'react';
import Map, { Marker } from 'react-map-gl';
import { Input } from '@/components/ui/input';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const mockData = [
  [51.5187926, -0.20470719999999998, 1],
  [51.4949702, -0.1277006, 2],
  [51.564819, -0.1328599, 3],
];

export default function Page () {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <Input
        placeholder='Search...'
        className='absolute left-16 top-4 z-10 w-1/4 bg-white p-6'
        style={{ width: '65%' }}
      />
      <Map
        reuseMaps
        initialViewState={{
          latitude: 51.4949702,
          longitude: -0.1277006,
          zoom: 10,
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        mapStyle='mapbox://styles/sampolge/clvwm3wpt01sx01o0e8hcesym'
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {mockData.map((item) => (
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
