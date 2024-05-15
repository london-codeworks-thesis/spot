'use client';

import React, { useState } from 'react';
import Map from 'react-map-gl';
import MarkerPopup from '@/components/markerPopup';
import 'mapbox-gl/dist/mapbox-gl.css';
import GeocoderControl from './geocoder-control';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface MarkerMapProps {
  data: any[];
  hideSearch?: boolean;
}

function MarkerMap ({ data, hideSearch }: MarkerMapProps) {
  const [map] = useState({
    latitude: 51.4949702,
    longitude: -0.1277006,
    zoom: 10,
  });
  // TODO add setmap when needed
  return (
    <Map
      reuseMaps
      initialViewState={map}
      mapStyle='mapbox://styles/sampolge/clvwm3wpt01sx01o0e8hcesym'
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {!hideSearch && (
        <GeocoderControl
          mapboxAccessToken={MAPBOX_TOKEN as string}
          position='top-left'
          marker={false}
          onLoading={() => {}}
          onResults={() => {}}
          onResult={() => {}}
          onError={() => {}}
          clearOnBlur={false}
          proximity={{ latitude: 51.4949702, longitude: -0.1277006 }}
        />
      )}
      {data.map((item) => (
        <MarkerPopup locationMarker={item} key={item.id} />
      ))}
    </Map>
  );
}

MarkerMap.defaultProps = {
  hideSearch: false,
};

export default MarkerMap;
