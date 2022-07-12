import React from "react";
import ReactMapboxGl, { Feature, Layer } from "react-mapbox-gl";
import styled from "styled-components";
import PropTypes from "prop-types";
import MapPin from "../images/pin.png";

const mapStyle = "mapbox://styles/mapbox/streets-v11";

const MapComponent = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoiam92YW5qZW5qaWMiLCJhIjoiY2wzdWJvNG4wMGZ2YjNkcGZ2dm5kZm5nYyJ9.9bCbz74PqDnzQDpBqRenHw",
});

const MapContainer = styled.div`
  .mapboxgl-map {
    min-height: 40vh !important;
  }

  .mapboxgl-ctrl.mapboxgl-ctrl-attrib {
    display: none !important;
  }

  canvas.mapboxgl-canvas {
    outline: none;
  }

  a.mapboxgl-ctrl-logo {
    display: none;
  }
`;

const MapGl = ({
  viewPosition,
  setViewPosition,
  setAddress,
  getMapAddress,
}) => {
  const handleMarkerDrag = async ({ lngLat }) => {
    const { lng, lat } = lngLat;

    const addressReponse = await getMapAddress({ lng, lat });
    setAddress(addressReponse);

    setViewPosition({ ...viewPosition, longitude: lng, latitude: lat });
  };

  const loadImagesToMap = async (map) => {
    await new Promise((resolve) => {
      map.loadImage(MapPin, (_, image) => {
        map.addImage("map-pin-geocode", image);
        resolve();
        return true;
      });
    });
  };

  return (
    <MapContainer>
      <MapComponent
        // eslint-disable-next-line
        style={mapStyle}
        center={[viewPosition?.longitude, viewPosition?.latitude]}
        onStyleData={() => setViewPosition({ ...viewPosition })}
        onStyleLoad={loadImagesToMap}
      >
        <Layer
          type="symbol"
          layout={{
            "icon-image": "map-pin-geocode",
            "icon-allow-overlap": true,
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
  viewPosition: PropTypes.object,
  setViewPosition: PropTypes.func,
  setAddress: PropTypes.func,
  getMapAddress: PropTypes.func,
};

MapGl.defaultProps = {
  viewPosition: {},
  setViewPosition: () => {},
  setAddress: () => {},
  getMapAddress: () => {},
};

export default MapGl;
