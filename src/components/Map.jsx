import React from "react";
import ReactMapboxGl, { Feature, Layer } from "react-mapbox-gl";
import styled from "styled-components";
import PropTypes from "prop-types";
import MapPin from "../images/pin.png";

const mapStyle = "mapbox://styles/mapbox/streets-v11";

const MapContainer = styled.div`
  height: 100%;

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

const MapGl = ({ viewPosition, handleMarkerDrag, onStyleData, mapToken }) => {
  const MapComponent = React.useMemo(
    () =>
      ReactMapboxGl({
        accessToken: mapToken,
      }),
    [mapToken]
  );

  const loadImagesToMap = async (map) => {
    await new Promise((resolve) => {
      map.loadImage(MapPin, (_, image) => {
        map.addImage("map-pin-geocode", image);
        resolve();
      });
    });
  };

  return (
    <MapContainer>
      <MapComponent
        style={mapStyle}
        center={[viewPosition?.longitude, viewPosition?.latitude]}
        onStyleData={onStyleData}
        onStyleLoad={loadImagesToMap}
      >
        <Layer
          type="symbol"
          layout={{
            "icon-image": "map-pin-geocode",
            "icon-allow-overlap": true,
            "icon-anchor": "bottom",
          }}
        >
          <Feature
            draggable
            onDragEnd={handleMarkerDrag}
            coordinates={[viewPosition?.longitude, viewPosition?.latitude]}
          />
        </Layer>
      </MapComponent>
    </MapContainer>
  );
};

MapGl.propTypes = {
  viewPosition: PropTypes.object.isRequired,
  handleMarkerDrag: PropTypes.func.isRequired,
  onStyleData: PropTypes.func.isRequired,
  mapToken: PropTypes.string.isRequired,
};

export default MapGl;
