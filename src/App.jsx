import React from "react";
import Geocode from "./components/Geocode";
import Map from "./components/Map";

const MAPBOX_API_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const defaultMapStyle = "mapbox://styles/mapbox/streets-v12";

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

const App = ({ mapToken, mapStyle = defaultMapStyle, mapPin, mapPosition = initViewPosition }) => {
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
    setViewPosition({ ...viewPosition, longitude: lng, latitude: lat });
  };

  return (
    <>
      <Geocode
        onItemClick={onItemClick}
        address={address}
        mapToken={mapToken}
      />
      <Map 
        viewPosition={viewPosition}
        mapToken={mapToken}
        handleMarkerDrag={handleMarkerDrag}
        mapStyle={mapStyle}
        mapPin={mapPin}
      />
    </>
  );
};

export default App;
