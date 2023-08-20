import React from "react";
import Geocode from "./components/Geocode";
import Map from "./components/Map";
import MapPin from "./images/pin.png";

const defaultMapStyle = "mapbox://styles/mapbox/streets-v12";

const initViewPosition = {
  longitude: -73.9866,
  latitude: 40.72929915979287,
};

/** `promiseFn` for fetching map-box address by coordinates */
const getMapAddress = async (mapToken, { lng, lat }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_MAPBOX_API_URL + lng},${lat}.json?access_token=${mapToken}`
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

const App = ({ 
  mapToken,
  mapStyle = defaultMapStyle,
  mapPosition = initViewPosition,
  mapPin = MapPin, 
  pinSize = [60, 60],
  mapMoveMode ='FLY_TO',
  flyDuration = 10000,
  initMapZoom = 12,
  numOfResults = 15,
}) => {
  const [viewPosition, setViewPosition] = React.useState(mapPosition);
  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    const fetchAddress = async() => {
      const addressReponse = await getMapAddress(mapToken, { lng: mapPosition.longitude, lat: mapPosition.latitude });
      setAddress(addressReponse);
    }
    fetchAddress();
  }, []);

  const onItemClick = (vp, item) => {
    setAddress(item?.place_name);
    setViewPosition(vp);
  };

  const handleMarkerDrag = async (lngLat) => {
    const { lng, lat } = lngLat;
    const addressReponse = await getMapAddress(mapToken, { lng, lat });
    setAddress(addressReponse);
    setViewPosition({ longitude: lng, latitude: lat });
  };

  return (
    <>
      <Geocode
        onItemClick={onItemClick}
        address={address}
        mapToken={mapToken}
        numOfResults={numOfResults}
      />
      <Map 
        viewPosition={viewPosition}
        mapToken={mapToken}
        handleMarkerDrag={handleMarkerDrag}
        mapStyle={mapStyle}
        mapPin={mapPin}
        pinSize={pinSize}
        mapMoveMode={mapMoveMode}
        flyDuration={flyDuration}
        initMapZoom={initMapZoom}
      />
    </>
  );
};

export default App;
