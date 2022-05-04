import mapboxgl from "mapbox-gl";

import icons from "./icons";

export interface Asset {
    readonly name: string;
    readonly lnglat: mapboxgl.LngLat;
}

export interface AssetLayer {
    readonly iconName: keyof typeof icons;
    readonly iconColor?: string;
    readonly iconSize?: number;
}

export interface Point {
    readonly name: string;
    readonly lnglat: mapboxgl.LngLat;
}