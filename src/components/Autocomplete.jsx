import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CustomGeocoderWrapper = styled.div`
  width: 100%;
  .custom-react-geocoder {
    position: relative;
    width: 100%;
  }
  .custom-react-geocoder input {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    border-radius: 8px;
    padding: 8px 14px;
    border: 1px solid #ccc;
    transition: all 0.3s;
    font-variant: tabular-nums;
    list-style: none;
    color: #333;
    font-size: 16px;
    line-height: 1.5;
    &:hover {
      border: 1px solid #7dc2ff;
    }
    &:focus {
      border: 1px solid #7dc2ff;
      outline: none;
      background-color: white;
      box-shadow: 0 0 0 2px rgba(125, 194, 255, 0.3);
    }
  }
  
  .custom-react-geocoder-results {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    background-color: white;
    width: 100%;
    font-family: "Inter", sans-serif;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
      0 9px 28px 8px rgb(0 0 0 / 5%);
    max-height: 300px;
    overflow-y: auto;
    padding: 5px 0;
    font-size: 14px;
  }
  
  .custom-react-geocoder-results::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-react-geocoder-results::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
  
  .custom-react-geocoder-results::-webkit-scrollbar-track {
    background-color: transparent;
  }
  
  .custom-react-geocoder-item {
    cursor: pointer;
    padding: 8px 14px;
    transition: all 0.3s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
    font-size: 16px;
    line-height: 1.5;
    &:hover {
      background-color: #eeeeee;
    }
  }
  
`;

/** `promiseFn` for fetching map-box address by coordinates */
const getSuggestedAddress = async (mapToken, { address, limit }) => {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/}${address}.json?access_token=${mapToken}&limit=${limit}`
    );
    if (response.status >= 200 && response.status < 300) {
      return await response.json();
    }
  } catch {
    console.error("Error");
  }
  return {};
};

const Autocomplete = ({
  mapToken,
  onItemClick = () => {},
  numOfResults = 15,
  address = "",
}) => {
  const [results, setResults] = React.useState([]);
  const [showResults, setShowResults] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(address);

  const onChange = (event) => {
    const queryString = event.target.value;
    setInputValue(queryString);

    getSuggestedAddress(mapToken, { address: queryString, limit: numOfResults })
      .then((res) => setResults([...res.features]));
  };

  const onItemClickHandler = (item) => {
    const { center } = item;
    const newViewport = {
      longitude: center[0],
      latitude: center[1],
    };

    onItemClick(newViewport, item);
  };

  const hideResults = () => {
    setTimeout(() => setShowResults(false), 300);
  };

  React.useEffect(() => {
    setInputValue(address);
    setResults([]);
  }, [address]);

  return (
    <CustomGeocoderWrapper>
      <div className="custom-react-geocoder">
        <input
          onChange={onChange}
          onBlur={hideResults}
          onFocus={() => setShowResults(true)}
          value={inputValue}
        />
        {showResults && results.length > 0 && (
          <div className="custom-react-geocoder-results">
            {results.map((item) => (
              <div
                key={item?.id}
                className="custom-react-geocoder-item"
                onClick={() => onItemClickHandler(item)}
              >
                {item.place_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </CustomGeocoderWrapper>
  );
};

Autocomplete.propTypes = {
  pause: PropTypes.number,
  onItemClick: PropTypes.func.isRequired,
  mapZoom: PropTypes.number,
  mapToken: PropTypes.string.isRequired,
  limit: PropTypes.number,
  address: PropTypes.string,
};

export default Autocomplete;
