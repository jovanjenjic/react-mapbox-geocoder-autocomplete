import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MapboxClient from "mapbox";
import styled from "styled-components";

const GeocoderWrapper = styled.div`
  width: 100%;
  .react-geocoder {
    position: relative;
    width: 100%;
  }
  .react-geocoder input {
    width: 100%;
    height: 36px;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 4px 11px;
    border: 1px solid white;
    transition: all 0.3s;
    font-variant: tabular-nums;
    list-style: none;
    color: gray;
    font-size: 14px;
    line-height: 1.5715;
    &:hover {
      border: 1px solid #7dc2ff;
    }
    &:focus {
      border: 1px solid #7dc2ff;
      outline: none;
    }
  }
  .react-geocoder-results {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    background-color: white;
    width: 100%;
    font-family: "Inter", sans-serif;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
      0 9px 28px 8px rgb(0 0 0 / 5%);
    padding: 5px 0;
    font-size: 14px;
  }
  .react-geocoder-item {
    height: 30px;
    cursor: pointer;
    padding: 0 10px;
    transition: all 0.3s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      background-color: #e3e1e1;
    }
  }
`;

const Geocoder = ({
  onSelected,
  pointZoom = 6,
  timeout = 300,
  limit = 5,
  mapToken,
  address = "",
}) => {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [inputValue, setInputValue] = useState(address);

  const client = new MapboxClient(mapToken);

  const onChange = (event) => {
    const queryString = event.target.value;
    setInputValue(queryString);

    setTimeout(() => {
      client.geocodeForward(queryString, { limit: limit - results.length })
        .then((res) => setResults([...res.entity.features]));
    }, timeout);
  };

  const onSelectedItem = (item) => {
    const { center } = item;
    const newViewport = {
      longitude: center[0],
      latitude: center[1],
      zoom: pointZoom,
    };

    onSelected(newViewport, item);
  };

  const hideResults = () => {
    setTimeout(() => setShowResults(false), 300);
  };

  useEffect(() => {
    setInputValue(address);
  }, [address]);

  return (
    <GeocoderWrapper>
      <div className="react-geocoder">
        <input
          onChange={onChange}
          onBlur={hideResults}
          onFocus={() => setShowResults(true)}
          value={inputValue}
        />

        {showResults && results.length > 0 && (
          <div className="react-geocoder-results">
            {results.map((item) => (
              <div
                key={item?.id}
                className="react-geocoder-item"
                onClick={() => onSelectedItem(item)}
              >
                {item.place_name}
              </div>
            ))}
          </div>
        )}
      </div>
    </GeocoderWrapper>
  );
};

Geocoder.propTypes = {
  timeout: PropTypes.number,
  onSelected: PropTypes.func.isRequired,
  pointZoom: PropTypes.number,
  mapToken: PropTypes.string.isRequired,
  limit: PropTypes.number,
  address: PropTypes.string,
};

export default Geocoder;
