import React from "react";

interface ViewPosition {
    longitude: number;
    latitude: number;
}

interface ViewPositionShort {
  lng: number;
  lat: number;
}

interface AppProps {
    mapToken: string;
    mapStyle?: string;
    mapPosition?: ViewPosition;
    mapPin?: string;
    pinSize?: [number, number];
    mapMoveMode?: 'FLY_TO' | 'BASE';
    flyDuration?: number;
    initMapZoom?: number;
    numOfResults?: number;
}
  
interface MapProps {
    mapToken: string;
    handleMarkerDrag: (lngLat: ViewPositionShort) => void;
    viewPosition: ViewPosition;
    mapStyle?: string;
    mapPin?: string;
    pinSize?: [number, number];
    mapMoveMode?: string;
    flyDuration?: number;
    initMapZoom?: number;
}

interface AddressFeature {
    id: string;
    place_name: string;
    type?: string;
    place_type?: string[];
    relevance?: number;
    properties?: {
      accuracy?: string;
      mapbox_id?: string;
    };
    text?: string;
    center?: [number, number];
    geometry?: {
      type?: string;
      coordinates?: [number, number];
    };
    address?: string;
    context?: Array<{
      id?: string;
      mapbox_id?: string;
      wikidata?: string;
      short_code?: string;
      text?: string;
    }>;
}
  
interface AutocompleteProps {
    mapToken: string;
    address: string;
    onItemClick: (vp: ViewPosition, item: AddressFeature) => void;
    numOfResults?: number;
}

declare const App: React.FC<AppProps>;
declare const Map: React.FC<MapProps>;
declare const Autocomplete: React.FC<AutocompleteProps>;

export { Map, Autocomplete };
export default App;