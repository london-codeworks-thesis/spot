'use client';

import React, { useState } from 'react';
import Map, { ViewState } from 'react-map-gl';
import MarkerPopup from 'src/components/markerPopup';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Restaurant } from '@prisma/client';
import GeocoderControl from './geocoder-control';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

interface MarkerMapProps {
  data: Restaurant[];
  hideSearch?: boolean;
}

function MarkerMap ({ data, hideSearch = false }: MarkerMapProps) {
  const [viewState, setViewState] = useState<ViewState>({
    latitude: 51.515582,
    longitude: -0.113091,
    zoom: 11,
    bearing: 0,
    pitch: 0,
    padding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });
  return (
    <Map
      reuseMaps
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
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

export default MarkerMap;
