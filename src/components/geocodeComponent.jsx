/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import MapboxClient from "mapbox";
import { WebMercatorViewport } from "viewport-mercator-project";

const Geocoder = ({
  formatItem,
  className,
  inputComponent,
  itemComponent,
  viewport,
  onSelected,
  transitionDuration,
  hideOnSelect,
  pointZoom,
  updateInputOnSelect,
  timeout,
  queryParams,
  localGeocoder,
  limit,
  localOnly,
  mapboxApiAccessToken,
  value,
}) => {
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const client = new MapboxClient(mapboxApiAccessToken);

  const onChange = (event) => {
    const queryString = event.target.value;

    setInputValue(event.target.value);

    setTimeout(() => {
      const localResults = localGeocoder ? localGeocoder(queryString) : [];
      const params = {
        ...queryParams,
        ...{ limit: limit - localResults.length },
      };

      if (params.limit > 0 && !localOnly && queryString.length > 0) {
        client.geocodeForward(queryString, params).then((res) => {
          setResults([...localResults, ...res.entity.features]);
        });
      } else setResults(localResults);
    }, timeout);
  };

  const onSelectedItem = (item) => {
    let newViewport = new WebMercatorViewport(viewport);
    const { bbox, center } = item;

    if (bbox) {
      newViewport = newViewport.fitBounds([
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ]);
    } else {
      newViewport = {
        longitude: center[0],
        latitude: center[1],
        zoom: pointZoom,
      };
    }

    const { longitude, latitude, zoom } = newViewport;

    onSelected(
      { ...viewport, ...{ longitude, latitude, zoom, transitionDuration } },
      item
    );

    if (hideOnSelect) {
      setResults([]);
    }

    if (updateInputOnSelect) {
      setInputValue(formatItem(item));
    }
  };

  const hideResults = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 300);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const Input = inputComponent || "input";
  const Item = itemComponent || "div";

  return (
    <div className={`react-geocoder ${className}`}>
      <Input
        onChange={onChange}
        onBlur={hideResults}
        onFocus={() => setShowResults(true)}
        value={inputValue}
      />

      {showResults && !!results.length && (
        <div className="react-geocoder-results">
          {results.map((item) => (
            <Item
              key={item?.id}
              className="react-geocoder-item"
              onClick={() => onSelectedItem(item)}
              item={item}
            >
              {formatItem(item)}
            </Item>
          ))}
        </div>
      )}
    </div>
  );
};

Geocoder.propTypes = {
  timeout: PropTypes.number,
  queryParams: PropTypes.object,
  viewport: PropTypes.object.isRequired,
  onSelected: PropTypes.func.isRequired,
  transitionDuration: PropTypes.number,
  hideOnSelect: PropTypes.bool,
  pointZoom: PropTypes.number,
  mapboxApiAccessToken: PropTypes.string.isRequired,
  formatItem: PropTypes.func,
  className: PropTypes.string,
  inputComponent: PropTypes.func,
  itemComponent: PropTypes.func,
  limit: PropTypes.number,
  localGeocoder: PropTypes.func,
  localOnly: PropTypes.bool,
  updateInputOnSelect: PropTypes.bool,
  value: PropTypes.string,
};

Geocoder.defaultProps = {
  timeout: 300,
  transitionDuration: 0,
  hideOnSelect: false,
  updateInputOnSelect: false,
  pointZoom: 16,
  formatItem: (item) => item.place_name,
  queryParams: {},
  className: "",
  limit: 5,
  value: "",
};

export default Geocoder;
