# react-mapbox-geocoder-autocomplete: Mapbox Geocoding and Autocomplete React Library

The `react-mapbox-geocoder-autocomplete` library is a powerful and intuitive tool designed to seamlessly integrate Mapbox maps and geocoding capabilities into your React applications. With this library, you can easily create a map with an integrated input field that allows users to search for addresses and locations, while also providing the ability to interact with the map itself. This library aims to simplify the process of implementing interactive maps with geocoding functionalities, making it suitable for a wide range of applications, from location-based services to interactive mapping experiences.

## Key Features

### Interactive Map Integration
The core feature of this library is the integration of a dynamic Mapbox map. You can display the map with a specified style and initial position, enabling users to explore locations visually.
### Dynamic Marker Placement
This library allows you to place a marker on the map, indicating a specific location. Users can interact with the marker by dragging it to a new position. As the marker moves, the associated address is automatically updated to reflect the current location, providing a seamless way to capture and display address information.

### Geocoding Autocomplete
The library provides a powerful autocomplete functionality for searching addresses. As users type into the input field, the library offers suggestions for possible locations. This feature enhances the user experience by helping users quickly find and select addresses without the need for precise typing.

## Usage

To get started, import the `react-mapbox-geocoder-autocomplete` library into your React application. Here are the available props that you can use to customize the behavior and appearance of the map and geocoding components:

```jsx
import Geocoder from 'react-mapbox-geocoder-autocomplete';

function App() {
  return (
    <div>
      <Geocoder mapToken="pk.(...)" /> // Choose your mapToken that you can create for free here: _https://docs.mapbox.com/help/tutorials/get-started-tokens-api/_
    </div>
  );
}

export default App;
```

## Custom Styles
The map will occupy the maximum height and width of the parent component. If you want to additionally style the map, inspect the component and access the input field or map via the className and adjust your style.
The map has more styles that you can find here: _https://docs.mapbox.com/api/maps/styles/_

```css
/* GeocoderCustomStyles.css */

.custom-react-geocoder {
  border: 1px solid red;
}

.mapboxgl-map,{
  position: absolute;
  width: 400px;
  height: 400px;
}
```

```jsx
    import './GeocoderCustomStyles.css';

    ...

    <div>
      <Geocoder mapToken="pk.(...)" /> // Choose your mapToken that you can create for free here: _https://docs.mapbox.com/help/tutorials/get-started-tokens-api/_
    </div>

  ...
```

## Props
- `mapToken` (string, required):
  Your Mapbox access token. This token is necessary for authenticating your application with Mapbox services. Ensure you provide a valid access token to enable map functionality.
  Choose your mapToken that you can create for free here: _https://docs.mapbox.com/help/tutorials/get-started-tokens-api/_

- `mapStyle` (string, optional, default: `mapbox://styles/mapbox/streets-v12`):
  The style of the Mapbox map. You can specify a custom style URL or use one of the predefined styles provided by Mapbox. If not provided, the default style will be used.
  The map has more styles that you can find here: _https://docs.mapbox.com/api/maps/styles/_

- `mapPosition` (Coordinates object, optional, default: `{ longitude: -73.9866, latitude: 40.72929915979287 }`):
  The initial position of the map when it loads. This should be an object with `latitude` and `longitude` properties representing the starting geographical coordinates of the map view.

- `mapPin` (string, optional, default: `MapPin (red one)`):
  The image source for the map marker (pin). This prop allows you to customize the appearance of the marker on the map.
  You can pass any picture you want.

- `pinSize` (array of numbers, optional, default: `[60, 60]`):
  The dimensions (width and height) of the map marker (pin). You can adjust these values to control the size of the marker displayed on the map.

- `mapMoveMode` (string, optional, default: `'BASE'`):
  The mode of movement when updating the map's position. Choose between `'FLY_TO'` for smooth animated transitions or `'BASE'` for immediate positioning.

- `flyDuration` (number, optional, default: `10000`):
  The duration, in milliseconds, for the animation when using the `'FLY_TO'` mode. This value determines how long the transition animation takes when the map moves to a new position.

- `initMapZoom` (number, optional, default: `12`):
  The initial zoom level of the map when it loads. Adjust this value to control the initial level of detail displayed on the map.

- `numOfResults` (number, optional, default: `15`):
  The maximum number of geocoding results displayed when using the autocomplete functionality. This value determines how many location suggestions are shown as users type in the input field.
