'use client';

import React, { useState } from 'react';
import Map from 'react-map-gl';
import MarkerPopup from '@/components/markerPopup';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function MarkerMap ({ data }: { data: any[] }) {
  const [map] = useState({
    latitude: 51.4949702,
    longitude: -0.1277006,
    zoom: 10,
  });
  // todo add setmap when needed

  return (
    <Map
      reuseMaps
      initialViewState={map}
      mapStyle='mapbox://styles/sampolge/clvwm3wpt01sx01o0e8hcesym'
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {data.map((item) => (
        <MarkerPopup markerData={item} key={item.restaurant.id} />
      ))}
    </Map>
  );
}
