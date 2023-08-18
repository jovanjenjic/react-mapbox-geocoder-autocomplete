import React, { useState } from "react";
import styled from "styled-components";
import MapGl from "./mapGl";
import Geocode from "./geocode";

const Wrapper = styled.div`
  width: 50%;
  margin: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const MAPBOX_API_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoiam92YW5qZW5qaWMiLCJhIjoiY2wzdWJvNG4wMGZ2YjNkcGZ2dm5kZm5nYyJ9.9bCbz74PqDnzQDpBqRenHw";

const initViewPosition = {
  latitude: 44.84659048242156,
  longitude: 20.451609935755755,
};

/** `promiseFn` for fetching map-box address by coordinates */
const getMapAddress = async ({ lng, lat }) => {
  try {
    const response = await fetch(
      `${MAPBOX_API_URL + lng},${lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
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

const MainComponent = () => {
  const [viewPosition, setViewPosition] = useState(initViewPosition);
  const [address, setAddress] = useState("");

  return (
    <Wrapper>
      <Geocode
        setViewPosition={setViewPosition}
        setAddress={setAddress}
        address={address}
        mapToken={MAPBOX_ACCESS_TOKEN}
      />
      <MapGl
        viewPosition={viewPosition}
        setViewPosition={setViewPosition}
        setAddress={setAddress}
        getMapAddress={getMapAddress}
        mapToken={MAPBOX_ACCESS_TOKEN}
      />
    </Wrapper>
  );
};

export default MainComponent;
