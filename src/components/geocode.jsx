/* eslint-disable camelcase */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Geocoder from "./geocodeComponent";

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

const Geocode = ({ setViewPosition, address, setAddress, mapToken }) => {
  const onSelected = (vp, item) => {
    setAddress(item?.place_name);
    setViewPosition(vp);
  };

  return (
    <GeocoderWrapper>
      <Geocoder
        mapboxApiAccessToken={mapToken}
        onSelected={onSelected}
        hideOnSelect={false}
        initialInputValue={address}
        updateInputOnSelect
        value={address}
      />
    </GeocoderWrapper>
  );
};

Geocode.propTypes = {
  setViewPosition: PropTypes.func,
  setAddress: PropTypes.func,
  address: PropTypes.string,
};

Geocode.defaultProps = {
  setViewPosition: () => {},
  setAddress: () => {},
  address: "",
};

export default Geocode;
