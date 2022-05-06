/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useRef, useEffect, Dispatch, SetStateAction } from "react"
import { jsx } from "theme-ui";

import MapboxGL from "mapbox-gl";

import {
    Point
} from "../../types";

import Icon from "../Icon";
import icons from "../../icons";

const Marker = ({
    map,
    iconName,
    point,
    setPoint
}: {
    map?: MapboxGL.Map;
    iconName?: string;
    point?: Point;
    setPoint: Dispatch<SetStateAction<Point | undefined>>;
}) => {
    const markerRef = useRef<HTMLDivElement>(null);
    const name = iconName ? (Object.keys(icons).includes(iconName) ? iconName as keyof typeof icons : "default") : "default";

    useEffect(() => {
        if (map && point && markerRef.current) {

            const marker = new MapboxGL.Marker(markerRef.current, {
                draggable: true
            })
                .setLngLat(point.lnglat)
                .addTo(map);

            marker.on('dragend', () => {
                setPoint({
                    lnglat: marker.getLngLat(),
                })
            });

            return () => { marker.remove() };
        }
    }, [map, point])

    return (
        <div ref={markerRef}>
            <Icon name={name} size={35} symbolColor={"black"} backgroundColor={"#00A8E0"} />
        </div>
    )
}

// const Markers = ({
//     map,
//     points
// }: {
//     map?: MapboxGL.Map;
//     points?: Point[]
// }) => {

//     return (
//         <div className="markers">          {
//             points &&
//             points.map((point, index) => (
//                 <Marker key={`marker-${index}`} map={map} point={point} />
//             ))
//         }
//         </div>
//     )
// }

export default Marker;