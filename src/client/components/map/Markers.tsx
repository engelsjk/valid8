/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useRef, useEffect } from "react"
import { jsx } from "theme-ui";

import MapboxGL from "mapbox-gl";

import {
    Point
} from "../../types";

import Icon from "../Icon";
import icons from "../../icons";

const Marker = ({
    map,
    point,
}: {
    map?: MapboxGL.Map;
    point?: Point;
}) => {
    const markerRef = useRef<HTMLDivElement>(null);
    const name = point ? (Object.keys(icons).includes(point.name) ? point.name as keyof typeof icons : "default") : "default";

    useEffect(() => {
        if (map && point && markerRef.current) {
            const marker = new MapboxGL.Marker(markerRef.current, {
                draggable: true
            })
                .setLngLat(point.lnglat)
                .addTo(map);
            return () => { marker.remove() };
        }
    }, [map, point])

    return (
        <div ref={markerRef}>
            <Icon name={name} size={35} color={"#00A8E0"} />
        </div>
    )
}

const Markers = ({
    map,
    points
}: {
    map?: MapboxGL.Map;
    points?: Point[]
}) => {

    return (
        <div className="markers">          {
            points &&
            points.map((point, index) => (
                <Marker key={`marker-${index}`} map={map} point={point} />
            ))
        }
        </div>
    )
}

export default Markers;