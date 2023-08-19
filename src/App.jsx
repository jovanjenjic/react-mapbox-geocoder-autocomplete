import React, { useState } from "react";
import styled from "styled-components";
import MapGl from "./components/Map";
import Geocode from "./components/Geocode";

const Wrapper = styled.div`
  width: 100%;
  height: 1000px;
`;

const MAPBOX_API_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";

const initViewPosition = {
  latitude: 44.84659048242156,
  longitude: 20.451609935755755,
};

/** `promiseFn` for fetching map-box address by coordinates */
const getMapAddress = async (mapToken, { lng, lat }) => {
  try {
    const response = await fetch(
      `${MAPBOX_API_URL + lng},${lat}.json?access_token=${mapToken}`
    );
    if (response.status >= 200 && response.status < 300) {
      const result = await response.json();

      return result?.features?.[0]?.place_name || "";
    }
  } catch {
    console.error("Error");
  }
  return {};
};

const MainComponent = ({ mapToken, mapPosition = initViewPosition }) => {
  const [viewPosition, setViewPosition] = useState(mapPosition);
  const [address, setAddress] = useState("");

  React.useEffect(async () => {
    const addressReponse = await getMapAddress(mapToken, { lng: mapPosition.longitude, lat: mapPosition.latitude });
    setAddress(addressReponse);
  }, []);

  const onSelected = (vp, item) => {
    setAddress(item?.place_name);
    setViewPosition(vp);
  };

  const handleMarkerDrag = async ({ lngLat }) => {
    const { lng, lat } = lngLat;
    const addressReponse = await getMapAddress(mapToken, { lng, lat });
    setAddress(addressReponse);
    setViewPosition({ ...viewPosition, longitude: lng, latitude: lat });
  };

  const onStyleData = () => setViewPosition({ ...viewPosition });

  return (
    <Wrapper>
      <Geocode
        onSelected={onSelected}
        address={address}
        mapToken={mapToken}
      />
      <MapGl
        viewPosition={viewPosition}
        onStyleData={onStyleData}
        mapToken={mapToken}
        handleMarkerDrag={handleMarkerDrag}
      />
    </Wrapper>
  );
};

export default MainComponent;
