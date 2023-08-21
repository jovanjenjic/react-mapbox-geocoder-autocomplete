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
