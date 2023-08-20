import React from 'react';
import mapboxgl from 'mapbox-gl';
import styled from "styled-components";
import MapPin from "../images/pin.png";
import 'mapbox-gl/dist/mapbox-gl.css';

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
  min-height: 100px;
  min-width: 100px;

  .mapboxgl-map,
  canvas.mapboxgl-canvas {
    height: 100%;
    outline: none;
  }

  .mapboxgl-ctrl.mapboxgl-ctrl-attrib,
  a.mapboxgl-ctrl-logo {
    display: none;
  }
`;

const MapboxIntegration = ({ viewPosition, mapToken, mapPin, handleMarkerDrag, mapStyle }) => {
    const [map, setMap] = React.useState(null);
    const [marker, setMarker] = React.useState(null);
    const mapContainerRef = React.useRef(null);
    mapboxgl.accessToken = mapToken;

    React.useEffect(() =>{
        const mapComponent = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: mapStyle,
            center: [viewPosition?.longitude, viewPosition?.latitude],
            zoom: 10,
        });
        const img = document.createElement('img');
        img.src = mapPin || MapPin;
        img.style.width = '60px'; 
        img.style.height = '60px';
        const marker = new mapboxgl.Marker({
            element: img,
            draggable: true,
        }).setLngLat([viewPosition?.longitude, viewPosition?.latitude]);

        setMap(mapComponent);
        setMarker(marker);
    }, []);
  
    React.useEffect(() => {   
        if (!map) return;
        map.on('load', () => {
            marker.addTo(map);
            function onDragEnd() {
                const lngLat = marker.getLngLat();
                handleMarkerDrag(lngLat);
                map.setCenter([lngLat.lng, lngLat.lat]);
            }
            marker.on('dragend', onDragEnd);
        }
    );  
    }, [map]);

    React.useEffect(() => {
        if (!map) return;
        map.setCenter([viewPosition?.longitude, viewPosition?.latitude]);
    }, [map, viewPosition]);

    React.useEffect(() => {
        if (!marker) return;
        marker.setLngLat([viewPosition?.longitude, viewPosition?.latitude]);
    }, [marker, viewPosition]);
      
    return <MapContainer ref={mapContainerRef} />;
  };
  
  export default MapboxIntegration;